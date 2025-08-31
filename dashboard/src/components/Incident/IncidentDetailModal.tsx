"use client"

import { AlertTriangle, Clock, MapPin, User, X } from "lucide-react";

export const IncidentDetailModal = ({ incident, onClose }) => {
    if (!incident) return null;

    const getSeverityPillStyle = (severity) => {
        switch (severity) {
            case 'High': return 'bg-red-100 text-red-800 border-red-200';
            case 'Medium': return 'bg-amber-100 text-amber-800 border-amber-200';
            case 'Low': return 'bg-gray-100 text-gray-800 border-gray-200';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    
    const getStatusPillStyle = (status) => {
        switch (status) {
            case 'Verified': case 'Under Investigation': return 'bg-blue-100 text-blue-800';
            case 'Resolved': return 'bg-emerald-100 text-emerald-800';
            case 'Pending': return 'bg-amber-100 text-amber-800';
            case 'Rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                <header className="p-6 border-b flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Incident Details: {incident.id}</h2>
                        <p className="text-sm text-gray-500">{incident.type}</p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
                        <X className="h-6 w-6 text-gray-600" />
                    </button>
                </header>

                <main className="p-6 flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Details & Evidence */}
                    <div className="lg:col-span-2 space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">Description</h3>
                            <p className="text-gray-600 leading-relaxed">{incident.description}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center text-gray-600"><User className="w-4 h-4 mr-2 text-gray-400" /> <strong>Reporter:</strong><span className="ml-2">{incident.reporter}</span></div>
                            <div className="flex items-center text-gray-600"><Clock className="w-4 h-4 mr-2 text-gray-400" /> <strong>Date:</strong><span className="ml-2">{incident.date}</span></div>
                            <div className="flex items-center text-gray-600"><MapPin className="w-4 h-4 mr-2 text-gray-400" /> <strong>Location:</strong><span className="ml-2">{incident.location}</span></div>
                            <div className="flex items-center text-gray-600"><AlertTriangle className="w-4 h-4 mr-2 text-gray-400" /> <strong>Severity:</strong><span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium border ${getSeverityPillStyle(incident.severity)}`}>{incident.severity}</span></div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-3">Evidence</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {incident.evidence.length > 0 ? (
                                    incident.evidence.map((src, index) => (
                                         <div key={index} className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center">
                                            <span className="text-gray-500">Evidence Placeholder</span>
                                         </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-sm italic col-span-2">No evidence submitted.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Timeline */}
                    <div className="bg-gray-50 p-4 rounded-lg border">
                         <h3 className="text-lg font-semibold text-gray-700 mb-4">Timeline</h3>
                         <div className="relative pl-4">
                             <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-gray-200"></div>
                             {incident.timeline.map((item, index) => (
                                <div key={index} className="relative mb-6">
                                    <div className={`absolute left-6 -translate-x-1/2 top-1.5 w-3 h-3 rounded-full ${index === 0 ? 'bg-emerald-500' : 'bg-gray-300'}`}></div>
                                    <div className="ml-8">
                                        <p className={`font-semibold text-sm ${index === 0 ? 'text-gray-800' : 'text-gray-600'}`}>{item.status}</p>
                                        <p className="text-xs text-gray-500 mb-1">{item.date}</p>
                                        <p className="text-xs text-gray-500">{item.notes}</p>
                                    </div>
                                </div>
                             ))}
                         </div>
                    </div>
                </main>
                
                <footer className="p-6 bg-gray-50 border-t rounded-b-2xl flex justify-end space-x-3">
                    <button className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border rounded-lg hover:bg-gray-100">Assign for Inspection</button>
                    <button className="px-4 py-2 text-sm font-semibold text-white bg-amber-500 border rounded-lg hover:bg-amber-600">Escalate</button>
                    <button className="px-4 py-2 text-sm font-semibold text-white bg-emerald-600 border rounded-lg hover:bg-emerald-700">Mark as Resolved</button>
                </footer>
            </div>
        </div>
    );
};