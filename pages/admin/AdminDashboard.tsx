import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useApp } from '../../context';
import { Icon } from '../../components/Shared';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

// Sidebar Link Component
const SidebarLink = ({ to, icon, label }: { to: string; icon: string; label: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center px-6 py-3 transition-colors ${
        isActive
          ? 'bg-[var(--primary)] text-white border-r-4 border-white'
          : 'text-gray-400 hover:text-white hover:bg-gray-800'
      }`
    }
  >
    <Icon name={icon} size={20} className="mr-3" />
    <span className="font-medium">{label}</span>
  </NavLink>
);

export const AdminLayout = () => {
  const { state } = useApp();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0f172a] text-white hidden md:flex flex-col flex-shrink-0">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-2xl font-bold tracking-tight">RRDMS<span className="text-[var(--primary)]">.Admin</span></h2>
        </div>
        <nav className="flex-1 mt-6">
          <SidebarLink to="/admin" icon="LayoutDashboard" label="Dashboard" />
          <SidebarLink to="/admin/leads" icon="Users" label="Leads" />
          <SidebarLink to="/admin/posts" icon="FileText" label="Blog Posts" />
          <SidebarLink to="/admin/services" icon="Briefcase" label="Services" />
          <SidebarLink to="/admin/settings" icon="Settings" label="Settings" />
        </nav>
        <div className="p-4 border-t border-gray-800">
           <NavLink to="/" className="flex items-center text-sm text-gray-400 hover:text-white">
             <Icon name="LogOut" size={16} className="mr-2" />
             Back to Website
           </NavLink>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center md:hidden">
             <span className="font-bold text-gray-800">Admin Panel</span>
             <NavLink to="/" className="text-sm text-[var(--primary)]">Exit</NavLink>
        </header>
        <div className="p-6 md:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export const DashboardHome = () => {
  const { state } = useApp();
  const leadsCount = state.leads.length;
  const postsCount = state.posts.length;
  
  // Mock analytics data
  const data = [
    { name: 'Mon', visits: 4000, leads: 24 },
    { name: 'Tue', visits: 3000, leads: 13 },
    { name: 'Wed', visits: 2000, leads: 98 },
    { name: 'Thu', visits: 2780, leads: 39 },
    { name: 'Fri', visits: 1890, leads: 48 },
    { name: 'Sat', visits: 2390, leads: 38 },
    { name: 'Sun', visits: 3490, leads: 43 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Leads</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2">{leadsCount}</h3>
            </div>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Icon name="Users" size={24} />
            </div>
          </div>
          <p className="text-sm text-green-600 mt-4 flex items-center">
            <Icon name="TrendingUp" size={14} className="mr-1"/> +12% from last week
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Published Posts</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2">{postsCount}</h3>
            </div>
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
              <Icon name="FileText" size={24} />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">Across 3 categories</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Avg. Conv. Rate</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2">2.4%</h3>
            </div>
            <div className="p-2 bg-green-50 text-green-600 rounded-lg">
              <Icon name="Percent" size={24} />
            </div>
          </div>
          <p className="text-sm text-green-600 mt-4 flex items-center">
             <Icon name="TrendingUp" size={14} className="mr-1"/> +0.4% improvement
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
           <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Revenue (Est)</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2">$12.5k</h3>
            </div>
            <div className="p-2 bg-yellow-50 text-yellow-600 rounded-lg">
              <Icon name="DollarSign" size={24} />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">Current Month</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-80">
          <h3 className="text-lg font-bold mb-4">Traffic Overview</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="name" stroke="#cbd5e1" fontSize={12} tickLine={false} axisLine={false}/>
              <YAxis stroke="#cbd5e1" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="visits" stroke="var(--primary)" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-80">
          <h3 className="text-lg font-bold mb-4">Leads Generated</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
               <XAxis dataKey="name" stroke="#cbd5e1" fontSize={12} tickLine={false} axisLine={false}/>
               <Tooltip cursor={{fill: 'transparent'}} />
               <Bar dataKey="leads" fill="var(--secondary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Leads Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold">Recent Leads</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-sm">
              <tr>
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Company</th>
                <th className="px-6 py-3 font-medium">Service</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {state.leads.slice(0, 5).map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{lead.name}</td>
                  <td className="px-6 py-4 text-gray-600">{lead.company}</td>
                  <td className="px-6 py-4 text-gray-600">{lead.serviceInterest}</td>
                  <td className="px-6 py-4 text-gray-600">{lead.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                      lead.status === 'new' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {lead.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
              {state.leads.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No leads found yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
