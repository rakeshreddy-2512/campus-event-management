import { useEffect, useState } from 'react';
import client from '../api/client';

export default function TicketsPage() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    client.get('/registrations/me/list').then((r) => setTickets(r.data));
  }, []);

  return <div className='p-6 space-y-4'>
    {tickets.map((t) => (
      <div key={t._id} className='bg-white p-4 rounded shadow flex justify-between'>
        <div>
          <h3 className='font-semibold'>{t.event.title}</h3>
          <p className='text-sm'>Ticket ID: {t.ticketId}</p>
        </div>
        <img src={t.qrCodeDataUrl} alt='QR ticket' className='w-24 h-24' />
      </div>
    ))}
  </div>;
}
