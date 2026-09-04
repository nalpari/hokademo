---
name: HOKA Korea Mobile Storefront
description: A cool blue-black running store where the campaign owns the fold and the real ranking catches it underneath.
colors:
  ground: "#16191c"
  header: "#16181a"
  card: "#25292d"
  card-hi: "#333840"
  line: "#2a2d30"
  stroke: "#3a3d40"
  stroke-soft: "#2f3236"
  press: "#23262a"
  rule: "#26292c"
  plate: "#eceef0"
  ink: "#f4f5f5"
  ink-dim: "#9a9c9d"
  ink-mute: "#8c8f92"
  ink-body: "#cfd1d3"
  ink-off: "#7a7d81"
  on-coral: "#ffffff"
  coral: "#f8583b"
  coral-surface: "#ce4931"
  coral-ink: "#ff7b53"
  coral-press: "#b53e29"
  cyan: "#00c2c7"
typography:
  display:
    fontFamily: "Anton, 'Pretendard Variable', sans-serif"
    fontSize: "clamp(26px, 7.4vw, 34px)"
    fontWeight: 400
    lineHeight: 0.94
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "'Pretendard Variable', Pretendard, -apple-system, system-ui, sans-serif"
    fontSize: "clamp(20px, 5.6vw, 26px)"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.05em"
  title:
    fontFamily: "'Pretendard Variable', Pretendard, -apple-system, system-ui, sans-serif"
    fontSize: "clamp(13px, 3.7vw, 16px)"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "-0.045em"
  price:
    fontFamily: "'Pretendard Variable', Pretendard, -apple-system, system-ui, sans-serif"
    fontSize: "clamp(15px, 4.3vw, 19px)"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.04em"
  label:
    fontFamily: "'Pretendard Variable', Pretendard, -apple-system, system-ui, sans-serif"
    fontSize: "clamp(12px, 3.3vw, 14px)"
    fontWeight: 500
    lineHeight: 1.6
    letterSpacing: "-0.03em"
  micro:
    fontFamily: "'Pretendard Variable', Pretendard, -apple-system, system-ui, sans-serif"
    fontSize: "clamp(11px, 3vw, 12px)"
    fontWeight: 500
    lineHeight: 1.65
    letterSpacing: "-0.03em"
rounded:
  thumb: "10px"
  field: "12px"
  surface: "14px"
  surface-lg: "18px"
  pill: "99px"
spacing:
  gutter: "clamp(14px, 4vw, 22px)"
  tile-gap: "clamp(9px, 2.6vw, 14px)"
  head-gap: "clamp(13px, 3.6vw, 18px)"
  section: "clamp(30px, 8vw, 44px)"
  band: "clamp(34px, 9vw, 52px)"
  dock: "62px"
components:
  button-primary:
    backgroundColor: "{colors.coral}"
    textColor: "{colors.on-coral}"
    typography: "{typography.title}"
    rounded: "{rounded.pill}"
    height: "50px"
    width: "100%"
  button-primary-active:
    backgroundColor: "{colors.coral-press}"
  button-primary-disabled:
    backgroundColor: "{colors.press}"
    textColor: "{colors.ink-mute}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    rounded: "{rounded.pill}"
    height: "50px"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.ink-dim}"
    typography: "{typography.micro}"
    rounded: "{rounded.pill}"
    padding: "6px 13px"
    height: "34px"
  chip-selected:
    textColor: "{colors.ink}"
  card-product:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.surface}"
    padding: "10px 11px 13px"
  input-search:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    rounded: "{rounded.field}"
    padding: "0 12px"
    height: "46px"
  size-swatch:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.surface}"
    padding: "6px 4px"
    height: "46px"
  nav-dock:
    backgroundColor: "rgba(18, 20, 22, 0.94)"
    textColor: "{colors.ink-mute}"
    height: "62px"
  campaign-band:
    backgroundColor: "{colors.coral-surface}"
    textColor: "{colors.on-coral}"
    typography: "{typography.display}"
    padding: "clamp(24px, 6.4vw, 34px) clamp(14px, 4vw, 22px) 0"
---

# Design System: HOKA Korea Mobile Storefront

<!-- Recorded from the shipped build on 2026-09-04. Two artifacts share this system:
     `docs/design/hoka-mobile-home.html` (the approved comp round, one screen) and
     `src/` (the Next.js 16 App Router implementation, five surfaces plus a wishlist).
     This document discharges the FINISH line of
     `.impeccable/surfaces/docs-design-hoka-mobile-home-html.md`. -->

## Overview

**Creative North Star: "The Night Ridge"**

A HOKA store read at 6am in the dark, one-handed. The ground is a cool blue-black slate rather than a neutral charcoal, so the shoes sitting on it read as objects lit from above, not as thumbnails floating in a void. The campaign photograph owns the whole first viewport and dissolves into that ground through a gradient; the store's real bestseller board catches the eye immediately underneath. Nothing above the fold asks the visitor to shop before it has told them what HOKA is running right now.

Density is Korean commerce density: struck-through list price, discount percent, final price, rating with review count, all inside a tile that fits two-up on a phone. That convention is load-bearing and the system does not thin it out to look cleaner. Around it, the surfaces are quiet — hairline dividers, flat tonal surfaces, one accent colour with one job each, and a second accent that appears only where a number is a measured fact.

The accent discipline is the part that was hardest to arrive at and is easiest to undo. HOKA's brand coral fails WCAG AA in both text roles on this ground, so it split into three tokens by job. Any future surface that reaches for "the coral" and picks the wrong one puts unreadable text on the page and the split will look like redundancy rather than the measurement it is.

**Key Characteristics:**
- Cool blue-black ground (#16191c), never warm charcoal
- Three coral tokens split by contrast job; brand coral never sets text
- Cyan reserved for measured data — board rank and race clocks
- Anton for Latin display only, Pretendard Variable for every Korean string
- Tonal depth: ground → card → card-hi, with no surface shadows
- Two deliberate product-image treatments: editorial cut-outs, catalogue photography
- One orchestrated arrival on the home hero; every other motion is feedback

## Colors

A cool blue-black world with a single warm accent split three ways by contrast job, and a cyan that only ever carries a number.

### Primary

- **Signal Coral** (`{colors.coral}`): the brand coral, used as **fills and marks only** — the active tab underline, the focus ring, the filled wish heart, `::selection`, the cart badge, the focused search-field border, and the selected size swatch's border and 12%-alpha wash. It never sets text and never sits behind white text.
- **Coral Surface** (`{colors.coral-surface}`): coral as a *background carrying white text* (4.54:1). This is the campaign band's ground and the hero CTA pill.
- **Coral Ink** (`{colors.coral-ink}`): coral as *text on the dark grounds* (5.73:1 on card, 4.61:1 on card-hi — the tile gradient's lightest stop — and 6.90:1 on the page ground). Discount percentages, sale prices, the cart's grand total, the low-stock note under a size, the small rating star.
- **Coral Press** (`{colors.coral-press}`): the pressed state of any coral fill. Appears only under `:active`.
- **On Coral** (`{colors.on-coral}`): pure white, and only on a coral surface. This is a measured exception, not drift: Bone on `{colors.coral-surface}` reads 4.16:1 and fails AA, pure white reads 4.54:1 and passes. Nothing else in the system uses pure white.

### Secondary

- **Instrument Cyan** (`{colors.cyan}`): board rank numerals on the editorial tiles, race clocks in the team-results list, and the cart's free-shipping nudge (at 10% alpha as its plate). It is a data register, not an action colour.

### Neutral

- **Ridge Black** (`{colors.ground}`): the page ground for every surface.
- **Header Black** (`{colors.header}`): the sticky masthead, one step darker than the ground so the chrome sits behind the page rather than on it.
- **Slate Card** (`{colors.card}`): every raised surface — product tiles, the description block, the search field, skeletons. A cool slate lifted clear of the ground, not a flat grey.
- **Slate Lift** (`{colors.card-hi}`): the lightest stop of the editorial tile's radial gradient and the skeleton shimmer's bright band. Never used as a flat fill.
- **Hairline** (`{colors.line}`): every divider — list rows, section rules, the dock's top edge.
- **Stroke** (`{colors.stroke}`): the resting border of every outlined control — chips, size swatches, the ghost button, the quantity stepper.
- **Stroke Soft** (`{colors.stroke-soft}`): the quieter resting border of the search field.
- **Press** (`{colors.press}`): the fill a control takes when pressed, and the ground a disabled primary button sinks to.
- **Rule** (`{colors.rule}`): the footer's top edge, a hair lighter than Hairline.
- **Bone** (`{colors.ink}`): primary text.
- **Dim** (`{colors.ink-dim}`): secondary text — inactive tabs, meta lines, "전체보기" links, empty-state body.
- **Mute** (`{colors.ink-mute}`): struck-through list prices, dock labels at rest (5.63:1), and the label of a disabled primary button (4.67:1 on Press).
- **Body** (`{colors.ink-body}`): running copy on a card — the product description. Brighter than Dim metadata, quieter than Bone headings (9.57:1 on card).
- **Off** (`{colors.ink-off}`): the text of a disabled control, chiefly a sold-out size. Held at 3.54:1: still reads as disabled, still readable, because a sold-out size is information a buyer needs to rule the size out.
- **Photo Plate** (`{colors.plate}`): the light backing behind the store's own product photography inside catalogue image frames, PDP gallery slides, and cart thumbnails. It is a plate inside a frame, never a page background.

### Named Rules

**The Coral Splits By Job Rule.** The brand coral holds AA in neither text role, so it is three tokens: `{colors.coral}` fills and marks, `{colors.coral-surface}` behind white text, `{colors.coral-ink}` as text on dark. Reaching for "the coral" without naming the job puts unreadable text on the page.

**The Cyan Is Data Rule.** Cyan appears only where the value is a measured fact — a board rank, a finish time, a shipping threshold. It is never an action, a decoration, or a second brand colour.

**The White Is Coral-Only Rule.** Pure white appears on coral surfaces and nowhere else — the campaign band, the primary button, the hero CTA, the cart badge. It is there because it is the only value that holds AA against `{colors.coral-surface}`. Softening it to Bone breaks the band and the CTA; using it anywhere off coral breaks the world.

**The Two Grounds Rule.** The app ground is dark. `{colors.plate}` is light and exists only inside an image frame, where the store's own photography lands on its own white backdrop. A light region anywhere outside an image frame is a defect.

## Typography

**Display Font:** Anton (loaded via `next/font/google` as `--font-anton`, exposed as `--display`, falling back to Pretendard Variable)
**Body Font:** Pretendard Variable (`--kr`, with Pretendard, `-apple-system`, `BlinkMacSystemFont`, `system-ui`, sans-serif behind it)

**Character:** A single condensed Latin voice used sparingly and loudly against a Korean UI sans that stays neutral and tight. Anton says the campaign line; Pretendard says everything the visitor has to read to buy.

### Hierarchy

- **Display** (Anton 400, `{typography.display}`, line-height 0.94, uppercase): the campaign band headline and the rank numerals. On the home hero it is comp-locked instead (see Layout).
- **Headline** (800, `{typography.headline}`, tracking -0.05em): section heads — 베스트, 팀호카의 기록.
- **Title** (600–700, `{typography.title}`, line-height 1.32–1.35, tracking -0.045em): product names (clamped to two lines), tab labels, buttons, masthead titles, the search input, empty-state headings.
- **Price** (800, `{typography.price}`, tracking -0.04em): the price cluster and the cart grand total. The PDP price steps up to `clamp(21px, 6vw, 26px)`.
- **Label** (500–600, `{typography.label}`, tracking -0.03em): meta rows, counts, chips, delivery values, cart line totals.
- **Micro** (500–600, `{typography.micro}`, tracking -0.03em): ratings, review counts, struck list prices, option labels, footer copy, dock labels (10.5px, the one fixed size below the ramp).

### Named Rules

**The One Latin Voice Rule.** Anton sets Latin display strings only: the hero headline, the campaign band headline, the rank numerals. Every Korean string sets in Pretendard — including the 위 suffix beside a rank numeral, which drops back to `--kr` at 0.36em inside an Anton parent.

**The Tight Korean Rule.** Korean tracking is always negative and scales with size: -0.02em at micro, -0.03em through label and body, -0.04em at price and title, -0.05em at headline. Default tracking on Korean reads loose and unfinished here.

**The Measured Cap Rule.** Anton's real cap-height ratio is 0.795, not the 0.70 a naive matcher estimates. The hero headline is set at 161 comp-units for that reason. Size Anton against a measured cap height, never against an estimate.

**The Tabular Number Rule.** Any figure a visitor compares down a column — race clocks, cart quantities, cart totals — sets `font-variant-numeric: tabular-nums`.

## Layout

One column, phone-first, gutter `{spacing.gutter}`. Sections separate by `{spacing.section}` of top padding rather than by rules or backgrounds; the campaign band opens wider at `{spacing.band}`. Product grids are two-up (`repeat(2, 1fr)`) at `{spacing.tile-gap}`; horizontal rails use the same gap with `scroll-snap-type: x mandatory`, `scroll-padding-inline-start` matched to the gutter, and hidden scrollbars. The home's editorial board runs a full-width lead tile (`grid-column: 1 / -1`, 16:10 plate) over two square tiles.

Chrome sits at three fixed levels: the masthead is sticky at the top (z-index 20), the dock is fixed to the bottom (z-index 30, height 62px plus `env(safe-area-inset-bottom)`, hidden until the home's hero is passed), and per-surface action bars are sticky at `calc(var(--dock-h) + env(safe-area-inset-bottom) + 10px)` (z-index 10) so the primary action never hides behind the dock. The page shell reserves `calc(var(--dock-h) + env(safe-area-inset-bottom) + 12px)` at its foot.

**The comp-locked hero.** The home hero is the one block that keeps the approved comp's measured geometry, through a proportional unit `--u: calc(100vw / 1024)` — 1024 comp px equals the viewport width. Inside `.hero` every number (height 1909u, photo 860u, headline at 45u/862u, CTA 333×99u, rank rail at 1595u with 24u gutters) was measured off `.impeccable/mocks/home-approved.png`. The mockup at `docs/design/hoka-mobile-home.html` extends `--u` to `:root` and holds the whole screen that way, because its job is to be the record of the approved comp. **The implementation does not.** Everything below the hero and every other surface uses the clamp-based scale.

### Named Rules

**The Comp Unit Rule.** `--u` is scoped to the home hero. New surfaces, new sections, and new components use the clamp tokens. A `calc(N * var(--u))` outside `.hero` in `src/` is a bug, not a style.

**The Thumb Rule.** Every touch target clears 44px even when its ink is smaller — via the `.tap` grid helper, an invisible `::after` extender (the comp-locked CTA), or explicit `min-height`. Primary actions stick above the dock, inside thumb reach.

**The Dock Clears The Fold Rule.** The bottom dock never covers the home's first viewport. That viewport's composition ends on the rank card breaking the bottom edge, and a fixed bar over it destroys the one thing the comp round approved — measured at 390×844, an always-present dock covered 54px of the rank card. Both artifacts start the dock hidden on the home and raise it once the hero has been scrolled past, via `IntersectionObserver` (`rootMargin: "-40% 0px 0px 0px"` in the implementation), never a scroll listener. `.shell`'s `padding-bottom` reserves space at the document end; it does nothing against a `position: fixed` element sitting over the fold.

## Elevation & Depth

This system is tonally layered and shadow-free at the surface level. Depth is a lightness step — `{colors.ground}` → `{colors.card}` → `{colors.card-hi}` — plus 1px hairlines. No product tile, chip, button, or panel carries a `box-shadow`. The only shadows in the build belong to *objects*, not to surfaces: the contact shadow under a background-removed shoe cut-out. The dock is the single exception to flatness, and it separates by translucency and blur rather than by a shadow.

### Shadow Vocabulary

- **Cut-out contact** (`filter: drop-shadow(0 6px 10px rgba(0, 0, 0, 0.55))`): under a shoe cut-out on an editorial tile. It shadows the shoe's silhouette, not its box.
- **Hero cut-out contact** (`filter: drop-shadow(0 calc(10 * var(--u)) calc(14 * var(--u)) rgba(0, 0, 0, 0.5))`): the same device at comp scale inside the hero rank rail.
- **Rank card lip** (`box-shadow: 0 calc(-2 * var(--u)) 0 rgba(255, 255, 255, 0.06) inset`): a 2-unit inset highlight along the hero rank card's bottom edge. A light lip, not a drop shadow.
- **Glass chrome** (`background: rgba(18, 20, 22, 0.94); backdrop-filter: blur(14px)` for the dock; `rgba(20, 22, 24, 0.5)` with `blur(6px)` for the wish button): translucency as separation.

### Named Rules

**The Disabled Sinks Rule.** A disabled control reads disabled by sinking below the surface, not by fading its label out of legibility — its label is usually the explanation for why it is disabled ("품절", "사이즈를 선택하세요"). The disabled primary drops to `{colors.press}` at 4.67:1; a sold-out size keeps `{colors.ink-off}` at 3.54:1.

**The Tonal Step Rule.** To raise a surface, step its lightness — do not add a shadow. `{colors.card}` on `{colors.ground}`, `{colors.card-hi}` as the tile gradient's lightest stop.

**The Shadow Belongs To The Object Rule.** The only real shadows fall from cut-out product silhouettes. A rectangular drop shadow under a tile, a card, or a panel is out of world.

## Shapes

Soft-rectangular surfaces and fully round actions. Surfaces take `{rounded.surface}` (product tiles, the PDP description block, size swatches, skeletons), stepping to `{rounded.surface-lg}` where a larger panel needs it; cart thumbnails take `{rounded.thumb}` and the search field `{rounded.field}`. Anything the visitor acts on is a pill: buttons, chips, the quantity stepper, the wish button, the cart badge, the hero CTA. The hero rank card carries a 32-unit comp-locked radius that lands in the same family at phone width.

Borders are 1px and do one of two things: hairline dividers in `{colors.line}`, or a resting control outline in `{colors.stroke}` that switches to `{colors.ink}` when the control is selected (chips, size swatches) or to `{colors.coral}` when it is a live focus or an active choice (search field, selected size). Product image frames are square (1:1) except the lead editorial tile (16:10) and PDP gallery slides (750:974). The focus ring is a 2px `{colors.coral}` outline at 2px offset, applied globally on `:focus-visible`; it carries no radius of its own and follows the element it rings.

## Components

### Buttons

- **Shape:** fully round (`{rounded.pill}`), full-bleed inside the gutter, 50px minimum height.
- **Primary:** `{colors.coral}` fill under white title text. The one high-commitment action per surface — 장바구니 담기, 주문하기.
- **Active:** scales to 0.985 and darkens to `{colors.coral-press}` over 0.18s.
- **Disabled:** sinks to `{colors.press}` and keeps its label in `{colors.ink-mute}` (4.67:1), `cursor: not-allowed`. Used when no size is chosen or the product is sold out — the label is the reason, so it stays readable.
- **Ghost:** transparent with a `{colors.stroke}` 1px border and bone text; darkens to `{colors.press}` on press. The secondary of a paired action row.
- **Hero CTA:** the comp-locked exception — `{colors.coral-surface}` rather than `{colors.coral}`, because it carries white text at display size.

### Chips

- **Style:** pill, transparent, 1px `{colors.stroke}` border, dim micro text, 34–38px tall, horizontally scrollable in a hidden-scrollbar row.
- **State:** selected chips switch border and text to `{colors.ink}` — no fill change. Filter chips carry `aria-current`; option chips carry `aria-pressed`.

### Cards / Containers

- **Corner Style:** `{rounded.surface}`, clipped (`overflow: hidden`).
- **Background:** `{colors.card}`, with the image frame filled by `{colors.plate}` on catalogue tiles and by a radial `{colors.card-hi}` → `{colors.card}` gradient on editorial tiles.
- **Shadow Strategy:** none — see Elevation & Depth.
- **Internal Padding:** `10px 11px 13px` in the meta block.
- **Press:** scales to 0.985 over 0.2s on the whole tile.
- **Sold out:** a full-frame `rgba(14, 16, 18, 0.62)` scrim with centred 품절 in bone.

### Inputs / Fields

- **Style:** `{colors.card}` fill, 1px `{colors.stroke-soft}` border, `{rounded.field}`, 46px tall, leading dim search glyph and a trailing clear button.
- **Focus:** the container border switches to `{colors.coral}` on `:focus-within`; the input itself drops its own outline.
- **Size swatches:** a `minmax(88px, 1fr)` auto-fill grid; resting `{colors.stroke}` border, selected `{colors.coral}` border over a 12%-alpha coral wash, out-of-stock struck through in `{colors.ink-off}` and disabled. A low-stock count sets beneath in 10px `{colors.coral-ink}`.

### Navigation

- **Masthead:** sticky, `{colors.header}`, wordmark left and three utility icons right; secondary surfaces swap the wordmark for a back arrow and a centred title. The cart icon carries a `{colors.coral}` pill badge that renders only once client state is hydrated (`ready && count > 0`), capping at 99+.
- **Tabs:** a horizontally scrollable row of title-size labels; inactive dim at 600, active bone at 700 with a 2px `{colors.coral}` underline pinned to the row's bottom edge.
- **Dock:** fixed five-column bar, glass ground, 1px `{colors.line}` top border, 20px icons over 10.5px labels, dim by default and bone at `aria-current`, pressing to 0.94 scale. Presence follows the route rather than a DOM probe, so there is no first-paint flash: surfaces without a hero show it immediately, and the home starts it hidden — translated down, `visibility: hidden`, `aria-hidden="true"`, links at `tabIndex={-1}` — then raises it over 0.32s once the hero is passed. Hidden means out of the accessibility tree and the tab order, not merely off-screen.
- **Icons:** one hand-drawn stroke family — 24×24 viewBox, `currentColor`, 1.7 stroke width, round caps and joins. The heart is the only icon that fills, and only to `{colors.coral}` when wished.

### The Price Cluster

The signature commerce unit, identical on every surface: discount percent in `{colors.coral-ink}`, final price in bone at price weight, struck list price in `{colors.ink-mute}` at micro — baseline-aligned, wrapping as a group. Below it, an optional rating line: a small `{colors.coral-ink}` star, the score in bone at 700, the review count in dim parentheses. Korean commerce convention drives the order; do not reorder it for visual balance.

### The Editorial Tile

The home board's product tile. A background-removed cut-out at 86% width (62% on the lead tile) floats on a radial `{colors.card-hi}` → `{colors.card}` gradient with a contact shadow, and the board position sets in Anton at `clamp(19px, 5.4vw, 26px)` in `{colors.cyan}` at the top-left, with a Pretendard 위 superscript. Cut-outs live in `public/cutouts/` named by Naver product id.

**The Rank Vocabulary Rule.** Only `bestRank` — the store's own 베스트 board position — may be rendered with 위. `saleRank` is a sort index and must never be labelled as a rank. Conflating them once put wrong numbers on the page; `src/lib/catalog.test.mjs` now guards it.

### Motion

One orchestrated arrival exists in the whole system, on the home hero, entirely inside `@media (prefers-reduced-motion: no-preference)` so content is visible by default rather than hidden and then revealed: the photograph settles from 1.05 scale over 1.4s while headline lines, subline, CTA, and rank card rise 34 units and fade in at 0.08s / 0.17s / 0.29s / 0.38s / 0.48s. Everything else is feedback only — 0.18–0.2s press scales on tiles, buttons, and dock items, and a 1.3s linear shimmer on cart skeletons. All of it runs on `cubic-bezier(0.16, 1, 0.3, 1)`, and a global `prefers-reduced-motion: reduce` block clamps every animation and transition to 0.01ms.

**The One Arrival Rule.** A surface gets at most one orchestrated entrance, and it belongs to the campaign. Every other motion responds to a touch.

## Do's and Don'ts

### Do:

- **Do** pick the coral token by job: `{colors.coral}` for a fill or a mark, `{colors.coral-surface}` under white text, `{colors.coral-ink}` for coral text on a dark ground.
- **Do** derive a translucent tint from its own token (`color-mix(in srgb, var(--on-coral) 42%, transparent)`) rather than writing an `rgba()` literal.
- **Do** make a disabled control sink rather than fade — `{colors.press}` ground, label in `{colors.ink-mute}`, never below legibility.
- **Do** keep cyan for measured data — board rank, race clock, shipping threshold — and nothing else.
- **Do** build depth by stepping tone (`{colors.ground}` → `{colors.card}` → `{colors.card-hi}`) and dividing with 1px `{colors.line}` hairlines.
- **Do** set Latin display in Anton and every Korean string in Pretendard Variable, including the 위 beside an Anton numeral.
- **Do** carry negative Korean tracking at every size, -0.02em to -0.05em as size grows.
- **Do** keep the Korean price convention intact: discount percent, final price, struck list price, then rating with review count.
- **Do** give every touch target 44px, and stick primary actions above the dock at `calc(var(--dock-h) + env(safe-area-inset-bottom) + 10px)`.
- **Do** use the two image treatments deliberately: cut-outs on the dark ground for editorial placements, the store's own photography on `{colors.plate}` for catalogue placements.
- **Do** gate arrival animation behind `prefers-reduced-motion: no-preference`, so the reduced-motion default is visible content rather than hidden content.
- **Do** label a rank with 위 only when the value is `bestRank`.

### Don't:

- **Don't** set `{colors.coral}` as text on the dark ground or as a background under white text. It fails AA in both roles; that is why three tokens exist.
- **Don't** put a `box-shadow` under a tile, card, chip, or panel. The only shadows fall from product cut-out silhouettes.
- **Don't** use `--u` or `calc(N * var(--u))` outside the home hero in `src/`. New work uses the clamp scale.
- **Don't** let `{colors.plate}` (or any light fill) escape an image frame onto a page background.
- **Don't** use pure white off a coral surface, and don't soften the white that is on one — 4.54:1 is the whole reason it is white.
- **Don't** treat cyan as a second action colour or a decorative accent.
- **Don't** label `saleRank` — or any sort index — with 위.
- **Don't** hide content behind an entrance animation, and don't add a second orchestrated arrival to a surface.
- **Don't** let the dock cover the home's first viewport, and don't drive its arrival with a scroll listener — both artifacts observe the hero with an `IntersectionObserver`.
- **Don't** thin out the Korean commerce price/rating block to make a tile look cleaner.
