# Cigar Aficionado Top 25 Cigars of 2025

A premium microsite for Cigar Aficionado magazine showcasing the Top 25 Cigars of 2025 with a progressive reveal system.

## 🎯 Project Overview

This Next.js application features:
- **Progressive Reveal System**: Cigars are revealed on a schedule (Dec 1-6, 2025)
- **Server-Side Protection**: Full cigar data is only sent to clients after reveal time
- **Premium Design**: Editorial-style layout with smooth animations
- **Mobile-First**: Fully responsive and optimized for all devices
- **SEO Optimized**: Complete meta tags, Open Graph, and structured data

## 📋 Current Status

### ✅ Completed
- Project structure and configuration files
- Data types and interfaces for cigars
- Server-side reveal protection system
- Reveal schedule configured for 25 cigars (6-day reveal period)
- API routes with CORS support
- Placeholder cigar data based on 2024 Top 25 list
- Reviewers data structure
- Utility functions and helpers

### ⏳ To Be Built
- **Components** (need to be adapted from Whisky Advocate reference):
  - `CigarCard` - Display revealed cigars
  - `MysteryCard` - Display unrevealed cigars
  - `CigarGrid` - Main grid layout for all 25 cigars
  - `Hero` - Hero section with video background
  - `Header` / `Footer` - Navigation and site footer
  - `CigarDetailPage` - Individual cigar detail pages
  - Reveal countdown components
  - Data visualizations
  - Ad components

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mcapace/top-25-cigars.git
cd top-25-cigars
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Copy environment variables:
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your configuration:
```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
REVEAL_TIMEZONE=America/New_York
```

5. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
ca-top25-cigars/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   └── cigars/        # Cigar data endpoint
│   │   ├── cigar/[rank]/      # Dynamic cigar detail pages (to be created)
│   │   ├── layout.tsx         # Root layout with metadata
│   │   └── page.tsx           # Homepage
│   ├── components/
│   │   ├── ads/               # Ad placement components (to be created)
│   │   ├── layout/            # Header, Footer, Hero, MobileNav (to be created)
│   │   ├── reveal/            # Countdown, Schedule, NotifyModal (to be created)
│   │   ├── cigar/             # Cigar cards, detail, tasting notes (to be created)
│   │   └── ui/                # Reusable UI components (to be created)
│   ├── data/
│   │   ├── cigars.ts          # Cigar type definitions
│   │   └── reviewers.ts       # Reviewer information
│   └── lib/
│       ├── data/
│       │   └── cigars.server.ts # Server-only cigar data (all 25 entries)
│       ├── getCigars.ts       # Server-side reveal logic
│       ├── revealUtils.ts     # Client-side reveal utilities
│       ├── revealSchedule.ts  # Reveal schedule configuration
│       └── countdownUtils.ts  # Countdown timer utilities
├── public/
│   ├── logos/                 # Cigar Aficionado logos (to be added)
│   └── images/
│       └── cigars/            # Cigar images (to be added)
└── README.md
```

## 📝 Updating Cigar Data

### Adding or Editing Cigar Information

1. Open `src/lib/data/cigars.server.ts`
2. Find the cigar entry by rank (1-25)
3. Update the relevant fields:
   - `name`: Full cigar name
   - `vitola`: Cigar size/shape (e.g., "Robusto", "Toro", "Churchill")
   - `manufacturer`: Cigar maker
   - `price`: Price in USD (number)
   - `score`: Panel rating (number, 0-100)
   - `reviewer`: Reviewer name (must match `src/data/reviewers.ts`)
   - `reviewText`: Full review text
   - `revealDate`: ISO date string (e.g., "2025-12-05T15:00:00Z")
   - `hasVideo`: Boolean (true for ranks 1-5)
   - `shopifyUrl`: Optional Shopify product URL
   - `imageUrl`: Path to cigar image

### Reveal Schedule

Cigars are revealed according to this schedule (all at 10:00 AM EST):
- **December 1, 2025**: Ranks 25-16 (10 cigars)
- **December 2, 2025**: Ranks 15-11 (5 cigars)
- **December 3, 2025**: Ranks 10, 9, 8 (3 cigars)
- **December 4, 2025**: Ranks 7, 6, 5 (3 cigars)
- **December 5, 2025**: Ranks 4, 3, 2 (3 cigars)
- **December 6, 2025**: Rank 1 - Cigar of the Year

**Important**: The `revealDate` must be in UTC. For 10:00 AM EST, use `15:00:00Z` (EST is UTC-5).

## 🔒 Server-Side Reveal Protection

The application uses server-side logic to prevent client-side spoilers:

- **`src/lib/getCigars.ts`**: Server function that only returns full data for revealed cigars
- **Unrevealed cigars**: Only return `rank` and `revealDate`
- **Client-side checks**: Additional client-side validation for UI state

This ensures that even if someone inspects the source code, they cannot see unrevealed cigar details.

## 📧 Email Notifications

The notification system is ready for email service integration (to be implemented):

**Endpoint**: `POST /api/notify` (to be created)

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Set these in your hosting platform:

```env
NEXT_PUBLIC_SITE_URL=https://top25.cigaraficionado.com
REVEAL_TIMEZONE=America/New_York
EMAIL_SERVICE_API_KEY=your_key
EMAIL_FROM_ADDRESS=noreply@cigaraficionado.com
```

## 🎨 Component Adaptation Guide

To adapt components from the Whisky Advocate reference project:

1. **Copy component files** from `temp-wa-reference/src/components/` to `src/components/`
2. **Rename references**:
   - `whisky` → `cigar`
   - `whisky` → `cigar` (lowercase)
   - `Whisky` → `Cigar` (uppercase)
   - `20` → `25` (where applicable)
3. **Update imports**:
   - `@/data/whiskies` → `@/data/cigars`
   - `@/lib/getWhiskies` → `@/lib/getCigars`
   - `@/lib/revealUtils` (same)
4. **Update data fields**:
   - `category` → `vitola`
   - `owner` → `manufacturer`
   - Remove `abv` (not applicable to cigars)
5. **Update branding**:
   - Whisky Advocate → Cigar Aficionado
   - Update logo paths
   - Update color scheme if needed

## 🧪 Testing

### Local Testing

1. **Test Reveal Logic**: Temporarily modify `revealDate` in `src/lib/data/cigars.server.ts` to test reveals
2. **Test Mobile**: Use browser dev tools or physical devices
3. **Preview Mode**: Add `?preview=C!garT!me2025` to URL to see all cigars
4. **Test Mystery Cards**: Add `?testMystery=true` to see mystery cards in development

### Production Checklist

- [ ] All environment variables set
- [ ] Site URL configured correctly
- [ ] Logo images uploaded
- [ ] Cigar images uploaded
- [ ] Video URLs updated (if applicable)
- [ ] Shopify links updated
- [ ] Email service integrated (if applicable)
- [ ] Analytics configured (if applicable)
- [ ] SEO meta tags verified
- [ ] Social sharing previews tested
- [ ] Mobile experience tested
- [ ] Cross-browser testing completed

## 📊 Performance

- **Image Optimization**: Uses Next.js Image component
- **Font Optimization**: Preloads critical fonts
- **Code Splitting**: Automatic with Next.js
- **Lazy Loading**: Images below the fold
- **Server Components**: Maximum performance

## 🔍 SEO Features

- Complete meta tags for all pages
- Open Graph tags for social sharing
- Twitter Card support
- Structured data (JSON-LD) for products (to be added)
- Semantic HTML
- Proper heading hierarchy

## 🛠️ Tech Stack

- **Framework**: Next.js 16+ (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **TypeScript**: Full type safety
- **Fonts**: Inter (body), Playfair Display (headlines), Cormorant Garamond

## 📄 License

Copyright © 2025 Cigar Aficionado. All rights reserved.

## 🤝 Support

For questions or issues, contact the development team.

---

**Built with ❤️ for Cigar Aficionado**

## 📚 Reference Project

This project is based on the Whisky Advocate Top 20 project structure:
- Reference repository: https://github.com/mcapace/wa-top20
- Key differences: 25 cigars vs 20 whiskies, 6-day reveal vs 5-day reveal
