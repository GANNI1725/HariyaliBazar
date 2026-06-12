# 🌿 HariyaliBazar (हरियाली बजार)

> *Fresh organic produce from Nepal's farms, delivered to your door.*

[![Live Demo](https://img.shields.io/badge/Live-Demo-2F6B3F?style=for-the-badge&logo=netlify&logoColor=white)](https://hariyalibazar.netlify.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-C9901A?style=for-the-badge)](LICENSE)
[![Status: Internship Complete](https://img.shields.io/badge/Status-Internship%20Complete-7FB069?style=for-the-badge)](https://github.com)

A frontend-only organic-produce e-commerce experience crafted for the Nepali market — built end-to-end during a BCA Frontend Internship at **Sweven Incorporate Pvt. Ltd., Butwal**.

**Live demo:** [hariyalibazar.netlify.app](https://hariyalibazar.netlify.app)
**Repository:** `github.com/GANNI1725/HariyaliBazar`

---

## Requirements

For development, you will only need **Node.js** (v18+) installed on your environment.

```bash
$ node --version
v18.0.0

$ npm --version
9.0.0
```

---

## Install

```bash
$ git clone https://github.com/GANNI1725/HariyaliBazar.git
$ npm install
```

---

## Development

Start the Vite dev server with hot reload:

```bash
$ npm run dev
```

Opens at `http://localhost:5173`.

---

## Production Build

Compile and minify for production:

```bash
$ npm run build
```

Output is written to `dist/`.

---

## Preview Production Build

```bash
$ npm run preview
```

---

## Lint

Run ESLint across the project:

```bash
$ npm run lint
```

---

## Languages & Tools

| Layer | Tool |
|---|---|
| Framework | React 19 + JSX |
| Build | Vite 8 |
| Styling | Tailwind CSS 4 |
| Routing | React Router DOM 7 |
| Animation | Framer Motion 12 |
| Icons | Lucide React |
| Carousel | Swiper 12 |
| Notifications | React Hot Toast |
| Linter | ESLint 10 |

---

## Features

### 🌿 Organic / Farm
- 41 products across 7 categories (vegetables, fruits, tea & coffee, lentils, spices, dairy, juices)
- 6 farmer profiles with stories + product links
- "Farmer of the Week" badge
- Seasonal banner that adapts to the current month
- Trust bar with count-up stats (IntersectionObserver)
- Philosophy section, testimonials slider, newsletter signup

### 🔐 Auth & User Accounts
- Login / Signup with validation (email must be `@gmail.com`, password: 8+ chars, uppercase, lowercase, number, special char)
- Admin: `Ganesh@gmail.com` / `Admin@123` — access admin panel at `/admin`
- Customer: `Customer@gmail.com` / `Customer@123` — access account dashboard at `/account`
- New users sign up as customers (stored in `localStorage`)

### 🛒 Cart & Wishlist
- Add to cart from any product card or detail page
- Slide-in cart drawer with Framer Motion animation
- Floating cart button for mobile
- Persistent cart & wishlist via `localStorage`
- "Place Order" demo flow with animated success modal
- Wishlist heart toggle with bilingual toast

### 🧃 Juice Bar (`/juices`)
- Dedicated juice product listing with separate category
- Quick-add to cart with quantity selector

### 🌙 Dark Mode
- System-preference detection on first load
- Smooth 300 ms colour transitions
- Persisted in `localStorage` with manual toggle

### 🔍 Search & Discovery
- Full-screen search modal (Esc to close, auto-focus, focus trap)
- Live filter across name, Nepali name, category, tags
- Delivery-zone checker for 65 areas across Rupandehi district
- Bilingual product data (English + Nepali/Devanagari)

### 📱 Responsive & Accessible
- Mobile bottom navigation (44×44 px tap targets)
- `aria-label`, `role="dialog"`, `aria-modal`, focus rings
- Sticky add-to-cart bar on product detail
- `lazy()` route splitting + `Suspense` fallback
- Error boundary with friendly fallback

### ⚙️ Admin Panel (`/admin`)
- Dashboard with stats (products, orders, users, revenue)
- Product CRUD: Add / Edit / Delete products via modal forms
- Orders table with status tracking (dropdown status change)
- Users table with roles
- All data persisted in `localStorage`
- Product changes (stock, name, price) reflected **instantly** on all site pages via shared `ProductContext`

### 👤 Customer Dashboard (`/account`)
- Profile overview (name, email, role)
- Order history with status, items, totals, payment method
- Stats cards (total orders, active, delivered, spent)

### 🎨 Polish
- Page transitions (fade + Y slide) via AnimatePresence
- Hero text animates word-by-word
- Product card hover lifts + inline add-to-cart button
- Hero Ken-Burns zoom effect
- Sticky navbar with backdrop blur
- Marquee strip with scrolling announcements

---

## Routes

| Path | Page |
|---|---|
| `/` | Home |
| `/products` | All Products |
| `/products/:id` | Product Detail |
| `/juices` | Juice Bar |
| `/cart` | Cart |
| `/wishlist` | Wishlist |
| `/about` | About |
| `/why-organic` | Why Organic |
| `/blog` | Blog |
| `/blog/:slug` | Blog Post |
| `/contact` | Contact |
| `/login` | Login |
| `/signup` | Sign Up |
| `/admin` | Admin Panel |
| `/account` | Customer Dashboard |
| `/terms` | Terms & Conditions |
| `/privacy` | Privacy Policy |
| `/404` | Not Found |

---

## Project Structure

```
src/
├── App.jsx               Router, providers, toast, layout shell
├── main.jsx
├── index.css             Tailwind v4 theme + CSS variables
├── context/
│   ├── AuthContext.jsx
│   ├── CartContext.jsx
│   ├── ProductContext.jsx  Single source of truth (localStorage + static fallback)
│   ├── ThemeContext.jsx
│   └── WishlistContext.jsx
├── data/
│   ├── products.js       41 mock products
│   ├── categories.js     7 categories
│   ├── farmers.js        6 farmer profiles
│   ├── blogPosts.js
│   └── deliveryZones.js  65 zones across Rupandehi
├── components/
│   ├── layout/           Navbar, Footer, MobileBottomNav
│   ├── home/             HeroBanner, TrustBar, CategoryTabs, MarqueeStrip,
│   │                     FarmerSpotlight, FeaturedBanner, JuiceBarSection,
│   │                     PhilosophySection, TestimonialsSlider, BlogPreview,
│   │                     NewsletterSection, SeasonalBanner
│   ├── products/         ProductCard, ProductFilters, QuickViewModal,
│   │                     RelatedProducts, VeggieBoxModal
│   ├── cart/             CartDrawer, CartItem, FloatingCart
│   └── shared/           Button, Badge, SectionHeader, SearchModal,
│                         DeliveryChecker, LoadingSpinner, ErrorBoundary,
│                         SocialIcons, ThemeToggle
└── pages/
    ├── Home.jsx
    ├── Products.jsx
    ├── ProductDetail.jsx
    ├── Juices.jsx
    ├── Cart.jsx
    ├── Wishlist.jsx
    ├── About.jsx
    ├── WhyOrganic.jsx
    ├── Blog.jsx
    ├── BlogPost.jsx
    ├── Contact.jsx
    ├── Login.jsx
    ├── Signup.jsx
    ├── AdminPanel.jsx
    ├── CustomerDashboard.jsx
    ├── TermsConditions.jsx
    ├── PrivacyPolicy.jsx
    └── NotFound.jsx
```

---

## Design System

| Token | Value | Use |
|---|---|---|
| `--color-forest` | `#2F6B3F` | Primary brand · headings |
| `--color-leaf` | `#6D9773` | Buttons · links |
| `--color-sprout` | `#7FB069` | Hover · tags · accents |
| `--color-earth` | `#7A4E2D` | Farmer section accents |
| `--color-clay` | `#D4A373` | Warm CTA highlights |
| `--color-cream` | `#F6F2E8` | Page background |
| `--color-linen` | `#FFFDF8` | Card backgrounds |
| `--color-mist` | `#D9D7CC` | Section alternates |
| `--color-gold` | `#C9901A` | Ratings · trust badges |
| `--color-red` | `#D9534F` | Out of stock · errors |

**Fonts:** Playfair Display (headings) · DM Sans (body) · Tiro Devanagari Nepal (Nepali script)

---

## Security

Security is enforced via a **CSP `<meta>` tag** in `index.html`:

```
default-src 'self'; script-src 'self' 'unsafe-inline';
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com; img-src 'self' data:;
connect-src 'self'; base-uri 'self'; form-action 'self'
```

Additional headers (HSTS, X-Frame-Options, etc.) can be enabled by
creating a [`_headers`](https://docs.netlify.com/routing/headers/) file
in the publish directory or via `netlify.toml`.

---

## Author

| | |
|---|---|
| **Name** | Ganesh Prasad Bhandari |
| **Programme** | BCA — Lumbini City College, Tribhuvan University |
| **Internship** | Frontend Intern (CAIN403) at Sweven Incorporate Pvt. Ltd., Butwal |
| **Mentor** | Mr. Sandesh Tiwari |
| **Supervisor** | Mr. Suraj Kumar Khattri |
| **Duration** | 2026 |

---

## Credits

- **Internship Mentor** — Mr. Sandesh Tiwari
- **Academic Supervisor** — Mr. Suraj Kumar Khattri
- **Host Company** — Sweven Incorporate Pvt. Ltd., Butwal, Nepal
- **College** — Lumbini City College, Tribhuvan University
- **Images** — [Unsplash](https://unsplash.com)
- **Inspiration** — Current status of Nepalese Market

---

## License

This project is released under the **MIT License**. See [`LICENSE`](LICENSE) for details.

---

*Connecting Nepal's organic farmers with families who care about what's on their table.*
