# A Better Weigh | Landing Page

Responsive landing page built from the Figma design as part of the Alpha Efficiency web developer test task.

**Live preview:** https://valenberdev.github.io/alpha-efficiency-test/

![Desktop preview](docs/preview-desktop.png)

| Tablet (820px)                             | Mobile (375px)                             |
| ------------------------------------------ | ------------------------------------------ |
| ![Tablet preview](docs/preview-tablet.png) | ![Mobile preview](docs/preview-mobile.png) |

## Stack

HTML, CSS and vanilla JavaScript only. No frameworks, no libraries, no build step.

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
npx serve .
```

## Structure

```
index.html
css/styles.css
js/
  menu.js        burger menu behavior
  header.js      sticky header glass state on scroll
  countdown.js   live countdown
  faq.js         accordion behavior
  links.js       placeholder link handling
assets/img/      optimized images (webp, svg)
docs/            previews used in this README
```

## What is implemented

- Responsive layout from 1920px down to 320px, built mobile-first. Layouts follow the three Figma frames (375, 820 and 1920) with breakpoints at 768px and 1200px.
- Burger menu with the full navigation list. It closes on link click, outside click, `Escape` and when the viewport reaches the desktop layout. State is exposed through `aria-expanded`.
- Sticky header that is transparent at the top and turns into a blurred glass bar when scrolling, with a smaller logo.
- Working countdown. It targets the next local midnight and computes the remaining time from `Date.now()` on every tick, so it does not drift and stays correct after the tab was in the background.
- FAQ accordion with lorem ipsum answers. One item open at a time, animated height, keyboard accessible, `aria-expanded` and `aria-controls` on every question.
- Background and ring decorations that scale with the viewport.
- Art direction with `<picture>`: a different photo is served on desktop and on mobile/tablet. Images are WebP with lazy loading below the fold.
- Open Graph and Twitter card metadata, favicon and theme color.

## UX details

- Hover effects only run on devices that actually support hover, so nothing stays "stuck" after a tap on touch screens. Pressed states are provided for touch.
- Keyboard focus ring with at least 3:1 contrast on every section background, plus a skip link.
- Touch targets of 44px or more for footer links and social icons, enlarged with an invisible hit area so the design is unchanged.
- Placeholder links (`href="#"`) do not jump to the top of the page. They show a short notice instead.
- Tap highlight removed in favor of explicit pressed states, and double-tap zoom disabled on buttons.
- Semantic HTML landmarks, descriptive `alt` text and a logical heading order.

## Decisions and known deviations

- **Breakpoints:** 768px and 1200px, chosen so the 820px and 1920px frames are covered by their own layouts and everything in between degrades without horizontal scroll.
- **Countdown:** the design shows days, hours, minutes and seconds. Since the target is the next local midnight, days are always `00`. The structure supports a longer deadline by changing a single value.
- **Color contrast:** white text on the pink (`#DD71C6`) and yellow (`#FFD900`) buttons comes from the design and does not reach WCAG AA contrast. I kept it for fidelity with the Figma file. The two buttons are the first thing I would raise with the design team.
- **Placeholder links:** navigation, CTAs and footer links have no real destination in the brief, so they are intentionally not connected.
- **Fonts:** Libre Baskerville and Montserrat are loaded from Google Fonts.
