import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Portfolio({ initialUser, initialMarkets, lang = 'en' }) {
  const [user, setUser] = useState(initialUser);
  const [markets, setMarkets] = useState(initialMarkets);
  const [trades, setTrades] = useState([]);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  useEffect(() => {
    fetch(`${API_URL}/user/portfolio`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    }).then(res => res.json()).then(setTrades);
  }, []);

  const t = {
    en: { title: 'Portfolio', positions: 'Positions', history: 'Trade History', noData: 'No positions yet' },
    sw: { title: 'Portifolio', positions: 'Positioni', history: 'Historia ya Biashara', noData: 'Hakuna positioni bado' }
  };

  const texts = t[lang];

  return (
    <>
      <Head><title>Portfolio - Uhasibu</title></Head>
      <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 p-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="text-white underline mb-8 block">&lt; Dashboard</Link>
          <h1 className="text-4xl font-bold text-white mb-8">{texts.title}</h1>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/20 backdrop-blur p-8 rounded-3xl">
              <h2 className="text-2xl font-bold mb-6">{texts.positions}</h2>
              <p>{texts.noData}</p>
            </div>
            <div className="bg-white/20 backdrop-blur p-8 rounded-3xl">
              <h2 className="text-2xl font-bold mb-6">{texts.history}</h2>
              <p>{trades.length ? trades.map(t => <p key={t.id}>{t.side} {t.quantity} {t.outcome} @ {t.price}</p>) : 'No trades'}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}