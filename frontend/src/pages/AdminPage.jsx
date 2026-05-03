import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import client from '../api/client';

export default function AdminPage() {
  const [analytics, setAnalytics] = useState({ totalEvents: 0, totalRegistrations: 0, capacityUsage: [] });
  const [form, setForm] = useState({ title: '', description: '', category: 'General', location: '', startDate: '', endDate: '', capacity: 50 });

  const fetchAnalytics = () => client.get('/events/analytics/overview').then((r) => setAnalytics(r.data));
  useEffect(() => { fetchAnalytics(); }, []);

  const createEvent = async (e) => {
    e.preventDefault();
    await client.post('/events', form);
    fetchAnalytics();
    alert('Event created');
  };

  return <div className='p-6 space-y-6'>
    <section className='grid grid-cols-2 gap-4'>
      <div className='bg-white p-4 rounded shadow'>Total Events: <strong>{analytics.totalEvents}</strong></div>
      <div className='bg-white p-4 rounded shadow'>Total Registrations: <strong>{analytics.totalRegistrations}</strong></div>
    </section>
    <section className='bg-white p-4 rounded shadow h-72'>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart data={analytics.capacityUsage}>
          <XAxis dataKey='event' hide />
          <YAxis />
          <Tooltip />
          <Bar dataKey='occupancy' fill='#4f46e5' />
        </BarChart>
      </ResponsiveContainer>
    </section>
    <form onSubmit={createEvent} className='bg-white p-4 rounded shadow grid md:grid-cols-2 gap-3'>
      {Object.entries(form).map(([k, v]) => <input key={k} value={v} type={k.includes('Date') ? 'datetime-local' : k === 'capacity' ? 'number' : 'text'} onChange={(e) => setForm({ ...form, [k]: e.target.value })} placeholder={k} className='border p-2' />)}
      <button className='bg-indigo-600 text-white p-2 rounded col-span-2'>Create Event</button>
    </form>
  </div>;
}
