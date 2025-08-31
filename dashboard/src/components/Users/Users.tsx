"use client"

import { Filter, MoreHorizontal, PlusCircle, Search } from "lucide-react";

const usersData = [
    { name: "Admin User", email: "admin@mangrovewatch.org", role: "Admin", location: "Central Office", reports: "N/A", status: "Active", avatar: "A" },
    { name: "Rajesh Singh", email: "rsingh@authority.gov", role: "Authority", location: "Sunderbans Division", reports: 12, status: "Active", avatar: "R" },
    { name: "Priya Singh", email: "priya.s@community.org", role: "Reporter", location: "Pichavaram", reports: 32, status: "Verified", avatar: "P" },
    { name: "Arjun Verma", email: "arjun.v@volunteer.net", role: "Volunteer", location: "Sunderbans", reports: 28, status: "Active", avatar: "A" },
    { name: "Meera Reddy", email: "meera.r@authority.gov", role: "Authority", location: "Bhitarkanika", reports: 8, status: "Active", avatar: "M" },
    { name: "Rohan Desai", email: "rohan.d@community.org", role: "Reporter", location: "Bhitarkanika", reports: 25, status: "Blocked", avatar: "R" },
];

export const UsersPage = () => {

    const getRolePillStyle = (role) => {
        switch (role) {
            case 'Admin': return 'bg-purple-100 text-purple-800';
            case 'Authority': return 'bg-blue-100 text-blue-800';
            case 'Reporter': return 'bg-emerald-100 text-emerald-800';
            case 'Volunteer': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusPillStyle = (status) => {
        switch (status) {
            case 'Active': case 'Verified': return 'bg-emerald-100 text-emerald-800';
            case 'Blocked': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="container mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">User & Reporter Management</h1>
                <button className="flex items-center px-4 py-2 text-sm font-semibold text-white bg-emerald-600 rounded-lg shadow-sm hover:bg-emerald-700">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add New User
                </button>
            </div>

            {/* Filters Bar */}
            <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 flex items-center space-x-4">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input type="text" placeholder="Search by name, email or location..." className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500" />
                </div>
                <select className="border border-gray-300 rounded-lg text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-emerald-500">
                    <option>All Roles</option>
                    <option>Admin</option>
                    <option>Authority</option>
                    <option>Reporter</option>
                    <option>Volunteer</option>
                </select>
                <select className="border border-gray-300 rounded-lg text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-emerald-500">
                    <option>All Statuses</option>
                    <option>Active</option>
                    <option>Verified</option>
                    <option>Blocked</option>
                </select>
                <button className="flex items-center px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                    <Filter className="h-4 w-4 mr-2" />
                    Apply Filters
                </button>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">User</th>
                                <th scope="col" className="px-6 py-3">Role</th>
                                <th scope="col" className="px-6 py-3">Location</th>
                                <th scope="col" className="px-6 py-3 text-center">Reports</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersData.map((user) => (
                                <tr key={user.email} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center font-bold text-emerald-600">{user.avatar}</div>
                                            <div className="ml-4">
                                                <div className="font-medium text-gray-900">{user.name}</div>
                                                <div className="text-gray-500">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getRolePillStyle(user.role)}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">{user.location}</td>
                                    <td className="px-6 py-4 text-center font-medium text-gray-700">{user.reports}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusPillStyle(user.status)}`}>
                                            {user.status}
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
        </div>
    );
};