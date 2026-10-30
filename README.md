# Johnson Oyemade · Portfolio

> Web3 + Fullstack Developer · Bridging scalable full-stack applications with production smart contracts.

Live site: [therealjhay.tech](https://therealjhay.tech)

---

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with CSS custom properties & Dark/Light mode (`next-themes`)
- **Animation:** [Framer Motion](https://www.framer.com/motion/)
- **Type Safety:** TypeScript
- **Icons:** [Lucide React](https://lucide.dev/)
- **Linting:** ESLint 9 (Flat Config)

---

## Project Structure

```text
├── app/                  # Next.js App Router pages
│   ├── about/            # Standalone About & categorized stack page
│   ├── contact/          # Direct contact & social channels page
│   ├── projects/         # Categorized Projects gallery
│   ├── resume/           # Interactive & print-ready resume view
│   ├── layout.tsx        # Root layout, theme provider, and global metadata
│   └── page.tsx          # Homepage (Hero & technical writing)
├── components/           # Reusable UI and section components
│   ├── layout/           # Navbar, Mobile Menu, Footer, Theme Toggle
│   ├── sections/         # Hero, About, Projects, Stack, Articles, Resume Rail
│   └── ui/               # Buttons, badges, cards, copy-email, cursor glow
├── config/
│   └── site-content.ts   # Single source of truth for all content and metadata
├── content/
│   └── resume.ts         # Structured data for resume view and PDF generation
├── lib/                  # Metadata helpers and utilities
├── public/               # Static project previews and generated resume PDF
├── scripts/
│   └── generate-pdf.mjs  # Headless Puppeteer script to generate public/resume.pdf
└── styles/
    └── globals.css       # Tailwind directives and CSS theme variables
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.18+ or v20+)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/therealjhay/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs the Next.js development server on `localhost:3000` |
| `npm run dev:resume` | Runs the dev server and automatically regenerates `resume.pdf` on content changes |
| `npm run build` | Builds the production bundle and generates the sitemap |
| `npm run start` | Starts the production server |
| `npm run lint` | Runs ESLint across all files using ESLint 9 flat config |
| `npm run pdf` | Generates a fresh `public/resume.pdf` using Puppeteer |

---

## Updating Portfolio Content

All personal info, bio, skills, projects, and articles are centrally managed in:
[`config/site-content.ts`](config/site-content.ts)

---

## License

MIT © [Johnson Oyemade](https://github.com/therealjhay)
