-- Initialize Uhasibu database
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  phone VARCHAR(15) UNIQUE NOT NULL,
  otp VARCHAR(6),
  otp_expires TIMESTAMPTZ,
  name VARCHAR(255),
  age INTEGER CHECK (age >= 18),
  county VARCHAR(100),
  vkes_balance NUMERIC(10,2) DEFAULT 1000.00,
  daily_loss NUMERIC(10,2) DEFAULT 0,
  last_loss_date DATE,
  self_excluded BOOLEAN DEFAULT FALSE,
  excluded_until DATE,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
CREATE INDEX IF NOT EXISTS idx_users_otp_expires ON users(otp_expires);

-- RLS policies (Phase 1.10)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY user_own_data ON users
  FOR ALL USING (phone = current_setting('app.current_user_phone')::VARCHAR);

-- Admin policy later

-- Phase 2: Markets schema
CREATE TABLE IF NOT EXISTS markets (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  end_date TIMESTAMPTZ NOT NULL,
  yes_price NUMERIC(5,4) DEFAULT 0.5000,
  total_yes_shares NUMERIC(20,8) DEFAULT 0,
  total_no_shares NUMERIC(20,8) DEFAULT 0,
  status VARCHAR(20) DEFAULT 'open',
  resolved_outcome BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_markets_end_date ON markets(end_date);
CREATE INDEX IF NOT EXISTS idx_markets_status ON markets(status);

CREATE TABLE IF NOT EXISTS positions (
  id SERIAL PRIMARY KEY,
  phone VARCHAR(15) REFERENCES users(phone) ON DELETE CASCADE,
  market_id INTEGER REFERENCES markets(id) ON DELETE CASCADE,
  yes_shares NUMERIC(20,8) DEFAULT 0,
  no_shares NUMERIC(20,8) DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(phone, market_id)
);

ALTER TABLE positions ENABLE ROW LEVEL SECURITY;
CREATE POLICY user_positions ON positions
  FOR ALL USING (phone = current_setting('app.current_user_phone')::VARCHAR);

CREATE TABLE IF NOT EXISTS trades (
  id SERIAL PRIMARY KEY,
  phone VARCHAR(15) REFERENCES users(phone) ON DELETE CASCADE,
  market_id INTEGER REFERENCES markets(id),
  side VARCHAR(10),
  outcome VARCHAR(3),
  quantity NUMERIC(20,8),
  price NUMERIC(5,4),
  vkes_amount NUMERIC(10,2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE trades ENABLE ROW LEVEL SECURITY;
CREATE POLICY user_trades ON trades
  FOR ALL USING (phone = current_setting('app.current_user_phone')::VARCHAR);

-- Admin policies
CREATE POLICY admin_users ON users FOR ALL
  USING (EXISTS (SELECT 1 FROM users WHERE phone = current_setting('app.current_user_phone')::VARCHAR AND is_admin = true));

CREATE POLICY admin_markets ON markets FOR ALL USING (EXISTS (SELECT 1 FROM users WHERE phone = current_setting('app.current_user_phone')::VARCHAR AND is_admin = true));
CREATE POLICY admin_positions ON positions FOR ALL USING (EXISTS (SELECT 1 FROM users WHERE phone = current_setting('app.current_user_phone')::VARCHAR AND is_admin = true));
CREATE POLICY admin_trades ON trades FOR ALL USING (EXISTS (SELECT 1 FROM users WHERE phone = current_setting('app.current_user_phone')::VARCHAR AND is_admin = true));