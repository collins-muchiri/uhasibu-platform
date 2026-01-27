const express = require('express');
const { Pool } = require('pg');
const auth = require('../middleware/auth');

const router = express.Router();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

router.use(auth);

// Set RLS context
router.use((req, res, next) => {
  const client = pool;
  pool.query(`SELECT set_config('app.current_user_phone', $1, true)`, [req.user.phone]);
  next();
});

router.get('/profile', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT phone, name, age, county, vkes_balance FROM users WHERE phone = $1',
      [req.user.phone]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/profile', async (req, res) => {
  const { name, age, county, self_excluded } = req.body;
  try {
    await pool.query(
      'UPDATE users SET name = $1, age = $2, county = $3, self_excluded = $4, updated_at = NOW() WHERE phone = $5',
      [name, age, county, self_excluded || false, req.user.phone]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/safeguards', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT daily_loss, last_loss_date, self_excluded, excluded_until FROM users WHERE phone = $1',
      [req.user.phone]
    );
    res.json(result.rows[0] || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;