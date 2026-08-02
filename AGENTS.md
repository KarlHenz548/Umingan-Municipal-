# System Instructions & Project Guidelines for Municipality of Umingan Portal

## Project Overview
Official Municipal Web Application for the **Municipality of Umingan, Pangasinan, Philippines**.

## Tech Stack & Architecture
- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript (strict mode, explicit interfaces)
- **Styling**: Tailwind CSS v4 with custom color themes (Seal Navy `#0f172a`, Gold/Yellow accent `#f59e0b`, Emerald `#059669`)
- **AI Integration**: Gemini 2.5/3.5 models server-side via Next.js Route Handlers (`app/api/gemini/chat/route.ts`)

## Code & File Organization Standards
1. **Component Modularity**: Keep all section components inside `/components` (e.g. `HeroSection`, `TourismSection`, `BarangayDirectorySection`, `NewsSection`, `ServicesSection`, `EmergencySection`).
2. **Compact & Expandable UI**:
   - Long lists (e.g. 38 Barangays, 15+ Tourist Spots) MUST utilize category cards/filters and initial collapsed views (e.g., top 3 or top 6 items) with clear "View All / Show More" click triggers to prevent excessive page length.
3. **Image Optimization**:
   - Always use `next/image` with proper `width`, `height`, `fill`, `referrerPolicy="no-referrer"`, and `unoptimized` props where external image URLs are used.
   - Images above the fold (e.g. Hero main backdrop & mayor photo) MUST include the `priority` prop for Largest Contentful Paint (LCP) performance.
4. **Data Management**:
   - All structured local municipality data (barangays, officials, tourism spots, emergency numbers, news, services) resides in `/lib/umingan-data.ts`.
5. **Types & Interfaces**:
   - Maintain explicit TypeScript interfaces for all domain models (e.g. `Barangay`, `TouristSpot`, `NewsArticle`, `EmergencyContact`).

## UI / UX Design Principles
- **Color Contrast**: Maintain high accessibility contrast (navy background `#091e42` / slate `#0f172a` with yellow `#f59e0b` & white text).
- **Responsive Layout**: Mobile-first design with smooth responsive breakpoints (`sm:`, `md:`, `lg:`).
- **No Unsolicited Slop**: Avoid full-screen clutter; keep controls intuitive, clean, and accessible.
