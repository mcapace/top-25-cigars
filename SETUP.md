# Setup Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Create Environment File**
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` with your settings.

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Open Browser**
   Navigate to http://localhost:3000

## Next Steps

### 1. Add Cigar Images
- Place cigar images in `public/images/cigars/`
- Name them `1.jpg`, `2.jpg`, etc. (matching rank numbers)
- Or update image paths in `src/lib/data/cigars.server.ts`

### 2. Update Cigar Data
- Edit `src/lib/data/cigars.server.ts`
- Replace placeholder data with actual 2025 Top 25 data
- Update prices, scores, review text, etc.

### 3. Build Components
- Reference the Whisky Advocate project structure
- Adapt components from `wa-top20` repository
- Follow the adaptation guide in README.md

### 4. Add Branding Assets
- Add Cigar Aficionado logos to `public/images/logos/`
- Update logo paths in layout and header components
- Add hero videos/images if needed

### 5. Configure Analytics
- Add Google Analytics ID to layout.tsx
- Or configure your preferred analytics solution

## Preview Mode

To see all cigars before reveal:
- Add `?preview=C!garT!me2025` to any URL
- This sets a cookie for 24 hours
- Useful for testing and content review

## Testing Reveal Schedule

To test the reveal schedule:
1. Modify `TEST_DATE` in `src/lib/revealSchedule.ts`
2. Set to a specific date like `'2025-12-02'`
3. Remember to set back to `null` before production!

## Component Checklist

Refer to the reference project for these components:
- [ ] Hero component with video background
- [ ] Header with navigation
- [ ] Footer
- [ ] CigarGrid component
- [ ] CigarCard component
- [ ] MysteryCard component
- [ ] Cigar detail pages
- [ ] Reveal countdown components
- [ ] Data visualizations
- [ ] Ad placement components
