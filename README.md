VK Seva Foundation — Next.js + Tailwind site replicating sibling card styles with an Admin panel and glassmorphism.

## Features
- Card UI closely matches the Aryakarn sibling site with number badges, four highlight blocks, VISIT SITE button, and three login buttons.
- Admin panel at `/admin` with full CRUD, visibility toggle, and drag-less ordering (move up/down). Data persists locally via `localStorage` (no backend required).
- Modern design: Material-leaning rounded shapes, gradients, and glassmorphism (backdrop blur + translucency).

## Getting Started

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open http://localhost:3000 to view the site.

## Admin Panel
- Visit http://localhost:3000/admin
- Add/Edit cards (title, subtitle, image URL, gradient, badges, link, active).
- Cards are stored in browser `localStorage` under the key `vkseva-cards`.

## Build & Preview
```bash
npm run build
npm run preview
```

## Notes
- This project is frontend-only by default. If you want multi-user, server-backed editing, connect the store in `src/app/store/cards.ts` to your backend (e.g., Firebase/Firestore).
