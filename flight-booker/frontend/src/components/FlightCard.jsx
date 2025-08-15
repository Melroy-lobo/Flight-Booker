export default function FlightCard({ flight, onBook }){
  const dep = new Date(flight.depart_time);
  const arr = new Date(flight.arrive_time);
  const dtf = (d)=> d.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
  return (
    <div className="card flex items-center gap-4">
      <div className="text-lg font-semibold w-24">{flight.flight_no}</div>
      <div className="flex-1">
        <div className="text-sm text-gray-600">{flight.origin} → {flight.destination}</div>
        <div className="font-medium">{dtf(dep)} — {dtf(arr)} • {flight.duration_min}m</div>
      </div>
      <div className="text-right">
        <div className="text-xl font-semibold">${flight.price_usd.toFixed(0)}</div>
        <div className="text-xs text-gray-500">{flight.seats_left} seats left</div>
      </div>
      <button className="btn btn-primary" onClick={()=> onBook(flight)}>Book</button>
    </div>
  );
}
