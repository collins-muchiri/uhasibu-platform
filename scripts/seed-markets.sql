-- Seed initial 3 markets
INSERT INTO markets (title, description, end_date) VALUES
('Nairobi Rainfall March 2026', 'Will Nairobi receive >100mm rainfall in March 2026? (Source: Kenya Met Dept)', '2026-03-31 23:59:59+03'),
('Safaricom Share Price June 2026', 'Will Safaricom (SAF) share price exceed KES 40 by June 30, 2026? (Source: NSE)', '2026-06-30 23:59:59+03'),
('Gor Mahia Next Match', 'Will Gor Mahia win their next KPL match? (Next match date TBD)', '2026-02-28 23:59:59+03')
ON CONFLICT DO NOTHING;