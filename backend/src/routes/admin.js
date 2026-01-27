const express = require('express');
const { Pool } = require('pg');
const auth = require('../middleware/auth');

const router = express.Router();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

router.use(auth);

router.get('/users', async (req, res) => {
  try {
    await pool.query(`SELECT set_config('app.current_user_phone', $1, true)`, [req.user.phone]);
    const result = await pool.query('SELECT phone, name, age, county, vkes_balance, created_at FROM users ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/stats', async (req, res) => {
  try {
    await pool.query(`SELECT set_config('app.current_user_phone', $1, true)`, [req.user.phone]);
    const stats = await pool.query(`
      SELECT 
        COUNT(*) as total_users,
        AVG(vkes_balance)::numeric(10,2) as avg_balance,
        COUNT(CASE WHEN age BETWEEN 18 AND 24 THEN 1 END) as young_users
      FROM users
    `);
    res.json(stats.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/markets', async (req, res) => {
  try {
    await pool.query(`SELECT set_config('app.current_user_phone', $1, true)`, [req.user.phone]);
    const result = await pool.query('SELECT * FROM markets ORDER BY end_date');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/resolve/:id', async (req, res) => {
  const { id } = req.params;
  const { outcome } = req.body;
  if (typeof outcome !== 'boolean') return res.status(400).json({ error: 'outcome must be boolean' });

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const adminCheck = await client.query('SELECT is_admin FROM users WHERE phone = $1', [req.user.phone]);
    if (!adminCheck.rows[0]?.is_admin) throw new Error('Admin only');

    await client.query('UPDATE markets SET status = $1, resolved_outcome = $2 WHERE id = $3 AND status != $4', ['resolved', outcome, id, 'resolved']);

    const positions = await client.query('SELECT phone, yes_shares, no_shares FROM positions WHERE market_id = $1', [id]);
    for (const pos of positions.rows) {
      let payout = 0;
      if (outcome && pos.yes_shares > 0) payout += parseFloat(pos.yes_shares);
      if (!outcome && pos.no_shares > 0) payout += parseFloat(pos.no_shares);

      if (payout > 0) {
        await client.query('UPDATE users SET vkes_balance = vkes_balance + $1 WHERE phone = $2', [payout, pos.phone]);
        await client.query('UPDATE positions SET yes_shares = 0, no_shares = 0 WHERE phone = $1 AND market_id = $2', [pos.phone, id]);
      }
    }

    await client.query('COMMIT');
    res.json({ success: true });
  } catch (err) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
});

module.exports = router;