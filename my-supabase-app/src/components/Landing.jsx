import React from 'react';
import ContactForm from './ContactForm';

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-4">My Portfolio</h1>
      <p className="mb-6 text-center max-w-xl">A small landing starter connected to Supabase for contact messages.</p>
      <ContactForm />
    </div>
  );
};

export default Landing;
