import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Toast from './components/Toast.jsx';

export default function App(){
  return (
    <div>
      <Navbar/>
      <div className="max-w-5xl mx-auto p-4">
        <Outlet/>
      </div>
      <Toast/>
    </div>
  );
}
