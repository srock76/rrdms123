import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context';
import { Section, SectionHeader, Button, Icon } from '../../components/Shared';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Home = () => {
  const { state } = useApp();
  const { config, services, caseStudies } = state;

  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-[var(--secondary)] text-white pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in-up">
            Scale Your Business with <span className="text-[var(--primary)]">Data-Driven</span> Marketing
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
            {config.description} We turn clicks into customers and data into revenue.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" variant="primary">Book a Free Strategy Call</Button>
            </Link>
            <Link to="/case-studies">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                View Case Studies
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Services Overview */}
      <Section>
        <SectionHeader 
          title="Our Expertise" 
          subtitle="Comprehensive digital strategies tailored to your industry." 
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.slice(0, 4).map((service) => (
            <div key={service.id} className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 group">
              <div className="w-14 h-14 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[var(--primary)] transition-colors">
                <Icon name={service.iconName} className="text-[var(--primary)] group-hover:text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.shortDescription}</p>
              <Link to="/services" className="text-[var(--primary)] font-semibold flex items-center hover:underline">
                Learn More <Icon name="ArrowRight" size={16} className="ml-1" />
              </Link>
            </div>
          ))}
        </div>
      </Section>

      {/* Stats / Proof */}
      <Section bg="gray">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeader 
              title="Results That Speak Louder Than Words" 
              subtitle="We don't just promise growth; we engineer it. Check out our recent wins for clients across various sectors."
              center={false}
            />
            <ul className="space-y-6">
              {caseStudies.slice(0, 3).map((study) => (
                <li key={study.id} className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-lg">{study.client}</span>
                    <span className="text-xs font-semibold bg-green-100 text-green-800 px-2 py-1 rounded-full">{study.industry}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{study.solution}</p>
                  <div className="flex gap-4">
                    {study.results.map((r, idx) => (
                      <div key={idx} className="text-center">
                        <span className="block font-bold text-[var(--primary)] text-lg">{r.value}</span>
                        <span className="text-xs text-gray-500 uppercase tracking-wide">{r.label}</span>
                      </div>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="h-96 bg-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center">
             <h4 className="text-gray-500 font-medium mb-4 self-start">Average Client ROI (Monthly)</h4>
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: 'Month 1', roi: 120 },
                  { name: 'Month 2', roi: 200 },
                  { name: 'Month 3', roi: 350 },
                  { name: 'Month 4', roi: 480 },
                  { name: 'Month 5', roi: 600 },
                ]}>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                    cursor={{fill: '#f3f4f6'}}
                  />
                  <Bar dataKey="roi" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                </BarChart>
             </ResponsiveContainer>
          </div>
        </div>
      </Section>

      {/* CTA Strip */}
      <section className="bg-[var(--primary)] text-white py-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Ready to dominate your market?</h2>
            <p className="opacity-90">Get a custom proposal delivered to your inbox in 24 hours.</p>
          </div>
          <Link to="/contact">
             <button className="bg-white text-[var(--primary)] px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
               Get Your Free Quote
             </button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
