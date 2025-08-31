"use client"

import { Award, BrainCircuit, MapPin, Users } from "lucide-react";
import { useState } from "react";

const communityReporters = [
    { name: "Priya Singh", reports: 32, score: 480, avatar: 'P' },
    { name: "Arjun Verma", reports: 28, score: 450, avatar: 'A' },
    { name: "Rohan Desai", reports: 25, score: 390, avatar: 'R' },
    { name: "Anika Sharma", reports: 21, score: 350, avatar: 'A' },
    { name: "Vikram Rathore", reports: 18, score: 310, avatar: 'V' },
];

export const MapsAndAnalyticsPage = () => {
    const [activeTab, setActiveTab] = useState('incident');

    const TabButton = ({ tabName, title, icon: Icon }) => (
        <button
            onClick={() => setActiveTab(tabName)}
            className={`flex items-center px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
                activeTab === tabName
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-200'
            }`}
        >
            <Icon className="h-5 w-5 mr-2" />
            {title}
        </button>
    );

    const MapPlaceholder = ({ children }) => (
        <div className="flex-1 h-full bg-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden">
            {children}
        </div>
    );
    
    const SidePanel = ({ children, title }) => (
        <div className="w-full lg:w-96 flex-shrink-0 bg-white border border-gray-200 rounded-xl shadow-md flex flex-col">
            <h3 className="text-lg font-bold text-gray-800 p-4 border-b">{title}</h3>
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {children}
            </div>
        </div>
    );

    return (
        <div className="container mx-auto h-full flex flex-col space-y-6">
            <div className="flex justify-between items-center">
                 <h1 className="text-2xl font-bold text-gray-800">Maps & Analytics</h1>
                 <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-lg">
                    <TabButton tabName="incident" title="Incident Map" icon={MapPin} />
                    <TabButton tabName="community" title="Community Heatmap" icon={Users} />
                    <TabButton tabName="risk" title="AI Risk Prediction" icon={BrainCircuit} />
                 </div>
            </div>

            <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
                {/* Incident Map View */}
                {activeTab === 'incident' && (
                    <>
                        <MapPlaceholder>
                            <span className="text-lg font-semibold text-gray-500">Interactive Incident Map</span>
                            <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-red-500 rounded-full"></div>
                            <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-amber-500 rounded-full"></div>
                            <div className="absolute bottom-1/4 right-1/4 w-4 h-4 bg-blue-500 rounded-full"></div>
                        </MapPlaceholder>
                        <SidePanel title="Filters & Layers">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Incident Type</label>
                                <select className="w-full border border-gray-300 rounded-lg text-sm px-3 py-2">
                                    <option>All Types</option><option>Illegal Cutting</option><option>Waste Dumping</option>
                                </select>
                            </div>
                             <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Severity</label>
                                <select className="w-full border border-gray-300 rounded-lg text-sm px-3 py-2">
                                    <option>All Severities</option><option>High</option><option>Medium</option><option>Low</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Date Range</label>
                                <input type="date" className="w-full border border-gray-300 rounded-lg text-sm px-3 py-2 text-gray-500" />
                            </div>
                            <div className="border-t pt-4 mt-2">
                                <h4 className="text-sm font-semibold text-gray-700 mb-2">Heatmap Layers</h4>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="density-toggle" className="text-sm text-gray-600">Incident Density</label>
                                    <input type="checkbox" id="density-toggle" className="toggle-checkbox" />
                                </div>
                                 <div className="flex items-center justify-between mt-2">
                                    <label htmlFor="severity-toggle" className="text-sm text-gray-600">Severity Hotspots</label>
                                    <input type="checkbox" id="severity-toggle" className="toggle-checkbox"/>
                                </div>
                            </div>
                        </SidePanel>
                    </>
                )}
                
                {/* Community Heatmap View */}
                {activeTab === 'community' && (
                    <>
                         <MapPlaceholder>
                            <span className="text-lg font-semibold text-gray-500">Community Engagement Heatmap</span>
                            <div className="absolute top-20 left-24 w-12 h-12 bg-emerald-500/50 rounded-full"></div>
                            <div className="absolute bottom-16 right-32 w-16 h-16 bg-emerald-500/50 rounded-full"></div>
                         </MapPlaceholder>
                         <SidePanel title="Top Community Reporters">
                            {communityReporters.map((reporter, index) => (
                                <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                                    <div className="h-10 w-10 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center font-bold text-emerald-600">{reporter.avatar}</div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-sm text-gray-800">{reporter.name}</p>
                                        <p className="text-xs text-gray-500">{reporter.reports} reports</p>
                                    </div>
                                    <div className="text-sm font-bold text-emerald-500 flex items-center">
                                        <Award className="w-4 h-4 mr-1"/>
                                        {reporter.score}
                                    </div>
                                </div>
                            ))}
                         </SidePanel>
                    </>
                )}
                
                {/* AI Risk Prediction View */}
                {activeTab === 'risk' && (
                     <>
                        <MapPlaceholder>
                            <span className="text-lg font-semibold text-gray-500">AI-Powered Risk Prediction Map</span>
                            <div className="absolute inset-0 bg-gradient-to-br from-red-500/30 via-amber-500/30 to-green-500/30"></div>
                        </MapPlaceholder>
                         <SidePanel title="Risk Analysis">
                            <div>
                                 <h4 className="text-sm font-semibold text-gray-700 mb-2">Legend</h4>
                                 <div className="space-y-1 text-sm">
                                    <div className="flex items-center"><div className="w-4 h-4 rounded bg-red-500 mr-2"></div> High Risk</div>
                                    <div className="flex items-center"><div className="w-4 h-4 rounded bg-amber-500 mr-2"></div> Medium Risk</div>
                                    <div className="flex items-center"><div className="w-4 h-4 rounded bg-green-500 mr-2"></div> Low Risk</div>
                                 </div>
                            </div>
                            <div className="border-t pt-4 mt-2">
                                 <h4 className="text-sm font-semibold text-gray-700 mb-2">Active Alerts</h4>
                                 <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">
                                     <strong>High Risk Alert:</strong> Increased deforestation probability detected in Sunderbans, Sector C.
                                 </div>
                            </div>
                            <div className="border-t pt-4 mt-2">
                                 <h4 className="text-sm font-semibold text-gray-700 mb-2">Scenario Analysis</h4>
                                 <p className="text-sm text-gray-500 mb-2">Simulate impact of preventive actions.</p>
                                 <button className="w-full px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">Run New Simulation</button>
                            </div>
                         </SidePanel>
                    </>
                )}
            </div>
             <style jsx>{`
                .toggle-checkbox {
                  appearance: none;
                  width: 3.5rem;
                  height: 1.75rem;
                  background-color: #d1d5db;
                  border-radius: 9999px;
                  position: relative;
                  cursor: pointer;
                  transition: background-color 0.2s ease-in-out;
                }
                .toggle-checkbox:checked {
                  background-color: #10b981;
                }
                .toggle-checkbox::before {
                  content: '';
                  position: absolute;
                  top: 0.25rem;
                  left: 0.25rem;
                  width: 1.25rem;
                  height: 1.25rem;
                  background-color: white;
                  border-radius: 9999px;
                  transition: transform 0.2s ease-in-out;
                }
                .toggle-checkbox:checked::before {
                  transform: translateX(1.75rem);
                }
            `}</style>
        </div>
    );
};