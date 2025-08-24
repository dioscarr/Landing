import React, { useMemo, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null); // 'sending' | 'sent' | 'error'
  const [errorMsg, setErrorMsg] = useState('');
  const isConfigured = useMemo(() => {
    return Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setStatus('sending');

    // simple client-side validation
    if (!name || !email || !message) {
      setStatus('error');
      setErrorMsg('Please fill out all fields.');
      return;
    }

    const { error } = await supabase
      .from('messages')
      .insert([{ name, email, message }]);
    if (error) {
      setStatus('error');
      setErrorMsg(error.message);
      console.error(error);
      return;
    }
    setStatus('sent');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <form className="w-full max-w-md" onSubmit={handleSubmit}>
      {!isConfigured && (
        <p className="text-sm mb-3 text-yellow-400">Supabase env vars are missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.</p>
      )}
      <div className="mb-3">
        <label className="block text-sm font-medium" htmlFor="name">Name</label>
        <input id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded p-2" required />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium" htmlFor="email">Email</label>
        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded p-2" required />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium" htmlFor="message">Message</label>
        <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} className="w-full border rounded p-2" rows={5} required />
      </div>
      <div>
        <button type="submit" disabled={status === 'sending'} className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60">
          {status === 'sending' ? 'Sending…' : 'Send'}
        </button>
      </div>
      {status === 'sent' && <p className="text-sm mt-2 text-green-500">Message sent — thank you!</p>}
      {status === 'error' && (
        <p className="text-sm mt-2 text-red-400">Error: {errorMsg || 'Something went wrong.'}</p>
      )}
    </form>
  );
};

export default ContactForm;
