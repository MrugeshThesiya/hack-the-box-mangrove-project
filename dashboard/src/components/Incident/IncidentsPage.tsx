"use client"
import { Download, Filter, Search } from "lucide-react";
import { useState } from "react";
import { IncidentDetailModal } from "./IncidentDetailModal";

const recentIncidents = [
  { id: "INC-001", location: "Sunderbans, Sector A", reporter: "Arjun Verma", date: "2025-08-28", status: "Verified" },
  { id: "INC-002", location: "Pichavaram, Zone 3", reporter: "Priya Singh", date: "2025-08-27", status: "Resolved" },
  { id: "INC-003", location: "Bhitarkanika, Core Area", reporter: "Rohan Desai", date: "2025-08-27", status: "Pending" },
  { id: "INC-004", location: "Godavari-Krishna, Block D", reporter: "Anika Sharma", date: "2025-08-26", status: "Rejected" },
  { id: "INC-005", location: "Sunderbans, Sector B", reporter: "Vikram Rathore", date: "2025-08-25", status: "Resolved" },
];

const detailedIncidents = [
    { 
        id: "INC-001", 
        location: "Sunderbans, Sector A", 
        reporter: "Arjun Verma", 
        date: "2025-08-28", 
        status: "Verified", 
        severity: "High",
        type: "Illegal Cutting",
        description: "Large-scale illegal logging observed near the riverbank. Approximately 2 acres of mature mangroves have been cleared. Evidence of chainsaw usage and vehicle tracks found.",
        evidence: ["placeholder1", "placeholder2"],
        timeline: [
            { status: "Verified", date: "2025-08-29", notes: "Assigned to Inspector R. Singh for investigation." },
            { status: "Reported", date: "2025-08-28", notes: "Initial report by Arjun Verma." },
        ]
    },
    { 
        id: "INC-002", 
        location: "Pichavaram, Zone 3", 
        reporter: "Priya Singh", 
        date: "2025-08-27", 
        status: "Resolved", 
        severity: "Medium",
        type: "Waste Dumping",
        description: "Industrial waste and plastic bags found dumped in a waterway, blocking the flow and affecting local fauna.",
        evidence: ["placeholder1"],
        timeline: [
            { status: "Resolved", date: "2025-08-28", notes: "Cleanup operation completed by local NGO." },
            { status: "Reported", date: "2025-08-27", notes: "Initial report by Priya Singh." },
        ]
    },
    { 
        id: "INC-003", 
        location: "Bhitarkanika, Core Area", 
        reporter: "Rohan Desai", 
        date: "2025-08-27", 
        status: "Pending", 
        severity: "Low",
        type: "Minor Damage",
        description: "A small boat appears to have crashed into a cluster of young mangrove trees, causing minor damage.",
        evidence: [],
        timeline: [
            { status: "Reported", date: "2025-08-27", notes: "Awaiting verification." },
        ]
    },
     { 
        id: "INC-004", 
        location: "Godavari-Krishna, D Block", 
        reporter: "Anika Sharma", 
        date: "2025-08-26", 
        status: "Rejected", 
        severity: "High",
        type: "Illegal Cutting",
        description: "Reports of illegal cutting, but upon initial remote verification, the area appears to be part of a sanctioned clearing for a new canal.",
        evidence: ["placeholder1"],
        timeline: [
            { status: "Rejected", date: "2025-08-26", notes: "Activity confirmed as sanctioned work." },
            { status: "Reported", date: "2025-08-26", notes: "Initial report by Anika Sharma." },
        ]
    },
];

export const IncidentsPage = () => {
    const [selectedIncident, setSelectedIncident] = useState(null);

    const getSeverityBorderStyle = (severity) => {
        switch (severity) {
            case 'High': return 'border-l-4 border-red-500';
            case 'Medium': return 'border-l-4 border-amber-500';
            case 'Low': return 'border-l-4 border-gray-400';
            default: return 'border-l-4 border-gray-200';
        }
    };
    
    const getStatusPillStyle = (status) => {
        switch (status) {
            case 'Verified': return 'bg-blue-100 text-blue-800';
            case 'Resolved': return 'bg-emerald-100 text-emerald-800';
            case 'Pending': return 'bg-amber-100 text-amber-800';
            case 'Rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="container mx-auto space-y-6">
             {selectedIncident && <IncidentDetailModal incident={selectedIncident} onClose={() => setSelectedIncident(null)} />}
            
            <div className="flex justify-between items-center">
                 <h1 className="text-2xl font-bold text-gray-800">Incident Management</h1>
                 <button className="flex items-center px-4 py-2 text-sm font-semibold text-white bg-emerald-600 rounded-lg shadow-sm hover:bg-emerald-700">
                     <Download className="h-4 w-4 mr-2"/>
                     Export CSV
                 </button>
            </div>

            {/* Filters Bar */}
            <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 flex items-center space-x-4">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input type="text" placeholder="Search by location or reporter..." className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500" />
                </div>
                <select className="border border-gray-300 rounded-lg text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-emerald-500">
                    <option>All Types</option>
                    <option>Illegal Cutting</option>
                    <option>Waste Dumping</option>
                    <option>Minor Damage</option>
                </select>
                <select className="border border-gray-300 rounded-lg text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-emerald-500">
                    <option>All Severities</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                </select>
                <input type="date" className="border border-gray-300 rounded-lg text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-gray-500" />
                <button className="flex items-center px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                    <Filter className="h-4 w-4 mr-2"/>
                    Apply
                </button>
            </div>

            {/* Incidents List */}
            <div className="space-y-4">
                {detailedIncidents.map(incident => (
                    <div 
                        key={incident.id} 
                        onClick={() => setSelectedIncident(incident)}
                        className={`bg-white rounded-lg shadow-md border border-gray-100 hover:shadow-lg hover:border-emerald-300 transition-all duration-200 cursor-pointer flex items-start p-4 ${getSeverityBorderStyle(incident.severity)}`}
                    >
                         <div className="w-24 h-24 bg-gray-200 rounded-md flex-shrink-0 mr-4 flex items-center justify-center">
                            <span className="text-xs text-gray-500">Evidence</span>
                         </div>
                         <div className="flex-grow">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getStatusPillStyle(incident.status)}`}>{incident.status}</span>
                                    <h3 className="font-bold text-lg text-gray-800 mt-1">{incident.type}</h3>
                                    <p className="text-sm text-gray-500">{incident.location}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-gray-700">{incident.id}</p>
                                    <p className="text-xs text-gray-500">{incident.date}</p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 mt-2 line-clamp-2">{incident.description}</p>
                         </div>
                    </div>
                ))}
            </div>
        </div>
    );
};