# Desktop responsive verification

2026-09-07. Existing mobile styles retained; desktop starts at 1024px.

- `pnpm build`: passed, including TypeScript and 365 generated pages.
- `pnpm lint`, `pnpm exec tsc --noEmit`, `git diff --check`: passed.
- `node --test src/lib/catalog.test.mjs`: passed (354 catalog products).
- Production browser checks: 375, 768, 1023, 1024, 1280, 1440px across home,
  catalog, representative product detail, search, wishlist, cart, checkout,
  checkout success and checkout failure. All 54 route/viewport checks passed:
  no document horizontal overflow; desktop navigation toggles at 1024px;
  catalog grids retain two mobile columns and use four desktop columns.
- Mobile home at 390px before/after: header 109px, hero 727.046875px,
  document height 2779px, unchanged. Desktop DOM is hidden below the breakpoint.
- Browser interactions: available size selection, add to cart, cart navigation,
  quantity 1 → 2 and total 199,000 → 398,000 won, checkout navigation,
  unavailable payment method disabling, search “아라히” (6 results), wishlist
  persistence across navigation, trail filter (72 results).
- Visual inspection: home hero at 1024/1440px, lower home product rows/campaign/
  team results, product detail, catalog and populated cart at 1024px, populated
  checkout at 1440px. Two read-only visual reviewers passed their reviewed scope.
- Existing external payment processing was not changed or submitted. Existing
  Next image LCP suggestions are performance warnings, not runtime errors.

Local evidence: `/tmp/hoka-desktop-qa/viewport-checks.json`, `check.mjs`, and PNG
captures in the same directory. The temporary browser script requires the Orca
CLI and the production preview at `http://localhost:3201`.

Requested tool use: Relume MCP product-header6 provided layout reference;
Higgsfield MCP widescreen model options were inspected. Existing video/assets
were retained. `design-taste` and `impeccable` skills were not found in installed
skill paths, including a recheck after the user's reset; existing DESIGN.md and
frontend/visual-qa skill guidance supplied the design and verification contract.
