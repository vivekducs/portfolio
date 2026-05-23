# Vivek Kumar — Premium AI Engineer Portfolio

> **Live Portfolio** • Built with Next.js 16, Tailwind CSS v4 & Framer Motion

A premium, futuristic developer portfolio for **Vivek Kumar** — MCA Student, AI Engineer, Backend Developer & Full Stack Product Builder. Designed with a cinematic SaaS aesthetic, glassmorphism cards, smooth animations, and an interactive simulated AI assistant.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Icons | Lucide React |
| Fonts | Geist Sans & Geist Mono |
| Runtime | React 19 |
| Deployment | Vercel |

---

## ✨ Features

- **Light Mode (primary) + Dark Mode toggle** — persisted in `localStorage`
- **Premium luxury palette** — Violet, Purple, Magenta, Orange glow, Gold highlights; strictly no blue/cyan
- **Glassmorphism cards** with hover lift and glow animations
- **Animated typing effect** cycling through AI/Backend/Full Stack specializations
- **Interactive VK Assistant** — simulated chatbot with real-time knowledge about Vivek's projects, skills, and experience
- **Simulated GitHub contribution calendar** and **LeetCode rating ring**
- **Responsive** — desktop dashboard sidebar + mobile sticky header + floating action button
- **Sections**: Hero · About · Skills · Projects · Experience · Certifications · Stats · Contact

---

## 🗂️ Project Structure

```
src/
├── app/
│   ├── globals.css       # Design tokens, glassmorphism, animations
│   ├── layout.js         # Root layout with ThemeProvider
│   └── page.js           # Main dashboard page
└── components/
    ├── ThemeProvider.js   # Dark/Light mode context + localStorage sync
    ├── Sidebar.js         # Desktop sticky navigation
    ├── Header.js          # Mobile sticky header + drawer
    ├── Hero.js            # Typing effect, avatar, CTA buttons
    ├── About.js           # Education timeline, focus areas
    ├── Projects.js        # Featured case study + projects grid
    ├── Skills.js          # Categorized skills grid
    ├── Experience.js      # Chronological SDE timeline
    ├── Certifications.js  # Verified credentials wall
    ├── Stats.js           # LeetCode meter + GitHub commit grid
    ├── Contact.js         # Contact form + social links
    ├── VKAssistant.js     # Simulated AI chatbot widget
    └── VKAssistantPopup.js # Phase 1 modal + pre-release sandbox
```

---

## 🛠️ Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📬 Contact

| | |
|--|--|
| **Email** | [vivekducs@gmail.com](mailto:vivekducs@gmail.com) |
| **LinkedIn** | [linkedin.com/in/vivek33pal](https://www.linkedin.com/in/vivek33pal/) |
| **GitHub** | [github.com/AVPXM8](https://github.com/AVPXM8) |

---

© 2026 Vivek Kumar. All rights reserved.
