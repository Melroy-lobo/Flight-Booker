import 'dotenv/config';
import { db, init } from './db.js';

init();

const airports = [
  { code: 'KWI', name: 'Kuwait International Airport', city: 'Kuwait City', country: 'Kuwait' },
  { code: 'DXB', name: 'Dubai International Airport', city: 'Dubai', country: 'UAE' },
  { code: 'DOH', name: 'Hamad International Airport', city: 'Doha', country: 'Qatar' },
  { code: 'BAH', name: 'Bahrain International Airport', city: 'Manama', country: 'Bahrain' },
  { code: 'RUH', name: 'King Khalid International', city: 'Riyadh', country: 'Saudi Arabia' }
];

function addDays(date, days){ const d = new Date(date); d.setDate(d.getDate()+days); return d; }

function seedFlights() {
  const today = new Date();
  const carriers = ['FB', 'GX', 'SKY', 'FT'];
  const routes = [
    ['KWI','DXB', 90], ['KWI','DOH', 85], ['KWI','BAH', 80], ['KWI','RUH', 95],
    ['DXB','KWI', 90], ['DOH','KWI', 85]
  ];
  const items = [];
  for (let i=0; i<30; i++) {
    routes.forEach(([o,d,dur]) => {
      const dep = addDays(today, i);
      [8, 13, 19].forEach(hr => {
        const depart = new Date(dep.getFullYear(), dep.getMonth(), dep.getDate(), hr, 0, 0);
        const arrive = new Date(depart.getTime() + dur*60000);
        const price = 59 + Math.floor(Math.random()*120);
        const cap = 120;
        items.push({
          flight_no: carriers[Math.floor(Math.random()*carriers.length)] + (100 + Math.floor(Math.random()*900)),
          origin: o,
          destination: d,
          depart_time: depart.toISOString(),
          arrive_time: arrive.toISOString(),
          duration_min: dur,
          price_usd: price,
          capacity: cap,
          seats_left: cap - Math.floor(Math.random()*30)
        });
      });
    });
  }
  return items;
}

const run = async () => {
  db.serialize(() => {
    db.run('DELETE FROM airports');
    db.run('DELETE FROM flights');
    const aStmt = db.prepare('INSERT INTO airports (code,name,city,country) VALUES (?,?,?,?)');
    airports.forEach(a => aStmt.run([a.code,a.name,a.city,a.country]));
    aStmt.finalize();

    const fStmt = db.prepare(`INSERT INTO flights (flight_no,origin,destination,depart_time,arrive_time,duration_min,price_usd,capacity,seats_left)
      VALUES (?,?,?,?,?,?,?,?,?)`);
    seedFlights().forEach(f => fStmt.run([f.flight_no,f.origin,f.destination,f.depart_time,f.arrive_time,f.duration_min,f.price_usd,f.capacity,f.seats_left]));
    fStmt.finalize(() => {
      console.log('Seeded airports & flights');
      process.exit(0);
    });
  });
};

run();
