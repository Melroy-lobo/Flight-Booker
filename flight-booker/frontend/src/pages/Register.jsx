import { useState } from 'react';
import api from '../api';
import { useNavigate, Link } from 'react-router-dom';
import { notify } from '../components/Toast.jsx';

export default function Register(){
  const [form,setForm] = useState({ name:'', email:'', password:'' });
  const nav = useNavigate();
  const submit = async (e)=>{
    e.preventDefault();
    try{
      const { data } = await api.post('/auth/register', form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      notify('Account created!');
      nav('/');
    }catch(e){ notify(e.response?.data?.message || 'Registration failed'); }
  };
  return (
    <form onSubmit={submit} className="card max-w-md mx-auto grid gap-3">
      <h2 className="text-xl font-semibold">Create account</h2>
      <input className="input" placeholder="Full name" value={form.name} onChange={e=> setForm(f=>({...f, name:e.target.value}))} required/>
      <input className="input" placeholder="Email" type="email" value={form.email} onChange={e=> setForm(f=>({...f, email:e.target.value}))} required/>
      <input className="input" placeholder="Password" type="password" value={form.password} onChange={e=> setForm(f=>({...f, password:e.target.value}))} required/>
      <button className="btn btn-primary">Sign up</button>
      <div className="text-sm">Have an account? <Link className="text-blue-600" to="/login">Login</Link></div>
    </form>
  );
}
