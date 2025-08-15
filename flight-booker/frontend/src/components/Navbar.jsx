import { Link, useNavigate } from 'react-router-dom';

export default function Navbar(){
  const nav = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const logout = () => { localStorage.clear(); nav('/'); };
  return (
    <div className="bg-white border-b">
      <div className="max-w-5xl mx-auto p-4 flex items-center gap-4">
        <Link to="/" className="text-xl font-semibold">✈️ Flight Booker</Link>
        <div className="ml-auto flex items-center gap-3">
          <Link className="btn" to="/">Home</Link>
          <Link className="btn" to="/my-bookings">My Bookings</Link>
          {token ? (
            <>
              <span className="text-sm text-gray-600">Hi, {user?.name}</span>
              <button className="btn" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link className="btn" to="/login">Login</Link>
              <Link className="btn btn-primary" to="/register">Sign up</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
