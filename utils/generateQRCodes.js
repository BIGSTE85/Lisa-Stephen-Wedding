// utils/generateQRCodes.js
import { createClient } from '@supabase/supabase-js';
import QRCode from 'qrcode';
import fs from 'fs';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

// Use service role key locally — safe because this script runs on your machine only
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase URL or Service Role Key in environment variables!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Use your local IP for testing QR codes on mobile
const baseURL = 'http://192.168.0.245:3000/rsvp';

async function generateQRCodes() {
  try {
    const { data: guests, error } = await supabase
      .from('guests')
      .select('*');

    if (error) {
      console.error('Error fetching guests:', error);
      return;
    }

    if (!guests || guests.length === 0) {
      console.log('No guests found.');
      return;
    }

    if (!fs.existsSync('qrcodes')) {
      fs.mkdirSync('qrcodes');
    }

    for (const guest of guests) {
      const qrText = `${baseURL}/${guest.id}`;
      const filePath = `qrcodes/guest_${guest.id}.png`;
      await QRCode.toFile(filePath, qrText);
      console.log(`QR code generated for ${guest.name}: ${filePath}`);
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

generateQRCodes();
