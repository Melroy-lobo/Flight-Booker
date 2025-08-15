import { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function SearchForm(){
  const [airports,setAirports] = useState([]);
  const [form,setForm] = useState({ from:'', to:'', date:'', pax:1 });
  const nav = useNavigate();

  useEffect(()=>{ api.get('/flights/airports').then(r=> setAirports(r.data)); },[]);
  const onChange = e => setForm(f=> ({...f, [e.target.name]: e.target.value}));

  const submit = (e)=>{
    e.preventDefault();
    const qs = new URLSearchParams(form).toString();
    nav(`/results?${qs}`);
  };

  return (
    <form onSubmit={submit} className="card grid md:grid-cols-5 gap-3">
      <div>
        <div className="label">From</div>
        <select className="input" name="from" value={form.from} onChange={onChange} required>
          <option value="">Select origin</option>
          {airports.map(a=> <option key={a.code} value={a.code}>{a.city} ({a.code})</option>)}
        </select>
      </div>
      <div>
        <div className="label">To</div>
        <select className="input" name="to" value={form.to} onChange={onChange} required>
          <option value="">Select destination</option>
          {airports.map(a=> <option key={a.code} value={a.code}>{a.city} ({a.code})</option>)}
        </select>
      </div>
      <div>
        <div className="label">Date</div>
        <input className="input" type="date" name="date" value={form.date} onChange={onChange} required/>
      </div>
      <div>
        <div className="label">Passengers</div>
        <input className="input" min="1" max="6" type="number" name="pax" value={form.pax} onChange={onChange} required/>
      </div>
      <div className="flex items-end">
        <button className="btn btn-primary w-full">Search</button>
      </div>
    </form>
  );
}
