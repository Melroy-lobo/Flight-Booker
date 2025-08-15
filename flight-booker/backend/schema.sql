PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS airports (
  code TEXT PRIMARY KEY, -- e.g., DXB, DOH, KWI
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  country TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS flights (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  flight_no TEXT NOT NULL,
  origin TEXT NOT NULL REFERENCES airports(code),
  destination TEXT NOT NULL REFERENCES airports(code),
  depart_time TEXT NOT NULL, -- ISO
  arrive_time TEXT NOT NULL, -- ISO
  duration_min INTEGER NOT NULL,
  price_usd REAL NOT NULL,
  capacity INTEGER NOT NULL,
  seats_left INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  flight_id INTEGER NOT NULL REFERENCES flights(id) ON DELETE CASCADE,
  passengers_json TEXT NOT NULL, -- array of passengers
  total_price REAL NOT NULL,
  status TEXT NOT NULL DEFAULT 'CONFIRMED',
  created_at TEXT DEFAULT (datetime('now'))
);
