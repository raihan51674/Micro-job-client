import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, ChevronDown, ChevronUp, Search, ChevronLeft, ChevronRight } from 'lucide-react'; // Added ChevronLeft, ChevronRight
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const ManageTasks = () => {
    const [expandedTask, setExpandedTask] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1); // New state for current page
    const [tasksPerPage] = useState(5); // New state for tasks per page

    // Fetch tasks data using TanStack Query
    const { data: tasks = [], isLoading, isError, error, refetch } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/tasks`);
            return response.data;
        },
    });

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

    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.taskTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.taskDetails.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (task.buyer?.name && task.buyer.name.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesSearch;
    });

    // Pagination Logic
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
    const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Handle next and previous page
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
            setExpandedTask(null); // Collapse any expanded task on page change
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
            setExpandedTask(null); // Collapse any expanded task on page change
        }
    };

    const handleDeleteTask = async (taskId, taskTitle) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${taskId}`);
            toast.success(`Task '${taskTitle}' deleted successfully!`, {
                duration: 3000,
                style: {
                    background: '#dc3545',
                    color: '#fff',
                },
            });
            refetch(); // Refetch data after successful deletion
            // After deletion, re-evaluate current page to prevent empty page if last task on page was deleted
            if (currentTasks.length === 1 && currentPage > 1 && filteredTasks.length - 1 <= indexOfFirstTask) {
                setCurrentPage(prev => prev - 1);
            }
        } catch (error) {
            toast.error(`Failed to delete task '${taskTitle}'.`, {
                duration: 3000,
                style: {
                    background: '#ffc107',
                    color: '#000',
                },
            });
            console.error("Error deleting task:", error);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            return new Date(dateString).toLocaleDateString(undefined, options);
        } catch (e) {
            console.error("Invalid date string:", dateString, e);
            return 'Invalid Date';
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen p-4 sm:p-6 lg:p-8 flex items-center justify-center font-sans text-white">
                <div className="text-xl text-gray-300">Loading tasks...</div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen p-4 sm:p-6 lg:p-8 flex items-center justify-center font-sans text-white">
                <div className="text-xl text-red-400">Error loading tasks: {error.message}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4 sm:p-6 lg:p-8 flex items-start justify-center font-sans text-white">
            <motion.div
                className="w-full max-w-7xl mx-auto bg-gray-800/30 backdrop-blur-xl rounded-xl lg:rounded-3xl shadow-xl lg:shadow-2xl border border-gray-700/60 p-4 sm:p-6 lg:p-8 overflow-hidden"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Header */}
                <motion.div className="text-center mb-6 sm:mb-8 lg:mb-10" variants={itemVariants}>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-teal-400 via-emerald-500 to-green-500 bg-clip-text text-transparent mb-2 sm:mb-3 lg:mb-4">
                        Task Management
                    </h1>
                    <p className="text-gray-300 text-sm sm:text-base max-w-md sm:max-w-lg mx-auto">
                        Manage and track all assigned tasks across your team
                    </p>
                </motion.div>

                {/* Search Input */}
                <motion.div className="mb-6" variants={itemVariants}>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search tasks by title, details or buyer..."
                            className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1); // Reset to first page on search
                                setExpandedTask(null); // Collapse any expanded task on search
                            }}
                        />
                    </div>
                </motion.div>

                {/* Responsive View for Tasks */}
                {filteredTasks.length === 0 ? (
                    <div className="p-6 text-center text-gray-400 bg-gray-800/50 rounded-lg">
                        No tasks found matching your criteria.
                    </div>
                ) : (
                    <>
                        {/* Mobile and Medium Devices: Grid of Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-3 mb-6">
                            {currentTasks.map((task) => { // Use currentTasks here
                                return (
                                    <motion.div
                                        key={task._id}
                                        className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4"
                                        variants={itemVariants}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-blue-300 font-medium">{task.taskTitle}</h3>
                                                <p className="text-gray-300 text-xs mt-1">{task.buyer?.name || 'N/A'}</p>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-yellow-300 font-bold text-sm">
                                                    {task.payableAmount} coins
                                                </span>
                                                <button
                                                    onClick={() => setExpandedTask(expandedTask === task._id ? null : task._id)}
                                                    className="text-gray-400 hover:text-gray-300"
                                                >
                                                    {expandedTask === task._id ? (
                                                        <ChevronUp className="w-4 h-4" />
                                                    ) : (
                                                        <ChevronDown className="w-4 h-4" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-2 mt-2">
                                            {/* Status Badge can go here if needed */}
                                        </div>

                                        {expandedTask === task._id && (
                                            <div className="mt-3 pt-3 border-t border-gray-700/50 space-y-3">
                                                <div>
                                                    <p className="text-gray-300 text-sm">{task.taskDetails}</p>
                                                </div>
                                                <div className="grid grid-cols-2 gap-3 text-xs">
                                                    <div>
                                                        <span className="text-gray-400">Required Workers:</span>
                                                        <span className="text-gray-300 ml-1">{task.requiredWorkers}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-400">Submission Info:</span>
                                                        <span className="text-gray-300 ml-1">{task.submissionInfo || 'N/A'}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-400">Completion Date:</span>
                                                        <span className="text-gray-300 ml-1">{formatDate(task.completationDate)}</span>
                                                    </div>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <motion.button
                                                        onClick={() => handleDeleteTask(task._id, task.taskTitle)}
                                                        className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded text-sm shadow transition-all duration-200 flex items-center justify-center gap-1"
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        <Trash2 className="w-4 h-4" /> Delete
                                                    </motion.button>
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Large Devices: Table View */}
                        <div className="hidden lg:block overflow-x-auto rounded-lg border border-gray-700/50 shadow">
                            <table className="min-w-full divide-y divide-gray-700/50">
                                <thead className="bg-gray-700/50">
                                    <tr>
                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                            Task Title
                                        </th>
                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                            Buyer
                                        </th>
                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                            Coins
                                        </th>
                                        <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                                            Required Workers
                                        </th>
                                        <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                                            Completion Date
                                        </th>
                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-gray-800/70 divide-y divide-gray-700/50">
                                    {currentTasks.map((task) => { // Use currentTasks here
                                        return (
                                            <motion.tr
                                                key={task._id}
                                                className="hover:bg-gray-700/60 transition-colors duration-200"
                                                variants={itemVariants}
                                            >
                                                <td className="px-4 py-3">
                                                    <div className="text-blue-300 font-medium">{task.taskTitle}</div>
                                                    <div className="text-gray-400 text-xs mt-1 line-clamp-2 max-w-xs">
                                                        {task.taskDetails}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                                                    {task.buyer?.name || 'N/A'}
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap text-yellow-300 font-bold text-center">
                                                    {task.payableAmount}
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300 text-center">
                                                    {task.requiredWorkers}
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400 text-center">
                                                    {formatDate(task.completationDate)}
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap">
                                                    <div className="flex justify-center"> {/* Centered for better aesthetics */}
                                                        <motion.button
                                                            onClick={() => handleDeleteTask(task._id, task.taskTitle)}
                                                            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded text-sm shadow transition-all duration-200 flex items-center justify-center gap-1"
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                        >
                                                            <Trash2 className="w-4 h-4" /> Delete
                                                        </motion.button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Controls */}
                        {filteredTasks.length > 0 && (
                            <motion.div className="flex justify-center items-center space-x-2 mt-6" variants={itemVariants}>
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
                                        className={`px-4 py-2 rounded-lg text-sm font-medium ${currentPage === i + 1 ? 'bg-teal-600 text-white shadow-md' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
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
                <motion.div className="mt-8 lg:mt-12 text-center text-gray-500 text-xs sm:text-sm" variants={itemVariants}>
                    <p className="mb-1">Showing {currentTasks.length} of {filteredTasks.length} tasks (Total: {tasks.length} tasks)</p>
                    <p>&copy; {new Date().getFullYear()} CoinFlow. All rights reserved.</p>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ManageTasks;