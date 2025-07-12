import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { ClipboardList, CreditCard, Users, Eye, CheckCircle, XCircle } from 'lucide-react';

const BuyerHomePage = () => {
    // Mock Data for static component
    const buyerStats = {
        totalTasksAdded: 15,
        pendingSubmissionsCount: 5,
        totalPaymentPaid: 750.50,
    };

    const mockPendingSubmissions = [
        {
            id: 'sub1',
            worker_name: 'Alice Smith',
            task_title: 'Social Media Post Creation',
            payable_amount: 15.00,
            submission_details: {
                text: 'Completed social media posts for Facebook, Instagram, and Twitter. All drafts attached.',
                image: 'https://i.ibb.co/q0Z1mF7/social-media-post.jpg',
                link: 'https://example.com/submission/alice_social_media'
            },
        },
        {
            id: 'sub2',
            worker_name: 'Bob Johnson',
            task_title: 'Data Entry for CRM',
            payable_amount: 22.50,
            submission_details: {
                text: 'CRM data entry for May 2025 completed. See attached spreadsheet for details.',
                file: 'https://example.com/submission/bob_data_entry.xlsx'
            },
        },
        {
            id: 'sub3',
            worker_name: 'Charlie Brown',
            task_title: 'Blog Post Outline',
            payable_amount: 10.00,
            submission_details: {
                text: 'Outline for "Top 10 Productivity Hacks" blog post. Keyword research included.',
            },
        },
        {
            id: 'sub4',
            worker_name: 'Diana Prince',
            task_title: 'Website Testing - Bug Report',
            payable_amount: 18.00,
            submission_details: {
                text: 'Found 3 critical bugs and 5 minor bugs on the website. Detailed report with screenshots attached.',
                image: 'https://i.ibb.co/N1J5m7m/website-bug.jpg',
                report: 'https://example.com/submission/diana_bug_report.pdf'
            },
        },
    ];

    const [showModal, setShowModal] = useState(false);
    const [selectedSubmission, setSelectedSubmission] = useState(null);

    const handleViewSubmission = (submission) => {
        setSelectedSubmission(submission);
        setShowModal(true);
    };

    const handleApprove = (submissionId) => {
        toast.success(`Submission ${submissionId} Approved!`);
        console.log(`Approved submission: ${submissionId}`);
    };

    const handleReject = (submissionId) => {
        toast.error(`Submission ${submissionId} Rejected.`);
        console.log(`Rejected submission: ${submissionId}`);
    };

    return (
        <div className="p-4 md:p-8 space-y-6 lg:space-y-8 min-h-screen text-gray-100 max-w-7xl mx-auto">
            {/* Stats Section */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white text-center mb-4 sm:mb-6 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                Buyer Dashboard Overview
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Total Tasks Added Card */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex flex-col items-center p-4 sm:p-6 rounded-xl shadow-lg border border-white/10"
                    style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                    }}
                >
                    <ClipboardList className="h-8 w-8 sm:h-10 sm:w-10 text-blue-400 mb-2 sm:mb-3" />
                    <p className="text-xs sm:text-sm text-gray-300 text-center">Total Tasks Added</p>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mt-1">{buyerStats.totalTasksAdded}</h3>
                </motion.div>

                {/* Pending Submissions Card */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex flex-col items-center p-4 sm:p-6 rounded-xl shadow-lg border border-white/10"
                    style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                    }}
                >
                    <Users className="h-8 w-8 sm:h-10 sm:w-10 text-purple-400 mb-2 sm:mb-3" />
                    <p className="text-xs sm:text-sm text-gray-300 text-center">Pending Submissions</p>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mt-1">{buyerStats.pendingSubmissionsCount}</h3>
                </motion.div>

                {/* Total Payment Paid Card */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex flex-col items-center p-4 sm:p-6 rounded-xl shadow-lg border border-white/10"
                    style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                    }}
                >
                    <CreditCard className="h-8 w-8 sm:h-10 sm:w-10 text-emerald-400 mb-2 sm:mb-3" />
                    <p className="text-xs sm:text-sm text-gray-300 text-center">Total Payment Paid</p>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mt-1">${buyerStats.totalPaymentPaid.toFixed(2)}</h3>
                </motion.div>
            </div>

            {/* Tasks To Review Section */}
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-8 sm:mt-12 mb-4 sm:mb-6 bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">
                Tasks To Review
            </h2>
            
            <div className="overflow-x-auto rounded-xl shadow-lg border border-white/10"
                style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                }}
            >
                {mockPendingSubmissions.length > 0 ? (
                    <div className="min-w-full">
                        {/* Table for medium screens and up */}
                        <table className="min-w-full divide-y divide-white/10 hidden sm:table">
                            <thead className="bg-black/20">
                                <tr>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Worker Name
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Task Title
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Payable Amount
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {mockPendingSubmissions.map((submission) => (
                                    <motion.tr
                                        key={submission.id}
                                        whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                                        className="transition-colors duration-200"
                                    >
                                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-200">
                                            {submission.worker_name}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                                            {submission.task_title}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-emerald-300 font-bold">
                                            ${submission.payable_amount.toFixed(2)}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-center">
                                            <div className="flex items-center justify-center space-x-2">
                                                <button
                                                    onClick={() => handleViewSubmission(submission)}
                                                    className="p-1 sm:p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    title="View Submission"
                                                >
                                                    <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleApprove(submission.id)}
                                                    className="p-1 sm:p-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                                    title="Approve Submission"
                                                >
                                                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleReject(submission.id)}
                                                    className="p-1 sm:p-2 rounded-full bg-red-600 hover:bg-red-700 text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                                                    title="Reject Submission"
                                                >
                                                    <XCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Cards for small screens */}
                        <div className="sm:hidden space-y-3 p-4">
                            {mockPendingSubmissions.map((submission) => (
                                <motion.div
                                    key={submission.id}
                                    whileHover={{ scale: 1.01 }}
                                    className="p-4 rounded-lg border border-white/10 bg-black/20"
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-medium text-white">{submission.task_title}</h3>
                                            <p className="text-sm text-gray-300">{submission.worker_name}</p>
                                        </div>
                                        <p className="text-emerald-300 font-bold">${submission.payable_amount.toFixed(2)}</p>
                                    </div>
                                    <div className="flex justify-center space-x-3 mt-3 pt-3 border-t border-white/10">
                                        <button
                                            onClick={() => handleViewSubmission(submission)}
                                            className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
                                            title="View Submission"
                                        >
                                            <Eye className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => handleApprove(submission.id)}
                                            className="p-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white transition-colors duration-200"
                                            title="Approve Submission"
                                        >
                                            <CheckCircle className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => handleReject(submission.id)}
                                            className="p-2 rounded-full bg-red-600 hover:bg-red-700 text-white transition-colors duration-200"
                                            title="Reject Submission"
                                        >
                                            <XCircle className="h-4 w-4" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="p-6 text-center text-gray-400">
                        No pending submissions to review at the moment.
                    </div>
                )}
            </div>

            {/* Submission Detail Modal */}
            <AnimatePresence>
                {showModal && selectedSubmission && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/70 flex items-center justify-center p-2 sm:p-4 z-50"
                        onClick={() => setShowModal(false)}
                    >
                        <motion.div
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -50, opacity: 0 }}
                            transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                            className="bg-black/50 backdrop-blur-xl p-4 sm:p-6 md:p-8 rounded-xl shadow-2xl max-w-full w-full sm:max-w-lg mx-2 border border-white/20 text-gray-100 relative max-h-[90vh] overflow-y-auto"
                            onClick={e => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-300 hover:text-white transition-colors duration-200 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                aria-label="Close modal"
                            >
                                <XCircle className="h-6 w-6 sm:h-7 sm:w-7" />
                            </button>
                            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 border-b border-white/20 pb-2">
                                Submission for "{selectedSubmission.task_title}"
                            </h3>
                            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base">
                                <p><strong>Worker:</strong> <span className="text-blue-300">{selectedSubmission.worker_name}</span></p>
                                <p><strong>Payable Amount:</strong> <span className="text-emerald-300 font-bold">${selectedSubmission.payable_amount.toFixed(2)}</span></p>
                                <p><strong>Details:</strong> <span className="text-gray-300">{selectedSubmission.submission_details.text}</span></p>
                                {selectedSubmission.submission_details.image && (
                                    <div>
                                        <strong>Image:</strong>
                                        <img
                                            src={selectedSubmission.submission_details.image}
                                            alt="Submission"
                                            className="mt-2 w-full h-auto max-h-48 sm:max-h-64 object-contain rounded-lg border border-white/10 shadow-md"
                                        />
                                    </div>
                                )}
                                {selectedSubmission.submission_details.link && (
                                    <p>
                                        <strong>Link:</strong>{' '}
                                        <a
                                            href={selectedSubmission.submission_details.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-400 hover:underline break-all"
                                        >
                                            {selectedSubmission.submission_details.link}
                                        </a>
                                    </p>
                                )}
                                {selectedSubmission.submission_details.file && (
                                    <p>
                                        <strong>File:</strong>{' '}
                                        <a
                                            href={selectedSubmission.submission_details.file}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-400 hover:underline break-all"
                                        >
                                            Download File
                                        </a>
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BuyerHomePage;