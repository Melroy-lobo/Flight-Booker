import { Router } from 'express';
import { db } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Create a booking (with simple transactional safety)
router.post('/', requireAuth, (req, res) => {
  const { flight_id, passengers } = req.body; // passengers = [{firstName,lastName,age}]
  if (!flight_id || !Array.isArray(passengers) || passengers.length < 1)
    return res.status(400).json({ message: 'flight_id and passengers required' });

  db.serialize(() => {
    db.get('SELECT * FROM flights WHERE id = ?', [flight_id], (err, flight) => {
      if (err) return res.status(500).json({ message: 'DB error' });
      if (!flight) return res.status(404).json({ message: 'Flight not found' });
      if (flight.seats_left < passengers.length)
        return res.status(409).json({ message: 'Not enough seats left' });

      const total = passengers.length * flight.price_usd;
      const insertQ = 'INSERT INTO bookings (user_id, flight_id, passengers_json, total_price, status) VALUES (?, ?, ?, ?, ?)';
      db.run(insertQ, [req.user.id, flight_id, JSON.stringify(passengers), total, 'CONFIRMED'], function (err2) {
        if (err2) return res.status(500).json({ message: 'DB error' });
        const newId = this.lastID;
        db.run('UPDATE flights SET seats_left = seats_left - ? WHERE id = ?', [passengers.length, flight_id], (err3) => {
          if (err3) return res.status(500).json({ message: 'DB error after booking' });
          db.get('SELECT * FROM bookings WHERE id = ?', [newId], (err4, booking) => {
            if (err4) return res.status(500).json({ message: 'DB error' });
            res.json(booking);
          });
        });
      });
    });
  });
});

// My bookings
router.get('/mine', requireAuth, (req, res) => {
  const q = `SELECT b.*, f.flight_no, f.origin, f.destination, f.depart_time, f.arrive_time
             FROM bookings b JOIN flights f ON b.flight_id = f.id
             WHERE b.user_id = ? ORDER BY b.created_at DESC`;
  db.all(q, [req.user.id], (err, rows) => {
    if (err) return res.status(500).json({ message: 'DB error' });
    res.json(rows);
  });
});

// Cancel booking
router.delete('/:id', requireAuth, (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM bookings WHERE id = ? AND user_id = ?', [id, req.user.id], (err, b) => {
    if (err) return res.status(500).json({ message: 'DB error' });
    if (!b) return res.status(404).json({ message: 'Not found' });
    if (b.status !== 'CONFIRMED') return res.status(400).json({ message: 'Only confirmed bookings can be cancelled' });
    const passengers = JSON.parse(b.passengers_json);
    db.run('UPDATE bookings SET status = ? WHERE id = ?', ['CANCELLED', id], (err2) => {
      if (err2) return res.status(500).json({ message: 'DB error' });
      db.run('UPDATE flights SET seats_left = seats_left + ? WHERE id = ?', [passengers.length, b.flight_id], (err3) => {
        if (err3) return res.status(500).json({ message: 'DB error' });
        res.json({ message: 'Cancelled' });
      });
    });
  });
});

export default router;
