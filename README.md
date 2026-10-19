# TORQ Luxury Motors — Full-Stack Architecture

An ultra-luxury electric and hypercar automotive platform featuring bespoke vehicle configuration, real-time telemetry calibration, a luxury **Car Hiring System**, and a complete **Original Car Parts Selling System** powered by **Node.js, Express.js, Better Auth, Next.js 16, and MongoDB**.

---

## 🏛️ Project Directory Structure

```
Torq/
├── frontend/                   # Next.js 16 (App Router) + Tailwind CSS + Framer Motion
│   ├── src/
│   │   ├── app/
│   │   │   ├── parts/
│   │   │   │   ├── page.jsx            # Original Car Parts catalog with multi-filters & cart
│   │   │   │   └── orders/page.jsx     # Customer parts orders & live shipment tracking
│   │   │   ├── hire/
│   │   │   │   ├── page.jsx            # Car Hiring fleet catalog with category filters
│   │   │   │   └── my-bookings/page.jsx# Customer hire management & review ledger
│   │   │   ├── configurator/page.jsx   # 3D Bespoke vehicle studio
│   │   │   ├── page.jsx                # Luxury showroom homepage with parts showcase
│   │   │   ├── layout.js               # Global layout, fonts & CartProvider
│   │   │   └── globals.css             # Tailwind CSS styles & glassmorphic tokens
│   │   ├── components/
│   │   │   ├── parts/
│   │   │   │   ├── PartCard.jsx        # OEM product card with fitment & stock status
│   │   │   │   ├── PartsFilterBar.jsx  # Multi-criteria toolbar & category pills
│   │   │   │   ├── FitmentChecker.jsx  # VIN and supercar model fitment validator
│   │   │   │   ├── PartDetailModal.jsx # In-depth technical specifications modal
│   │   │   │   ├── CartDrawer.jsx      # Slide-over shopping bag drawer
│   │   │   │   ├── PartCheckoutModal.jsx # White-glove checkout & shipping tier selection
│   │   │   │   ├── OrderReceiptModal.jsx # Digital invoice & receipt modal
│   │   │   │   ├── PartOrdersHistory.jsx # Live shipment tracking visualizer
│   │   │   │   ├── AuthenticityLookup.jsx# Hologram anti-counterfeit seal verification
│   │   │   │   └── OemBadge.jsx        # Factory authenticity certified chips
│   │   │   ├── PartsShowcaseSection.jsx# Homepage OEM parts showcase banner
│   │   │   ├── HireModal.jsx           # Dynamic pricing calculator & booking modal
│   │   │   ├── Navbar.jsx              # Responsive navigation with Parts & Cart bag
│   │   │   └── ...
│   │   ├── context/
│   │   │   ├── CartContext.jsx         # Persistent shopping bag state & fitment sync
│   │   │   └── ThemeContext.jsx        # Dark/light luxury theme toggle
│   │   ├── lib/
│   │   │   ├── api.js                  # Frontend API client with offline fallback
│   │   │   └── auth-client.js          # Better Auth client configuration
│   │   └── data/
│   │       ├── partsInventory.js       # 16 authentic OEM luxury car parts
│   │       └── inventory.js            # Showroom vehicle inventory
│   └── package.json
│
├── backend/                    # Node.js + Express.js + Better Auth + MongoDB REST API
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js                   # Mongoose connection pooling & event lifecycle
│   │   │   └── auth.js                 # Better Auth MongoDB adapter instance
│   │   ├── models/
│   │   │   ├── Part.js                 # Authentic OEM car parts schema
│   │   │   ├── PartOrder.js            # Customer parts purchase orders & tracking
│   │   │   ├── Car.js                  # Luxury vehicle fleet schema & specs
│   │   │   ├── Hire.js                 # Booking reservations & pricing breakdown
│   │   │   └── Review.js               # Client experience appraisals & star ratings
│   │   ├── controllers/
│   │   │   ├── partController.js       # Parts catalog, search, fitment & authenticity
│   │   │   ├── partOrderController.js  # Orders fulfillment, stock deduction & tracking
│   │   │   ├── carController.js        # Fleet catalog, search, and admin CRUD
│   │   │   ├── hireController.js       # Dynamic price calculator & bookings workflow
│   │   │   ├── reviewController.js     # Feedback submissions & rating recalculation
│   │   │   ├── statsController.js      # Fleet utilization & rental revenue analytics
│   │   │   └── seedController.js       # Initializer for luxury vehicles & OEM parts
│   │   ├── scripts/
│   │   │   ├── seed.js                 # Unified database seeding script
│   │   │   └── seedParts.js            # Dedicated OEM parts seeding script
│   │   ├── middleware/
│   │   │   ├── cors.js                 # Cross-Origin Resource Sharing configuration
│   │   │   ├── logger.js               # Precision HTTP request duration logger
│   │   │   └── errorHandler.js         # Unified Mongoose & HTTP error handler
│   │   ├── routes/
│   │   │   └── api.js                  # Modular Express router for all endpoints
│   │   ├── data/
│   │   │   ├── seedParts.js            # 16 OEM parts dataset (Brakes, Turbos, Aero, Rims)
│   │   │   └── seedCars.js             # Production luxury vehicles dataset
│   │   └── server.js                   # Express application entrypoint
│   ├── .env.example
│   └── package.json
│
└── package.json                # Workspace orchestrator
```

---

## ⚙️ Original Car Parts Selling System Features

1. **Certified OEM Catalog (`/parts`)**:
   - 16+ authentic components from Porsche Tequipment, Ferrari Genuine, McLaren MSO, Lamborghini Squadra, Akrapovič Titanium, Brembo Racing, and BBS Motorsport.
   - Comprehensive categories: *Braking Systems (PCCB)*, *Titanium Exhausts*, *Powertrain & Turbos*, *Suspension Coilovers*, *Carbon Aerodynamics*, *Monobloc Forged Wheels*, *Alcantara Cockpits*, and *Motorsport ECUs*.
   - Filter by manufacturer brand, vehicle model compatibility, condition (*OEM Brand New* vs *Bespoke Performance Edition*), and in-stock status.

2. **Precision Vehicle Fitment Engine**:
   - Supercar chassis selector or 17-digit VIN decoder.
   - Cross-checks factory CAD tolerances and displays "Guaranteed Direct Bolt-On Fitment" pills directly on product cards.

3. **Persistent Shopping Cart & White-Glove Checkout**:
   - Slide-over shopping bag drawer with live component counter and quantity controls.
   - White-glove enclosed air cargo logistics tier selection.
   - Integrated private banking escrow settlement.
   - Automated inventory stock reduction upon order confirmation.

4. **Digital Receipt & Invoice Modal**:
   - Order tracking reference (`TRQ-OEM-XXXXX`), enclosed freight tracking number, itemized pricing breakdown, and print-ready invoice.

5. **Customer Orders & Live Shipment Tracking (`/parts/orders`)**:
   - 4-stage tracking visualizer: *Order Placed* → *Laser Authenticity Verified* → *Enclosed Air Dispatched* → *Delivered & Signed*.
   - Instant order cancellation with escrow release before carrier dispatch.

6. **Hologram Anti-Counterfeit Registry Lookup**:
   - Cryptographic verification portal matching hologram codes (e.g., `TRQ-OEM-POR-992-8821`) against factory inspection archives.

---

## 🏎️ Car Hiring System Features

1. **Luxury Fleet Catalog (`/hire`)**:
   - Filter by categories: *Hypercars*, *Grand Tourers*, *Luxury SUVs*, *Bespoke & Track*.
   - Real-time search across model names, locations, and powertrain architectures.
   - Transparent pricing: Daily rates, hourly rates, and refundable escrow security deposits.

2. **Dynamic Pricing Calculator**:
   - Date selection (Start & Return dates with day counting).
   - Delivery choices: *TORQ Flagship Showroom*, *White-Glove Villa Handover*, or *Private Jet Tarmac Meet*.
   - Optional Executive Chauffeur service (+$450/day).
   - Protection packages: *Standard Coverage*, *Premium Shield*, or *Executive Zero Liability*.
   - Automatic local luxury surcharge & sales tax calculation.

3. **Customer Booking Ledger (`/hire/my-bookings`)**:
   - Live reservation status tracking (*Confirmed*, *In Progress*, *Completed*, *Cancelled*).
   - Cancellation workflow with instant security deposit release.
   - Post-drive experience appraisal & verified 5-star review submissions.

---

## 🛠️ Getting Started

### 1. Configure Backend Environment
Copy the `.env.example` in `backend/` to `backend/.env`:
```bash
cd backend
cp .env.example .env
```
Update your `MONGODB_URI` with your MongoDB connection string (e.g., local MongoDB or MongoDB Atlas).

### 2. Start the Applications

From the root directory:

```bash
# Start backend API (Node.js & Express on http://localhost:5000)
npm run dev:backend

# In a separate terminal, start frontend (Next.js on http://localhost:3000)
npm run dev:frontend
```

### 3. Seed Fleet & Original Parts

```bash
# Seed both luxury cars and OEM parts into MongoDB Atlas:
npm run seed

# Or seed only parts:
npm run seed:parts
```

---

## 📡 REST API Reference

### Original Car Parts & Orders Endpoints
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/parts` | List OEM parts with category, brand, price, & fitment filters |
| `GET` | `/api/parts/:id` | Retrieve part specifications and related components |
| `GET` | `/api/parts/featured` | Retrieve featured showcase performance parts |
| `GET` | `/api/parts/categories` | Retrieve part catalog categories and icons |
| `POST` | `/api/parts/check-fitment` | Validate compatibility with vehicle model or VIN |
| `POST` | `/api/parts/verify-authenticity`| Verify hologram anti-counterfeit certificate |
| `POST` | `/api/parts` | Add new OEM part record (Admin) |
| `PUT` | `/api/parts/:id` | Update part pricing, specs, or stock (Admin) |
| `DELETE` | `/api/parts/:id` | Remove part from catalog (Admin) |
| `POST` | `/api/parts-orders` | Place new car parts order with stock reduction |
| `GET` | `/api/parts-orders` | Fetch customer part order history |
| `GET` | `/api/parts-orders/:id` | Get order details & shipment tracking timeline |
| `POST` | `/api/parts-orders/:id/cancel` | Cancel order and restore inventory stock |

### Luxury Car Hire Endpoints
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service health status and uptime |
| `GET` | `/api/cars` | List fleet with search & category filters |
| `GET` | `/api/cars/:id` | Vehicle specifications & customer reviews |
| `POST` | `/api/hires/estimate` | Compute dynamic rental cost breakdown |
| `POST` | `/api/hires` | Authorize and confirm luxury car hire |
| `GET` | `/api/hires` | Retrieve customer reservations ledger |
| `POST` | `/api/hires/:id/cancel` | Cancel booking and release deposit |
| `GET` | `/api/reviews` | Retrieve verified customer appraisals |
| `POST` | `/api/reviews` | Submit appraisal & recalculate rating score |
| `GET` | `/api/stats/dashboard` | Fleet utilization & rental revenue analytics |
| `ALL` | `/api/auth/*` | Better Auth endpoint handler |

---

## 📄 License
ISC © TORQ Luxury Motors
