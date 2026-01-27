import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Admin() {
  const [token, setToken] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [markets, setMarkets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState('login');

  const API_URL = 'http://localhost:3001/api';

  const sendOTP = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (data.success) alert('OTP sent');
      else alert(data.error);
    } catch (err) {
      alert('Error');
    }
    setLoading(false);
  };

  const verifyOTP = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        setToken(data.token);
        setView('dashboard');
        loadData();
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert('Error');
    }
    setLoading(false);
  };

  const loadData = async () => {
    try {
      const savedToken = localStorage.getItem('adminToken') || token;
      const res = await fetch(`${API_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${savedToken}` },
      });
      const data = await res.json();
      setUsers(data);

      const resStats = await fetch(`${API_URL}/admin/stats`, {
        headers: { Authorization: `Bearer ${savedToken}` },
      });
      const statsData = await resStats.json();
      setStats(statsData);

      const resMarkets = await fetch(`${API_URL}/admin/markets`, {
        headers: { Authorization: `Bearer ${savedToken}` },
      });
      const marketsData = await resMarkets.json();
      setMarkets(marketsData);
    } catch (err) {
      console.error('Error loading data:', err);
    }
  };

  const resolveMarket = async (id, outcome) => {
    if (!confirm(`Resolve market ${id} as ${outcome ? 'YES' : 'NO'}?`)) return;
    try {
      const res = await fetch(`${API_URL}/admin/resolve/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ outcome }),
      });
      if (res.ok) {
        loadData();
        alert('Resolved');
      } else {
        alert('Error resolving market');
      }
    } catch (err) {
      alert('Network error');
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem('adminToken');
    if (savedToken) {
      setToken(savedToken);
      setView('dashboard');
      loadData();
    }
  }, []);

  if (view === 'login') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
        <Head>
          <title>Uhasibu Admin</title>
        </Head>
        <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Admin Login</h1>
          <div className="space-y-4">
            <input
              type="tel"
              placeholder="+2547xxxxxxxx"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={sendOTP}
              disabled={!phone || loading}
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={6}
            />
            <button
              onClick={verifyOTP}
              disabled={otp.length < 6 || loading}
              className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Login'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Uhasibu Admin Dashboard</title>
      </Head>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
            <button
              onClick={() => {
                localStorage.removeItem('adminToken');
                setView('login');
              }}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Total Users</h2>
              <p className="text-3xl font-bold text-blue-600">{stats.total_users || 0}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Avg Balance</h2>
              <p className="text-3xl font-bold text-green-600">KES {stats.avg_balance?.toFixed(0) || 0}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Young Users (18-24)</h2>
              <p className="text-3xl font-bold text-purple-600">{stats.young_users || 0}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <h2 className="text-2xl font-bold p-6 border-b">Users List</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-4 text-left text-sm font-bold text-gray-700">Phone</th>
                    <th className="p-4 text-left text-sm font-bold text-gray-700">Name</th>
                    <th className="p-4 text-left text-sm font-bold text-gray-700">Age</th>
                    <th className="p-4 text-left text-sm font-bold text-gray-700">County</th>
                    <th className="p-4 text-left text-sm font-bold text-gray-700">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.phone} className="border-t hover:bg-gray-50">
                      <td className="p-4">{user.phone}</td>
                      <td className="p-4">{user.name || 'N/A'}</td>
                      <td className="p-4">{user.age}</td>
                      <td className="p-4">{user.county}</td>
                      <td className="p-4 font-bold text-green-600">KES {user.vkes_balance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button onClick={loadData} className="m-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
              Refresh
            </button>
          </div>

          <div className="mt-8 bg-white rounded-xl shadow overflow-hidden">
            <h2 className="text-2xl font-bold p-6 border-b">Markets</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-4 text-left text-sm font-bold text-gray-700">Title</th>
                    <th className="p-4 text-left text-sm font-bold text-gray-700">Status</th>
                    <th className="p-4 text-left text-sm font-bold text-gray-700">End Date</th>
                    <th className="p-4 text-left text-sm font-bold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {markets.map((market) => (
                    <tr key={market.id} className="border-t hover:bg-gray-50">
                      <td className="p-4">{market.title}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${market.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                          {market.status}
                        </span>
                      </td>
                      <td className="p-4">{new Date(market.end_date).toLocaleDateString()}</td>
                      <td className="p-4">
                        {market.status === 'open' && (
                          <>
                            <button onClick={() => resolveMarket(market.id, true)} className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600">YES</button>
                            <button onClick={() => resolveMarket(market.id, false)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">NO</button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
