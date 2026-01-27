const express = require('express');
const { Pool } = require('pg');

const router = express.Router();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, title, description, end_date, yes_price, 
              total_yes_shares, total_no_shares, status, 
              CASE WHEN (total_yes_shares + total_no_shares) > 0 
                   THEN ROUND((total_yes_shares / (total_yes_shares + total_no_shares)) * 100, 2) 
                   ELSE 50 END as probability
       FROM markets WHERE status = 'open' ORDER BY end_date`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT id, title, description, end_date, yes_price, 
              total_yes_shares, total_no_shares, status,
              CASE WHEN (total_yes_shares + total_no_shares) > 0 
                   THEN ROUND((total_yes_shares / (total_yes_shares + total_no_shares)) * 100, 2) 
                   ELSE 50 END as probability
       FROM markets WHERE id = $1`,
      [id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Market not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = router;