# Patient Response Flow

Standalone app for crafting personalized SMS and email sequences for your CRM. No login required—data is saved in the browser via localStorage.

**Live at:** [patientflow.automatedpractice.com](https://patientflow.automatedpractice.com)

## Features

- **No login** – Use immediately, data persists in your browser
- **Campaign types** – Shockwave, Chiropractic, Decompression, Neuropathy (pre-filled education copy)
- **Form fields** – Practice details, package names, education short/long
- **Generated sequence** – 10 SMS + 7 emails with wait steps, ready to copy into High Level or any CRM

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Optional env

Create `.env.local`:

```
NEXT_PUBLIC_APP_NAME="Patient Flow"
```

## Deployment (Vercel)

1. Connect your repo at [vercel.com](https://vercel.com)
2. Add domain: **patientflow.automatedpractice.com**
   - Project Settings → Domains → Add
   - Point your DNS (CNAME or A record) per Vercel's instructions
3. Deploy

No database or auth config required.
