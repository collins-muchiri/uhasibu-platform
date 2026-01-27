import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  const [lang, setLang] = useState('en');
  const [showAgeGate, setShowAgeGate] = useState(true);
  const [age, setAge] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState('');

  const t = {
    en: {
      title: 'Uhasibu Prediction Market',
      subtitle: 'University Research Tool - Play Money Platform',
      desc: 'Participate in academic research on prediction markets. Strictly 18+. Virtual currency only.',
      agePrompt: 'Confirm you are 18 or older',
      dobLabel: 'Date of Birth',
      terms: 'I accept the Terms & Conditions',
      proceed: 'Proceed to App',
      errorAge: 'You must be 18 or older.',
      termsLink: 'Terms & Conditions',
      ageGate: 'Age Verification Required',
      university: 'University Research Project'
    },
    sw: {
      title: 'Soko la Utabu',
      subtitle: 'Zana ya Utafiti wa Chuo Kikuu - Jukwaa la Pesa za Kufurahisha',
      desc: 'Shiriki katika utafiti wa kitaaluma juu ya masoko ya utabu. Umri 18+ tu. Sarafu pekee ya kufurahisha.',
      agePrompt: 'Thibitisha uko na umri wa miaka 18 au zaidi',
      dobLabel: 'Tarehe ya Kuzaliwa',
      terms: 'Ninakubali Masharti & Hali',
      proceed: 'Endelea kwenye App',
      errorAge: 'Lazima uwe na umri wa miaka 18 au zaidi.',
      termsLink: 'Masharti & Hali',
      ageGate: 'Uthibitisho wa Umri Unahitajika',
      university: 'Mradi wa Utafiti wa Chuo Kikuu'
    }
  };

  const texts = t[lang];

  useEffect(() => {
    const verified = localStorage.getItem('ageVerified');
    if (verified === 'true') {
      setShowAgeGate(false);
    }
  }, []);

  const handleProceed = () => {
    const dob = new Date(age);
    const ageDiff = Date.now() - dob.getTime();
    const calculatedAge = new Date(ageDiff).getUTCFullYear() - 1970;
    if (calculatedAge < 18) {
      setError(texts.errorAge);
      return;
    }
    if (!termsAccepted) {
      setError('Please accept terms');
      return;
    }
    localStorage.setItem('ageVerified', 'true');
    setShowAgeGate(false);
    setError('');
  };

  if (showAgeGate) {
    return (
      &lt;&gt;
        &lt;Head&gt;
          &lt;title&gt;{texts.title} - {texts.ageGate}&lt;/title&gt;
        &lt;/Head&gt;
        &lt;div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center p-8 text-white"&gt;
          &lt;div className="text-center mb-8"&gt;
            &lt;h1 className="text-4xl md:text-6xl font-bold mb-4"&gt;🎓 {texts.university}&lt;/h1&gt;
            &lt;h2 className="text-2xl md:text-3xl mb-2"&gt;{texts.title}&lt;/h2&gt;
            &lt;p className="text-xl opacity-90"&gt;{texts.subtitle}&lt;/p&gt;
          &lt;/div&gt;
          &lt;div className="bg-white/20 backdrop-blur-xl rounded-2xl p-8 max-w-md w-full mx-auto shadow-2xl"&gt;
            &lt;h3 className="text-2xl font-bold mb-6 text-center"&gt;{texts.ageGate}&lt;/h3&gt;
            &lt;p className="mb-4 text-lg"&gt;{texts.desc}&lt;/p&gt;
            &lt;div className="mb-6"&gt;
              &lt;label className="block text-sm font-medium mb-2"&gt;{texts.dobLabel}&lt;/label&gt;
              &lt;input
                type="date"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full p-3 rounded-xl bg-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white text-black"
                max={new Date(Date.now() - (18 * 365 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0]}
              /&gt;
            &lt;/div&gt;
            &lt;div className="mb-6 flex items-center"&gt;
              &lt;input
                id="terms"
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="w-5 h-5 text-blue-600 bg-white/50 border-white/30 rounded focus:ring-blue-500"
              /&gt;
              &lt;label htmlFor="terms" className="ml-2 text-sm"&gt;
                {texts.terms} ({texts.termsLink})
              &lt;/label&gt;
            &lt;/div&gt;
            {error && &lt;p className="text-red-300 text-sm mb-4 text-center"&gt;{error}&lt;/p&gt;}
            &lt;button
              onClick={handleProceed}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-200 transform hover:scale-105 shadow-xl"
            &gt;
              {texts.proceed}
            &lt;/button&gt;
          &lt;/div&gt;
          &lt;div className="mt-8 flex space-x-4"&gt;
            &lt;button onClick={() => setLang('en')} className={`px-4 py-2 rounded-xl ${lang === 'en' ? 'bg-white/30' : 'bg-white/10'}`}&gt;EN&lt;/button&gt;
            &lt;button onClick={() => setLang('sw')} className={`px-4 py-2 rounded-xl ${lang === 'sw' ? 'bg-white/30' : 'bg-white/10'}`}&gt;SW&lt;/button&gt;
          &lt;/div&gt;
          &lt;p className="mt-8 text-sm opacity-75 text-center"&gt;This is a research prototype. Virtual money only. Gambling help: 1195&lt;/p&gt;
        &lt;/div&gt;
      &lt;/&gt;
    );
  }

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  const [step, setStep] = useState('phone'); // phone, otp, profile, dashboard
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [token, setToken] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorAuth, setErrorAuth] = useState('');

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
      // Fetch user profile
      fetchUser(savedToken);
    }
  }, []);

  const fetchUser = async (tok) => {
    try {
      const res = await fetch(`${API_URL}/api/user`, {
        headers: { Authorization: `Bearer ${tok}` },
      });
      if (res.ok) {
        const u = await res.json();
        setUser(u);
        if (u.name) setStep('dashboard');
      }
    } catch {}
  };

  const sendOTP = async () => {
    if (!phone.startsWith('+254')) return setErrorAuth('Phone must be +254...');
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (data.success) setStep('otp');
      else setErrorAuth(data.error);
    } catch (err) {
      setErrorAuth('Network error');
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
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setStep('profile');
      } else {
        setErrorAuth(data.error);
      }
    } catch (err) {
      setErrorAuth('Network error');
    }
    setLoading(false);
  };

  const updateProfile = async (formData) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/user/profile`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStep('dashboard');
        setUser({ ...user, ...formData });
      }
    } catch {}
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setStep('phone');
    setToken('');
    setUser(null);
  };

  const counties = [
    'Baringo', 'Bomet', 'Bungoma', 'Busia', 'Elgeyo-Marakwet', 'Embu', 'Garissa', 'Homa Bay',
    'Isiolo', 'Kajiado', 'Kakamega', 'Kericho', 'Kiambu', 'Kilifi', 'Kirinyaga', 'Kisii',
    'Kisumu', 'Kitui', 'Kwale', 'Laikipia', 'Lamu', 'Machakos', 'Makueni', 'Mandera',
    'Marsabit', 'Meru', 'Migori', 'Mombasa', "Murang'a", 'Nairobi City', 'Nakuru',
    'Nandi', 'Narok', 'Nyamira', 'Nyandarua', 'Nyeri', 'Samburu', 'Siaya', 'Taita-Taveta',
    'Tana River', 'Tharaka-Nithi', 'Trans Nzoia', 'Turkana', 'Uasin Gishu', 'Vihiga', 'Wajir', 'West Pokot'
  ];

  const tAuth = {
    en: {
      phone: 'Enter phone (+254...)',
      sendOTP: 'Send OTP',
      otp: 'Enter OTP (6 digits)',
      verify: 'Verify & Continue',
      profileTitle: 'Complete Profile',
      name: 'Full Name',
      age: 'Age',
      county: 'County',
      submit: 'Save & Enter Markets',
      dashboardTitle: 'Your Dashboard',
      balance: 'vKES Balance',
      markets: 'Open Markets',
      portfolio: 'Portfolio',
      admin: 'Admin'
    },
    sw: {
      phone: 'Ingiza simu (+254...)',
      sendOTP: 'Tuma OTP',
      otp: 'Ingiza OTP (tarakimu 6)',
      verify: 'Thibitisha & Endelea',
      profileTitle: 'Kamili Profaili',
      name: 'Jina Kamili',
      age: 'Umri',
      county: 'Kaunti',
      submit: 'Hifadhi & Ingia Masokoni',
      dashboardTitle: 'Dashibodi Yako',
      balance: 'Salio la vKES',
      markets: 'Masoko Yanayofunguliwa',
      portfolio: 'Portifolio',
      admin: 'Admin'
    }
  };

  const textsAuth = tAuth[lang];

  if (step === 'phone') {
    return (
      &lt;div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-8"&gt;
        &lt;div className="bg-white/30 backdrop-blur-xl rounded-3xl p-10 max-w-md w-full shadow-2xl text-white"&gt;
          &lt;h2 className="text-3xl font-bold mb-8 text-center"&gt;{texts.title}&lt;/h2&gt;
          &lt;p className="text-lg mb-8 text-center opacity-90"&gt;{texts.desc}&lt;/p&gt;
          &lt;input
            type="tel"
            placeholder={textsAuth.phone}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-4 rounded-2xl bg-white/50 border border-white/30 text-black text-lg mb-6 focus:outline-none focus:ring-2 focus:ring-white"
          /&gt;
          {errorAuth && &lt;p className="text-red-300 mb-4 text-center"&gt;{errorAuth}&lt;/p&gt;}
          &lt;button
            onClick={sendOTP}
            disabled={!phone || loading}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-2xl text-lg transition-all disabled:opacity-50"
          &gt;
            {loading ? 'Sending...' : textsAuth.sendOTP}
          &lt;/button&gt;
          &lt;div className="mt-8 flex space-x-4 justify-center"&gt;
            &lt;button onClick={() => setLang('en')} className={`px-4 py-2 rounded-xl ${lang === 'en' ? 'bg-white/30' : 'bg-white/10'}`}&gt;EN&lt;/button&gt;
            &lt;button onClick={() => setLang('sw')} className={`px-4 py-2 rounded-xl ${lang === 'sw' ? 'bg-white/30' : 'bg-white/10'}`}&gt;SW&lt;/button&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    );
  }

  if (step === 'otp') {
    return (
      &lt;div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-8"&gt;
        &lt;div className="bg-white/30 backdrop-blur-xl rounded-3xl p-10 max-w-md w-full shadow-2xl text-white"&gt;
          &lt;h2 className="text-3xl font-bold mb-4 text-center"&gt;OTP sent to {phone}&lt;/h2&gt;
          &lt;p className="text-lg mb-8 text-center opacity-90"&gt;{textsAuth.otp}&lt;/p&gt;
          &lt;input
            type="text"
            placeholder="123456"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\\D/g, ''))}
            className="w-full p-6 rounded-2xl bg-white/50 border border-white/30 text-black text-2xl text-center mb-6 focus:outline-none focus:ring-2 focus:ring-white"
            maxLength={6}
          /&gt;
          {errorAuth && &lt;p className="text-red-300 mb-4 text-center"&gt;{errorAuth}&lt;/p&gt;}
          &lt;button
            onClick={verifyOTP}
            disabled={otp.length < 6 || loading}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-2xl text-lg transition-all disabled:opacity-50"
          &gt;
            {loading ? 'Verifying...' : textsAuth.verify}
          &lt;/button&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    );
  }

  if (step === 'profile') {
    const [formData, setFormData] = useState({ name: '', age: '', county: '' });
    return (
      &lt;div className="min-h-screen bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center p-8"&gt;
        &lt;div className="bg-white/20 backdrop-blur-xl rounded-3xl p-10 max-w-md w-full shadow-2xl text-white"&gt;
          &lt;h2 className="text-3xl font-bold mb-8 text-center"&gt;{textsAuth.profileTitle}&lt;/h2&gt;
          &lt;input
            type="text"
            placeholder={textsAuth.name}
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full p-4 rounded-2xl bg-white/50 border border-white/30 text-black mb-4 focus:outline-none focus:ring-2 focus:ring-white"
          /&gt;
          &lt;input
            type="number"
            placeholder={textsAuth.age}
            value={formData.age}
            onChange={(e) => setFormData({...formData, age: e.target.value})}
            min="18"
            max="100"
            className="w-full p-4 rounded-2xl bg-white/50 border border-white/30 text-black mb-4 focus:outline-none focus:ring-2 focus:ring-white"
          /&gt;
          &lt;select
            value={formData.county}
            onChange={(e) => setFormData({...formData, county: e.target.value})}
            className="w-full p-4 rounded-2xl bg-white/50 border border-white/30 text-black mb-6 focus:outline-none focus:ring-2 focus:ring-white"
          &gt;
            &lt;option value=""&gt;{textsAuth.county}&lt;/option&gt;
            {counties.map(c => &lt;option key={c} value={c}&gt;{c}&lt;/option&gt;)}
          &lt;/select&gt;
          &lt;button
            onClick={() => updateProfile(formData)}
            disabled={!formData.name || !formData.age || !formData.county || loading}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-2xl text-lg transition-all disabled:opacity-50"
          &gt;
            {loading ? 'Saving...' : textsAuth.submit}
          &lt;/button&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    );
  }

  // dashboard
  const [markets, setMarkets] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/markets`)
      .then(res => res.json())
      .then(setMarkets);
  }, []);

  return (
    &lt;div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600"&gt;
      &lt;Head&gt;
        &lt;title&gt;{texts.title}&lt;/title&gt;
      &lt;/Head&gt;
      &lt;div className="max-w-6xl mx-auto p-8"&gt;
        &lt;div className="flex justify-between items-center mb-8"&gt;
          &lt;h1 className="text-4xl font-bold text-white"&gt;{textsAuth.dashboardTitle}&lt;/h1&gt;
          &lt;div className="flex space-x-4"&gt;
            &lt;a href="/portfolio" className="bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600"&gt;{textsAuth.portfolio}&lt;/a&gt;
            &lt;a href="http://localhost:3002" className="bg-gray-500 text-white px-6 py-2 rounded-xl hover:bg-gray-600"&gt;{textsAuth.admin}&lt;/a&gt;
            &lt;button onClick={logout} className="bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-600"&gt;Logout&lt;/button&gt;
            &lt;div className="flex space-x-2"&gt;
              &lt;button onClick={() => setLang('en')} className={`px-4 py-2 rounded-xl ${lang === 'en' ? 'bg-white text-blue-600' : 'bg-white/20 text-white'}`}&gt;EN&lt;/button&gt;
              &lt;button onClick={() => setLang('sw')} className={`px-4 py-2 rounded-xl ${lang === 'sw' ? 'bg-white text-blue-600' : 'bg-white/20 text-white'}`}&gt;SW&lt;/button&gt;
            &lt;/div&gt;
          &lt;/div&gt;
        &lt;/div&gt;
        &lt;div className="grid md:grid-cols-3 gap-8 mb-12"&gt;
          &lt;div className="md:col-span-1 bg-white/20 backdrop-blur-xl rounded-3xl p-8 text-white"&gt;
            &lt;h2 className="text-2xl font-bold mb-4"&gt;{textsAuth.balance}&lt;/h2&gt;
            &lt;p className="text-4xl font-bold text-green-300"&gt;KES {user?.vkes_balance || 1000}&lt;/p&gt;
            &lt;p className="text-lg opacity-90 mt-2"&gt;{user?.name}, {user?.age}, {user?.county}&lt;/p&gt;
          &lt;/div&gt;
          &lt;div className="md:col-span-2 bg-white/20 backdrop-blur-xl rounded-3xl p-8 text-white"&gt;
            &lt;h2 className="text-2xl font-bold mb-6"&gt;{textsAuth.markets}&lt;/h2&gt;
            &lt;div className="space-y-4"&gt;
              {markets.map((m) => (
                &lt;div key={m.id} className="bg-white/10 p-6 rounded-2xl hover:bg-white/20 transition-all"&gt;
                  &lt;h3 className="font-bold text-xl mb-2"&gt;{m.title}&lt;/h3&gt;
                  &lt;p className="opacity-90 mb-4"&gt;{m.description}&lt;/p&gt;
                  &lt;p className="text-sm opacity-75 mb-4"&gt;Ends: {new Date(m.end_date).toLocaleDateString()}
}