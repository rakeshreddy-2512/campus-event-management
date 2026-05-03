import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import EventsPage from './pages/EventsPage';
import AuthPage from './pages/AuthPage';
import TicketsPage from './pages/TicketsPage';
import AdminPage from './pages/AdminPage';
import './index.css';

const Guard = ({ children, admin }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to='/auth' replace />;
  if (admin && user.role !== 'admin') return <Navigate to='/' replace />;
  return children;
};

function App() {
  return <BrowserRouter>
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path='/' element={<EventsPage />} />
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/tickets' element={<Guard><TicketsPage /></Guard>} />
        <Route path='/admin' element={<Guard admin><AdminPage /></Guard>} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
