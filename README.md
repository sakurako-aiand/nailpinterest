# Tiyu Salon Tokyo Lookbook

> A luxury, bilingual client portal and virtual nail design studio for **Tiyu Salon Tokyo** — an English-friendly nail art, lash, and tattoo salon in Shinjuku, Tokyo.

**Live App:** [https://nailpinterest-9df8e2eb.onbld.com](https://nailpinterest-9df8e2eb.onbld.com)
**Website:** [https://www.tiyutokyo.com](https://www.tiyutokyo.com)
**Instagram:** [https://www.instagram.com/tiyusalontokyo/](https://www.instagram.com/tiyusalontokyo/)

---

## Strategic Vision

### What This App Accomplishes

The Tiyu Salon Tokyo Lookbook bridges the gap between inspiration and appointment. It transforms the traditional salon discovery experience — where clients scroll Instagram, screenshot looks, and struggle to communicate what they want — into a seamless, interactive journey from **discovery → customization → booking**.

### Business Goals

1. **Reduce consultation friction** — Clients arrive knowing exactly what they want, with saved looks, custom mockups, and estimated pricing already figured out.
2. **Increase booking conversion** — Every screen funnels toward the "Book My Appointment" CTA, with policy awareness built in.
3. **Set clear expectations** — Transparent pricing estimator and visible salon policy eliminate surprises and reduce no-shows.
4. **Premium brand positioning** — Every pixel reflects the luxury, minimalist aesthetic of the Tiyu brand. The app feels like an extension of the salon itself.
5. **Bilingual accessibility** — Full English and Japanese support serves both international and local clients in Tokyo.

### User Journey

```
Gallery (discover looks)
  → Detail View (see palette + estimated price)
    → Design Canvas (mix & match on virtual hand)
      → Price Estimator (calculate exact investment)
        → Wishlist (save everything)
          → Policy acknowledgment
            → Book Appointment (redirect to website)
```

---

## Features

### 1. The Tiyu Gallery (Home Feed)
- High-end masonry grid of 18 real portfolio images pulled directly from the Tiyu Salon Tokyo website
- Each tile displays the look title and starting price on hover
- Tapping any photo opens the Detail View
- CTA banners for the Price Estimator and Design Canvas

### 2. Detail View
- Large nail photo display
- **Estimated Investment** — priced by design tier (Single / Simple / Complicated / Intense)
- **"Customize My Estimate"** button — opens the full Price Estimator
- **The Tiyu Palette** — exact colors and brands used for each look, displayed as elegant chips with color swatches
- **Tags** — pill-shaped, clickable tags (#Chrome, #Almond, #FrenchTip, #Bridal, etc.) that link to filtered search results
- **Add to Wishlist** button with heart icon toggle
- **Try on Canvas** button — sends the look directly to the Design Canvas

### 3. Price Estimator
A live calculator based on the salon's actual pricing structure:
- **Base Price:** ¥8,000 (single color gel manicure)
- **Design Level:**
  - Single Color (+¥0)
  - Simple Design (+¥3,000)
  - Complicated Design (+¥5,500)
  - Intense Design (+¥9,000)
- **Extensions:**
  - Natural Nails (¥0)
  - Full Set Extensions (+¥4,500)
  - Per Finger (+¥600 × count)
  - Overlay Per Finger (+¥450 × count)
- **Removal:**
  - No Removal (¥0)
  - Polish Removal (+¥1,000)
  - Gel Removal (+¥2,000)
  - Acrylic/Fill Removal (+¥3,000)
- Live total updates as the client selects options
- Sticky total bar at the bottom

### 4. Design Canvas (Virtual Try-On)
A groundbreaking virtual nail design studio with two modes:

**Hand Mode:**
- Custom SVG hand model with 5 almond-shaped nail drop zones
- Tap-to-apply UX (mobile-optimized): select a design from the strip, then tap a finger
- CSS border-radius masking creates realistic almond/oval nail shapes
- Each nail zone scales correctly (pinky nail smaller than middle finger)
- Pulsing animation on empty nails when a design is selected
- Tap a filled nail to remove its design
- **Finalize Look** — Canvas API composites the hand SVG + clipped nail images into a single PNG with "tiyu salon tokyo" watermark
- **Send to Tiyu** — Web Share API (mobile) or email fallback to tiyusalontokyo@gmail.com
- **Save Image** — downloads the PNG directly to device
- **Book Appointment** — flows directly into the booking modal

**Board Mode (Mood Board):**
- Two-column drag-and-drop interface
- Left: scrollable masonry gallery (Unsplash nail art + device upload)
- Right: 6 dashed-border empty cards
- Drag any gallery image onto a card to fill it
- Custom drag ghost follows cursor; cards highlight on hover
- Upload button adds images from device to the gallery
- Per-card remove + Clear All

### 5. My Wishlist (Collection)
- Private saved looks — mixes designs saved from the gallery with personally uploaded inspiration
- Persisted in localStorage (survives page refresh)
- Masonry grid layout with item count
- **"Book My Appointment"** — luxury gradient CTA button that opens the booking reminder modal before redirecting to the salon's booking page

### 6. Inspo for Tiyu (Upload)
- Private upload tool where clients upload inspiration photos from anywhere
- Saves ONLY to the user's wishlist — does not appear on any public feed
- Clients can show these photos to the nail tech during their appointment
- Form: photo upload, look title, colors & details

### 7. Search & Tagging System
- Real-time search across titles, colors, brands, design tiers, and tags
- **Popular Tags** section with clickable pill buttons for instant filtering
- Tags include: #Chrome, #Almond, #FrenchTip, #Bridal, #Minimalist, #Stiletto, #CleanGirl, #Ombré, #3DArt, #LineArt, and more
- Tapping a tag in the Detail View jumps to Search with that tag pre-filtered

### 8. Salon Policy Screen
Full policy display with three sections:
- **Cancellation/Rescheduling** — Full refund (4+ days), 50% refund (4 days before), no refund (<4 days or no-show)
- **Late Arrivals** — Service shortening, 15-min no-show rule, ¥3,500 delay fee, companion drink charge (¥770)
- **Refund/Refix** — No refunds after service, 1-week refix for technical issues only (chips, cracks, detached parts, lifted extensions), design adjustments must be made during appointment

### 9. Booking Reminder Modal
When clients tap "Book My Appointment," a modal slides up with 3 key policy reminders:
1. Cancellation policy summary
2. Late arrival policy summary
3. Refix policy summary

Clients must tap **"I Understand — Continue to Booking"** before being redirected to the booking page. A "View Full Policy" link opens the complete policy screen.

### 10. Bilingual Support (English / Japanese)
- Language toggle button (EN / 日本語) in the top-right corner
- Every piece of UI text, labels, buttons, forms, notifications, policies, and estimator options fully translated
- Remembers language preference in localStorage
- Instant re-render on language switch

### 11. Desktop / Mobile View Toggle
- View toggle button in the top-left corner
- **Mobile mode:** 480px centered width (default)
- **Desktop mode:** Full-screen width with 4-column masonry grid and centered content (max 720px readable width)
- Smooth transition animation between modes
- Remembers preference in localStorage

### 12. Luxury Minimalist Aesthetic
- **Color Palette:** Ivory/Cream background (#FCFBF7), Taupe/Champagne accents (#C9A991, #A38874, #E5D3B3), Deep Espresso text (#3D3D3D)
- **Typography:** Playfair Display (italic serif headings), Questrial (clean sans-serif body), Syne (brand)
- Thin-line minimalist icons (stroke-width 1-1.2)
- Frosted glass bottom navigation with backdrop blur
- Subtle soft shadows instead of heavy borders
- Increased whitespace and padding for an "airy, expensive" feel
- Rounded corners (18px / 14px)
- Uppercase letter-spaced labels for editorial feel

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Vanilla JavaScript (ES Modules), HTML5, CSS3 |
| State Management | Custom Store class with localStorage persistence |
| Image Compositing | Canvas API (Design Canvas finalize) |
| Drag & Drop | Pointer Events API (cross-platform touch + mouse) |
| Deployment | Build.io (Python SimpleHTTPServer, Heroku-24 stack) |
| Fonts | Google Fonts (Playfair Display, Questrial, Syne) |
| Images | Wix static media (portfolio), Unsplash (gallery placeholders) |

## Project Structure

```
nailpinterest/
├── index.html              # Main app entry point
├── moodboard.html          # Standalone mood board (legacy)
├── server.py               # Python HTTP server (deployment)
├── Procfile                # Build.io process config
├── requirements.txt        # Python dependencies (none)
├── .python-version         # Python 3.11
├── static.json             # Static file config
├── css/
│   ├── styles.css           # Main app styles (luxury minimalist)
│   └── moodboard.css        # Standalone mood board styles
├── js/
│   ├── app.js              # App entry, init, language & view toggles
│   ├── data.js             # Portfolio data, pricing, tags, helpers
│   ├── i18n.js             # English/Japanese translation system
│   ├── store.js            # Wishlist state management (localStorage)
│   ├── utils.js            # Navigation, toast notifications
│   ├── moodboard.js        # Standalone mood board logic (legacy)
│   └── screens/
│       ├── home.js         # Gallery / home feed
│       ├── detail.js       # Detail view (palette, price, tags, save)
│       ├── estimator.js    # Price calculator
│       ├── canvas.js       # Design Canvas (Hand mode + Board mode)
│       ├── collection.js   # Wishlist / saved looks
│       ├── upload.js       # Inspo upload (private)
│       ├── search.js       # Search with tag filtering
│       ├── policy.js       # Salon policy screen
│       └── booking.js      # Booking reminder modal
└── README.md
```

## Deployment

The app is deployed on **Build.io** and accessible at:
**https://nailpinterest-9df8e2eb.onbld.com**

```bash
# Push to Build.io
git push bld master:main

# Restart dyno
bld ps:scale -a nailpinterest web=0
bld ps:scale -a nailpinterest web=1
```

## Development

No build step required — this is a static site served by Python's `SimpleHTTPRequestHandler`.

```bash
# Run locally
python3 -m http.server 8080

# Or
python3 server.py
```

Then open `http://localhost:8080` in your browser.

---

## Pricing Reference (from tiyutokyo.com)

| Service | Price Range (JPY) |
|---------|-------------------|
| Single Color Gel Manicure | ¥8,000 – ¥9,000 |
| Simple Design | ¥10,000 – ¥12,000 |
| Complicated Design | ¥12,000 – ¥15,000 |
| Intense Design | ¥15,000 – ¥19,000 |
| Full Set Extensions | +¥4,500 |
| Per Finger Extension | +¥600 |
| Overlay Per Finger | +¥450 |
| Polish Removal | +¥1,000 |
| Gel Removal | +¥2,000 |
| Acrylic/Fill Removal | +¥3,000 |
| Custom Press-Ons | ¥3,500 discount vs. gel |
| Tattoo (Small) | ¥8,000 – ¥12,000 |
| Tattoo (Medium) | ¥15,000 – ¥21,000 |
| Tattoo (Large) | ¥25,000 – ¥35,000 |

## Salon Information

- **Name:** Tiyu Salon Tokyo (tiyu salon tokyo | 治癒)
- **Location:** 〒162-0805, Yaraicho 139, OS House 102, Shinjuku City, Tokyo
- **Email:** tiyusalontokyo@gmail.com
- **Booking:** [tiyutokyo.com/salon-manicure](https://www.tiyutokyo.com/salon-manicure)
- **Instagram:** [@tiyusalontokyo](https://www.instagram.com/tiyusalontokyo/)

---

© 2026 by Tiyu Tokyo | 治癒
