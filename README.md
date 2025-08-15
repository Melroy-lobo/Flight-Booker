✈️ Flight Booker

Book your next adventure in seconds with this sleek, full-stack flight booking app.

🚀 Features

Interactive flight search with filters for destination, date, and price.

Real-time results powered by an Express.js backend & SQLite database.

Secure booking with JWT authentication.

User-friendly interface built with React + TailwindCSS.

Manage bookings easily from your dashboard.

🛠 Tech Stack

Frontend: React, TailwindCSS, Vite
Backend: Node.js, Express.js, SQLite, JWT
Database: SQLite (seeded with sample flight data)

📂 Project Structure
frontend/   # React + Tailwind UI
backend/    # Express API + SQLite DB

⚙️ Setup & Installation

Clone the repository

git clone https://github.com/Melroy-lobo/flight-booker.git
cd flight-booker


Backend setup

cd backend
cp .env.example .env
npm install
npm run seed
npm run dev


Backend runs at: http://localhost:4000

Frontend setup

cd ../frontend
cp .env.example .env
npm install
npm run dev


Frontend runs at: http://localhost:5173

🔒 Environment Variables

Create .env files in both frontend/ and backend/ with the values from .env.example.

📜 License

This project is licensed under the MIT License.
