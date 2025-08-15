import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { db, init } from './db.js';
import authRoutes from './routes/auth.js';
import flightRoutes from './routes/flights.js';
import bookingRoutes from './routes/bookings.js';

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

init();

app.get('/api/health', (_, res) => res.json({ ok: true }));
app.use('/api/auth', authRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/bookings', bookingRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));

process.on('SIGINT', () => { db.close(); process.exit(0); });
