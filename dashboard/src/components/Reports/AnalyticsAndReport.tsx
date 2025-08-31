"use client"

import { Download } from "lucide-react";

export const AnalyticsPage = () => {
    
    const analyticsMetrics = [
        { title: "Avg. Resolution Time", value: "48 Hours", change: "-5%", changeType: "positive" },
        { title: "Pending Incidents", value: "22", change: "+12%", changeType: "negative" },
        { title: "Top Reporter", value: "Priya Singh", subValue: "32 reports" },
        { title: "Most Active Region", value: "Sunderbans", subValue: "112 reports" },
    ];

    const incidentTypes = [
        { type: "Illegal Cutting", count: 145, color: "bg-red-500" },
        { type: "Waste Dumping", count: 88, color: "bg-amber-500" },
        { type: "Minor Damage", count: 34, color: "bg-blue-500" },
        { type: "Other", count: 22, color: "bg-gray-400" },
    ];

    const totalIncidents = incidentTypes.reduce((sum, item) => sum + item.count, 0);

    return (
        <div className="container mx-auto space-y-6">
            <div className="flex justify-between items-center">
                 <h1 className="text-2xl font-bold text-gray-800">Analytics & Reports</h1>
                 <div className="flex items-center space-x-2">
                    <button className="flex items-center px-4 py-2 text-sm font-semibold text-white bg-emerald-600 rounded-lg shadow-sm hover:bg-emerald-700">
                        <Download className="h-4 w-4 mr-2"/>
                        Export PDF
                    </button>
                    <button className="flex items-center px-4 py-2 text-sm font-semibold text-gray-700 bg-white border rounded-lg shadow-sm hover:bg-gray-50">
                        <Download className="h-4 w-4 mr-2"/>
                        Export CSV
                    </button>
                 </div>
            </div>
            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {analyticsMetrics.map(metric => (
                     <div key={metric.title} className="bg-white p-5 rounded-xl shadow-md border border-gray-100">
                         <p className="text-sm text-gray-500 font-medium">{metric.title}</p>
                         <div className="flex justify-between items-baseline mt-2">
                            <p className="text-2xl font-bold text-gray-800">{metric.value}</p>
                            {metric.change && (
                                <span className={`text-sm font-semibold ${metric.changeType === 'positive' ? 'text-emerald-500' : 'text-red-500'}`}>
                                    {metric.change}
                                </span>
                            )}
                         </div>
                          {metric.subValue && <p className="text-xs text-gray-400 mt-1">{metric.subValue}</p>}
                     </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Incident Trends */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md border border-gray-100">
                    <h3 className="font-semibold text-gray-800 mb-4">Incident Trends (Last 12 Months)</h3>
                    <div className="h-80">
                         <svg width="100%" height="100%" viewBox="0 0 500 200" preserveAspectRatio="none">
                            <path d="M 0 150 L 45 120 L 90 130 L 135 100 L 180 115 L 225 80 L 270 95 L 315 60 L 360 75 L 405 40 L 450 65 L 500 50" fill="none" stroke="#10B981" strokeWidth="2" />
                            <path d="M 0 150 L 45 120 L 90 130 L 135 100 L 180 115 L 225 80 L 270 95 L 315 60 L 360 75 L 405 40 L 450 65 L 500 50 V 200 H 0 Z" fill="url(#analytics_gradient)" />
                            <defs>
                                <linearGradient id="analytics_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
                                <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </div>
                {/* Type Analysis */}
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                    <h3 className="font-semibold text-gray-800 mb-4">Incident Type Analysis</h3>
                    <div className="h-48 w-48 mx-auto my-4 relative">
                        <svg viewBox="0 0 36 36" className="transform -rotate-90">
                            <circle cx="18" cy="18" r="15.915" fill="none" stroke="#e6e6e6" strokeWidth="3.8"></circle>
                            <circle cx="18" cy="18" r="15.915" fill="none" stroke="#ef4444" strokeWidth="3.8" strokeDasharray="49, 100"></circle>
                            <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f59e0b" strokeWidth="3.8" strokeDasharray="29, 100" strokeDashoffset="-49"></circle>
                             <circle cx="18" cy="18" r="15.915" fill="none" stroke="#3b82f6" strokeWidth="3.8" strokeDasharray="12, 100" strokeDashoffset="-78"></circle>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-bold text-gray-800">{totalIncidents}</span>
                            <span className="text-sm text-gray-500">Total</span>
                        </div>
                    </div>
                     <div className="space-y-2 text-sm">
                        {incidentTypes.map(item => (
                             <div key={item.type} className="flex justify-between items-center">
                                 <span className="flex items-center"><div className={`w-3 h-3 rounded-full mr-2 ${item.color}`}></div>{item.type}</span>
                                 <span className="font-semibold text-gray-700">{item.count}</span>
                             </div>
                        ))}
                     </div>
                </div>
            </div>
        </div>
    );
};
