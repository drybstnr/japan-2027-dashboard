# Japan 2027 Travel Dashboard — Sprint 3 Master Feature Ticket

> Read `PROJECT_RULES.md` first and treat it as the single source of truth.

## Engineering Guardrails

- Do not redesign the application from scratch.
- Do not remove existing functionality.
- Extend the current Next.js 15 App Router project.
- Preserve the Apple Wallet-inspired design language.
- Inspect the existing implementation before editing.
- Prefer the smallest set of additive, testable changes.
- Reuse existing state, persistence hooks, modal behavior, and navigation patterns.
- Do not introduce duplicated place data between Dashboard, Itinerary, Explore, Food, or Community.
- Keep persistence abstract so localStorage can later be replaced by Supabase.
- Run the existing build after each meaningful implementation slice.

## Product Goal

Make the app feel like a real collaborative iPhone travel planner rather than a generic travel website.

Information should flow naturally between:

- Dashboard
- Itinerary
- Explore
- Food
- Community

Users should never have to enter the same place twice.

## Priority 1 — In-App Place Search

Implement an in-app place search that feels like Apple Maps while keeping users inside the application.

Do not embed Google Maps full-screen.

### Provider Architecture

| Capability | Provider | Responsibility |
| --- | --- | --- |
| Place search | Google Places API | Search and autocomplete results |
| Place details | Google Places API | Details, rating, hours, phone, website, photos |
| Mini map previews | OpenStreetMap | Lightweight embedded map context |
| External navigation | Google Maps | Optional explicit “Open in Google Maps” action |

The provider boundary must be isolated behind reusable client/data helpers so the search UI can be developed with fixtures when API credentials are unavailable.

### Reusable Components

Create or extend these components where appropriate:

- `PlaceSearch`
- `PlaceCard`
- `PlaceDetailSheet`
- `MiniMap`

They must be reusable inside:

- Food
- Explore
- Cafes
- Attractions
- Shopping

## Priority 2 — Food Search Experience

The Food tab becomes a searchable restaurant finder.

### Search Behavior

Implement:

- Live search
- 300ms debounce
- Loading state
- Empty state
- Error state
- Keyboard and mobile-friendly input behavior

### Restaurant Result Cards

Each result card should contain:

- Photo
- Name
- Rating
- Category
- Neighborhood
- Open/closed status

Actions:

- Save
- Add to Day

Use the shared place object. Do not duplicate restaurant data in a separate feature-specific model.

## Priority 3 — Place Detail Sheet

Clicking a place opens an iOS-style bottom sheet. Users remain inside the app until they explicitly choose the external Google Maps action.

Display:

- Large photo
- Address
- Opening hours
- Website
- Phone
- Rating
- Mini map
- “Open in Google Maps” action

The sheet must support:

- Tap outside to close
- X button
- Escape on desktop
- Framer Motion bottom-sheet animation
- Loading and missing-data states

## Shared Place Data Contract

Create one reusable TypeScript place model, for example:

```ts
interface Place {
  placeId: string;
  name: string;
  category: string;
  address: string;
  neighborhood?: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  photo?: string;
  rating?: number;
  isOpen?: boolean;
  openingHours?: string[];
  website?: string;
  phone?: string;
}
```

A searched place must be reusable in:

- Itinerary
- Food
- Explore
- Dashboard when relevant to the current day
- Community references

Example flow:

1. User searches for `Gyukatsu Motomura`.
2. User saves or adds the result to a day.
3. The same `Place` object is referenced everywhere else.
4. The app never asks the user to re-enter the same place.

## Priority 4 — Explore Integration

Every Explore card must support:

- Save
- Add to Day

“Add to Day” must open the existing planner modal and insert the selected place into the selected itinerary day.

Requirements:

- Reuse the existing planner modal.
- Reuse the shared `Place` model.
- Do not create a second add-to-itinerary flow.
- Do not duplicate experience data.
- Preserve current local persistence behavior.

## Priority 5 — Dashboard Intelligence

The Dashboard should become a daily travel assistant instead of a static summary.

### Before The Trip

Show:

- Countdown
- Tokyo weather
- Upcoming reservations
- Saved upcoming places where available

### During The Trip

Automatically detect the current itinerary day and display:

- Current city and local date
- Weather for the itinerary city
- First activity
- Lunch reservation when available
- Next transport
- Day progress

Example:

> Today in Kyoto 🇯🇵

The city must follow the existing itinerary data, not a second hardcoded route model.

## Priority 6 — Weather

Use Open-Meteo without an API key.

Show:

- Current temperature
- Condition
- High and low
- Weather icon

Behavior:

- Before the trip, use Tokyo.
- During the trip, follow the current itinerary city automatically.
- Cache requests for one hour.
- Handle loading, API failure, and unavailable data without breaking the Dashboard.
- Keep the weather provider behind a reusable component or helper.

## Priority 7 — Community Flow

Community suggestions must not immediately modify the itinerary.

Required flow:

```text
Community
  ↓
Review
  ↓
Save
  ↓
Add to Day
```

A suggestion may reference a shared `Place`, but it must require an explicit user action before becoming an itinerary plan.

## Priority 8 — Persistence

Preserve and extend the existing local persistence layer.

Keep persistence behind reusable hooks so replacing localStorage with Supabase later requires minimal changes.

Existing persisted concerns include:

- Itinerary plans: `japan2027-itinerary`
- Expanded days: `japan2027-expanded-days`
- Scroll position: `japan2027-scroll`
- Active tab: `japan2027-active-tab`
- Add Plan draft: `japan2027-plan-draft`

New place persistence must use the same abstraction rather than direct storage calls scattered through UI components.

## Technical Architecture

Preserve the current Next.js App Router project and expand the existing structure:

```text
app/
  page.tsx
  globals.css

components/
  PlaceSearch.tsx
  PlaceCard.tsx
  PlaceDetailSheet.tsx
  MiniMap.tsx
  WeatherCard.tsx
  DayCard.tsx
  AddPlanModal.tsx
  BottomNavigation.tsx

hooks/
  useLocalStorageState.ts
  useScrollRestoration.ts
  useDebouncedValue.ts

lib/
  places.ts
  weather.ts

components/data/
  itinerary.ts
  experiences.ts

types/
  trip.ts
  place.ts
```

Use the repository’s existing `data/` and `types/` directories if they already exist. Do not create parallel sources of truth.

### Component Standards

- Use TypeScript interfaces.
- Use functional React components.
- Keep interactive components client components only where state is needed.
- Keep provider/API access outside presentational components when practical.
- Reuse existing Framer Motion patterns.
- Keep all UI responsive and mobile-first.
- Add accessible labels, focus states, and keyboard behavior.
- Avoid duplicated UI and duplicated data models.

## UX and Visual Direction

Preserve:

- Apple Wallet feel
- Apple Maps-inspired place discovery
- Apple Calendar-style itinerary rhythm
- Airbnb Trips-style travel organization
- Rounded cards, generally 24px or larger where appropriate
- Glassmorphism hero surfaces
- Soft shadows
- Warm background `#F7F6F3`
- White cards `#FFFFFF`
- Sage accent `#7A9278`
- Clean system/SF Pro-style typography
- Generous whitespace
- Subtle Framer Motion animations

Add only where useful:

- Button press scale
- Bottom-sheet slide
- Page transitions
- Fade-in result cards
- Loading skeletons
- Empty and error states

Do not turn the UI into a generic dashboard or a full-screen map product.

## Implementation Sequence

1. Inspect the current project and read `PROJECT_RULES.md`.
2. Confirm existing components, state, persistence hooks, and data sources.
3. Define the shared `Place` type and provider boundary.
4. Add fixture-backed place search before wiring real credentials.
5. Build `PlaceCard`, `PlaceDetailSheet`, and `MiniMap`.
6. Connect Food search and states.
7. Connect Explore cards to the existing Add Plan flow.
8. Upgrade Community to Review → Save → Add to Day.
9. Upgrade Dashboard with current-day intelligence.
10. Verify local persistence and no duplicated place data.
11. Run diagnostics and `npm run build`.

## Acceptance Criteria

- Search works inside the app.
- Food results feel native and premium.
- Loading, empty, and error states are present.
- Place detail opens as an in-app bottom sheet.
- Saved places are reusable objects.
- Explore can populate Itinerary through the existing planner flow.
- Dashboard is context-aware.
- Weather follows the itinerary city and is cached for one hour.
- Community suggestions require review before entering the itinerary.
- There is no duplicated place data.
- Existing local persistence continues to work.
- Existing project functionality is preserved.
- The project compiles successfully.
- UI remains consistent with `PROJECT_RULES.md`.

## Final Visual Goal

The finished app should feel like a premium iPhone travel planner combining:

- Apple Wallet
- Apple Maps
- Apple Calendar
- Airbnb Trips
- Notion

It should feel like a product that could genuinely exist on the App Store, while preserving the current project architecture and functionality.
