# Kingston Beta Implementation Master Prompt

Use this prompt when implementing the Kingston Beta website.

## Objective

Build the Kingston Beta website in React, TypeScript, Tailwind CSS, GSAP, ScrollTrigger, and `@gsap/react` while preserving the supplied reference image as the source of truth.

The goal is not to reinterpret the brand. The goal is to implement the visible visual system: ivory editorial field, condensed giant typography, lime active navigation, abstract `K` image collage, left vertical rail, dot matrices, social squares, CTA language, and soft stats strip.

## Required Stack

- React
- TypeScript
- Tailwind CSS
- GSAP
- ScrollTrigger
- `@gsap/react`
- Semantic HTML
- Responsive implementation
- Accessibility-first structure
- `prefers-reduced-motion` support

## Visual Fidelity Requirements

Preserve:
- Composition.
- Hierarchy.
- Spacing.
- Asymmetry.
- Image dominance.
- Poster-like editorial character.
- Lime/ivory/black color relationship.
- Abstract `K` shape language.
- Jamaican community technology context.

Do not implement a generic landing page.

## Architecture Guidance

Recommended component structure:
- `App`
- `Header`
- `HeroCover`
- `HeroKCollage`
- `LeftRail`
- `HeroActions`
- `ImpactStats`
- `ProgramSpread`
- `CommunitySpread`
- `JoinSection`
- `Footer`

Keep components semantic and compositional. Do not over-componentize every decorative dot or line unless doing so improves reuse and control.

## Component Structure Guidance

### Header

Must include:
- Hamburger icon at far left.
- Thin vertical divider after the hamburger region.
- Kingston Beta logo.
- Horizontal nav.
- Dot separators between nav items.
- Active `HOME` tab as a vertical lime block descending from the top edge.
- Social square buttons aligned top right.

Implementation notes:
- Header should be full-width and airy.
- Active tab should not look like a pill or ordinary button.
- Social buttons should be square lime blocks with white icons.

### HeroCover

Must include:
- Short lime horizontal rule above headline.
- Huge condensed uppercase headline.
- First two headline lines black.
- Last two headline lines lime.
- Small support copy block to the right of the headline block.
- Two horizontal CTAs below headline.
- Editorial pagination/side rail logic where applicable.

Hero copy from reference:
- `BUILDING KINGSTON'S TECH FUTURE, TOGETHER.`
- Supporting copy: `We connect, empower, and grow Jamaica's digital community.`

### HeroKCollage

Must construct an abstract `K`, not a regular image grid.

Required pieces:
- Tall rounded vertical photo mask.
- Angled city/mountain image mask.
- Smaller portrait/event mask.
- Lime geometric block forming the inner stroke.
- Large lime diagonal wedge extending beyond the right edge.
- White diagonal cuts between masks.

Implementation options:
- CSS `clip-path`.
- Nested masked divs.
- SVG mask if it preserves responsiveness.
- Absolutely positioned image panels.

Avoid normal rectangular cards.

### ImpactStats

Must resemble the reference's bottom translucent band.

Required:
- Soft ivory translucent surface.
- Four stats.
- Circular pale icon fields.
- Lime numbers.
- Green line icons.
- Vertical dividers between groups on desktop.

Stats visible in reference:
- `1,200+ Community Members`
- `150+ Startups Supported`
- `50+ Partners & Collaborators`
- `100+ Events & Workshops`

## Tailwind Guidance

Define brand tokens:
- `ivory: #FAFAF7`
- `surface: #F4F2EC`
- `lime: #A6CE39`
- `forest: #1F7A3A`
- `accent: #E63946`
- `ink: #0B1517` or `#1A1A1A`
- `muted: #4B4B4B`

Typography:
- Use a condensed display font for the H1.
- Use a clean sans for nav/body.
- If external fonts are allowed, use `Bebas Neue` or `Anton` for the hero headline and `Inter` for UI/body.

Avoid:
- Generic `rounded-3xl` card styling.
- Blue/purple accents.
- Gradient-heavy utility patterns.
- Shadow-heavy floating panels.

## Animation Guidance

Use GSAP for composed timelines, not scattered one-off effects.

Hero timeline:
1. Header elements appear with a subtle y motion.
2. Active nav tab drops from the top.
3. Lime rule draws.
4. H1 lines reveal from masked containers.
5. Supporting copy reveals with slight x offset.
6. CTA buttons reveal.
7. `K` collage masks reveal with clip-path.
8. Dotted matrices fade.
9. Stats strip rises gently.

Scroll animations:
- Use subtle parallax on image masks.
- Use slow vertical movement on large lime geometry.
- Use restrained section reveals.

Avoid:
- Bouncy easing.
- Aggressive hover scale.
- Startup-style fade-up for every element.
- Fast or chaotic stagger.

## GSAP Implementation Standards

Use:
- `gsap.registerPlugin(ScrollTrigger, useGSAP)`
- `useGSAP()` scoped to component refs.
- `gsap.matchMedia()` for desktop/mobile/reduced motion.
- `ctx.revert()` or automatic cleanup through `useGSAP`.
- Transform properties (`x`, `y`, `scale`, `clipPath`) over layout-heavy animation.
- `autoAlpha` for visibility transitions.

Do not:
- Create animations during server render.
- Put `ScrollTrigger` on child tweens inside timelines.
- Leave ScrollTriggers alive after unmount.
- Animate `width`, `height`, `top`, or `left` when transforms or clip-path can do the job.

## ScrollTrigger Standards

Use ScrollTrigger for:
- Parallax on image masks.
- Stats strip entrance.
- Section-level editorial reveals.
- Optional pinned editorial moments if they preserve composition.

Rules:
- Register ScrollTrigger once.
- Create triggers top-to-bottom.
- Refresh after images load if dimensions affect layout.
- Use `scrub: true` only for environmental motion.
- Do not combine `scrub` with `toggleActions` on the same trigger.

## Reduced-Motion Requirements

Respect `prefers-reduced-motion`.

When reduced motion is active:
- Disable hero mask sweeps.
- Disable looping dot drift.
- Disable scroll parallax.
- Keep content visible immediately.
- Preserve all layout and hierarchy.

Implementation pattern:
- Use `gsap.matchMedia()` with `(prefers-reduced-motion: reduce)`.
- Set final states immediately.
- Avoid hidden pre-animation states in CSS unless JS confirms motion is allowed.

## Responsive Guidance

Desktop:
- Full reference composition.
- Left rail visible.
- Abstract `K` on the right.
- Horizontal stats strip.

Tablet:
- Preserve active tab, logo, nav where possible.
- Scale headline but keep condensed uppercase dominance.
- Reduce `K` collage width, not its identity.
- Stats may wrap into two columns.

Mobile:
- Header becomes compact.
- Hamburger and logo remain.
- Full nav may collapse.
- Headline remains large and uppercase.
- Support copy moves below headline.
- `K` collage becomes a stacked image/shape cluster, not ordinary cards.
- Stats stack vertically while keeping icon/number rhythm.

## Performance Guidance

- Use optimized images with explicit dimensions or aspect-ratio containers.
- Lazy-load non-hero images.
- Preload logo and hero-critical image assets if practical.
- Avoid excessive large image layers.
- Avoid continuous JS animation for many elements.
- Use `will-change` sparingly and only around active motion.

## Accessibility Guidance

- Use semantic `header`, `nav`, `main`, `section`, `footer`.
- Use one visible H1.
- Keep headline as real text.
- Use `aria-hidden` for decorative dots, matrices, and abstract geometry.
- Provide meaningful alt text for community photos.
- Ensure keyboard focus styles are visible.
- Ensure nav and CTAs are keyboard reachable.
- Check contrast for white text on lime; use larger/bolder text or forest text when needed.

## Image Handling Guidance

Image content must communicate Jamaican technology community.

Use images of:
- Jamaican/Caribbean community members.
- Event spaces.
- People with laptops.
- Speakers, collaborators, organizers, and students.
- Kingston or Jamaican city/mountain context.

Do not use:
- Generic corporate office stock.
- Abstract screens.
- Dashboard screenshots.
- Futuristic hologram tech.
- Random global city imagery that erases Jamaica.

## Implementation Anti-Patterns

Never drift into:
- SaaS hero stack.
- Centered startup landing page.
- Dashboard aesthetic.
- Feature-card grid.
- Dark technology theme.
- Neon/purple/blue palette.
- Generic event listing platform.
- Rounded card-heavy layout.
- Replacing the `K` collage with a standard photo block.

## Final Quality Bar

The finished implementation should look like a high-fidelity translation of the reference into responsive code. It should feel like an editorial brand cover for Kingston Beta: bright, Jamaican, confident, premium, community-led, and structurally anchored by the giant typographic statement and abstract `K` collage.
