# Johnson Oyemade · Portfolio

> Web3 + Fullstack Developer · Bridging scalable full-stack applications with Ethereum smart contracts.

Live site: [therealjhay.tech](https://therealjhay.tech)

---

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Server Actions)
- **UI Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with Vanilla CSS custom properties & Dark/Light mode (`next-themes`)
- **Animation:** [Framer Motion](https://www.framer.com/motion/)
- **Type Safety:** TypeScript & [Zod](https://zod.dev/) schemas
- **Icons:** [Lucide React](https://lucide.dev/)
- **Email:** [Resend](https://resend.com/) & [Nodemailer](https://nodemailer.com/) fallback
- **Linting:** ESLint 9 (Flat Config)

---

## Project Structure

```text
├── app/                  # Next.js App Router pages and server actions
│   ├── about/            # Standalone About page
│   ├── contact/          # Contact page and server actions
│   ├── projects/         # Projects gallery
│   ├── resume/           # Interactive resume view
│   ├── services/         # Services offered
│   └── layout.tsx        # Root layout, theme provider, and global metadata
├── components/           # Reusable UI and section components
│   ├── layout/           # Navbar, Mobile Menu, Footer, Theme Toggle
│   ├── sections/         # Hero, About, Projects, Stack, Articles, Contact
│   └── ui/               # Buttons, badges, cards, cursor glow
├── config/
│   └── site-content.ts   # Single source of truth for all content and metadata
├── content/
│   └── resume.ts         # Structured data for resume generation
├── lib/                  # Metadata helpers, validation, and utilities
├── public/               # Static assets and generated resume PDF
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

3. Configure environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration (see [Environment Variables](#environment-variables)).

4. Start the development server:
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

## Environment Variables

Copy `.env.example` to `.env.local`:

```bash
# Site URL
NEXT_PUBLIC_SITE_URL=https://therealjhay.tech

# Contact Form Delivery
CONTACT_TO_EMAIL=your-email@example.com
CONTACT_FROM_EMAIL=Portfolio Contact <onboarding@resend.dev>

# Option 1: Resend (Recommended)
RESEND_API_KEY=re_your_api_key_here

# Option 2: SMTP Fallback
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
```

---

## Updating Portfolio Content

All personal info, skills, projects, and articles are centrally managed in:
[`config/site-content.ts`](config/site-content.ts)

Editing values in this file automatically updates:
- Homepage hero, bio, and badge metrics
- Stack list and categorized skills
- Projects gallery
- Articles list
- Navigation links and footer

---

## License

MIT © [Johnson Oyemade](https://github.com/therealjhay)