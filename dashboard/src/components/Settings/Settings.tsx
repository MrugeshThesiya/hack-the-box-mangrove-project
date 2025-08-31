"use client"

import { Bell, FileText, Layers, Link, Map, Users } from "lucide-react";

export const SettingsPage = () => {

    const SettingCard = ({ icon: Icon, title, description, children }) => (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <div className="flex items-start space-x-4">
                <div className="bg-emerald-50 text-emerald-600 p-3 rounded-full">
                    <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800">{title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{description}</p>
                </div>
            </div>
            <div className="mt-6 pl-14">
                {children}
            </div>
        </div>
    );
    
    const Toggle = ({ label }) => (
        <div className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-700">{label}</span>
            <input type="checkbox" className="toggle-checkbox" />
        </div>
    );


    return (
        <div className="container mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Column 1 */}
                <div className="space-y-6">
                     <SettingCard icon={Users} title="User Management" description="Add, edit, or remove users and manage their roles.">
                        <button className="px-4 py-2 text-sm font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700">Manage Users</button>
                    </SettingCard>

                     <SettingCard icon={Bell} title="Notifications" description="Configure how you receive alerts for new incidents and system updates.">
                        <div className="space-y-2">
                           <Toggle label="Email Alerts for High-Severity Incidents" />
                           <Toggle label="SMS Alerts for High-Risk Zones" />
                           <Toggle label="Daily Summary Push Notifications" />
                        </div>
                    </SettingCard>

                     <SettingCard icon={FileText} title="System Logs" description="Track all administrative actions and important system events.">
                        <button className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 border rounded-lg hover:bg-gray-200">View System Logs</button>
                    </SettingCard>
                </div>

                {/* Column 2 */}
                <div className="space-y-6">
                     <SettingCard icon={Map} title="Map Settings" description="Set default views and configure heatmap and risk layer options.">
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-semibold text-gray-700">Default Map View</label>
                                <select className="w-full mt-1 border border-gray-300 rounded-lg text-sm px-3 py-2">
                                    <option>Incident Map</option>
                                    <option>Community Heatmap</option>
                                    <option>AI Risk Prediction</option>
                                </select>
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-gray-700 mb-2">Risk Map Layers</h4>
                                <Toggle label="Show Historical Incident Markers" />
                                <Toggle label="Enable Environmental Factors Overlay" />
                            </div>
                        </div>
                    </SettingCard>
                    
                    <SettingCard icon={Layers} title="Report Settings" description="Define categories, severity levels, and types for incident reporting.">
                        <div className="space-y-2">
                            <p className="text-sm font-semibold text-gray-700">Current Incident Types:</p>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">Illegal Cutting</span>
                                <span className="px-2 py-1 text-xs bg-amber-100 text-amber-800 rounded-full">Waste Dumping</span>
                                <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Minor Damage</span>
                            </div>
                            <button className="mt-2 text-sm font-semibold text-emerald-600 hover:text-emerald-800">+ Add New Type</button>
                        </div>
                    </SettingCard>

                     <SettingCard icon={Link} title="Integrations" description="Connect with external data sources to enhance analytics.">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <p className="font-semibold text-sm">Satellite Imagery API</p>
                                <button className="px-3 py-1 text-xs font-semibold text-white bg-gray-400 rounded-full">Connected</button>
                            </div>
                             <div className="flex items-center justify-between">
                                <p className="font-semibold text-sm">Environmental Sensors Feed</p>
                                <button className="px-3 py-1 text-xs font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700">Connect</button>
                            </div>
                        </div>
                    </SettingCard>
                </div>
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