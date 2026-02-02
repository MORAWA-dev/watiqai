# WatiqAI Development Guide

## Table of Contents
- [Project Overview](#project-overview)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Deployment](#deployment)

## Project Overview

WatiqAI is a FinTech solution for AI-powered KYC document verification, targeting the Moroccan and Maghreb markets.

### Tech Stack
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Design**: Minimalist, responsive, mobile-first
- **Colors**: Charcoal (#1E2A3B), Gold accent (#C9A227)

## Getting Started

### Local Development

```bash
# Clone the repository
git clone https://github.com/yourusername/watiqai.git
cd watiqai

# Start local server (choose one)
npx http-server -p 3000 -o          # Node.js
python -m http.server 3000          # Python 3
php -S localhost:3000               # PHP

# Or use VS Code Live Server extension
```

### Project Scripts

```bash
npm start     # Start development server
npm run dev   # Start with cache disabled
npm run lint  # Run linters
```

## Development Workflow

### Branch Naming Convention
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring

### Commit Message Format
```
type(scope): description

[optional body]

[optional footer]
```

**Types**: feat, fix, docs, style, refactor, test, chore

## Code Standards

### HTML
- Use semantic elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- Include alt attributes for images
- Use proper heading hierarchy

### CSS
- Use CSS custom properties (variables)
- Follow BEM naming convention for complex components
- Mobile-first responsive design
- Use `clamp()` for fluid typography

### JavaScript
- Use ES6+ features
- Prefer `const` over `let`
- Use arrow functions for callbacks
- Comment complex logic

## File Organization

```
src/
├── css/
│   ├── styles.css          # Main styles (variables, reset, components)
│   ├── components/         # Component-specific styles (future)
│   └── utilities/          # Utility classes (future)
├── js/
│   ├── script.js           # Main JavaScript
│   ├── components/         # JS components (future)
│   └── utils/              # Utility functions (future)
└── images/
    └── ...                 # Website images
```

## Deployment

### Static Hosting Options
- **Vercel**: `vercel deploy`
- **Netlify**: `netlify deploy`
- **GitHub Pages**: Push to `gh-pages` branch
- **AWS S3**: Upload to S3 bucket with static hosting

### Pre-deployment Checklist
- [ ] Test on multiple browsers
- [ ] Test responsive design
- [ ] Optimize images
- [ ] Minify CSS/JS (for production)
- [ ] Update meta tags
- [ ] Test all links

## Resources

- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS Tricks](https://css-tricks.com/)
- [Can I Use](https://caniuse.com/)
