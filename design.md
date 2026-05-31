# Kingston Beta Art Bible

Source of truth: `reference-source.png` and the Cloudinary reference image supplied on May 30, 2026.

This document describes the visual DNA visible in the reference. It is not a generic design system. Future implementation must preserve the reference's composition, rhythm, hierarchy, atmosphere, and editorial behavior.

## Brand Essence

Kingston Beta is a Jamaican technology community presented as a premium cultural platform. The brand is not speaking like a software company; it is speaking like a confident civic movement.

Core idea: building Kingston's tech future together.

Brand personality:
- Community-first.
- Optimistic and organized.
- Jamaican, modern, and culturally grounded.
- Editorial rather than promotional.
- Premium without feeling distant.
- Tech-forward without looking like a dashboard.

## Emotional Tone

The reference feels bright, precise, warm, and aspirational. It combines calm ivory space with energetic lime-green accents and serious black typography. The emotional result is momentum without noise.

The mood should be:
- Clean but not sterile.
- Bold but not aggressive.
- Cultural but not decorative.
- Human but not casual.
- Premium but approachable.

## Visual Philosophy

The design is built on contrast:
- Huge typography against generous empty space.
- Rigid navigation against organic image masks.
- Human photography inside abstract brand-letter geometry.
- Soft ivory atmosphere against saturated lime geometry.
- Editorial restraint against a bold message.

The page should feel like a designed poster that became interactive, not like assembled website sections.

## Layout Philosophy

The layout is asymmetrical and horizontally composed. The left side carries message, navigation rail, and CTA. The right side carries visual identity through a large abstract `K` image collage.

Primary layout zones:
- Top navigation band across the full width.
- Narrow left utility rail with hamburger icon, vertical slogan, and dotted accents.
- Large left editorial message block.
- Right visual collage dominated by a giant abstract `K`.
- Bottom stats band spanning the lower center/right.

## Composition System

The composition uses a poster-like grid with deliberate imbalance.

Key relationships:
- The logo sits in the upper-left quadrant but not at the extreme edge; it is anchored after the hamburger rail.
- The active navigation tab is a vertical lime rectangle that descends from the top edge.
- The headline begins below a short lime horizontal rule and occupies roughly the left-center mass.
- Supporting copy is placed to the right of the headline block, not under it, creating a small editorial sidebar.
- The giant `K` collage begins near the upper middle and extends past the right edge.
- The stats strip sits low and wide, almost like a translucent editorial caption band.

## Hero Composition Breakdown

The hero is the entire first viewport.

Visible hero components:
- Top-left hamburger icon in lime.
- Thin vertical divider after the hamburger column.
- Kingston Beta logo in the header.
- Centered horizontal nav with dot separators.
- Active `HOME` tab as a lime vertical block.
- Three social square buttons at top right.
- Short lime rule above the headline.
- Massive stacked headline: `BUILDING / KINGSTON'S / TECH FUTURE, / TOGETHER.`
- First two lines in near-black; last two lines in lime.
- Small supporting copy block: `We connect, empower, and grow Jamaica's digital community.`
- Two CTAs aligned below the headline: filled lime primary and outlined secondary.
- Left vertical rail text: `START. CONNECT. GROW.`
- Right-side abstract `K` composition made from photo and lime panels.
- Dotted lime matrix near upper right and lower left.
- Bottom translucent stats band with four stat groups.

## Color System

Use only the visible brand relationships from the reference.

Core palette:
- Ivory background: `#FAFAF7`
- Warm surface wash: `#F4F2EC`
- Lime brand field: `#A6CE39`
- Deeper green icon/detail color: `#1F7A3A`
- Red logo/accent dot: `#E63946`
- Headline black: `#081316` to `#101A1C`
- Body text: `#1A1A1A`
- Muted text: `#4B4B4B`
- Fine dividers: `rgba(0,0,0,0.08)`

Color behavior:
- Ivory dominates at least 60 percent of the first viewport.
- Lime is used as the main energetic signal: active nav tab, headline emphasis, CTAs, abstract geometry, dots, icons, stat numbers.
- Black carries authority through the headline and nav text.
- Red is only a dot-level accent, mostly inherited from the logo or used as a precise marker.
- Do not introduce gradients that shift the palette into neon, blue, purple, or dark-mode territory.

## Typography System

The reference uses a very condensed, heavy, uppercase display face for the main headline. It is tall, narrow, and architectural. The letterforms feel poster-like and almost newspaper-display in their density.

Display requirements:
- Condensed sans-serif.
- All caps for hero headline.
- Extremely heavy weight.
- Tight line height.
- No playful rounding.
- No wide geometric startup face.

Recommended display choices:
- `Bebas Neue`
- `Anton`
- `Teko`
- `Oswald` at heavy weight
- A custom condensed grotesk if available

Body/navigation requirements:
- Clean sans-serif.
- Moderate tracking for nav and buttons.
- Human-scale body copy.
- Utility labels in uppercase with generous letter spacing.

## Typography Hierarchy

Hero H1:
- Largest element on the page.
- Four stacked lines.
- Width roughly 37 percent of viewport.
- Black lines first, lime lines second.
- Line height approximately 0.9.
- Must visually dominate the logo, nav, copy, CTAs, and image collage.

Supporting copy:
- Small, editorial block.
- Set to the right of headline, not centered.
- Short line length.
- Line height relaxed.

Nav:
- Uppercase or small caps feeling.
- Even spacing.
- Dot separators between items.
- Active item inverted into a lime block with white text.

Buttons:
- Uppercase label.
- Letter-spaced.
- Long horizontal proportions.
- Primary filled lime, secondary outlined lime.

Stats:
- Large lime numbers.
- Small bold labels.
- Supporting descriptions in muted text.

## Spacing Rhythm

The reference spacing is airy and intentional.

Rules:
- Preserve large negative space around headline and between left content and right collage.
- Do not crowd the top navigation; the active tab needs vertical breathing room.
- The left rail is a separate compositional lane and must not collapse into the content block.
- CTAs sit close enough to the headline to belong to it, but with clear margin below the final headline line.
- Stats band is separated from the hero by a lower field of ivory space; it should not touch CTAs.

Approximate rhythm:
- Header height: 90-110px.
- Left rail width: 70-110px.
- Logo offset from left rail: 40-60px.
- Hero headline starts around 18-23 percent from top.
- Bottom stats band begins around 82-86 percent of viewport height.

## Grid Logic

Use a layered grid rather than a simple centered container.

Recommended grid:
- 12-column desktop base.
- Column 1: left utility rail.
- Columns 2-5: hero headline.
- Columns 5-6: support copy/CTA transition zone.
- Columns 7-12: abstract `K` collage.
- Bottom stats strip spans columns 2-11.

Do not use equal-width two-column layout. The reference is not a standard split hero.

## Image Treatment

Photography is embedded inside abstract brand-letter geometry.

Image characteristics:
- Human faces and work moments.
- Warm indoor light mixed with Jamaican outdoor/city context.
- Cropped tightly enough to feel editorial.
- Contained within tall rounded/angled mask fragments.
- Combined with a Kingston city/mountain view in the central right mask.

Image masks:
- Tall rounded vertical capsule for the left stroke of the `K`.
- Angled inner mask for the city image.
- Right mask for a smiling community portrait.
- Lime geometric pieces complete the `K` shape.

Do not place rectangular photos in standard cards.

## Shape Language

The shape system comes from the Kingston Beta mark and the giant abstract `K`.

Primary shapes:
- Vertical active nav block.
- Long horizontal CTA rectangles with slight radius.
- Tall rounded capsules.
- Sharp diagonal white cuts.
- Large lime diagonal wedge on the far right.
- Rounded lime fragments inside the `K`.
- Small dot matrices.

Corners:
- Buttons and stat band have subtle radius, not pill-heavy SaaS rounding.
- Image masks use large rounded edges because they are part of the abstract letterform.

## Community Storytelling Principles

The community story is not told through generic "networking" language. It is told through:
- People working at laptops.
- Smiling side conversations.
- Kingston/Jamaica landscape and city context.
- Stat proof framed as community impact.
- Direct language: connect, empower, grow.

Photography should show:
- Jamaican and Caribbean people.
- Builders, founders, students, organizers, designers, and developers.
- Real event energy.
- Warm confidence, not corporate posing.

## UI Language

UI elements are restrained and editorial.

Navigation:
- Clean horizontal nav.
- Dot separators.
- Active page as vertical lime tab.
- Social links as square lime buttons with white icons.

Buttons:
- Primary: filled lime block with white text and right arrow.
- Secondary: ivory/transparent with lime border and lime arrow.
- Buttons are long and low, not bulky.

Stats:
- Soft translucent ivory panel.
- Circular pale icon backgrounds.
- Vertical dividers.
- Lime numbers.
- Green line icons.

## Interaction Principles

Interactions should reinforce precision and momentum.

Allowed:
- Active nav block movement.
- CTA arrow slide by a few pixels.
- Social square color deepening.
- Image mask reveal.
- Dot drift.
- Stats count-in if restrained.

Avoid:
- Bouncy hover scaling.
- Card lift behavior.
- Dashboard microinteractions.
- Generic fade-up sequences.

## Motion Philosophy

Motion should feel like a premium editorial reveal.

The reference implies:
- Headline line reveals from masked vertical motion.
- Giant `K` image masks reveal diagonally or vertically.
- Lime active nav tab drops into place from top.
- Dotted matrices fade in softly.
- Bottom stats band glides up late in the hero sequence.

Motion is atmospheric and composed, not playful.

## GSAP Motion System

Use GSAP for timeline-level choreography.

Hero entrance order:
1. Header rule, logo, hamburger, and social buttons settle in.
2. Active lime nav tab drops from top.
3. Hero rule draws horizontally.
4. Headline lines reveal one by one from masked containers.
5. Supporting copy fades in with slight x movement.
6. CTA buttons reveal together.
7. Abstract `K` masks reveal from diagonal/vertical clips.
8. Dotted matrices fade in.
9. Stats strip rises subtly.

Preferred eases:
- `power3.out`
- `power2.out`
- `expo.out`
- `sine.out`
- `none` for scroll-tied movement

## Scroll Philosophy

The first viewport should behave like a composed editorial cover. Scrolling should continue the poster logic rather than become a generic landing page.

Scroll behavior:
- Slow parallax on image masks.
- Section transitions should preserve large type and asymmetry.
- Stats can pin briefly or remain as an anchor before next content.
- Do not over-animate every text block.

## Section Archetypes

Only derive sections from the reference language.

Allowed archetypes:
- Hero cover with giant type and abstract `K`.
- Impact stats strip.
- Programs/events editorial spread using the same lime blocks, dot separators, and condensed type.
- Community image spread using abstract masks.
- Contact/join section using the CTA language from the hero.

Do not invent SaaS feature grids, testimonial carousels, pricing sections, app dashboards, or generic blog cards.

## Responsive Philosophy

Responsive behavior must preserve the poster composition.

Desktop:
- Full composition visible.
- Left rail present.
- Giant `K` collage dominates right side.
- Stats band horizontal.

Tablet:
- Keep header and active tab.
- Keep headline dominant.
- Move support copy below or beside headline only if space requires.
- Scale `K` collage, do not replace it with ordinary images.

Mobile:
- Header condenses but keeps logo and menu.
- Active nav tab can become active menu state.
- Headline remains uppercase and condensed.
- Abstract `K` collage becomes a vertical editorial image cluster below headline.
- Stats become stacked but retain icons, lime numbers, and soft panel treatment.

## Accessibility Guidance

Accessibility must be built without flattening the design.

Rules:
- Maintain semantic navigation, heading order, buttons, and links.
- Hero headline must be real text, not baked into an image.
- Image masks require descriptive alt text when meaningful.
- Decorative dots and geometry must be hidden from assistive tech.
- Contrast: black text on ivory and white text on lime must be checked; if lime/white fails in small text, use deep forest text or increase weight/size.
- Reduced motion must disable mask sweeps, parallax, and looping drift.

## Anti-Patterns

Never introduce:
- SaaS centered hero stacks.
- Dashboard panels.
- Generic event cards.
- Dark mode hero.
- Neon gradients.
- Purple/blue tech palette.
- Glassmorphism.
- Floating app screens.
- Feature-card overload.
- Rounded blob backgrounds unrelated to the `K` mark.
- Random stock imagery unrelated to Jamaican tech community.
- Replacing the abstract `K` collage with a simple rectangular photo.

## Fidelity Preservation Rules

Future implementation must preserve:
- Ivory-dominant background.
- Large condensed uppercase headline.
- Lime emphasis on the last headline lines.
- Abstract `K` image/shape composition on the right.
- Active nav tab as a vertical lime block.
- Dot separators in navigation.
- Social squares at top right.
- Left vertical rail and slogan.
- Dotted matrices.
- Bottom translucent stats strip.
- Editorial asymmetry and negative space.

## Quality Target

The target is a high-fidelity cinematic editorial homepage that could pass as a premium brand microsite for a Jamaican tech community. It should feel art-directed, not assembled. Every implementation decision should protect the reference's poster-like hierarchy, abstract `K` identity system, restrained UI, and bright Caribbean optimism.
