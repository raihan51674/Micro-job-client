import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, UserPlus, Calendar, Eye, FileText, Search, ChevronRight, ChevronLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../../Shared/LoadingSpinner';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router';
import ReactPaginate from 'react-paginate';

const itemsPerPageOptions = [6, 9, 12, 15];

const TaskList = () => {
    const navigate = useNavigate();

    const [itemOffset, setItemOffset] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);
    const [searchTerm, setSearchTerm] = useState('');

    const {
        data: tasks = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ['allTasks'],
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/tasks`);
            return data;
        },
    });

    const filteredTasks = tasks.filter(task =>
        task.task_title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.taskDetails?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.buyer?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const endOffset = itemOffset + itemsPerPage;
    const currentTasks = filteredTasks.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(filteredTasks.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % filteredTasks.length;
        setItemOffset(newOffset);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        setItemOffset(0);
    }, [searchTerm, itemsPerPage, filteredTasks.length]);


    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delayChildren: 0.1,
                staggerChildren: 0.08,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const handleViewDetails = (taskId, taskTitle) => {
        console.log(taskId, taskTitle);
        toast(`Viewing details for: "${taskTitle}"`, {
            icon: '🔍',
            duration: 2000,
            style: {
                background: '#4CAF50',
                color: '#fff',
            },
        });
        console.log(`Navigating to details for task ID: ${taskId}`);
        navigate(`/dashboard/task/${taskId}`);
    };

    if (isLoading) return <LoadingSpinner />;

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-red-400 text-lg">
                <p>Error loading tasks: {error.message}. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4 md:p-8 flex flex-col items-center font-sans text-white">
            <motion.div
                className="max-w-7xl mx-auto w-full bg-gray-800/30 backdrop-blur-3xl rounded-3xl shadow-2xl border border-gray-700/60 p-6 md:p-10 overflow-hidden"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div className="text-center mb-10" variants={itemVariants}>
                    <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 bg-clip-text text-transparent tracking-tight leading-tight mb-4 drop-shadow-lg">
                        Available Tasks
                    </h1>
                    <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                        Discover new tasks where your skills can earn you coins.
                    </p>
                </motion.div>

                {/* --- Search and Items per Page Filters --- */}
                <motion.div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4" variants={itemVariants}>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by title, details or buyer..."
                            className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FileText className="h-4 w-4 text-gray-400" />
                        </div>
                        <select
                            className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                            value={itemsPerPage}
                            onChange={(e) => setItemsPerPage(Number(e.target.value))}
                        >
                            {itemsPerPageOptions.map(option => (
                                <option key={option} value={option} className="bg-gray-800">
                                    {option} tasks per page
                                </option>
                            ))}
                        </select>
                    </div>
                </motion.div>

                {/* --- Task Cards --- */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {currentTasks.length === 0 ? (
                        <div className="lg:col-span-3 p-8 text-center text-gray-400 text-lg bg-gray-800/70 rounded-xl shadow-lg border border-gray-700/50">
                            No tasks currently available matching your criteria. Check back soon!
                        </div>
                    ) : (
                        currentTasks.map((task) => (
                            <motion.div
                                key={task?._id}
                                className="bg-gray-700/40 p-6 rounded-xl shadow-lg border border-gray-600/70 flex flex-col justify-between group transform transition-all duration-300 hover:scale-102 hover:shadow-xl hover:border-blue-500/50"
                                variants={itemVariants}
                                whileHover={{ y: -5 }}
                            >
                                {/* --- এখানে প্রতিটি টাস্কের জন্য ইমেজ যোগ করা হয়েছে --- */}
                                {task.image ? ( // যদি task.task_image ফিল্ড থাকে
                                    <img
                                        src={task.image} // আপনার টাস্ক অবজেক্টে ইমেজের URL থাকা উচিত
                                        alt={task.task_title}
                                        className="w-full h-40 object-cover rounded-lg mb-4 shadow-md"
                                    />
                                ) : (
                                    // যদি task.task_image না থাকে, একটি প্লেসহোল্ডার ইমেজ দেখান
                                    <img
                                        src="https://via.placeholder.com/400x200?text=No+Image+Available" // একটি জেনেরিক প্লেসহোল্ডার ইমেজ
                                        alt="No Image Available"
                                        className="w-full h-40 object-cover rounded-lg mb-4 shadow-md bg-gray-600"
                                    />
                                )}
                                {/* --------------------------------------------------- */}

                                <div className="mb-4">
                                    <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                                        {task.task_title}
                                    </h3>
                                    <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                                        {task?.taskDetails}
                                    </p>
                                </div>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center text-gray-300 text-sm">
                                        <FileText className="w-4 h-4 mr-2 text-purple-400" />
                                        <span>
                                            Buyer:{' '}
                                            <span className="font-medium text-white">
                                                {task?.buyer?.name}
                                            </span>
                                        </span>
                                    </div>
                                    <div className="flex items-center text-gray-300 text-sm">
                                        <Calendar className="w-4 h-4 mr-2 text-yellow-400" />
                                        <span>
                                            Complete By:{' '}
                                            <span className="font-medium text-white">
                                                {task?.completationDate}
                                            </span>
                                        </span>
                                    </div>
                                    <div className="flex items-center text-green-400 text-sm font-semibold">
                                        <DollarSign className="w-4 h-4 mr-2" />
                                        <span>
                                            Payable:{' '}
                                            <span className="text-lg font-bold">
                                                ${task?.payableAmount}
                                            </span>
                                        </span>
                                    </div>
                                    <div className="flex items-center text-blue-400 text-sm font-semibold">
                                        <UserPlus className="w-4 h-4 mr-2" />
                                        <span>
                                            Workers Needed:{' '}
                                            <span className="text-lg font-bold">
                                                {task?.requiredWorkers}
                                            </span>
                                        </span>
                                    </div>
                                </div>

                                <motion.button
                                    onClick={() =>
                                        handleViewDetails(task._id, task?.task_title)
                                    }
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg text-base shadow-md transition-all duration-200 flex items-center justify-center gap-2 mt-auto"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Eye className="w-5 h-5" /> View Details
                                </motion.button>
                            </motion.div>
                        ))
                    )}
                </motion.div>

                {/* --- Pagination Controls (using react-paginate) --- */}
                {filteredTasks.length > 0 && (
                    <motion.div className="mt-12 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0" variants={itemVariants}>
                        <div className="text-gray-400 text-sm">
                            Showing {itemOffset + 1} to {Math.min(endOffset, filteredTasks.length)} of {filteredTasks.length} tasks
                        </div>
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel={<span className="flex items-center gap-1"><ChevronRight className="w-4 h-4" /> Next</span>}
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={1}
                            pageCount={pageCount}
                            previousLabel={<span className="flex items-center gap-1"> <ChevronLeft className="w-4 h-4" /> Previous</span>}
                            renderOnZeroPageCount={null}
                            containerClassName="flex items-center space-x-2"
                            pageLinkClassName="hidden sm:block px-3 py-1 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors cursor-pointer"
                            activeLinkClassName="!bg-blue-600 !text-white"
                            previousLinkClassName="px-3 py-1 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1 cursor-pointer"
                            nextLinkClassName="px-3 py-1 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1 cursor-pointer"
                            breakLinkClassName="hidden sm:block px-3 py-1 rounded-lg bg-gray-700 text-gray-300 cursor-pointer"
                        />
                    </motion.div>
                )}

                {/* Footer */}
                <motion.div
                    className="mt-12 text-center text-gray-500 text-sm md:text-base"
                    variants={itemVariants}
                >
                    <p className="mb-2">
                        Find tasks that match your skills and start earning today.
                    </p>
                    <p>&copy; {new Date().getFullYear()} CoinFlow. All rights reserved.</p>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default TaskList;