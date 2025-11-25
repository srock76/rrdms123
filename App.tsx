import React from 'react';
import { HashRouter, Routes, Route, Outlet, Link, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context';
import { Icon, Button } from './components/Shared';

// Pages
import Home from './pages/public/Home';
import Contact from './pages/public/Contact';
import { AdminLayout, DashboardHome } from './pages/admin/AdminDashboard';
import { PostManager, SettingsManager, LeadManager } from './pages/admin/AdminPages';

// Public Layout
const PublicLayout = () => {
  const { state } = useApp();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    setIsMenuOpen(false); // Close menu on route change
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900">
      {/* Navbar */}
      <header className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold tracking-tighter">
            <span className="text-[var(--secondary)]">RRDMS</span>
            <span className="text-[var(--primary)]">.</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="font-medium hover:text-[var(--primary)] transition-colors">Home</Link>
            <Link to="/services" className="font-medium hover:text-[var(--primary)] transition-colors">Services</Link>
            <Link to="/case-studies" className="font-medium hover:text-[var(--primary)] transition-colors">Results</Link>
            <Link to="/blog" className="font-medium hover:text-[var(--primary)] transition-colors">Blog</Link>
            <Link to="/contact">
               <Button size="sm">Get a Quote</Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} size={28} />
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 p-4 absolute w-full shadow-lg">
             <div className="flex flex-col gap-4">
                <Link to="/" className="font-medium p-2">Home</Link>
                <Link to="/services" className="font-medium p-2">Services</Link>
                <Link to="/case-studies" className="font-medium p-2">Results</Link>
                <Link to="/blog" className="font-medium p-2">Blog</Link>
                <Link to="/contact" className="font-medium p-2 text-[var(--primary)]">Contact Us</Link>
             </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-[var(--secondary)] text-gray-400 py-12 text-sm">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-xl font-bold mb-4">RRDMS Agency</h3>
            <p className="mb-4">{state.config.description}</p>
            <div className="flex gap-4">
              <Icon name="Linkedin" className="hover:text-white cursor-pointer" />
              <Icon name="Twitter" className="hover:text-white cursor-pointer" />
              <Icon name="Instagram" className="hover:text-white cursor-pointer" />
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/services" className="hover:text-white">Services</Link></li>
              <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Newsletter</h4>
            <div className="flex flex-col gap-2">
              <input type="email" placeholder="Enter email" className="bg-gray-800 border-none rounded px-3 py-2 text-white" />
              <Button size="sm">Subscribe</Button>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-8 pt-8 border-t border-gray-800 flex justify-between items-center">
           <span>&copy; {new Date().getFullYear()} {state.config.name}. All rights reserved.</span>
           <Link to="/admin" className="opacity-50 hover:opacity-100 flex items-center gap-1">
             <Icon name="Lock" size={12} /> Admin
           </Link>
        </div>
      </footer>
    </div>
  );
};

// Placeholder for Simple Pages
const ServicesPage = () => {
    const { state } = useApp();
    return (
        <div className="pt-24 pb-12 container mx-auto px-4">
             <div className="text-center max-w-3xl mx-auto mb-16">
                <h1 className="text-4xl font-bold mb-4">Our Digital Services</h1>
                <p className="text-lg text-gray-600">We provide end-to-end marketing solutions.</p>
             </div>
             <div className="grid md:grid-cols-2 gap-8">
                {state.services.map(s => (
                    <div key={s.id} className="border p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <Icon name={s.iconName} size={40} className="text-[var(--primary)] mb-4" />
                        <h2 className="text-2xl font-bold mb-2">{s.title}</h2>
                        <p className="text-gray-600 mb-4">{s.fullDescription}</p>
                        <ul className="space-y-2 mb-6">
                            {s.features.map(f => (
                                <li key={f} className="flex items-center text-sm text-gray-500">
                                    <Icon name="CheckCircle" size={16} className="text-green-500 mr-2" /> {f}
                                </li>
                            ))}
                        </ul>
                        <Link to="/contact">
                            <Button variant="outline" className="w-full">Request Proposal</Button>
                        </Link>
                    </div>
                ))}
             </div>
        </div>
    )
}

const BlogPage = () => {
    const { state } = useApp();
    return (
        <div className="pt-24 pb-12 container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-8 text-center">Latest Insights</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {state.posts.filter(p => p.status === 'published').map(post => (
                    <article key={post.id} className="flex flex-col h-full border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <img src={post.imageUrl} alt={post.title} className="h-48 w-full object-cover" />
                        <div className="p-6 flex-grow flex flex-col">
                            <span className="text-xs font-bold text-[var(--primary)] mb-2 uppercase tracking-wide">{post.category}</span>
                            <h2 className="text-xl font-bold mb-3">{post.title}</h2>
                            <p className="text-gray-600 mb-4 text-sm flex-grow">{post.excerpt}</p>
                            <div className="flex justify-between items-center text-xs text-gray-500 mt-auto pt-4 border-t">
                                <span>{post.author}</span>
                                <span>{post.date}</span>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    )
}

const CaseStudiesPage = () => {
    const { state } = useApp();
    return (
        <div className="pt-24 pb-12 container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-12 text-center">Success Stories</h1>
             <div className="space-y-12">
                {state.caseStudies.map((study, idx) => (
                    <div key={study.id} className={`flex flex-col md:flex-row gap-8 items-center ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                         <div className="md:w-1/2">
                            <img src={study.imageUrl} alt={study.client} className="rounded-xl shadow-lg w-full" />
                         </div>
                         <div className="md:w-1/2">
                             <div className="flex items-center gap-3 mb-4">
                                <span className="font-bold text-2xl">{study.client}</span>
                                <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-600">{study.industry}</span>
                             </div>
                             <h3 className="text-xl font-semibold mb-2">The Challenge</h3>
                             <p className="text-gray-600 mb-4">{study.challenge}</p>
                             <h3 className="text-xl font-semibold mb-2">Our Strategy</h3>
                             <p className="text-gray-600 mb-6">{study.solution}</p>
                             <div className="grid grid-cols-2 gap-4">
                                 {study.results.map((r, i) => (
                                     <div key={i} className="bg-[var(--primary)]/5 p-4 rounded-lg border border-[var(--primary)]/20">
                                         <div className="text-2xl font-bold text-[var(--primary)]">{r.value}</div>
                                         <div className="text-sm text-gray-600">{r.label}</div>
                                     </div>
                                 ))}
                             </div>
                         </div>
                    </div>
                ))}
             </div>
        </div>
    )
}

const App = () => {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="case-studies" element={<CaseStudiesPage />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="leads" element={<LeadManager />} />
            <Route path="posts" element={<PostManager />} />
            <Route path="settings" element={<SettingsManager />} />
            <Route path="services" element={<div className="p-4">Service Editor (Not implemented in demo)</div>} />
          </Route>
        </Routes>
      </HashRouter>
    </AppProvider>
  );
};

export default App;
