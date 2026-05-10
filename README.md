# 🌍 Traveloop — AI-Powered Personalized Travel Planning Platform

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Gemini](https://img.shields.io/badge/Powered%20By-Google%20Gemini-orange?style=for-the-badge&logo=google)](https://ai.google.dev/)
[![Prisma](https://img.shields.io/badge/Prisma-6-purple?style=for-the-badge&logo=prisma)](https://www.prisma.io/)

**Traveloop** is a production-grade, full-stack AI travel planner built to win hackathons and wow users. It helps you create multi-city itineraries, discover hidden gems, and optimize your budget using advanced Google Gemini AI models.

---

## ✨ Key Features

- 🤖 **AI Itinerary Builder**: Generate detailed day-wise plans in seconds using Gemini 3 Flash.
- 💎 **Hidden Gems Explorer**: Discover off-the-beaten-path locations curated by AI.
- 💰 **Smart Budget Analytics**: Track expenses and get AI recommendations on where to save.
- 🧳 **Dynamic Packing Checklist**: Weather-aware, AI-generated packing suggestions.
- 🎨 **Premium UI/UX**: Glassmorphism design, smooth animations (Framer Motion), and dark mode default.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS v4, Framer Motion, Lucide Icons.
- **Backend**: Next.js Server Actions & API Routes.
- **Database**: PostgreSQL via Prisma ORM.
- **AI**: Google Gemini API (`@google/genai`).

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A PostgreSQL database (or use local setup)
- A Gemini API Key from [Google AI Studio](https://aistudio.google.com/)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mramansayyad/Traveloop.git
   cd Traveloop
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add:
   ```env
   GEMINI_API_KEY=your_gemini_api_key
   DATABASE_URL=your_postgresql_url
   ```

4. **Initialize Database**:
   ```bash
   npx prisma db push
   ```

5. **Run the development server**:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## 📚 Documentation

Explore more about the project:
- 🏗️ **[Architecture](./ARCHITECTURE.md)**: Deep dive into system design and Gemini integration.
- 🤝 **[Contributing](./CONTRIBUTING.md)**: Guidelines for contributing to the project.


---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
