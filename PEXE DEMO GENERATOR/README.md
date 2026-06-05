# PEXEK — Demo Generator

Automation IA pour entreprises marocaines. SARA, l'assistante IA qui convertit les leads 24/7.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Database:** Turso (libSQL)
- **Auth:** Session-based with bcrypt

## Getting Started

1. Clone the repo
2. Copy `.env.local.example` to `.env.local` and fill in the values
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Seed the database (optional):
   ```bash
   npm run seed
   ```

## Project Structure

```
.
├── app/                    # Next.js App Router pages & API routes
│   ├── api/               # API routes (auth, demos, stats, tracking)
│   ├── dashboard/         # Dashboard pages (main, clients, stats)
│   ├── demo/              # Public demo page
│   └── login/             # Login page
├── components/            # Shared React components
│   ├── demo/              # Demo-specific components
│   └── ui/                # UI primitives (Button, Card, Input, etc.)
├── lib/                   # Core utilities (db, auth)
├── scripts/               # CLI scripts (seed)
├── middleware.ts          # Next.js middleware for auth protection
├── next.config.ts         # Next.js configuration
├── tailwind.config.ts     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## Deploy on Vercel

Push to GitHub and connect to Vercel. The `vercel.json` and Next.js config will be auto-detected.
