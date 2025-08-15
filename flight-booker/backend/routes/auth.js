import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../db.js';

const router = Router();

router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'All fields required' });
  const hash = bcrypt.hashSync(password, 10);
  const q = 'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)';
  db.run(q, [name, email.toLowerCase(), hash], function (err) {
    if (err) {
      if (err.message.includes('UNIQUE')) return res.status(409).json({ message: 'Email already registered' });
      return res.status(500).json({ message: 'DB error' });
    }
    const token = jwt.sign({ id: this.lastID, email: email.toLowerCase() }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: this.lastID, name, email: email.toLowerCase() } });
  });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const q = 'SELECT * FROM users WHERE email = ?';
  db.get(q, [email.toLowerCase()], (err, user) => {
    if (err) return res.status(500).json({ message: 'DB error' });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = bcrypt.compareSync(password, user.password_hash);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  });
});

export default router;
