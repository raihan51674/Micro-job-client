import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, User, UserCheck, Briefcase, ChevronDown, ChevronUp, Search, Filter } from 'lucide-react';
import toast from 'react-hot-toast';

const initialUsers = [
    {
        id: 'user1',
        display_name: 'John Doe',
        user_email: 'john.doe@example.com',
        photo: 'https://randomuser.me/api/portraits/men/1.jpg',
        role: 'Admin',
        coin: 15000,
        join_date: '2025-01-15',
        status: 'active'
    },
    {
        id: 'user2',
        display_name: 'Jane Smith',
        user_email: 'jane.smith@example.com',
        photo: 'https://randomuser.me/api/portraits/women/1.jpg',
        role: 'Buyer',
        coin: 500,
        join_date: '2025-02-20',
        status: 'active'
    },
    {
        id: 'user3',
        display_name: 'Mike Johnson',
        user_email: 'mike.j@example.com',
        photo: 'https://randomuser.me/api/portraits/men/2.jpg',
        role: 'Worker',
        coin: 2500,
        join_date: '2025-03-10',
        status: 'active'
    },
    {
        id: 'user4',
        display_name: 'Sarah Williams',
        user_email: 'sarah.w@example.com',
        photo: 'https://randomuser.me/api/portraits/women/2.jpg',
        role: 'Buyer',
        coin: 1200,
        join_date: '2025-04-05',
        status: 'suspended'
    },
    {
        id: 'user5',
        display_name: 'David Lee',
        user_email: 'david.l@example.com',
        photo: 'https://randomuser.me/api/portraits/men/3.jpg',
        role: 'Worker',
        coin: 800,
        join_date: '2025-05-12',
        status: 'active'
    },
    {
        id: 'user6',
        display_name: 'Emily Chen',
        user_email: 'emily.c@example.com',
        photo: 'https://randomuser.me/api/portraits/women/3.jpg',
        role: 'Buyer',
        coin: 300,
        join_date: '2025-06-18',
        status: 'active'
    },
];

const roles = ['All', 'Admin', 'Buyer', 'Worker'];
const statuses = ['All', 'active', 'suspended'];

const ManageUsers = () => {
    const [users, setUsers] = useState(initialUsers);
    const [expandedUser, setExpandedUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState('All');
    const [selectedStatus, setSelectedStatus] = useState('All');

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.1,
                staggerChildren: 0.05,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.display_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.user_email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = selectedRole === 'All' || user.role === selectedRole;
        const matchesStatus = selectedStatus === 'All' || user.status === selectedStatus;
        return matchesSearch && matchesRole && matchesStatus;
    });

    const handleRemoveUser = (userId, displayName) => {
        setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
        toast.success(`User '${displayName}' removed successfully!`, {
            duration: 3000,
            style: {
                background: '#dc3545',
                color: '#fff',
            },
        });
    };

    const handleRoleChange = (userId, newRole) => {
        setUsers(prevUsers =>
            prevUsers.map(user =>
                user.id === userId ? { ...user, role: newRole } : user
            )
        );
        toast.success(`Role updated to '${newRole}'!`, {
            duration: 3000,
            style: {
                background: '#007bff',
                color: '#fff',
            },
        });
    };

    const handleStatusChange = (userId, newStatus) => {
        setUsers(prevUsers =>
            prevUsers.map(user =>
                user.id === userId ? { ...user, status: newStatus } : user
            )
        );
        toast.success(`Status updated to '${newStatus}'!`, {
            duration: 3000,
            style: {
                background: newStatus === 'active' ? '#28a745' : '#ffc107',
                color: '#fff',
            },
        });
    };

    const renderRoleIcon = (role) => {
        switch (role) {
            case 'Admin': return <UserCheck className="w-4 h-4" />;
            case 'Buyer': return <User className="w-4 h-4" />;
            case 'Worker': return <Briefcase className="w-4 h-4" />;
            default: return <User className="w-4 h-4" />;
        }
    };

    const renderStatusBadge = (status) => {
        return (
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${status === 'active' ? 'bg-green-900/30 text-green-300 border border-green-700/50' :
                    'bg-yellow-900/30 text-yellow-300 border border-yellow-700/50'
                }`}>
                {status === 'active' ? 'Active' : 'Suspended'}
            </span>
        );
    };

    return (
        <div className="min-h-screen p-4 flex items-start justify-center font-sans text-white">
            <motion.div
                className="w-full max-w-7xl mx-auto bg-gray-800/30 backdrop-blur-xl rounded-xl lg:rounded-3xl shadow-xl lg:shadow-2xl border border-gray-700/60 p-4 sm:p-6 lg:p-8 overflow-hidden"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Header */}
                <motion.div className="text-center mb-6 sm:mb-8 lg:mb-10" variants={itemVariants}>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-400 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent mb-2 sm:mb-3 lg:mb-4">
                        User Management
                    </h1>
                    <p className="text-gray-300 text-sm sm:text-base max-w-md sm:max-w-lg mx-auto">
                        Manage all registered users, roles, and account statuses
                    </p>
                </motion.div>

                {/* Search and Filters */}
                <motion.div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3" variants={itemVariants}>
                    <div className="relative col-span-1 sm:col-span-2">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Filter className="h-4 w-4 text-gray-400" />
                        </div>
                        <select
                            className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                        >
                            {roles.map(role => (
                                <option key={role} value={role} className="bg-gray-800">{role}</option>
                            ))}
                        </select>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Filter className="h-4 w-4 text-gray-400" />
                        </div>
                        <select
                            className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                        >
                            {statuses.map(status => (
                                <option key={status} value={status} className="bg-gray-800">
                                    {status === 'All' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                </motion.div>

                {/* Mobile View - Cards */}
                <div className="lg:hidden space-y-3">
                    {filteredUsers.length === 0 ? (
                        <div className="p-6 text-center text-gray-400 bg-gray-800/50 rounded-lg">
                            No users found matching your criteria
                        </div>
                    ) : (
                        filteredUsers.map((user) => (
                            <motion.div
                                key={user.id}
                                className={`bg-gray-800/50 border rounded-lg p-4 ${user.status === 'suspended' ? 'border-yellow-700/50' : 'border-gray-700/50'
                                    }`}
                                variants={itemVariants}
                            >
                                <div className="flex items-start space-x-3">
                                    <div className="relative">
                                        <img
                                            src={user.photo}
                                            alt={user.display_name}
                                            className="w-12 h-12 rounded-full object-cover border-2 border-gray-600 shadow"
                                        />
                                        {user.status === 'suspended' && (
                                            <div className="absolute -bottom-1 -right-1 bg-yellow-500 rounded-full p-0.5">
                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-blue-300 font-medium">{user.display_name}</h3>
                                                <p className="text-gray-300 text-xs">{user.user_email}</p>
                                                <div className="mt-1 flex items-center space-x-2">
                                                    {renderStatusBadge(user.status)}
                                                    <span className="text-yellow-300 font-bold text-xs">
                                                        {user.coin.toLocaleString()} coins
                                                    </span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => setExpandedUser(expandedUser === user.id ? null : user.id)}
                                                className="text-gray-400 hover:text-gray-300"
                                            >
                                                {expandedUser === user.id ? (
                                                    <ChevronUp className="w-4 h-4" />
                                                ) : (
                                                    <ChevronDown className="w-4 h-4" />
                                                )}
                                            </button>
                                        </div>

                                        {expandedUser === user.id && (
                                            <div className="mt-3 pt-3 border-t border-gray-700/50 space-y-3">
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div>
                                                        <label className="block text-xs text-gray-400 mb-1">Role</label>
                                                        <div className="flex items-center">
                                                            <select
                                                                value={user.role}
                                                                onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                                                className="w-full py-1 px-2 rounded bg-gray-700 border border-gray-600 text-white text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                            >
                                                                {roles.filter(r => r !== 'All').map(role => (
                                                                    <option key={role} value={role} className="bg-gray-800">
                                                                        {role}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            <span className="ml-2 text-gray-300">
                                                                {renderRoleIcon(user.role)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs text-gray-400 mb-1">Status</label>
                                                        <select
                                                            value={user.status}
                                                            onChange={(e) => handleStatusChange(user.id, e.target.value)}
                                                            className="w-full py-1 px-2 rounded bg-gray-700 border border-gray-600 text-white text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                        >
                                                            <option value="active" className="bg-gray-800">Active</option>
                                                            <option value="suspended" className="bg-gray-800">Suspended</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="text-xs text-gray-400">
                                                    <div>Joined: {new Date(user.join_date).toLocaleDateString()}</div>
                                                    <div>ID: {user.id}</div>
                                                </div>
                                                <button
                                                    onClick={() => handleRemoveUser(user.id, user.display_name)}
                                                    className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded text-sm shadow transition-all duration-200 flex items-center justify-center gap-1"
                                                >
                                                    <Trash2 className="w-4 h-4" /> Remove User
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>

                {/* Desktop View - Table */}
                <div className="hidden lg:block overflow-x-auto rounded-lg border border-gray-700/50 shadow">
                    {filteredUsers.length === 0 ? (
                        <div className="p-8 text-center text-gray-400 text-lg bg-gray-800/70">
                            No users found matching your criteria
                        </div>
                    ) : (
                        <table className="min-w-full divide-y divide-gray-700/50">
                            <thead className="bg-gray-700/50">
                                <tr>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        User
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Role
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Coins
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Joined
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-gray-800/70 divide-y divide-gray-700/50">
                                {filteredUsers.map((user) => (
                                    <motion.tr
                                        key={user.id}
                                        className={`hover:bg-gray-700/60 transition-colors duration-200 ${user.status === 'suspended' ? 'bg-yellow-900/10' : ''
                                            }`}
                                        variants={itemVariants}
                                    >
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="relative">
                                                    <img
                                                        src={user.photo}
                                                        alt={user.display_name}
                                                        className="w-10 h-10 rounded-full object-cover border-2 border-gray-600 shadow mr-3"
                                                    />
                                                    {user.status === 'suspended' && (
                                                        <div className="absolute -bottom-1 -right-1 bg-yellow-500 rounded-full p-0.5">
                                                            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                            </svg>
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="text-blue-300 font-medium">{user.display_name}</div>
                                                    <div className="text-gray-400 text-xs">ID: {user.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                                            {user.user_email}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <select
                                                    value={user.role}
                                                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                                    className="py-1 px-2 rounded bg-gray-700 border border-gray-600 text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                >
                                                    {roles.filter(r => r !== 'All').map(role => (
                                                        <option key={role} value={role} className="bg-gray-800">
                                                            {role}
                                                        </option>
                                                    ))}
                                                </select>
                                                <span className="ml-2 text-gray-300">
                                                    {renderRoleIcon(user.role)}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <select
                                                value={user.status}
                                                onChange={(e) => handleStatusChange(user.id, e.target.value)}
                                                className="py-1 px-2 rounded bg-gray-700 border border-gray-600 text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                            >
                                                <option value="active">Active</option>
                                                <option value="suspended">Suspended</option>
                                            </select>
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-yellow-300 font-bold">
                                            {user.coin.toLocaleString()}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">
                                            {new Date(user.join_date).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <motion.button
                                                onClick={() => handleRemoveUser(user.id, user.display_name)}
                                                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded text-sm shadow transition-all duration-200 flex items-center justify-center gap-1"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <Trash2 className="w-4 h-4" /> Remove
                                            </motion.button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Footer */}
                <motion.div className="mt-8 lg:mt-12 text-center text-gray-500 text-xs sm:text-sm" variants={itemVariants}>
                    <p className="mb-1">Showing {filteredUsers.length} of {users.length} users • All actions are logged</p>
                    <p>&copy; {new Date().getFullYear()} CoinFlow. All rights reserved.</p>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ManageUsers;