const express = require('express');
const { sendOTP } = require('../services/sms');
const { Pool } = require('pg');
const { generateToken } = require('../services/jwt');

const router = express.Router();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

router.post('/send-otp', async (req, res) => {
  const { phone } = req.body;
  if (!phone || !phone.startsWith('+')) {
    return res.status(400).json({ error: 'Valid phone required (+254...)' });
  }

  try {
    const { success, otp } = await sendOTP(phone);
    if (!success) {
      return res.status(500).json({ error: 'Failed to send OTP' });
    }

    const otpExpires = new Date(Date.now() + 5 * 60 * 1000);
    await pool.query(
      'INSERT INTO users (phone, otp, otp_expires) VALUES ($1, $2, $3) ON CONFLICT (phone) DO UPDATE SET otp = $2, otp_expires = $3',
      [phone, otp, otpExpires]
    );

    res.json({ success: true, message: 'OTP sent' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/verify-otp', async (req, res) => {
  const { phone, otp } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE phone = $1 AND otp = $2 AND otp_expires > NOW()',
      [phone, otp]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    const token = generateToken(phone);
    res.json({ success: true, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;