# GET INSPIRED — Cannes Lions 2026

A social campaign experience built with Next.js, Higgsfield AI, Resend, and Supabase.

## Quick Start

```bash
git clone https://github.com/YOUR_ORG/get-inspired-cannes
cd get-inspired-cannes
npm install
cp .env.local.example .env.local
# Fill in your keys (see below)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in:

| Variable | Where to get it |
|---|---|
| `ANTHROPIC_API_KEY` | console.anthropic.com |
| `HIGGSFIELD_API_KEY` | app.higgsfield.ai → Settings → API |
| `RESEND_API_KEY` | resend.com → API Keys |
| `RESEND_FROM_EMAIL` | A verified sender domain in Resend |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase project → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase project → Settings → API |

---

## Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `supabase-schema.sql`
3. That creates the `gallery` table with RLS policies

---

## Resend Setup

1. Sign up at [resend.com](https://resend.com)
2. Add and verify your sending domain (or use `onboarding@resend.dev` for testing)
3. Create an API key and add it to `.env.local`

---

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set env vars (or do this in the Vercel dashboard)
vercel env add ANTHROPIC_API_KEY
vercel env add HIGGSFIELD_API_KEY
vercel env add RESEND_API_KEY
vercel env add RESEND_FROM_EMAIL
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY

# Production deploy
vercel --prod
```

Or connect your GitHub repo in the Vercel dashboard for automatic deploys on push.

---

## Project Structure

```
src/
  app/
    page.tsx              # Main experience (hero → flow → result)
    page.module.css       # All styles
    globals.css           # Base styles + CSS vars
    layout.tsx            # Root layout + fonts
    api/
      generate/route.ts   # POST: Higgsfield image generation
      email/route.ts      # POST: Resend email delivery
      gallery/route.ts    # GET: Supabase gallery fetch
      charities/route.ts  # GET: Inspired platform charity list
  lib/
    supabase.ts           # Supabase client (browser + admin)
    types.ts              # Shared TypeScript types
supabase-schema.sql       # Run once in Supabase SQL editor
```

---

## How It Works

1. User picks an inspiration theme → popover asks them to describe it in their words
2. User picks a charity from the Inspired platform
3. User optionally takes/uploads a photo
4. User enters email
5. `/api/generate` builds a personalised prompt and calls Higgsfield via Claude MCP
6. The generated image is saved to Supabase `gallery` table
7. `/api/email` sends a branded email via Resend with the image
8. Result page shows the image with download + gallery links
9. Gallery page (`/gallery`) pulls all images from Supabase in real time
