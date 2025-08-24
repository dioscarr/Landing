import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    const { data, error } = await supabase.from('messages').insert([{ name, email, message }]);
    if (error) {
      setStatus('error');
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
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Send
        </button>
      </div>
      {status === 'sending' && <p className="text-sm mt-2">Sending...</p>}
      {status === 'sent' && <p className="text-sm mt-2 text-green-600">Message sent — thank you!</p>}
      {status === 'error' && <p className="text-sm mt-2 text-red-600">Error sending message.</p>}
    </form>
  );
};

export default ContactForm;
