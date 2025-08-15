import FlightCard from './FlightCard.jsx';
export default function FlightList({ flights, onBook }){
  if (!flights.length) return <div className="card">No flights found.</div>;
  return (
    <div className="grid gap-3">{flights.map(f=> <FlightCard key={f.id} flight={f} onBook={onBook}/>)}</div>
  );
}
