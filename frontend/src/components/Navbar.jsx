import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className='bg-slate-900 text-white px-6 py-4 flex justify-between'>
      <div className='font-bold'>Campus Events</div>
      <div className='flex gap-4 items-center'>
        <Link to='/'>Events</Link>
        {user && <Link to='/tickets'>My Tickets</Link>}
        {user?.role === 'admin' && <Link to='/admin'>Admin</Link>}
        {user ? (
          <button onClick={logout} className='bg-rose-600 px-3 py-1 rounded'>Logout</button>
        ) : (
          <Link to='/auth'>Login</Link>
        )}
      </div>
    </nav>
  );
}
