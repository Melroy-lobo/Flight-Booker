import { useEffect, useState } from 'react';
import api from '../api';
import Loader from '../components/Loader.jsx';
import { notify } from '../components/Toast.jsx';

export default function MyBookings(){
  const [loading,setLoading] = useState(true);
  const [rows,setRows] = useState([]);
  useEffect(()=>{
    api.get('/bookings/mine').then(r=> setRows(r.data)).catch(()=>{}).finally(()=> setLoading(false));
  },[]);

  const cancel = async (id)=>{
    if (!confirm('Cancel this booking?')) return;
    try{ await api.delete(`/bookings/${id}`); setRows(rows=> rows.map(r=> r.id===id? {...r, status:'CANCELLED'}: r)); notify('Booking cancelled'); }catch(e){ notify('Failed'); }
  };

  if (loading) return <Loader/>;
  if (!rows.length) return <div className="card">No bookings yet.</div>;
  return (
    <div className="grid gap-3">
      {rows.map(r=> (
        <div key={r.id} className="card flex items-center gap-4">
          <div className="font-semibold">{r.flight_no}</div>
          <div className="flex-1 text-sm text-gray-700">{r.origin} → {r.destination} • {new Date(r.depart_time).toLocaleString()}</div>
          <div className="text-sm">${r.total_price.toFixed(2)}</div>
          <div className={`text-sm ${r.status==='CONFIRMED'?'text-green-700':'text-gray-500'}`}>{r.status}</div>
          {r.status==='CONFIRMED' && <button className="btn" onClick={()=> cancel(r.id)}>Cancel</button>}
        </div>
      ))}
    </div>
  );
}
