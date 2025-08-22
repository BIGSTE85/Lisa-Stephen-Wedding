// pages/rsvp/[id].js
import { useState } from 'react';

export default function RSVPPage({ guestData, fetchError }) {
  const [guest, setGuest] = useState(guestData || null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (fetchError) return <p>Error fetching guest data: {fetchError}</p>;
  if (!guest) return <p>Guest not found.</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: guest.id,
          rsvp_status: guest.rsvp_status,
          dietary_requirements: guest.dietary_requirements,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setGuest(data.data);
        setSubmitted(true);
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      alert('Unexpected error updating RSVP.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div>
        <h1>Thank you, {guest.name}!</h1>
        <p>Your RSVP has been successfully submitted.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Hello, {guest.name}!</h1>
      <p>Please submit your RSVP below:</p>

      <form onSubmit={handleSubmit}>
        <label>
          Will you attend?
          <select
            name="rsvp_status"
            value={guest.rsvp_status || ''}
            onChange={(e) => setGuest({ ...guest, rsvp_status: e.target.value })}
            required
          >
            <option value="">Select...</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        <label>
          Dietary Requirements:
          <input
            type="text"
            name="dietary_requirements"
            placeholder="e.g., Vegetarian"
            value={guest.dietary_requirements || ''}
            onChange={(e) =>
              setGuest({ ...guest, dietary_requirements: e.target.value })
            }
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit RSVP'}
        </button>
      </form>
    </div>
  );
}

// Server-side fetch
import { supabaseServer } from '../../utils/supabaseServerClient';

export async function getServerSideProps({ params }) {
  const { id } = params;

  try {
    const { data: guest, error } = await supabaseServer
      .from('guests')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return { props: { guestData: null, fetchError: error.message } };
    }

    if (!guest) {
      return { props: { guestData: null, fetchError: 'Guest not found' } };
    }

    return { props: { guestData: guest, fetchError: null } };
  } catch (err) {
    console.error(err);
    return { props: { guestData: null, fetchError: 'Unexpected server error' } };
  }
}
