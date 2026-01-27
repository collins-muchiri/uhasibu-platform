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
    &lt;&gt;
      &lt;Head&gt;&lt;title&gt;Portfolio - Uhasibu&lt;/title&gt;&lt;/Head&gt;
      &lt;div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 p-8"&gt;
        &lt;div className="max-w-4xl mx-auto"&gt;
          &lt;Link href="/" className="text-white underline mb-8 block"&gt;&amp;lt; Dashboard&lt;/Link&gt;
          &lt;h1 className="text-4xl font-bold text-white mb-8"&gt;{texts.title}&lt;/h1&gt;
          &lt;div className="grid md:grid-cols-2 gap-8"&gt;
            &lt;div className="bg-white/20 backdrop-blur p-8 rounded-3xl"&gt;
              &lt;h2 className="text-2xl font-bold mb-6"&gt;{texts.positions}&lt;/h2&gt;
              &lt;p&gt;{texts.noData}&lt;/p&gt;
            &lt;/div&gt;
            &lt;div className="bg-white/20 backdrop-blur p-8 rounded-3xl"&gt;
              &lt;h2 className="text-2xl font-bold mb-6"&gt;{texts.history}&lt;/h2&gt;
              &lt;p&gt;{trades.length ? trades.map(t => &lt;p key={t.id}&gt;{t.side} {t.quantity} {t.outcome} @ {t.price}&lt;/p&gt;) : 'No trades'}&lt;/p&gt;
            &lt;/div&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/&gt;
  );
}