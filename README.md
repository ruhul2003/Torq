# TORQ Luxury Motors — Full-Stack Architecture

An ultra-luxury electric and hypercar automotive platform featuring bespoke vehicle configuration, real-time telemetry calibration, and a luxury **Car Hiring System** powered by **Node.js, Express.js, Better Auth, and MongoDB**.

---

## 🏛️ Project Directory Structure

```
Torq/
├── frontend/                   # Next.js 16 (App Router) + Tailwind CSS + Framer Motion
│   ├── src/
│   │   ├── app/
│   │   │   ├── hire/
│   │   │   │   ├── page.jsx            # Car Hiring fleet catalog with category filters
│   │   │   │   └── my-bookings/page.jsx# Customer hire management & review ledger
│   │   │   ├── configurator/page.jsx   # 3D Bespoke vehicle studio
│   │   │   ├── page.jsx                # Luxury showroom homepage
│   │   │   ├── layout.js               # Global layout & fonts
│   │   │   └── globals.css             # Tailwind CSS styles
│   │   ├── components/
│   │   │   ├── HireModal.jsx           # Dynamic pricing calculator & booking modal
│   │   │   ├── HireShowcaseSection.jsx # Homepage rental highlights banner
│   │   │   ├── Navbar.jsx              # Responsive navigation with Car Hire links
│   │   │   └── ...
│   │   ├── lib/
│   │   │   ├── api.js                  # Frontend API client with offline fallback
│   │   │   └── auth-client.js          # Better Auth client configuration
│   │   └── data/                       # Showroom inventory & specs
│   └── package.json
│
├── backend/                    # Node.js + Express.js + Better Auth + MongoDB REST API
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js                   # Mongoose connection pooling & event lifecycle
│   │   │   └── auth.js                 # Better Auth MongoDB adapter instance
│   │   ├── models/
│   │   │   ├── Car.js                  # Luxury vehicle fleet schema & specs
│   │   │   ├── Hire.js                 # Booking reservations & pricing breakdown
│   │   │   └── Review.js               # Client experience appraisals & star ratings
│   │   ├── controllers/
│   │   │   ├── carController.js        # Fleet catalog, search, and admin CRUD
│   │   │   ├── hireController.js       # Dynamic price calculator & bookings workflow
│   │   │   ├── reviewController.js     # Feedback submissions & rating recalculation
│   │   │   ├── statsController.js      # Fleet utilization & rental revenue analytics
│   │   │   └── seedController.js       # Initializer for luxury vehicles & reviews
│   │   ├── middleware/
│   │   │   ├── cors.js                 # Cross-Origin Resource Sharing configuration
│   │   │   ├── logger.js               # Precision HTTP request duration logger
│   │   │   └── errorHandler.js         # Unified Mongoose & HTTP error handler
│   │   ├── routes/
│   │   │   └── api.js                  # Modular Express router for all endpoints
│   │   ├── data/
│   │   │   └── seedCars.js             # 9 production luxury vehicles dataset
│   │   └── server.js                   # Express application entrypoint
│   ├── .env.example
│   └── package.json
│
└── package.json                # Workspace orchestrator
```

---

## 🏎️ Car Hiring System Features

1. **Luxury Fleet Catalog**:
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

4. **Better Auth & MongoDB Integration**:
   - Integrated with MongoDB via official adapter for session and user account management.
   - Role-based fields (`customer`, `admin`, VIP concierge tiers).

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

### 3. Pre-populate Fleet & Reviews (Optional)
You can seed the database with vehicles and client reviews by calling:
```bash
curl http://localhost:5000/api/seed?force=true
```
Or navigating to `http://localhost:5000/api/seed` in your browser.

---

## 📡 REST API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service health status and uptime |
| `GET` | `/api/cars` | List fleet with search & category filters |
| `GET` | `/api/cars/:id` | Vehicle specifications & customer reviews |
| `POST` | `/api/cars` | Add new luxury vehicle (Admin) |
| `PUT` | `/api/cars/:id` | Update vehicle details and rates (Admin) |
| `DELETE` | `/api/cars/:id` | Remove vehicle from fleet (Admin) |
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
