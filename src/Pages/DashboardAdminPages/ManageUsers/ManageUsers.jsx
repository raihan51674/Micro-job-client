import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import {
    Trash2, User, UserCheck, Briefcase, Search, ChevronLeft, ChevronRight
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';
import { AuthContext } from '../../../Provider/AuthProvider';

const roles = ['All', 'admin', 'buyer', 'worker'];
const statuses = ['All', 'active', 'suspended'];

const ManageUsers = () => {
    const { user } = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState('All');
    const [selectedStatus, setSelectedStatus] = useState('All');

    // Pagination States
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10); // 10 users per page

    const queryClient = useQueryClient();

    const isLargeScreen = useMediaQuery({ minWidth: 1024 });

    // ✅ Fetch Users
    const { data: users = [], isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const loggedInUserEmail = `${user?.email}`;
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/users-management?email=${loggedInUserEmail}`, {
                withCredentials: true
            });
            return res.data;
        }
    });

    // ✅ Delete User
    const deleteUserMutation = useMutation({
        mutationFn: async (userId) => {
            const res = await axios.delete(`${import.meta.env.VITE_API_URL}/users-management/${userId}`, {
                withCredentials: true
            });
            return res.data;
        },
        onSuccess: () => {
            toast.success('User removed successfully!', {
                style: { background: '#dc3545', color: '#fff' }
            });
            queryClient.invalidateQueries(['users']);
            // If the last user on the current page is deleted, go to the previous page
            if (currentUsers.length === 1 && currentPage > 1 && filteredUsers.length - 1 <= indexOfFirstUser) {
                setCurrentPage(prev => prev - 1);
            }
        },
        onError: (error) => {
            console.error("Error deleting user:", error);
            toast.error('Failed to remove user.', {
                style: { background: '#ffc107', color: '#000' }
            });
        }
    });

    // ✅ Update Role
    const updateRoleMutation = useMutation({
        mutationFn: async ({ userId, newRole }) => {
            const res = await axios.patch(`${import.meta.env.VITE_API_URL}/users-management/update-role/${userId}`, { role: newRole }, {
                withCredentials: true
            });
            return res.data;
        },
        onSuccess: (_, variables) => {
            toast.success(`Role updated to '${variables.newRole}'`, {
                style: { background: '#007bff', color: '#fff' }
            });
            queryClient.invalidateQueries(['users']);
        },
        onError: (error) => {
            console.error("Error updating role:", error);
            toast.error('Failed to update role.', {
                style: { background: '#ffc107', color: '#000' }
            });
        }
    });

    const handleRemoveUser = (userId) => {
        deleteUserMutation.mutate(userId);
    };

    const handleRoleChange = (userId, newRole) => {
        updateRoleMutation.mutate({ userId, newRole });
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = selectedRole === 'All' || user.role === selectedRole;
        const matchesStatus = selectedStatus === 'All' || user.status === selectedStatus;
        return matchesSearch && matchesRole && matchesStatus;
    });

    // Pagination Logic
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Handle next and previous page
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const renderRoleIcon = (role) => {
        switch (role) {
            case 'admin': return <UserCheck className="w-4 h-4" />;
            case 'buyer': return <User className="w-4 h-4" />;
            case 'worker': return <Briefcase className="w-4 h-4" />;
            default: return <User className="w-4 h-4" />;
        }
    };

    if (isLoading) {
        return <div className="text-center text-gray-400 py-10">Loading users...</div>;
    }

    return (
        <div className="min-h-screen p-4 flex justify-center font-sans text-white">
            <motion.div
                className="w-full max-w-7xl mx-auto bg-gray-800/30 backdrop-blur-xl rounded-xl border border-gray-700/60 p-4 sm:p-6 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                {/* Header */}
                <h1 className="text-2xl sm:text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-500 to-pink-500 mb-6">
                    Manage Users
                </h1>

                {/* Filters */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="relative sm:col-span-2 lg:col-span-2">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1); // Reset to first page on search
                            }}
                            className="pl-10 py-2 bg-gray-700 border border-gray-600 rounded-lg w-full text-white text-sm sm:text-base"
                        />
                    </div>
                    <select
                        value={selectedRole}
                        onChange={(e) => {
                            setSelectedRole(e.target.value);
                            setCurrentPage(1); // Reset to first page on role filter
                        }}
                        className="bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-3 text-sm sm:text-base"
                    >
                        {roles.map(role => (
                            <option key={role} value={role}>{role === 'All' ? 'All Roles' : role}</option>
                        ))}
                    </select>
                    <select
                        value={selectedStatus}
                        onChange={(e) => {
                            setSelectedStatus(e.target.value);
                            setCurrentPage(1); // Reset to first page on status filter
                        }}
                        className="bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-3 text-sm sm:text-base"
                    >
                        {statuses.map(status => (
                            <option key={status} value={status}>{status === 'All' ? 'All Statuses' : status}</option>
                        ))}
                    </select>
                </div>

                {filteredUsers.length === 0 && !isLoading ? (
                    <div className="p-6 text-center text-gray-400 bg-gray-800/50 rounded-lg">
                        No users found matching your criteria.
                    </div>
                ) : (
                    <>
                        {/* Conditional Rendering based on screen size */}
                        {isLargeScreen ? (
                            // Large screen: Table View
                            <div className="overflow-x-auto border border-gray-600 rounded-lg">
                                <table className="min-w-full divide-y divide-gray-700 text-sm">
                                    <thead className="bg-gray-700/50 text-gray-300">
                                        <tr>
                                            <th className="px-4 py-3 text-left whitespace-nowrap">User</th>
                                            <th className="px-4 py-3 text-left whitespace-nowrap">Email</th>
                                            <th className="px-4 py-3 text-left whitespace-nowrap">Role</th>
                                            <th className="px-4 py-3 text-left whitespace-nowrap">Coins</th>
                                            <th className="px-4 py-3 text-left whitespace-nowrap">Joined</th>
                                            <th className="px-4 py-3 text-left whitespace-nowrap">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-600">
                                        {currentUsers.map(user => (
                                            <tr key={user._id} className="hover:bg-gray-700/40 transition-colors">
                                                <td className="px-4 py-3 flex items-center gap-3">
                                                    <img src={user.image} alt={user.name} className="w-9 h-9 rounded-full object-cover border border-gray-600" />
                                                    <span className="text-blue-300 font-medium whitespace-nowrap">{user.name}</span>
                                                </td>
                                                <td className="px-4 py-3 text-gray-300">{user.email}</td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-2">
                                                        <select
                                                            value={user.role}
                                                            onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                                            className="bg-gray-700 text-white border border-gray-600 rounded px-2 py-1 text-sm"
                                                        >
                                                            {roles.filter(r => r !== 'All').map(role => (
                                                                <option key={role} value={role}>{role}</option>
                                                            ))}
                                                        </select>
                                                        {renderRoleIcon(user.role)}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-yellow-300 font-bold">{user.coin}</td>
                                                <td className="px-4 py-3 text-gray-400">
                                                    {new Date(user.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <motion.button
                                                        onClick={() => handleRemoveUser(user._id)}
                                                        className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded text-xs flex items-center gap-1 cursor-pointer"
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        <Trash2 className="w-4 h-4" /> Remove
                                                    </motion.button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            // Small & Medium screens: Card View
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {currentUsers.map(user => (
                                    <motion.div
                                        key={user._id}
                                        className="bg-gray-700/50 border border-gray-600 rounded-lg p-4 flex flex-col gap-3"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: 0.1 }}
                                    >
                                        <div className="flex items-center gap-4">
                                            <img src={user.image} alt={user.name} className="w-12 h-12 rounded-full object-cover border border-gray-500" />
                                            <div>
                                                <h3 className="text-lg font-semibold text-blue-300">{user.name}</h3>
                                                <p className="text-gray-400 text-sm">{user.email}</p>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center flex-wrap gap-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-gray-300 text-sm">Role:</span>
                                                <select
                                                    value={user.role}
                                                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                                    className="bg-gray-800 text-white border border-gray-600 rounded px-2 py-1 text-sm"
                                                >
                                                    {roles.filter(r => r !== 'All').map(role => (
                                                        <option key={role} value={role}>{role}</option>
                                                    ))}
                                                </select>
                                                {renderRoleIcon(user.role)}
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center text-sm text-gray-300">
                                            <p>Coins: <span className="text-yellow-300 font-bold">{user.coin}</span></p>
                                            <p>Joined: {new Date(user.created_at).toLocaleDateString()}</p>
                                        </div>

                                        <motion.button
                                            onClick={() => handleRemoveUser(user._id)}
                                            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded text-sm flex items-center justify-center gap-2 mt-2 cursor-pointer"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Trash2 className="w-4 h-4" /> Remove User
                                        </motion.button>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {/* Pagination Controls */}
                        {filteredUsers.length > 0 && (
                            <motion.div className="flex justify-center items-center space-x-2 mt-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                                <button
                                    onClick={handlePreviousPage}
                                    disabled={currentPage === 1}
                                    className={`p-2 rounded-lg ${currentPage === 1 ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-600 text-white transition-colors duration-200'}`}
                                    aria-label="Previous page"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => paginate(i + 1)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium ${currentPage === i + 1 ? 'bg-purple-600 text-white shadow-md' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                                            } transition-colors duration-200`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                    className={`p-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-600 text-white transition-colors duration-200'}`}
                                    aria-label="Next page"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </motion.div>
                        )}
                    </>
                )}
                {/* Footer */}
                <motion.div className="mt-8 text-center text-gray-500 text-xs sm:text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                    <p className="mb-1">Showing {currentUsers.length} users on current page. Total filtered users: {filteredUsers.length} (Total users: {users.length})</p>
                    <p>&copy; {new Date().getFullYear()} CoinFlow. All rights reserved.</p>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ManageUsers;