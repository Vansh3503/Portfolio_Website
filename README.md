# Vansh Malhotra · Portfolio

Cinematic portfolio for **Vansh Malhotra**, AI Engineer — multi-agent systems, RAG pipelines, and LLM evaluation.

Live site: _coming soon (Vercel)_
LinkedIn: [/in/vansh-malhotra353](https://www.linkedin.com/in/vansh-malhotra353/)
Instagram: [@vansh_353__](https://www.instagram.com/vansh_353__)

---

## Stack

| Layer        | Tech                                                    |
| ------------ | ------------------------------------------------------- |
| Framework    | Next.js 14 (App Router, JS)                             |
| UI runtime   | React 18                                                |
| Animation    | Framer Motion + GSAP                                    |
| Styling      | CSS Modules                                             |
| Background FX| Custom canvas neural-network layer (no deps)            |
| Audio        | Web Audio API (synthesized — no shipped audio assets)   |

## Features

- Cinematic full-screen hero with talking-head video, ambient blur layer, and glassmorphism controls
- Terminal-style preloader with curtain-wipe exit
- Custom cursor (spring-eased trailing ring) with magnetic hover states
- Always-on synthesized UI click sounds
- Inline GameDock (Memory match · Reaction · Word scramble) — accessible from every page
- Interactive neural-network background behind the skills section
- Rotating role text with blur-fade transitions in the hero
- Animated VM "Infinite Path" SVG logo
- Multi-page architecture: `/`, `/work`, `/experience`, `/about`, `/contact`
- Fully responsive down to 360px

## Getting started

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Project structure

```
app/                 # App Router routes
  layout.js          # Mounts Header, Footer, Preloader, Cursor, GameDock, SoundProvider
  page.js            # Home (VideoIntro · Marquee · Highlights · FeaturedWork)
  work/              # Filterable project showcase
  experience/        # Resume-style timeline
  about/             # Bio + 3D avatar + skills toolbox + off-duty
  contact/           # Contact form + direct links
components/          # Co-located JSX + CSS modules
lib/projects.js      # Source of truth for projects / experience / skills
lib/sound.js         # Tiny synthesized Web Audio engine
public/media/        # hero.mp4 · avatar.png · hiking.png
```

## Deploy

- **Vercel**: import the repo, framework auto-detects as Next.js. No env vars required.
- **Build command**: `next build`
- **Output**: fully static (`○ Static` for every route)

## License

All content (text, photos, the talking-head video, and the 3D avatar render) is © Vansh Malhotra. Code is provided as-is for portfolio reference.
