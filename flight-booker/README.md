# ✈️ Flight Booker — Full‑Stack App

Stack: React (Vite) + Express + SQLite + JWT. Includes search, booking, and bookings history.

## Quickstart (local)
```bash
# backend
cd backend
cp .env.example .env
npm i
npm run seed
npm run dev  # http://localhost:4000

# frontend
cd ../frontend
cp .env.example .env
npm i
npm run dev  # http://localhost:5173
```

## Deploy (optional)
- Backend: Render (Node), add disk for SQLite; env: PORT, JWT_SECRET, DB_FILE=/var/data/flightbooker.db
- Frontend: Vercel; env: VITE_API_URL=<backend public URL>
