# Context
You are an expert Frontend Developer and UX/UI Designer. Your task is to build a complete, single-page developer portfolio website.

# Developer Persona
The portfolio is for a hybrid Web3 (Solidity/Ethereum) and Fullstack (React, TypeScript, JavaScript, Django) Developer. 

# Tech Stack for the Portfolio
* **Framework:** React (Next.js or Vite) with TypeScript.
* **Styling:** Tailwind CSS.
* **Animations:** Framer Motion (or standard CSS animations for high-performance dynamic elements).

# Strict Design Rules
1.  **NO Gradients:** You must not use any CSS gradients (`linear-gradient`, `radial-gradient`, etc.) anywhere on the site.
2.  **Highly Colorful:** Use a vibrant, solid-color palette. Think Neo-Brutalism, Pop-Art, or high-contrast modern flat design. Use stark borders and bold typography to separate sections instead of shadows or gradients.
3.  **Dynamic & Unique:** The website must feel alive. Implement scroll-triggered reveals, micro-interactions on hover, and a custom cursor if possible.
4.  **Modern Layout:** Move away from standard top-down templates. Use asymmetrical grids, marquee scrolling text for skills, and interactive card components for projects.

# Core Sections & Features Required

## 1. Hero Section
* A bold, full-screen introductory section.
* **Text:** "Hi, I build decentralized protocols and scalable fullstack applications."
* **Call to Actions (CTAs):** * Primary Button: "View Projects" (Scrolls to projects).
    * Secondary Button: "GitHub" (Link to profile).
* **Dynamic Element:** Include a simple interactive background element (e.g., a grid of dots that react to mouse movement, or a terminal-typing effect) using solid colors only.

## 2. About & Skills Section
* A brief bio emphasizing the bridge between traditional Web2 architecture (Django/React) and Web3 infrastructure (Smart Contracts).
* **Skills Display:** Create an infinitely scrolling marquee or an interactive animated grid displaying the following technologies:
    * *Web3:* Solidity, Ethereum, Foundry, Hardhat, Ethers.js/Viem.
    * *Frontend:* React, TypeScript, JavaScript, Tailwind CSS.
    * *Backend:* Django, Python, PostgreSQL, Node.js.

## 3. Projects Section (The Core Feature)
* This must be a dynamic grid of project cards.
* Include a filtering mechanism to toggle between "All", "Web3 / Smart Contracts", and "Fullstack".
* Each project card MUST contain:
    * A solid, brightly colored background block (no images needed initially, just bold typography and layout).
    * Project Title and a 2-sentence description.
    * A row of tech-stack tags (e.g., [Django] [React] [Solidity]).
    * **Link Placeholders:** Two prominent icon links per card:
        * `[Icon] View Source Code (GitHub)`
        * `[Icon] Live Demo`

## 4. Contact / Connect Section
* A bold footer area.
* Include a highly styled, functioning "mailto:" contact form or direct email link.
* Include placeholders for dynamic social links: GitHub, Twitter/X, LinkedIn, and a Web3 block explorer link (like Etherscan) to a deployed contract.

# Implementation Instructions for the AI
1.  Generate the complete structural code for this portfolio.
2.  Provide the configuration object or JSON array at the top of the file (or in a separate data file) so I can easily drop in my personal GitHub links, project titles, and descriptions without hunting through the component code.
3.  Ensure all Framer Motion or animation logic is modular and cleanly written. 
4.  Double-check that your CSS/Tailwind classes contain zero gradient utilities.