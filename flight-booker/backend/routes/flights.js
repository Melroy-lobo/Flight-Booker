import { Router } from 'express';
import { db } from '../db.js';

const router = Router();

// Airports list (for dropdowns)
router.get('/airports', (req, res) => {
  db.all('SELECT * FROM airports ORDER BY city', [], (err, rows) => {
    if (err) return res.status(500).json({ message: 'DB error' });
    res.json(rows);
  });
});

// Search flights
router.get('/', (req, res) => {
  const { from, to, date, pax = 1 } = req.query;
  if (!from || !to || !date) return res.status(400).json({ message: 'from, to, date required' });
  const dayStart = new Date(date + 'T00:00:00');
  const dayEnd = new Date(date + 'T23:59:59');
  const q = `SELECT * FROM flights WHERE origin = ? AND destination = ? AND datetime(depart_time) BETWEEN datetime(?) AND datetime(?) AND seats_left >= ? ORDER BY depart_time`;
  db.all(q, [from, to, dayStart.toISOString(), dayEnd.toISOString(), pax], (err, rows) => {
    if (err) return res.status(500).json({ message: 'DB error' });
    res.json(rows);
  });
});

// Single flight
router.get('/:id', (req, res) => {
  db.get('SELECT * FROM flights WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ message: 'DB error' });
    if (!row) return res.status(404).json({ message: 'Not found' });
    res.json(row);
  });
});

export default router;
