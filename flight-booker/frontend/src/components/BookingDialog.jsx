import { useState } from 'react';
import api from '../api';
import { notify } from './Toast.jsx';

export default function BookingDialog({ open, onClose, flight, pax }){
  const [passengers, setPassengers] = useState(Array.from({length: Number(pax||1)}, ()=>({firstName:'', lastName:'', age:18})));
  if (!open) return null;

  const onChange = (i, field, value) => {
    setPassengers(prev => prev.map((p, idx) => idx===i? {...p, [field]: value}: p));
  };

  const book = async () => {
    try {
      const res = await api.post('/bookings', { flight_id: flight.id, passengers });
      notify('Booking confirmed');
      onClose(true);
    } catch (e) {
      notify(e.response?.data?.message || 'Booking failed');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4">
      <div className="card w-full max-w-2xl">
        <div className="flex items-center mb-3">
          <div className="font-semibold text-lg">Complete Booking — {flight.flight_no}</div>
          <button className="ml-auto btn" onClick={()=> onClose(false)}>Close</button>
        </div>
        <div className="grid gap-4">
          {passengers.map((p, i)=> (
            <div key={i} className="grid md:grid-cols-3 gap-2">
              <input className="input" placeholder="First name" value={p.firstName} onChange={e=> onChange(i,'firstName',e.target.value)} />
              <input className="input" placeholder="Last name" value={p.lastName} onChange={e=> onChange(i,'lastName',e.target.value)} />
              <input className="input" type="number" min="0" placeholder="Age" value={p.age} onChange={e=> onChange(i,'age',e.target.value)} />
            </div>
          ))}
          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-600">Total: <b>${(passengers.length * flight.price_usd).toFixed(2)}</b></div>
            <button className="btn btn-primary ml-auto" onClick={book}>Pay & Book</button>
          </div>
        </div>
      </div>
    </div>
  );
}
