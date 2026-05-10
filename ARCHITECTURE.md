# 🏗️ Traveloop Architecture

This document outlines the system architecture, design decisions, and folder structure of the Traveloop platform.

## 🚀 System Overview

Traveloop is a full-stack Next.js application designed for high performance, scalability, and seamless AI integration.

- **Frontend**: React 19 with Next.js 15 App Router. We use Server Components by default for better performance and SEO, and Client Components where interactivity is required.
- **Backend**: Next.js Server Actions for database mutations and API routes for AI streaming and webhooks.
- **AI Layer**: Direct integration with Google Gemini API using the official `@google/genai` SDK.
- **Data Layer**: PostgreSQL database managed via Prisma ORM.

---

## 📁 Folder Structure

```text
traveloop/
├── prisma/                  # Database schema and migrations
│   └── schema.prisma        # Prisma schema file
├── public/                  # Static assets
└── src/
    ├── app/                # Next.js App Router
    │   ├── api/            # API endpoints (e.g., Gemini routes)
    │   ├── dashboard/      # Dashboard page
    │   ├── layout.tsx      # Root layout
    │   └── page.tsx        # Landing page
    ├── components/         # Reusable React components
    │   ├── ui/             # Primitive UI components
    │   └── shared/         # Complex shared components
    └── lib/                # Utilities and clients
        ├── gemini.ts       # Gemini client initialization
        ├── prisma.ts       # Prisma client initialization
        └── utils.ts        # Helper functions
```

---

## 🤖 Gemini Integration

We use the new `@google/genai` SDK to interact with Gemini models.

### Models Used
- **`gemini-3-flash-preview`**: Used for fast text generations, itinerary building, and chat assistant.
- **`gemini-3-pro-preview`**: Used for complex reasoning and deep research tasks.

### Pattern
We wrap the Gemini calls in API routes to keep API keys secure on the server.
Example endpoint: `/src/app/api/gemini/generate-itinerary/route.ts`

---

## 🗄️ Database Design

We use a relational schema in PostgreSQL to handle complex travel data:
- **User**: Handles authentication and profile.
- **Trip**: The core entity, linking stops, budget, and notes.
- **Stop**: Represents a city or location within a trip.
- **Activity**: Specific things to do at a stop.
- **Budget**: Tracks expenses.
- **AIConversation**: Stores chat history for the AI assistant.

For full schema details, see [prisma/schema.prisma](./prisma/schema.prisma).
