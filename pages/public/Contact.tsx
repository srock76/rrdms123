import React, { useState } from 'react';
import { useApp } from '../../context';
import { Section, SectionHeader, Input, TextArea, Button, Icon } from '../../components/Shared';

const Contact = () => {
  const { state, dispatch } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceInterest: 'General Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLead = {
      ...formData,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      status: 'new' as const,
    };
    dispatch({ type: 'ADD_LEAD', payload: newLead });
    setSubmitted(true);
  };

  return (
    <>
      <div className="bg-[var(--secondary)] text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-xl opacity-90">Let's discuss how we can help your business grow.</p>
      </div>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-[var(--primary)] rounded-full flex items-center justify-center text-white shrink-0 mr-4">
                  <Icon name="MapPin" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Visit Us</h4>
                  <p className="text-gray-600">{state.config.address}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-10 h-10 bg-[var(--primary)] rounded-full flex items-center justify-center text-white shrink-0 mr-4">
                  <Icon name="Mail" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Email Us</h4>
                  <p className="text-gray-600">{state.config.email}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-10 h-10 bg-[var(--primary)] rounded-full flex items-center justify-center text-white shrink-0 mr-4">
                  <Icon name="Phone" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Call Us</h4>
                  <p className="text-gray-600">{state.config.phone}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-100 p-6 rounded-xl">
               <h3 className="font-bold mb-4">Frequently Asked Questions</h3>
               <details className="mb-3 cursor-pointer group">
                  <summary className="font-medium text-[var(--secondary)] list-none flex justify-between items-center">
                     What is your minimum budget?
                     <Icon name="ChevronDown" size={16} className="group-open:rotate-180 transition-transform"/>
                  </summary>
                  <p className="text-sm text-gray-600 mt-2 pl-2 border-l-2 border-[var(--primary)]">
                    We work with a variety of budgets, but typically our monthly retainers start at $1,500.
                  </p>
               </details>
               <details className="mb-3 cursor-pointer group">
                  <summary className="font-medium text-[var(--secondary)] list-none flex justify-between items-center">
                     Do you guarantee results?
                     <Icon name="ChevronDown" size={16} className="group-open:rotate-180 transition-transform"/>
                  </summary>
                  <p className="text-sm text-gray-600 mt-2 pl-2 border-l-2 border-[var(--primary)]">
                    While no agency can guarantee specific algorithmic outcomes, we guarantee transparent reporting and work relentlessly to improve your ROI.
                  </p>
               </details>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="Check" size={40} />
                </div>
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="text-gray-600 mb-6">Thank you for reaching out. One of our strategists will be in touch within 24 hours.</p>
                <Button onClick={() => setSubmitted(false)} variant="outline">Send Another</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="text-xl font-bold mb-6">Send us a Message</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input 
                    label="Full Name" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                  <Input 
                    label="Email Address" 
                    type="email" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input 
                    label="Phone Number" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                  <Input 
                    label="Company Name" 
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Interest</label>
                  <select 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] outline-none"
                    value={formData.serviceInterest}
                    onChange={(e) => setFormData({...formData, serviceInterest: e.target.value})}
                  >
                    {state.services.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>
                <TextArea 
                  label="How can we help?" 
                  rows={4} 
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            )}
          </div>
        </div>
      </Section>
    </>
  );
};

export default Contact;
