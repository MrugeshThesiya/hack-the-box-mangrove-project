"use client"
import IncidentHeatmap from '@/components/HeatMap/IncidentHeatMap';
import { IncidentsPage } from '@/components/Incident/IncidentsPage';
import { MapsAndAnalyticsPage } from '@/components/Map/MapAndAnalysis';
import { AnalyticsPage } from '@/components/Reports/AnalyticsAndReport';
import { SettingsPage } from '@/components/Settings/Settings';
import { UsersPage } from '@/components/Users/Users';
import Image from 'next/image';
import React, { useState } from 'react';

// --- INLINE SVG ICONS (Replaces lucide-react) --- //
// This makes the component fully self-contained to avoid network errors in previews.

const Icon = ({ children, className = "h-6 w-6" }: { children: React.ReactNode, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {children}
  </svg>
);

const LayoutDashboard = ({ className }: { className?: string }) => <Icon className={className}><rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" /></Icon>;
const ShieldCheck = ({ className }: { className?: string }) => <Icon className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></Icon>;
const Map = ({ className }: { className?: string }) => <Icon className={className}><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" /><line x1="8" x2="8" y1="2" y2="18" /><line x1="16" x2="16" y1="6" y2="22" /></Icon>;
const Users = ({ className }: { className?: string }) => <Icon className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></Icon>;
const BarChart = ({ className }: { className?: string }) => <Icon className={className}><line x1="12" x2="12" y1="20" y2="10" /><line x1="18" x2="18" y1="20" y2="4" /><line x1="6" x2="6" y1="20" y2="16" /></Icon>;
const Settings = ({ className }: { className?: string }) => <Icon className={className}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></Icon>;
const Bell = ({ className }: { className?: string }) => <Icon className={className}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></Icon>;
const ChevronDown = ({ className }: { className?: string }) => <Icon className={className}><polyline points="6 9 12 15 18 9" /></Icon>;
const ChevronRight = ({ className }: { className?: string }) => <Icon className={className}><polyline points="9 18 15 12 9 6" /></Icon>;
const Search = ({ className }: { className?: string }) => <Icon className={className}><circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /></Icon>;
const Trees = ({ className }: { className?: string }) => <Icon className={className}><path d="M10 10v.2A3 3 0 0 1 7 13H4a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2h-3a3 3 0 0 1-3-2.8V10a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2z" /><path d="m14 14-4 4" /><path d="m10 14 4 4" /></Icon>;
const Siren = ({ className }: { className?: string }) => <Icon className={className}><path d="M7 12a5 5 0 0 1 10 0" /><path d="M12 17v-5" /><path d="M5.2 14.8A8.9 8.9 0 0 1 2 9" /><path d="M18.8 14.8A8.9 8.9 0 0 0 22 9" /><path d="M12 2v2" /><path d="m4.9 4.9 1.4 1.4" /><path d="m17.7 6.3 1.4-1.4" /><path d="M22 17H2" /></Icon>;
const CheckCircle = ({ className }: { className?: string }) => <Icon className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></Icon>;
const UserCheck = ({ className }: { className?: string }) => <Icon className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><polyline points="16 11 18 13 22 9" /></Icon>;
const MoreHorizontal = ({ className }: { className?: string }) => <Icon className={className}><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></Icon>;
const Download = ({ className }: { className?: string }) => <Icon className={className}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></Icon>;

// --- MOCK DATA --- //
const overviewStats = [
  { title: "Total Mangrove Areas Monitored", value: "1,420 Ha", icon: Trees, color: "text-emerald-500", bgColor: "bg-emerald-50" },
  { title: "Total Incidents Reported", value: "289", icon: Siren, color: "text-amber-500", bgColor: "bg-amber-50" },
  { title: "Incidents Verified / Resolved", value: "195", icon: CheckCircle, color: "text-blue-500", bgColor: "bg-blue-50" },
  { title: "Active Reporters", value: "78", icon: UserCheck, color: "text-violet-500", bgColor: "bg-violet-50" },
];

const recentIncidents = [
  { id: "INC-001", location: "Sunderbans, Sector A", reporter: "Arjun Verma", date: "2025-08-28", status: "Verified" },
  { id: "INC-002", location: "Pichavaram, Zone 3", reporter: "Priya Singh", date: "2025-08-27", status: "Resolved" },
  { id: "INC-003", location: "Bhitarkanika, Core Area", reporter: "Rohan Desai", date: "2025-08-27", status: "Pending" },
  { id: "INC-004", location: "Godavari-Krishna, Block D", reporter: "Anika Sharma", date: "2025-08-26", status: "Rejected" },
  { id: "INC-005", location: "Sunderbans, Sector B", reporter: "Vikram Rathore", date: "2025-08-25", status: "Resolved" },
];

const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Incidents', icon: Siren },
    { name: 'Map & Heatmaps', icon: Map },
    { name: 'Users / Reporters', icon: Users },
    { name: 'Analytics / Reports', icon: BarChart },
    { name: 'Settings', icon: Settings },
];

const incidents = [
  { lat: 21.182, long: 72.783, severity: 5 },
  { lat: 21.192, long: 72.764, severity: 3 },
  { lat: 21.210, long: 72.770, severity: 1 },
];

// --- SUB-COMPONENTS --- //

type SidebarProps = {
  activeItem: string;
  setActiveItem: (item: string) => void;
};

const Sidebar = ({ activeItem, setActiveItem }: SidebarProps) => {
  const [isMapMenuOpen, setMapMenuOpen] = useState(true);

  // const navItems = [
  //   { name: 'Dashboard', icon: LayoutDashboard },
  //   { name: 'Incidents', icon: Siren },
  //   { 
  //     name: 'Map & Heatmaps', 
  //     icon: Map, 
  //     subItems: ['Community Heatmap', 'Risk Prediction Map'] 
  //   },
  //   { name: 'Users / Reporters', icon: Users },
  //   { name: 'Analytics / Reports', icon: BarChart },
  //   { name: 'Settings', icon: Settings },
  // ];

  return (
    <aside className="w-64 flex-shrink-0 bg-gray-800 text-gray-300 flex flex-col">
      <div className="h-16 flex items-center justify-center px-4 bg-gray-900">
        <Image src="/images/logo.png" alt="MangroveWatch Logo" width={32} height={32} className='rounded-full' />
        <span className="text-xl font-semibold text-white ml-2">MangroProtect</span>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map(item => {
          const isActive = activeItem === item.name;
          return (
            <a 
              key={item.name} 
              href="#" 
              onClick={(e) => { e.preventDefault(); setActiveItem(item.name); }}
              className={`flex items-center px-3 py-2.5 rounded-lg transition-colors duration-200 ${
                isActive ? 'bg-emerald-600 text-white font-semibold shadow-inner' : 'hover:bg-gray-700'
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              <span>{item.name}</span>
            </a>
          );
        })}
      </nav>
      <div className="p-4 border-t border-gray-700">
         <div className="bg-gray-700/50 p-4 rounded-lg text-center">
            <ShieldCheck className="h-8 w-8 text-emerald-400 mx-auto mb-2"/>
            <p className="text-sm font-semibold">Secure Authority Portal</p>
            <p className="text-xs text-gray-400 mt-1">Version 1.0.0</p>
         </div>
      </div>
    </aside>
  );
};

const Header = () => {
    const [profileOpen, setProfileOpen] = useState(false);
    return (
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 flex-shrink-0">
            {/* Search Bar */}
            <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input 
                    type="text" 
                    placeholder="Search incidents, reporters..."
                    className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
            </div>
            {/* User Profile and Notifications */}
            <div className="flex items-center space-x-5">
                <button className="relative text-gray-500 hover:text-gray-800">
                    <Bell className="h-6 w-6" />
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                <div className="relative">
                    <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center space-x-2">
                        <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="font-semibold text-gray-500">A</span>
                        </div>
                        <div className="text-left hidden sm:block">
                            <p className="text-sm font-semibold text-gray-800">Admin User</p>
                            <p className="text-xs text-gray-500">Authority</p>
                        </div>
                         <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${profileOpen ? 'rotate-180' : ''}`}/>
                    </button>
                    {profileOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-1 z-10 border border-gray-100">
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                            <div className="border-t border-gray-100 my-1"></div>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

const OverviewCards = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
                        <p className="text-3xl font-bold text-gray-800 mt-1">{stat.value}</p>
                    </div>
                    <div className={`${stat.bgColor} ${stat.color} p-3 rounded-full`}>
                        <stat.icon className="h-6 w-6" />
                    </div>
                </div>
            </div>
        ))}
    </div>
);

const MapsSection = () => {
    const [activeTab, setActiveTab] = useState('community');

    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">Area Analysis</h3>
                    <p className="text-sm text-gray-500">Visualize incident hotspots and deforestation risks.</p>
                </div>
                {/* Map Tabs */}
                <div className="flex space-x-1 bg-gray-100 p-1 rounded-full">
                    <button 
                        onClick={() => setActiveTab('community')}
                        className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-colors ${activeTab === 'community' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}>
                        Community Heatmap
                    </button>
                    <button 
                        onClick={() => setActiveTab('risk')}
                        className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-colors ${activeTab === 'risk' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}>
                        AI Risk Prediction
                    </button>
                </div>
            </div>
            {/* Placeholder for Maps */}
            <div className="h-96 bg-gray-200 rounded-lg relative overflow-hidden flex items-center justify-center">
                <IncidentHeatmap incidents={incidents} />
            </div>
        </div>
    );
};


const DashboardContent = () => (
  <div className="container mx-auto space-y-6">
    <h1 className="text-2xl font-bold text-gray-800">Authorities Dashboard</h1>
    <OverviewCards />
    <MapsSection />
    <IncidentsTable />
    <AnalyticsSection />
  </div>
);

const IncidentsTable = () => {
    const getStatusChip = (status: string) => {
        switch (status) {
            case 'Verified': return 'bg-blue-100 text-blue-800';
            case 'Resolved': return 'bg-emerald-100 text-emerald-800';
            case 'Pending': return 'bg-amber-100 text-amber-800';
            case 'Rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
             <div className="p-6">
                 <h3 className="text-lg font-semibold text-gray-800">Recent Incidents</h3>
                 <p className="text-sm text-gray-500">Review and manage reported incidents.</p>
             </div>
             <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Incident ID</th>
                            <th scope="col" className="px-6 py-3">Location</th>
                            <th scope="col" className="px-6 py-3">Reporter</th>
                            <th scope="col" className="px-6 py-3">Date</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentIncidents.map((incident) => (
                            <tr key={incident.id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">{incident.id}</td>
                                <td className="px-6 py-4">{incident.location}</td>
                                <td className="px-6 py-4">{incident.reporter}</td>
                                <td className="px-6 py-4">{incident.date}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusChip(incident.status)}`}>
                                        {incident.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <button className="text-gray-500 hover:text-gray-800">
                                        <MoreHorizontal className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
             </div>
        </div>
    );
};

const AnalyticsSection = () => (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Main Charts */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bar Chart */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-800">Incidents by Region</h4>
                    <p className="text-xs text-gray-500">Last 30 days</p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600"><Download className="h-4 w-4"/></button>
                </div>
                {/* Mock bar chart */}
                <div className="h-48 flex items-end justify-around space-x-2">
                    <div className="w-full h-[60%] bg-emerald-300 rounded-t-sm" title="Sunderbans: 60%"></div>
                    <div className="w-full h-[80%] bg-emerald-300 rounded-t-sm" title="Pichavaram: 80%"></div>
                    <div className="w-full h-[45%] bg-emerald-300 rounded-t-sm" title="Bhitarkanika: 45%"></div>
                    <div className="w-full h-[70%] bg-emerald-300 rounded-t-sm" title="Godavari-Krishna: 70%"></div>
                    <div className="w-full h-[30%] bg-emerald-300 rounded-t-sm" title="Other: 30%"></div>
                </div>
            </div>
            {/* Line Chart */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                 <div className="flex justify-between items-center mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-800">Monthly Report Trend</h4>
                      <p className="text-xs text-gray-500">Last 6 months</p>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600"><Download className="h-4 w-4"/></button>
                </div>
                {/* Mock line chart using SVG */}
                <div className="h-48">
                    <svg width="100%" height="100%" viewBox="0 0 300 100" preserveAspectRatio="none">
                        <path d="M 0 70 L 50 50 L 100 60 L 150 40 L 200 55 L 250 30 L 300 45" fill="none" stroke="#10B981" strokeWidth="2" />
                         <path d="M 0 70 L 50 50 L 100 60 L 150 40 L 200 55 L 250 30 L 300 45 L 300 100 L 0 100 Z" fill="url(#gradient)" />
                         <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            </div>
        </div>
        {/* Pie Chart / Reporter Activity */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h4 className="font-semibold text-gray-800 mb-4">Reporter Activity</h4>
            {/* Mock pie chart */}
            <div className="h-48 w-48 mx-auto my-4 bg-gradient-to-tr from-emerald-500 via-blue-400 to-violet-500 rounded-full flex items-center justify-center">
                 <div className="h-32 w-32 bg-white rounded-full"></div>
            </div>
             <div className="flex justify-center space-x-4 text-xs">
                <span className="flex items-center"><span className="h-2 w-2 rounded-full bg-emerald-500 mr-2"></span>Highly Active</span>
                <span className="flex items-center"><span className="h-2 w-2 rounded-full bg-blue-400 mr-2"></span>Moderately Active</span>
                <span className="flex items-center"><span className="h-2 w-2 rounded-full bg-violet-500 mr-2"></span>Less Active</span>
            </div>
        </div>
    </div>
);

const Footer = () => (
    <footer className="text-center py-5 mt-auto text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} MangroveWatch. All rights reserved.</p>
        <div className="mt-2 space-x-4">
            <a href="#" className="hover:text-gray-800">About</a>
            <span>&middot;</span>
            <a href="#" className="hover:text-gray-800">Help/Support</a>
        </div>
    </footer>
);


// --- MAIN APP COMPONENT --- //

export default function DashboardPage() {
  const [activePage, setActivePage] = useState('Dashboard');

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar Navigation */}
      <Sidebar activeItem={activePage} setActiveItem={setActivePage} />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />
        
        {/* Scrollable Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {activePage === 'Dashboard' && <DashboardContent />}
          {activePage === 'Incidents' && <IncidentsPage />}
          {activePage === 'Map & Heatmaps' && <MapsAndAnalyticsPage />}
          {activePage === 'Users / Reporters' && <UsersPage />}
          {activePage === 'Analytics / Reports' && <AnalyticsPage />}
          {activePage === 'Settings' && <SettingsPage />}
        </main>

        {/* Footer */}
        <Footer/>
      </div>
    </div>
  );
}

