import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Edit, ListTodo, ChevronDown, ChevronUp, Search, Filter } from 'lucide-react';
import toast from 'react-hot-toast';

const initialTasks = [
    {
        id: 'task001',
        title: 'Complete market research for Q3 report',
        description: 'Gather data on competitor pricing and new market trends.',
        assignedTo: 'Worker A',
        status: 'In Progress',
        priority: 'High',
        coins: 150,
        createdAt: '2025-07-01',
        dueDate: '2025-07-15'
    },
    {
        id: 'task002',
        title: 'Review user feedback on new feature',
        description: 'Analyze comments from beta testers and compile summary.',
        assignedTo: 'Worker B',
        status: 'Pending',
        priority: 'Medium',
        coins: 80,
        createdAt: '2025-07-03',
        dueDate: '2025-07-10'
    },
    {
        id: 'task003',
        title: 'Design new landing page banner',
        description: 'Create engaging visual for upcoming campaign.',
        assignedTo: 'Worker C',
        status: 'Completed',
        priority: 'High',
        coins: 200,
        createdAt: '2025-06-28',
        dueDate: '2025-07-05'
    },
    {
        id: 'task004',
        title: 'Write blog post about CoinFlow updates',
        description: 'Draft content highlighting recent platform improvements.',
        assignedTo: 'Worker D',
        status: 'In Progress',
        priority: 'Medium',
        coins: 120,
        createdAt: '2025-07-05',
        dueDate: '2025-07-12'
    },
    {
        id: 'task005',
        title: 'Bug fix: Login error on mobile',
        description: 'Investigate and resolve login issues reported on iOS devices.',
        assignedTo: 'Worker E',
        status: 'Pending',
        priority: 'Urgent',
        coins: 180,
        createdAt: '2025-07-09',
        dueDate: '2025-07-11'
    },
];

const statusOptions = ['All', 'Pending', 'In Progress', 'Completed'];
const priorityOptions = ['All', 'Urgent', 'High', 'Medium', 'Low'];

const ManageTasks = () => {
    const [tasks, setTasks] = useState(initialTasks);
    const [expandedTask, setExpandedTask] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [selectedPriority, setSelectedPriority] = useState('All');

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
        const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = selectedStatus === 'All' || task.status === selectedStatus;
        const matchesPriority = selectedPriority === 'All' || task.priority === selectedPriority;
        return matchesSearch && matchesStatus && matchesPriority;
    });

    const handleDeleteTask = (taskId, taskTitle) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
        toast.success(`Task '${taskTitle}' deleted successfully!`, {
            duration: 3000,
            style: {
                background: '#dc3545',
                color: '#fff',
            },
        });
    };

    const renderBadge = (type, value) => {
        let bgColor = 'bg-gray-700/50';
        let textColor = 'text-gray-300';
        let borderColor = 'border-gray-600';

        if (type === 'status') {
            switch (value) {
                case 'Completed':
                    bgColor = 'bg-green-900/30';
                    textColor = 'text-green-300';
                    borderColor = 'border-green-700/50';
                    break;
                case 'In Progress':
                    bgColor = 'bg-blue-900/30';
                    textColor = 'text-blue-300';
                    borderColor = 'border-blue-700/50';
                    break;
                case 'Pending':
                    bgColor = 'bg-yellow-900/30';
                    textColor = 'text-yellow-300';
                    borderColor = 'border-yellow-700/50';
                    break;
                default:
                    break;
            }
        } else if (type === 'priority') {
            switch (value) {
                case 'Urgent':
                    bgColor = 'bg-red-900/30';
                    textColor = 'text-red-300';
                    borderColor = 'border-red-700/50';
                    break;
                case 'High':
                    bgColor = 'bg-orange-900/30';
                    textColor = 'text-orange-300';
                    borderColor = 'border-orange-700/50';
                    break;
                case 'Medium':
                    bgColor = 'bg-blue-900/30';
                    textColor = 'text-blue-300';
                    borderColor = 'border-blue-700/50';
                    break;
                case 'Low':
                    bgColor = 'bg-gray-700/30';
                    textColor = 'text-gray-300';
                    borderColor = 'border-gray-600/50';
                    break;
                default:
                    break;
            }
        }

        return (
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor} border ${borderColor}`}>
                {value}
            </span>
        );
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="min-h-screen  p-4 sm:p-6 lg:p-8 flex items-start justify-center font-sans text-white">
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

                {/* Search and Filters */}
                <motion.div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3" variants={itemVariants}>
                    <div className="relative col-span-1 sm:col-span-2">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Filter className="h-4 w-4 text-gray-400" />
                        </div>
                        <select
                            className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none"
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                        >
                            {statusOptions.map(status => (
                                <option key={status} value={status} className="bg-gray-800">
                                    {status === 'All' ? 'All Statuses' : status}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Filter className="h-4 w-4 text-gray-400" />
                        </div>
                        <select
                            className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none"
                            value={selectedPriority}
                            onChange={(e) => setSelectedPriority(e.target.value)}
                        >
                            {priorityOptions.map(priority => (
                                <option key={priority} value={priority} className="bg-gray-800">
                                    {priority === 'All' ? 'All Priorities' : priority}
                                </option>
                            ))}
                        </select>
                    </div>
                </motion.div>

                {/* Mobile View - Cards */}
                <div className="lg:hidden space-y-3">
                    {filteredTasks.length === 0 ? (
                        <div className="p-6 text-center text-gray-400 bg-gray-800/50 rounded-lg">
                            No tasks found matching your criteria
                        </div>
                    ) : (
                        filteredTasks.map((task) => (
                            <motion.div
                                key={task.id}
                                className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4"
                                variants={itemVariants}
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-blue-300 font-medium">{task.title}</h3>
                                        <p className="text-gray-300 text-xs mt-1">{task.assignedTo}</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-yellow-300 font-bold text-sm">
                                            {task.coins} coins
                                        </span>
                                        <button
                                            onClick={() => setExpandedTask(expandedTask === task.id ? null : task.id)}
                                            className="text-gray-400 hover:text-gray-300"
                                        >
                                            {expandedTask === task.id ? (
                                                <ChevronUp className="w-4 h-4" />
                                            ) : (
                                                <ChevronDown className="w-4 h-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2 mt-2">
                                    {renderBadge('status', task.status)}
                                    {renderBadge('priority', task.priority)}
                                </div>

                                {expandedTask === task.id && (
                                    <div className="mt-3 pt-3 border-t border-gray-700/50 space-y-3">
                                        <div>
                                            <p className="text-gray-300 text-sm">{task.description}</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3 text-xs">
                                            <div>
                                                <span className="text-gray-400">Created:</span>
                                                <span className="text-gray-300 ml-1">{formatDate(task.createdAt)}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-400">Due:</span>
                                                <span className="text-gray-300 ml-1">{formatDate(task.dueDate)}</span>
                                            </div>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded text-sm shadow transition-all duration-200 flex items-center justify-center gap-1">
                                                <Edit className="w-4 h-4" /> Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteTask(task.id, task.title)}
                                                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded text-sm shadow transition-all duration-200 flex items-center justify-center gap-1"
                                            >
                                                <Trash2 className="w-4 h-4" /> Delete
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))
                    )}
                </div>

                {/* Desktop View - Table */}
                <div className="hidden lg:block overflow-x-auto rounded-lg border border-gray-700/50 shadow">
                    {filteredTasks.length === 0 ? (
                        <div className="p-8 text-center text-gray-400 text-lg bg-gray-800/70">
                            No tasks found matching your criteria
                        </div>
                    ) : (
                        <table className="min-w-full divide-y divide-gray-700/50">
                            <thead className="bg-gray-700/50">
                                <tr>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Task
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Assigned To
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Priority
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Coins
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Due Date
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-gray-800/70 divide-y divide-gray-700/50">
                                {filteredTasks.map((task) => (
                                    <motion.tr
                                        key={task.id}
                                        className="hover:bg-gray-700/60 transition-colors duration-200"
                                        variants={itemVariants}
                                    >
                                        <td className="px-4 py-3">
                                            <div className="text-blue-300 font-medium">{task.title}</div>
                                            <div className="text-gray-400 text-xs mt-1 line-clamp-2 max-w-xs">
                                                {task.description}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                                            {task.assignedTo}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            {renderBadge('status', task.status)}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            {renderBadge('priority', task.priority)}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-yellow-300 font-bold">
                                            {task.coins}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">
                                            {formatDate(task.dueDate)}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <div className="flex space-x-2">
                                                <motion.button
                                                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded text-sm shadow transition-all duration-200 flex items-center justify-center gap-1"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <Edit className="w-4 h-4" /> Edit
                                                </motion.button>
                                                <motion.button
                                                    onClick={() => handleDeleteTask(task.id, task.title)}
                                                    className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded text-sm shadow transition-all duration-200 flex items-center justify-center gap-1"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <Trash2 className="w-4 h-4" /> Delete
                                                </motion.button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Footer */}
                <motion.div className="mt-8 lg:mt-12 text-center text-gray-500 text-xs sm:text-sm" variants={itemVariants}>
                    <p className="mb-1">Showing {filteredTasks.length} of {tasks.length} tasks • All actions are logged</p>
                    <p>&copy; {new Date().getFullYear()} CoinFlow. All rights reserved.</p>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ManageTasks;