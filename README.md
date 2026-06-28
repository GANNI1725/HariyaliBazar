# 🌿 HariyaliBazar (हरियाली बजार)

> *Fresh organic produce from Nepal's farms, delivered to your door.*

[![License: All Rights Reserved](https://img.shields.io/badge/License-All%20Rights%20Reserved-C9901A?style=for-the-badge)](LICENSE)
[![Status: Internship Complete](https://img.shields.io/badge/Status-Internship%20Complete-7FB069?style=for-the-badge)](https://github.com)

A frontend-only organic-produce e-commerce experience crafted for the Nepali market - built end-to-end during a BCA Frontend Internship at **Sweven Incorporate Pvt. Ltd., Butwal**.

**Repository:** https://github.com/GANNI1725/HariyaliBazar

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
| Type Checking | PropTypes |
| Linter | ESLint 10 |

---

## Features

### 🌿 Organic E-Commerce
- **41 products** across 7 categories (Vegetables, Fruits, Tea & Coffee, Lentils, Spices, Dairy, Juices)
- Bilingual data (English + Nepali/Devanagari) with organic, local, pesticide-free, and same-day badges
- Product traceability - every item linked to its farmer and district of origin
- Seasonal banner that dynamically adapts to the current month

### 👨‍🌾 Farmer-Centric Model
- **6 farmer profiles** with stories, portraits, product associations, and organic-farming tenure
- "Farmer of the Week" spotlight on the homepage
- District-level sourcing transparency (Butwal, Dhading, Ilam, Janakpur)

### 🚚 Same-Day Delivery
- **65 delivery zones** across Rupandehi district
- Same-day delivery for Butwal (cut-off 11 AM) and Tilottama Municipality
- 1–2 day delivery for surrounding areas
- Tiered fees: Rs 30 (Butwal), Rs 60 (Tilottama), Rs 120 (other)
- Built-in **DeliveryChecker** tool with typeahead area search

### 📦 Weekly Veggie Box
- Customizable subscription box: pick 4 vegetables + 2 fruits from interactive grids
- "Farmer's Surprise" mystery item revealed after full selection
- Fixed price Rs 899 (25% savings)

### 🔐 Auth & User Accounts
- Login / Signup with validation (email must be `@gmail.com`, password: 8+ chars, uppercase, lowercase, number, special char)
- Admin: `ganesh@gmail.com` / `Admin@123` - access admin panel at `/admin`
- Customer: `customer@gmail.com` / `Customer@123` - access account dashboard at `/account`
- New users sign up as customers (stored in `localStorage`)
- Address management from customer dashboard

### 🛒 Cart & Wishlist
- Add to cart from any product card or detail page
- Slide-in cart drawer with Framer Motion animation (Esc to close, body scroll lock)
- Floating cart button for mobile
- Persistent cart & wishlist via `localStorage`
- Cart clears on logout
- Guest users prompted to log in before adding items
- Gram/kilo-aware quantity display for weighted items

### 🧃 Juice Bar (`/juices`)
- Dedicated juice product listing with 7 filterable types (Citrus, Greens, Fruit, Creamy, Savoury, etc.)
- Quick-add to cart with quantity selector
- Tag-based filtering

### ⚙️ Admin Panel (`/admin`)
- Dashboard with stat cards (products, orders, users, revenue)
- **Categories** tab: view all, add new categories
- **Products** tab: view grouped by category, add/edit/delete via modal forms, drag-drop image upload
- **Orders** tab: full table with status tracking (pending → shipped → delivered / cancelled)
- **Users** tab: table with roles
- All CRUD persisted in `localStorage` and reflected **instantly** across the site via shared `ProductContext`

### 👤 Customer Dashboard (`/account`)
- Profile overview (name, email, role, editable delivery address)
- Order history with status, items, totals, payment method
- Stats cards (total orders, active, delivered, spent)

### 🌙 Dark Mode
- Theme toggle persisted in `localStorage`
- Defaults to light mode
- Smooth 300ms colour transitions
- Manual toggle via `ThemeToggle` component

### 🔍 Search & Discovery
- Full-screen search modal (Esc to close, auto-focus, focus trap)
- Live filter across name, Nepali name, category, and tags
- QuickView modal for fast product preview without navigation
- Delivery-zone checker for 65 areas across Rupandehi district

### 📝 Blog
- 6 articles across 5 categories (All, Organic Farming, Recipes, Farmer Stories, Sustainability)
- Reading time calculator, rich content renderer (headings, ordered/unordered lists, paragraphs)
- "Keep Reading" sidebar with 3 related posts

### 📱 Responsive & Accessible
- Mobile bottom navigation (44×44 px tap targets)
- `aria-label`, `role="dialog"`, `aria-modal`, focus rings, keyboard navigation
- Sticky navbar with backdrop blur, sticky add-to-cart bar on product detail
- `lazy()` route splitting + `Suspense` with `LoadingSpinner`
- Error boundary with friendly fallback UI (Try again + Go home)
- Scroll position restoration on back navigation
- Scrollbar compensation to prevent layout shift on modal open

### 🎨 Polish
- Page transitions (fade + Y-slide) via `AnimatePresence`
- Hero text animates word-by-word with Ken Burns zoom
- Product card hover lift + inline add-to-cart button
- Marquee strip with scrolling announcements
- Animated count-up stats via IntersectionObserver + requestAnimationFrame
- 9 customer testimonials in a responsive Swiper slider

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
public/
├── Home-Logo_Section_Pics/     Logo, banners, flag GIF, login BG
├── About_Section/              About page images (How It Started, How We Work, philosophy)
├── Products_Pics/              Product photos (41 items)
├── Farmers_Pics/               Farmer portraits (6 farmers)
├── Blog_Section/               Blog post cover images (6 articles)
├── Footer-Payment-Method/      Payment method icons (eSewa, Khalti, COD, Bank Transfer)
└── assets/favicon_io/          Favicons & site manifest

src/
├── App.jsx                     Root: 5 context providers, router, toast, animated layout shell
├── main.jsx                    Entry point; disables browser scroll restoration
├── index.css                   Tailwind v4 theme, CSS custom properties (light + dark), typography, patterns

├── context/                    State management (all persisted to localStorage)
│   ├── AuthContext.jsx         Login/signup/logout, role-based access, seed users & orders
│   ├── CartContext.jsx         Cart items, drawer toggle, login-prompt modal for guests
│   ├── ProductContext.jsx      Single source of truth for products + categories; CRUD methods
│   ├── ThemeContext.jsx        Dark/light toggle, reads initial theme from DOM
│   └── WishlistContext.jsx     Wishlist IDs, toggle with bilingual toast notifications

├── data/                       Static seed data
│   ├── products.js             41 products (bilingual, farmer-linked, seasonal, rated)
│   ├── categories.js           7 categories with icons, colours, bilingual names
│   ├── farmers.js              6 farmer profiles with stories, districts, specialties
│   ├── blogPosts.js            6 blog posts with content, metadata, reading-time calculator
│   └── deliveryZones.js        65 zones across Rupandehi with fees + same-day flags

├── components/
│   ├── layout/                 Navbar, Footer, MobileBottomNav
│   ├── home/                   HeroBanner, TrustBar, CategoryTabs, SeasonalBanner,
│   │                           MarqueeStrip, FeaturedBanner, PhilosophySection,
│   │                           FarmerSpotlight, JuiceBarSection, TestimonialsSlider,
│   │                           BlogPreview, NewsletterSection
│   ├── products/               ProductCard, ProductFilters, QuickViewModal,
│   │                           RelatedProducts, VeggieBoxModal
│   ├── cart/                   CartDrawer, CartItem, FloatingCart
│   └── shared/                 Button, Badge, SectionHeader, SearchModal, DeliveryChecker,
│                               LoadingSpinner, ErrorBoundary, SocialIcons, ThemeToggle

└── pages/
    ├── Home.jsx                Assembles 13 homepage sections
    ├── Products.jsx            Filtered/sorted listing with URL params, scroll restoration
    ├── ProductDetail.jsx       Detail view with image, tabs, farmer card, sticky add-to-cart
    ├── Juices.jsx              Juice bar with tag-based filtering
    ├── Cart.jsx                Full cart page + order summary + "Place Order" coming-soon modal
    ├── Wishlist.jsx            Wishlist grid with clear-all
    ├── About.jsx               Brand story, stat counters, farmer profiles, accreditation
    ├── WhyOrganic.jsx          Educational page: benefits, comparison table, CTA
    ├── Blog.jsx                Blog listing with category filters, card grid
    ├── BlogPost.jsx            Single article with rich content renderer, keep-reading sidebar
    ├── Contact.jsx             Info cards, contact form, DeliveryChecker
    ├── Login.jsx               Sign-in form with demo credentials display
    ├── Signup.jsx              Registration with live password validation
    ├── AdminPanel.jsx          Admin dashboard: categories, products, orders, users (4 tabs)
    ├── CustomerDashboard.jsx   Account overview: profile, order history, stats
    ├── TermsConditions.jsx     Legal page (13 sections)
    ├── PrivacyPolicy.jsx       Privacy policy (11 sections)
    └── NotFound.jsx            Friendly 404 page
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

---

## Author

| | |
|---|---|
| **Name** | Ganesh Prasad Bhandari |
| **Programme** | BCA - Lumbini City College, Tribhuvan University |
| **Internship** | Frontend Intern (CAIN403) at Sweven Incorporate Pvt. Ltd., Butwal |
| **Mentor** | Mr. Sandesh Tiwari |
| **Supervisor** | Mr. Suraj Kumar Khattri |
| **Duration** | 2026 |

---

## Credits

- **Internship Mentor** - Mr. Sandesh Tiwari
- **Academic Supervisor** - Mr. Suraj Kumar Khattri
- **Host Company** - Sweven Incorporate Pvt. Ltd., Butwal, Nepal
- **College** - Lumbini City College, Tribhuvan University
- **Images** - [Unsplash](https://unsplash.com)
- **Inspiration** - Current status of Nepalese Market

---

## License

All Rights Reserved. Copyright (c) 2026 Sweven Incorporate Pvt. Ltd.
See [`LICENSE`](LICENSE) for details.

---

*Grown in Nepal's soil. Delivered with care. 🌿*
