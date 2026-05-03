import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AuthPage() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (mode === 'login') await login(form.email, form.password);
    else await register(form);
    nav('/');
  };

  return <form onSubmit={submit} className='max-w-md mx-auto mt-10 bg-white p-6 rounded shadow space-y-3'>
    <h1 className='text-xl font-semibold'>{mode === 'login' ? 'Login' : 'Create account'}</h1>
    {mode === 'register' && <input className='w-full border p-2' placeholder='Name' onChange={(e) => setForm({ ...form, name: e.target.value })} />}
    <input className='w-full border p-2' placeholder='Email' onChange={(e) => setForm({ ...form, email: e.target.value })} />
    <input className='w-full border p-2' type='password' placeholder='Password' onChange={(e) => setForm({ ...form, password: e.target.value })} />
    <button className='w-full bg-indigo-600 text-white p-2 rounded'>Continue</button>
    <button type='button' className='text-sm underline' onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>Switch to {mode === 'login' ? 'register' : 'login'}</button>
  </form>;
}
