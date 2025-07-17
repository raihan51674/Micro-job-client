import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, UserPlus, Calendar, Eye, FileText } from 'lucide-react';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../../Shared/LoadingSpinner';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router';

const TaskList = () => {
    //   const { tasks, isLoading } = useAllTasks();

    const {
        data: tasks = [],
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ['allTasks'],
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/tasks`);
            return data;
        },
    });

    const navigate = useNavigate()

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
        navigate(`/dashboard/task/${taskId}`)
    };

    if (isLoading) return <LoadingSpinner />;

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

                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {tasks.length === 0 ? (
                        <div className="lg:col-span-3 p-8 text-center text-gray-400 text-lg bg-gray-800/70 rounded-xl shadow-lg border border-gray-700/50">
                            No tasks currently available. Check back soon!
                        </div>
                    ) : (
                        tasks.map((task) => (
                            <motion.div
                                key={task?._id}
                                className="bg-gray-700/40 p-6 rounded-xl shadow-lg border border-gray-600/70 flex flex-col justify-between group transform transition-all duration-300 hover:scale-102 hover:shadow-xl hover:border-blue-500/50"
                                variants={itemVariants}
                                whileHover={{ y: -5 }}
                            >
                                <div className="mb-4">
                                    <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                                        {task.task_title}
                                    </h3>
                                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
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
                                        handleViewDetails(task._id, task?.taskTitle)
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
