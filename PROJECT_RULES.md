# Japan 2027 Travel Dashboard
A premium mobile-first travel planner inspired by Apple Wallet, Notion and Airbnb Trips.

## Product Vision
The app should feel like a real iPhone travel application rather than a generic website.

## Design Principles

- Mobile-first
- Large rounded cards (24px radius)
- Soft shadows
- Glassmorphism hero section
- Smooth animations
- Clean typography
- Plenty of white space

## Color Palette

| Name | Hex |
| --- | --- |
| Background | #F7F6F3 |
| Card | #FFFFFF |
| Accent | #7A9278 |
| Text | #1F2937 |
| Muted | #64748B |

## Typography
Use SF Pro style system fonts.

## Component Rules
Every reusable UI element must become a component.

Examples:

- HeroCard
- Countdown
- RouteTimeline
- FlightCard
- ExperienceCard
- RestaurantCard
- SuggestionCard
- BottomNavigation

## File Structure

Use the Next.js App Router structure with clear separation between routes, reusable components, data, and shared types:

| Path | Responsibility |
| --- | --- |
| `app/` | App Router pages, layouts, route-level styles, and metadata |
| `app/page.tsx` | Main dashboard entry point |
| `app/globals.css` | Global styles and design tokens |
| `components/` | Reusable UI components grouped by product area |
| `components/ui/` | Shared primitive components such as buttons, cards, and badges |
| `components/dashboard/` | Dashboard-specific components such as HeroCard, Countdown, FlightCard, and RouteTimeline |
| `components/itinerary/` | Itinerary-specific components |
| `components/experiences/` | Experience-specific components |
| `components/restaurants/` | Restaurant-specific components |
| `components/suggestions/` | Suggestion-specific components |
| `lib/` | Shared utilities and application helpers |
| `data/` | Trip, itinerary, city, and content data |
| `types/` | Shared TypeScript types and interfaces |
| `public/` | Static images, icons, and other public assets |

## Coding Standards

- TypeScript
- Tailwind
- Functional components
- Clean reusable code
- No duplicated UI

## Product Roadmap

- Sprint 1 — Dashboard
- Sprint 2 — Itinerary
- Sprint 3 — Experiences
- Sprint 4 — Restaurants
- Sprint 5 — Suggestions
- Sprint 6 — Interactive SVG Map
- Sprint 7 — Supabase Collaboration
- Sprint 8 — Memory Mode

Every future feature must follow these rules.

## Product Vision Lock

> This app is not a travel website. It is a premium collaborative travel planner that users actively use before, during and after the trip.

### Permanent UX Principles

- Never duplicate place data.
- Every reusable UI element should become a reusable component.
- Dashboard should become context-aware during the trip.
- Keep Apple-quality spacing, typography and animations.
