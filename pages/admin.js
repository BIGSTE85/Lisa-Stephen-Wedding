import { useEffect, useState } from 'react';
import { supabaseServer } from '../utils/supabaseServerClient';

export default function AdminPage() {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGuests() {
      try {
        const { data, error } = await supabaseServer
          .from('guests')
          .select('*')
          .order('name', { ascending: true });

        if (error) {
          console.error('Error fetching guests:', error);
        } else {
          setGuests(data);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchGuests();
  }, []);

  if (loading) return <p>Loading RSVPs...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>RSVP Admin Dashboard</h1>
      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>RSVP Status</th>
            <th>Dietary Requirements</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest) => (
            <tr key={guest.id}>
              <td>{guest.name}</td>
              <td>{guest.rsvp_status || 'Not Responded'}</td>
              <td>{guest.dietary_requirements || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
