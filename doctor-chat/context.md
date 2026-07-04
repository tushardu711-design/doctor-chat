# Halcyon Care — Doctor Chat

A static prototype of a patient-facing messaging interface for a care platform. Left pane lists the patient's care team (5 doctors); right pane shows the selected doctor's profile info and message thread.

## Stack

Plain HTML/CSS/JS. No build step, no framework, no dependencies. Open `index.html` directly or serve the folder statically.

## File structure

```
doctor-chat/
├── index.html         Markup only — links external fonts + css/styles.css + js/data.js + js/app.js
├── css/
│   └── styles.css      All styling: design tokens, layout, components, responsive breakpoints
├── js/
│   ├── data.js          Content only — doctors array (profile fields + message history) and canned reply pool
│   └── app.js            Behavior — rendering, doctor switching, info/thread toggle, composer, mobile nav
└── assets/
    ├── dr-david-chen.png       Real headshot for Dr. Chen
    ├── dr-amara-okafor.png     Real headshot for Dr. Okafor
    ├── dr-priya-raghavan.png   Real headshot for Dr. Raghavan
    ├── dr-elias-thorne.png     Real headshot for Dr. Thorne
    ├── dr-sofia-lindqvist.png  Real headshot for Dr. Lindqvist
    ├── Show Info.svg           Info icon for hide/show info toggle
    └── Synthio Logo.svg        Logo used in breadcrumb
```

## Design system

- **Headings:** Cabinet Grotesk Variable (via Fontshare)
- **Body:** Plus Jakarta Sans (via Google Fonts)
- **Palette:** warm monochrome (`--canvas`, `--surface`, `--ink`, `--border` in `styles.css`) with a single blue accent (`--blue`) for active/primary states, plus 5 muted pastel tints (red/blue/green/yellow/purple) used per-doctor for avatar backgrounds and tags
- **Look:** flat, no shadows/gradients, `1px solid var(--border)` on all cards, generous whitespace

## Layout

Three-part shell defined in `.app` (CSS grid):
1. **Icon rail** (far left, desktop/laptop only) — decorative nav icons, "Chats" is the active one
2. **Chat list** — the 5-doctor list with avatar, name, unread badge; no timestamp display
3. **Main panel** — contains:
   - **Profile header** — doctor name + video/call action buttons (aligned horizontally with space-between)
   - **Content view** (stacked vertically):
     - **Info view** — 6 info cards displayed in 3 columns per row (Role, Segment, Experience, Location, Practice setting, Primary practice) + hero photo with soft blob shapes
     - **Thread view** — message bubbles (hidden when info visible, visible when info hidden)
   - **Hide info row** — button with Show Info icons on left/right, positioned absolutely at bottom center; toggles between info and thread visibility

Top bar spans the list + main columns: breadcrumb with Synthio logo, "Download Report" button, user avatar chip (40px height, 24px padding, rounded 24px, gradient background).

## Responsive behavior

Three breakpoints, defined at the bottom of `styles.css`:
- **Desktop (>900px):** full 3-column layout (rail + list + main)
- **Tablet (680–900px):** icon rail hides; list (260px) + main stay side by side
- **Mobile (≤680px):** single pane. List shows full-width by default; tapping a doctor adds a `.chat-open` class to `.app` which swaps to the main panel full-width with a back button. Composer input is forced to `16px` to avoid iOS auto-zoom; bottom padding respects `env(safe-area-inset-bottom)`.

Most sizing (headings, paddings, the hero photo zone) uses `clamp()` so it scales fluidly between breakpoints rather than jumping.

## Data model (`js/data.js`)

Each doctor object:
```js
{
  id, name, initials, photo /* path to doctor headshot */,
  palette: [bgVar, fgVar],           // CSS var names for avatar/tag colors (for fallback initials)
  fields: [{ label, value }, ...],   // 6 info cards displayed 3 per row: Role, Segment, Experience, Location, Practice setting, Primary practice
  time, unread,                       // list preview metadata
  messages: [{ from: 'in'|'out', text, time }, ...]
}
```

All 5 doctors have real photos. Fields contain relevant medical practice information.

## Known limitations / next steps

- Sent messages and simulated replies (`replies` array in `data.js`) are entirely client-side and reset on page reload — there's no backend/persistence.
- No search/filter on the doctor list, no auth, no real video/call functionality behind those icon buttons (UI only).
- Info and thread views are stacked vertically and toggle visibility via the hide/show info button; both cannot be viewed simultaneously in the current design.

## Recent styling updates

- **Body background:** Changed from canvas to `--surface-soft` (#FBFBFA)
- **Header (topbar):** Auto height (fits content), 18px padding, align-items: start
- **Doctor cards:** 16px border-radius, #F9F9F9 background, 12px vertical padding with staggered top/bottom, 8px gap between cards
- **Active doctor card:** Blue gradient background (0deg, #5E89FF to #2D65FF), inset box-shadow for depth, column layout (same padding/gap as inactive)
- **Download button:** 40px height, 8px 12px padding, 12px border-radius, linear gradient background, 4px gap between icon and text
- **User chip:** 40px height, 4px 12px 4px 4px padding, 24px border-radius, 1px solid #EAF0FF border, rgba(255,255,255,0.20) background, 8px gap
- **Send button:** 44.8px height, 8px 26px padding, 35px border-radius, dual gradient background (dark + orange), inset shadows for depth, 10px gap
- **Composer wrapper:** 16px top padding, 18px right padding (no left), padding-bottom respects safe-area
- **Info cards:** 3 columns layout (repeat(3, 1fr)), 14px gap
- **Main scroll area:** 24px border-radius, 18px right margin, #F9F9F9 background
- **Chat list:** 0 top padding, 8px gap between items, no left padding
- **Profile head:** Flex display, space-between alignment, centered vertically, 8px gap between name and actions
- **Hide info button:** White background, no border-radius, muted gray text color, Show Info SVG icons (32px) on left/right with -2px margin overlap

## Screenshot tool note

`preview_screenshot` was intermittently flaky during development (timed out even on idle pages). When that happens, restart the preview server (`preview_stop` + `preview_start`) or fall back to DOM/computed-style checks via `preview_eval` — those reliably confirmed correctness throughout this build.
