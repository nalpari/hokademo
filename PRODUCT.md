# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Scope history

The original ask was a design mockup only: "우선 디자인 시안만 html 형식으로 docs/design 폴더에 생성해줘" — note 우선, "for now". That constraint was real and this file recorded it.

The user then widened it in a separate request ("이 디자인 시안을 기반으로 모바일 웹을 구현해줘") and specified the new scope across six rounds of structured questions on 2026-09-04: a Next.js shopping flow, five surfaces, cart and wishlist persisting in localStorage, working search, the full 354-product catalogue, and hand-written CSS over Tailwind. The mockup was not superseded — it remains the record of the approved comp round and is kept current with the implementation's defect fixes.

Any future narrowing or widening belongs here, with who asked and when. Do not edit this section to match a build.

## Stack

Next.js 16 App Router with React 19, hand-written CSS (CSS Modules plus one global sheet); Tailwind is installed but unused by decision. Five surfaces: home, catalogue listing, product detail, cart, search, plus a wishlist. The original design mockup lives on at `docs/design/hoka-mobile-home.html` as the record of the approved comp round; it is not part of the app.

Product data is a committed scrape snapshot at `src/data/catalog.json` (354 products, taken 2026-09-04). Product imagery is not committed: `next/image` proxies the Naver CDN via `remotePatterns`. The scrape script is deliberately not in the repo.

## Users

Korean runners and running-crew members shopping HOKA on a phone. Two situations dominate:

- **Decided buyer**: knows the franchise (스피드고트, 클리프톤, 본다이, 마하), needs size/width (와이드 sizing is a recurring HOKA concern) and the current discount. Wants to reach the product fast.
- **Community-adjacent browser**: follows HOKA through races and crew runs (트랜스제주 by UTMB, JTBC 서울마라톤, HRC 쉐이크아웃 런) and arrives from campaign content rather than from search.

Both browse in Korean, on a phone, often one-handed.

## Product Purpose

A mobile storefront for HOKA Korea that sells performance running footwear while carrying HOKA's running-community identity. Success is a visitor understanding within one viewport what HOKA is running right now (campaign or discount) and reaching a product page without hunting.

## Positioning

HOKA's claim is engineered running geometry, not fashion: maximal cushioning with specific, verifiable technical content per model. Confirmed examples from the live store:

- SPEEDGOAT 6: Vibram® Megagrip outsole, 5mm lugs, trail traction.
- Tecton X 2: carbon-plated trail racing shoe.
- Wide (와이드) variants are a first-class product axis, not an afterthought.

The community layer is real and evidenced (see Evidence), not marketing atmosphere. A generic fashion-commerce storefront could not truthfully carry either half.

## Operating Context

Reference IA taken from the live 호카코리아 Naver brand store and the SPAO mobile storefront the user named as a structural reference:

- HOKA Naver store nav: WHAT'S NEW?, 쇼핑라이브, 베스트, 전체상품, 아울렛, 남성, 여성, 키즈, 카테고리, 컬렉션, APMA Orthopedic 컬렉션.
- SPAO mobile nav: gender/segment tabs (우먼 / 맨 / 키즈 / 컬래버레이션), hamburger 카테고리, and a utility row of 검색 / 찜하기 / 마이 / 장바구니.
- Korean commerce price convention: list price struck through, discount percentage, final price, then rating with review count.
- Product naming convention on the store: `호카 [남성|여성|공용] <모델명> [와이드] <품번>-<컬러코드>`.

## Capabilities and Constraints

- Mobile-first. The design target is a phone viewport; the reference sites are both phone-first storefronts.
- Cart and wishlist persist in `localStorage` and are real. Search is a client-side filter over the catalogue. There is no auth and no checkout: the order button reports that payment is not connected.
- Product photography comes from the live Naver CDN (`shop-phinf.pstatic.net`); the hero campaign photograph is generated. This split was the user's decision.
- Two deliberate product-image treatments: the home board shows cut-outs on the dark ground (editorial), catalogue surfaces show the store's own photography on its light ground (catalogue). Cut-outs are committed under `public/cutouts/` and named by product id.
- Korean copy throughout.
- **Undecided:** whether this ever becomes a real storefront, and on what commerce platform. Nothing here should assume one.

## Brand Commitments

- Name: HOKA (Korean store name 호카코리아).
- Global brand message currently running: **TOGETHER WE FLY HIGHER** (Korean: 함께일 때, 더 높이).
- Campaign line currently running for SPEEDGOAT 6: "Trail has only one GOAT." / 트레일에는 단 하나의 GOAT.
- Logo asset in use on the store: `HOKA_Logo_white.png` on the Naver CDN.
- User-pinned for this surface: HOKA performance identity leads (dark base, HOKA signature color accent), SPAO's commerce IA supplies the structure.

## Evidence on Hand

**`src/data/catalog.json` is the authority for every product fact and supersedes the itemised list that used to live here.** It holds all 354 products with, per product: name, product code, list price, sale price, discount percentage, average rating and review count, per-size stock by colourway, gallery image URLs, the store's own Korean description, and the delivery policy. Judge any product claim on the page against that file, not against this section.

Three different real orderings exist on this store and they do not agree. The repo records two of them, under distinct names, because conflating them once already put wrong numbers on the page:

- `bestRank` (1-20, null outside): the store's own 베스트 board, scraped from `/hoka/best`. This is what the home board displays and the only thing that may be labelled "N위".
- `saleRank`: position in `categories/ALL?sortType=TOTALSALE`. A sort index, not a ranking. Never label it 위.
- `sortType=POPULAR` yields a third order; unused.

Facts confirmed from the live store on 2026-09-04 that are *not* in the catalogue file:

- **Store scale:** 관심고객수 389,247.
- **Catalogue shape:** 354 products, of which 171 shoes, 122 apparel, 61 accessories; 125 discounted; 75 trail models by franchise name. 키즈 and 아울렛 exist as store navigation but hold zero products, which is why neither is a tab.
- **Athletes (Team HOKA), with real results:** 고민철 (제주 100마일 초대 챔피언, 16:55:51, Tecton X 2), 김지수 (제주 70K 5:36:54, 전체 4위), 이병도 (2025 JTBC 서울마라톤 풀 02:29:16), 박소영 (같은 대회 풀 03:09:18).
- **Global ambassadors:** 파리 기반 러닝 크루 POWERUP — 루디 트로빌랑 (제주 20K 우승), 영균 (연대별 1위).
- **Events/properties:** 2025 트랜스제주 by UTMB® (HOKA was official main sponsor), FLYLAB 부스, HRC 쉐이크아웃 런, 2025 JTBC 서울마라톤.
- **Retail:** 호카 롯데월드몰 잠실점.
- **Athlete footwear:** the store's story captions read "팀호카 고민철 선수 (Tecton X 2 착용)" and "팀호카 김지수 선수 (Tecton X 2 착용)". Both athletes, verbatim.
- **Absent, must not be fabricated:** member tiers, coupon mechanics, review text, store hours, checkout, and any product fact not in `catalog.json`. Stock levels and the delivery policy ARE real and live in that file.

## Product Principles

1. **Technical truth over athletic mood.** Every performance claim on the page traces to a real spec or a real result. HOKA's differentiation is measurable, so vagueness reads as a weaker product than it is.
2. **The community is evidence, not decoration.** Named runners with real times outrank stock photos of people running.
3. **Reach the product fast.** A visitor who already knows their model should not have to scroll past the campaign to buy it.
4. **Width and fit are product facts, not footnotes.** 와이드 appears in the majority of the confirmed catalog and belongs in the product surface, not buried in options.
5. **Korean commerce conventions are load-bearing.** Price/discount/rating formatting carries trust here; deviating from it to look cleaner costs credibility.

## Accessibility & Inclusion

One-handed phone use is the primary posture, so primary actions belong within thumb reach. Korean text sets at small sizes on dense commerce surfaces; body and price text must hold WCAG AA contrast on the dark ground the user pinned.
