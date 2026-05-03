import { useEffect, useState } from 'react';
import client from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    client.get('/events').then((r) => setEvents(r.data));
  }, []);

  const register = async (eventId) => {
    await client.post(`/registrations/${eventId}`);
    alert('Registered! Check My Tickets.');
  };

  return <div className='p-6 grid md:grid-cols-2 gap-4'>
    {events.map((event) => (
      <article key={event._id} className='bg-white p-4 rounded shadow'>
        <h2 className='font-semibold text-lg'>{event.title}</h2>
        <p className='text-sm text-gray-600'>{event.location} • {new Date(event.startDate).toLocaleString()}</p>
        <p className='my-2'>{event.description}</p>
        <p className='text-sm'>Capacity: {event.capacity}</p>
        {user && <button onClick={() => register(event._id)} className='mt-2 bg-emerald-600 text-white px-3 py-1 rounded'>Register</button>}
      </article>
    ))}
  </div>;
}
