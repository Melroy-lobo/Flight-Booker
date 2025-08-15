import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api';
import Loader from '../components/Loader.jsx';
import FlightList from '../components/FlightList.jsx';
import BookingDialog from '../components/BookingDialog.jsx';
import { notify } from '../components/Toast.jsx';

function useQuery(){ const { search } = useLocation(); return Object.fromEntries(new URLSearchParams(search)); }

export default function Results(){
  const q = useQuery();
  const [loading,setLoading] = useState(true);
  const [flights,setFlights] = useState([]);
  const [dialog,setDialog] = useState({open:false, flight:null});
  const nav = useNavigate();

  useEffect(()=>{
    setLoading(true);
    api.get('/flights', { params: q }).then(r=> setFlights(r.data)).finally(()=> setLoading(false));
  }, [q.from, q.to, q.date, q.pax]);

  const onBook = (flight)=>{
    const token = localStorage.getItem('token');
    if (!token) { notify('Please login to book'); nav('/login'); return; }
    setDialog({open:true, flight});
  };

  return (
    <div className="grid gap-4">
      <h2 className="text-xl font-semibold">Results</h2>
      {loading ? <Loader/> : <FlightList flights={flights} onBook={onBook}/>} 
      <BookingDialog open={dialog.open} flight={dialog.flight} pax={q.pax} onClose={(refresh)=>{ setDialog({open:false,flight:null}); if(refresh) nav('/my-bookings'); }}/>
    </div>
  );
}
