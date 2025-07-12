import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, DollarSign, Send, FileText, ChevronDown, ChevronUp } from 'lucide-react';

const workerMetrics = {
    totalSubmissions: 45,
    totalPendingSubmissions: 7,
    totalEarning: 325.50,
};

const workerSubmissions = [
    {
        id: 'sub001',
        task_title: 'Complete market research for Q3 report',
        payable_amount: 150.00,
        buyer_name: 'Alpha Corp',
        status: 'Approved',
        submission_date: '2025-07-10',
    },
    {
        id: 'sub002',
        task_title: 'Design new landing page banner',
        payable_amount: 200.00,
        buyer_name: 'Design Solutions',
        status: 'Approved',
        submission_date: '2025-07-08',
    },
    {
        id: 'sub003',
        task_title: 'Review user feedback on new feature',
        payable_amount: 80.00,
        buyer_name: 'Beta Innovations',
        status: 'Pending',
        submission_date: '2025-07-07',
    },
    {
        id: 'sub004',
        task_title: 'Write blog post about CoinFlow updates',
        payable_amount: 120.00,
        buyer_name: 'Content Hub',
        status: 'Approved',
        submission_date: '2025-07-05',
    },
    {
        id: 'sub005',
        task_title: 'Bug fix: Login error on mobile',
        payable_amount: 180.00,
        buyer_name: 'Tech Solutions Inc.',
        status: 'Rejected',
        submission_date: '2025-07-03',
    },
];

const WorkerHome = () => {
    const [expandedSubmission, setExpandedSubmission] = useState(null);
    const approvedSubmissions = workerSubmissions.filter(
        (submission) => submission.status === 'Approved'
    );

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

    const renderStatusBadge = (status) => {
        switch (status) {
            case 'Approved':
                return (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-900/30 text-green-300 border border-green-700/50">
                        <CheckCircle className="w-3 h-3 mr-1" /> Approved
                    </span>
                );
            case 'Pending':
                return (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-900/30 text-yellow-300 border border-yellow-700/50">
                        <Clock className="w-3 h-3 mr-1" /> Pending
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-700/30 text-gray-300 border border-gray-600/50">
                        {status}
                    </span>
                );
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

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
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-orange-400 via-yellow-500 to-lime-500 bg-clip-text text-transparent mb-2 sm:mb-3 lg:mb-4">
                        Worker Dashboard
                    </h1>
                    <p className="text-gray-300 text-sm sm:text-base max-w-md sm:max-w-lg mx-auto">
                        Your performance overview and approved task submissions
                    </p>
                </motion.div>

                {/* Dashboard Metrics */}
                <motion.div className="mb-8 sm:mb-10 lg:mb-12" variants={itemVariants}>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-200 mb-4 sm:mb-6 text-center">Your Performance</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                        {/* Total Submissions */}
                        <motion.div
                            className="bg-gray-700/40 p-4 sm:p-5 lg:p-6 rounded-lg sm:rounded-xl shadow border border-gray-600/70 flex flex-col items-center text-center group"
                            whileHover={{ scale: 1.03, boxShadow: "0 0 15px rgba(59, 130, 246, 0.3)" }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                            <div className="p-2 sm:p-3 rounded-full bg-blue-600/30 text-blue-300 mb-3 group-hover:bg-blue-500/50 transition-colors">
                                <Send className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                            </div>
                            <p className="text-gray-300 text-xs sm:text-sm uppercase tracking-wide">Total Submissions</p>
                            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mt-1 sm:mt-2">
                                {workerMetrics.totalSubmissions.toLocaleString()}
                            </h3>
                        </motion.div>

                        {/* Pending Submissions */}
                        <motion.div
                            className="bg-gray-700/40 p-4 sm:p-5 lg:p-6 rounded-lg sm:rounded-xl shadow border border-gray-600/70 flex flex-col items-center text-center group"
                            whileHover={{ scale: 1.03, boxShadow: "0 0 15px rgba(251, 191, 36, 0.3)" }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                            <div className="p-2 sm:p-3 rounded-full bg-yellow-600/30 text-yellow-300 mb-3 group-hover:bg-yellow-500/50 transition-colors">
                                <Clock className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                            </div>
                            <p className="text-gray-300 text-xs sm:text-sm uppercase tracking-wide">Pending Submissions</p>
                            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mt-1 sm:mt-2">
                                {workerMetrics.totalPendingSubmissions.toLocaleString()}
                            </h3>
                        </motion.div>

                        {/* Total Earnings */}
                        <motion.div
                            className="bg-gray-700/40 p-4 sm:p-5 lg:p-6 rounded-lg sm:rounded-xl shadow border border-gray-600/70 flex flex-col items-center text-center group"
                            whileHover={{ scale: 1.03, boxShadow: "0 0 15px rgba(34, 197, 94, 0.3)" }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                            <div className="p-2 sm:p-3 rounded-full bg-green-600/30 text-green-300 mb-3 group-hover:bg-green-500/50 transition-colors">
                                <DollarSign className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                            </div>
                            <p className="text-gray-300 text-xs sm:text-sm uppercase tracking-wide">Total Earnings</p>
                            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mt-1 sm:mt-2">
                                ${workerMetrics.totalEarning.toFixed(2)}
                            </h3>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Approved Submissions */}
                <motion.div variants={itemVariants}>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-200 mb-4 sm:mb-6 text-center">
                        Approved Submissions ({approvedSubmissions.length})
                    </h2>

                    {/* Mobile View - Cards */}
                    <div className="lg:hidden space-y-3">
                        {approvedSubmissions.length === 0 ? (
                            <div className="p-6 text-center text-gray-400 bg-gray-800/50 rounded-lg">
                                No approved submissions yet. Keep up the good work!
                            </div>
                        ) : (
                            approvedSubmissions.map((submission) => (
                                <motion.div
                                    key={submission.id}
                                    className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4"
                                    variants={itemVariants}
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-blue-300 font-medium">{submission.task_title}</h3>
                                            <p className="text-gray-300 text-xs mt-1">{submission.buyer_name}</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-green-400 font-bold text-sm">
                                                ${submission.payable_amount.toFixed(2)}
                                            </span>
                                            <button
                                                onClick={() => setExpandedSubmission(expandedSubmission === submission.id ? null : submission.id)}
                                                className="text-gray-400 hover:text-gray-300"
                                            >
                                                {expandedSubmission === submission.id ? (
                                                    <ChevronUp className="w-4 h-4" />
                                                ) : (
                                                    <ChevronDown className="w-4 h-4" />
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-2">
                                        {renderStatusBadge(submission.status)}
                                    </div>

                                    {expandedSubmission === submission.id && (
                                        <div className="mt-3 pt-3 border-t border-gray-700/50 space-y-2">
                                            <div className="grid grid-cols-2 gap-2 text-xs">
                                                <div>
                                                    <span className="text-gray-400">Submitted:</span>
                                                    <span className="text-gray-300 ml-1">{formatDate(submission.submission_date)}</span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-400">Task ID:</span>
                                                    <span className="text-gray-300 ml-1">{submission.id}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            ))
                        )}
                    </div>

                    {/* Desktop View - Table */}
                    <div className="hidden lg:block overflow-x-auto rounded-lg border border-gray-700/50 shadow">
                        {approvedSubmissions.length === 0 ? (
                            <div className="p-8 text-center text-gray-400 text-lg bg-gray-800/70">
                                No approved submissions yet. Keep up the good work!
                            </div>
                        ) : (
                            <table className="min-w-full divide-y divide-gray-700/50">
                                <thead className="bg-gray-700/50">
                                    <tr>
                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                            Task
                                        </th>
                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                            Buyer
                                        </th>
                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                            Amount
                                        </th>
                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                            Submitted
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-gray-800/70 divide-y divide-gray-700/50">
                                    {approvedSubmissions.map((submission) => (
                                        <motion.tr
                                            key={submission.id}
                                            className="hover:bg-gray-700/60 transition-colors duration-200"
                                            variants={itemVariants}
                                        >
                                            <td className="px-4 py-3">
                                                <div className="text-blue-300 font-medium">{submission.task_title}</div>
                                                <div className="text-gray-400 text-xs mt-1">ID: {submission.id}</div>
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                                                {submission.buyer_name}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-green-400 font-bold">
                                                ${submission.payable_amount.toFixed(2)}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                {renderStatusBadge(submission.status)}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">
                                                {formatDate(submission.submission_date)}
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </motion.div>

                {/* Footer */}
                <motion.div className="mt-8 lg:mt-12 text-center text-gray-500 text-xs sm:text-sm" variants={itemVariants}>
                    <p className="mb-1">Your dedicated dashboard to track task progress and earnings</p>
                    <p>&copy; {new Date().getFullYear()} CoinFlow. All rights reserved.</p>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default WorkerHome;