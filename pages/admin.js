// pages/admin.js
import React from 'react';
import { supabaseServer } from '../utils/supabaseServerClient';

export async function getServerSideProps() {
  // Fetch all guests server-side using Service Role Key
  const { data: guests, error } = await supabaseServer
    .from('guests')
    .select('*');

  return {
    props: {
      guests: guests || [],
      fetchError: error?.message || null,
    },
  };
}

export default function AdminPage({ guests, fetchError }) {
  if (fetchError) {
    return <p>Error fetching guest data: {fetchError}</p>;
  }

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Wedding Admin Dashboard</h1>
      <p>Total guests: {guests.length}</p>

      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginTop: '1rem',
        }}
      >
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Name</th>
            <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>RSVP</th>
            <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Dietary Requirements</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest) => (
            <tr key={guest.id}>
              <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{guest.name}</td>
              <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{guest.rsvp_status || '-'}</td>
              <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{guest.dietary_requirements || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
