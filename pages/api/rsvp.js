// pages/api/rsvp.js
import { supabaseServer } from '../../utils/supabaseServerClient';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { id, rsvp_status, dietary_requirements } = req.body;

  try {
    const { data, error } = await supabaseServer
      .from('guests')
      .update({ rsvp_status, dietary_requirements })
      .eq('id', id)
      .select()
      .single();

    if (error) return res.status(400).json({ error: error.message });

    return res.status(200).json({ data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Unexpected server error' });
  }
}
