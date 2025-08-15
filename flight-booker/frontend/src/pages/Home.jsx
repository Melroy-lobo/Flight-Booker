import SearchForm from '../components/SearchForm.jsx';

export default function Home(){
  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-semibold">Find your next flight</h1>
      <SearchForm/>
      <div className="text-sm text-gray-600">Try KWI → DXB, a date within the next 30 days.</div>
    </div>
  );
}
