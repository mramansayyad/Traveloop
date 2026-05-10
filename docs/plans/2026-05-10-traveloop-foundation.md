# Traveloop Foundation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the foundation of Traveloop, including Gemini integration, Prisma schema, and initial UI layout.

**Architecture:** We use Next.js 15 App Router with Server Actions. Database is PostgreSQL via Prisma. AI is powered strictly by Gemini API via the `@google/genai` SDK.

**Tech Stack:** Next.js 15, React 19, Prisma, PostgreSQL, `@google/genai`, Tailwind CSS, Shadcn UI.

---

### Task 1: Setup Prisma Schema

**Files:**
- Create: `prisma/schema.prisma`

**Step 1: Create Prisma Schema**
Create the file with the models for User, Trip, Stop, Activity, Budget, Note, PackingItem.

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  avatarUrl String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  trips     Trip[]
}

model Trip {
  id          String   @id @default(cuid())
  title       String
  description String?
  startDate   DateTime
  endDate     DateTime
  coverImage  String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  stops       Stop[]
}

model Stop {
  id         String   @id @default(cuid())
  cityName   String
  country    String
  arrivalAt  DateTime
  departureAt DateTime
  tripId     String
  trip       Trip     @relation(fields: [tripId], references: [id])
  activities Activity[]
}

model Activity {
  id          String   @id @default(cuid())
  title       String
  description String?
  cost        Float?
  duration    Int? // in minutes
  stopId      String
  stop        Stop     @relation(fields: [stopId], references: [id])
}
```

**Step 2: Commit**

```bash
git add prisma/schema.prisma
git commit -m "feat: add initial prisma schema"
```

---

### Task 2: Setup Gemini Client

**Files:**
- Create: `src/lib/gemini.ts`

**Step 1: Create Gemini Client**
Implement the client using `@google/genai`.

```typescript
import { GoogleGenAI } from "@google/genai";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not set");
}

export const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const defaultModel = "gemini-3-flash-preview";
```

**Step 2: Commit**

```bash
git add src/lib/gemini.ts
git commit -m "feat: setup gemini client"
```
