import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { ClipboardList, CreditCard, Users, Eye, CheckCircle, XCircle } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { AuthContext } from '../../../Provider/AuthProvider';
import LoadingSpinner from '../../../Shared/LoadingSpinner';

const MySwal = withReactContent(Swal);

const BuyerHomePage = () => {
    const { user, loading } = useContext(AuthContext);
    const queryClient = useQueryClient();

    const [showModal, setShowModal] = useState(false);
    const [selectedSubmission, setSelectedSubmission] = useState(null);

    // --- Data Fetching for Buyer Statistics ---
    const {
        data: buyerStats = { totalTasksAdded: 0, pendingTaskSlots: 0, totalPaymentPaid: 0 },
        isLoading: isLoadingStats,
        error: statsError,
    } = useQuery({
        queryKey: ['buyerStats', user?.email],
        queryFn: async () => {
            if (!user?.email) {
                return { totalTasksAdded: 0, pendingTaskSlots: 0, totalPaymentPaid: 0 };
            }
            const [tasksResponse, approvedSubmissionsResponse] = await Promise.all([
                axios.get(`${import.meta.env.VITE_API_URL}/my-tasks/${user.email}`),
                axios.get(`${import.meta.env.VITE_API_URL}/buyer-approved-submissions?buyer_email=${user.email}`) // এই এন্ডপয়েন্টটি আপনার সার্ভার কোডে যোগ করতে হবে
            ]);

            const tasks = tasksResponse.data;
            const approvedSubmissions = approvedSubmissionsResponse.data;

            const totalTasksAdded = tasks.length;
            const pendingTaskSlots = tasks.reduce((sum, task) => sum + (task.requiredWorkers || 0), 0);
            const totalPaymentPaid = approvedSubmissions.reduce((sum, sub) => sum + (sub.payable_amount || 0), 0);

            return {
                totalTasksAdded,
                pendingTaskSlots,
                totalPaymentPaid,
            };
        },
        enabled: !!user?.email && !loading,
    });

    // --- Data Fetching for Pending Submissions ---
    const {
        data: pendingSubmissions = [],
        isLoading: isLoadingSubmissions,
        error: submissionsError,
    } = useQuery({
        queryKey: ['pendingSubmissionsForBuyer', user?.email],
        queryFn: async () => {
            if (!user?.email) {
                return [];
            }
            const url = `${import.meta.env.VITE_API_URL}/pending-submissions?buyer_email=${user?.email}`;
            const { data } = await axios.get(url);
            console.log("Pending data (from server):", data);
            return data;
        },
        enabled: !!user?.email && !loading,
    });

    // --- Approve Submission Mutation ---
    const approveMutation = useMutation({
        mutationFn: async (submissionId) => {
            const { data } = await axios.patch(
                `${import.meta.env.VITE_API_URL}/approve-submission/${submissionId}`
            );
            return data;
        },
        onSuccess: (data) => {
            MySwal.fire({
                icon: 'success',
                title: 'Submission Approved!',
                text: `Worker earned ${data.payable_amount} coins.`, // সার্ভার থেকে payable_amount আসছে বলে ধরে নেওয়া হয়েছে
                confirmButtonText: 'Great!'
            });
            queryClient.invalidateQueries(['pendingSubmissionsForBuyer', user?.email]);
            queryClient.invalidateQueries(['buyerStats', user?.email]); // স্ট্যাটস আপডেট হবে
            queryClient.invalidateQueries(['workerStats', data.worker_email]); // যদি worker stats কোথাও দেখানো হয়
            queryClient.invalidateQueries(['userCoins', data.worker_email]); // ওয়ার্কারের কয়েন ব্যালেন্স রিফ্রেশ
            setShowModal(false);
        },
        onError: (err) => {
            MySwal.fire({
                icon: 'error',
                title: 'Approval Failed!',
                text: `Failed to approve submission: ${err.response?.data?.message || err.message}`,
                confirmButtonText: 'OK'
            });
            console.error("Approval error:", err);
        },
    });

    // --- Reject Submission Mutation ---
    const rejectMutation = useMutation({
        mutationFn: async (submissionId) => {
            const { data } = await axios.patch(
                `${import.meta.env.VITE_API_URL}/reject-submission/${submissionId}`
            );
            return data;
        },
        onSuccess: (data) => {
            MySwal.fire({
                icon: 'error',
                title: 'Submission Rejected!',
                text: 'The submission has been rejected. Task slot reopened.',
                confirmButtonText: 'OK'
            });
            queryClient.invalidateQueries(['pendingSubmissionsForBuyer', user?.email]);
            queryClient.invalidateQueries(['buyerStats', user?.email]); // স্ট্যাটস আপডেট হবে
            queryClient.invalidateQueries(['taskDetails', data.task_id]); // টাস্কের ডিটেইলস রিফ্রেশ
            setShowModal(false);
        },
        onError: (err) => {
            MySwal.fire({
                icon: 'error',
                title: 'Rejection Failed!',
                text: `Failed to reject submission: ${err.response?.data?.message || err.message}`,
                confirmButtonText: 'OK'
            });
            console.error("Rejection error:", err);
        },
    });

    const handleViewSubmission = (submission) => {
        setSelectedSubmission(submission);
        setShowModal(true);
    };

    const handleApprove = (submissionId) => {
        MySwal.fire({
            title: 'Are you sure?',
            text: "You want to APPROVE this submission? Worker will receive coins.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, approve it!'
        }).then((result) => {
            if (result.isConfirmed) {
                approveMutation.mutate(submissionId);
            }
        });
    };

    const handleReject = (submissionId) => {
        MySwal.fire({
            title: 'Are you sure?',
            text: "You want to REJECT this submission? Task slot will be reopened.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, reject it!'
        }).then((result) => {
            if (result.isConfirmed) {
                rejectMutation.mutate(submissionId);
            }
        });
    };

    if (isLoadingSubmissions || isLoadingStats || loading) {
        return <LoadingSpinner />;
    }

    if (submissionsError || statsError) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-red-400 text-lg">
                <p>Error loading data: {submissionsError?.message || statsError?.message}. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 space-y-6 lg:space-y-8 min-h-screen text-gray-100 max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white text-center mb-4 sm:mb-6 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                Buyer Dashboard Overview
            </h2>

            {/* Buyer Stats Section */}
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

                {/* Pending Task Slots Card */}
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
                    <p className="text-xs sm:text-sm text-gray-300 text-center">Pending Task Slots</p>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mt-1">{buyerStats.pendingTaskSlots}</h3>
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
                {pendingSubmissions.length > 0 ? (
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
                                {pendingSubmissions.map((submission) => (
                                    <motion.tr
                                        key={submission._id}
                                        whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                                        className="transition-colors duration-200"
                                    >
                                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-200">
                                            {submission.worker_name}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                                            {submission.task_title} {/* task_title ব্যবহার করা হয়েছে */}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-emerald-300 font-bold">
                                            ${submission.payable_amount?.toFixed(2)}
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
                                                    onClick={() => handleApprove(submission._id)}
                                                    disabled={approveMutation.isLoading || rejectMutation.isLoading}
                                                    className="p-1 sm:p-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    title="Approve Submission"
                                                >
                                                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleReject(submission._id)}
                                                    disabled={approveMutation.isLoading || rejectMutation.isLoading}
                                                    className="p-1 sm:p-2 rounded-full bg-red-600 hover:bg-red-700 text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
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
                            {pendingSubmissions.map((submission) => (
                                <motion.div
                                    key={submission._id}
                                    whileHover={{ scale: 1.01 }}
                                    className="p-4 rounded-lg border border-white/10 bg-black/20"
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-medium text-white">Task: {submission.task_title}</h3> {/* task_title ব্যবহার করা হয়েছে */}
                                            <p className="text-sm text-gray-300">Worker: {submission.worker_name}</p>
                                        </div>
                                        <p className="text-emerald-300 font-bold">${submission.payable_amount?.toFixed(2)}</p>
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
                                            onClick={() => handleApprove(submission._id)}
                                            disabled={approveMutation.isLoading || rejectMutation.isLoading}
                                            className="p-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                            title="Approve Submission"
                                        >
                                            <CheckCircle className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => handleReject(submission._id)}
                                            disabled={approveMutation.isLoading || rejectMutation.isLoading}
                                            className="p-2 rounded-full bg-red-600 hover:bg-red-700 text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
                                Submission for "{selectedSubmission.task_title}" {/* task_title ব্যবহার করা হয়েছে */}
                            </h3>
                            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base">
                                <p><strong>Worker:</strong> <span className="text-blue-300">{selectedSubmission.worker_name}</span></p>
                                <p><strong>Payable Amount:</strong> <span className="text-emerald-300 font-bold">${selectedSubmission.payable_amount?.toFixed(2)}</span></p>
                                <p>
                                    <strong>Details:</strong>{' '}
                                    <span className="text-gray-300">
                                        {/* যদি submission_details একটি JSON স্ট্রিং হয়, তাহলে পার্স করে ব্যবহার করুন */}
                                        {typeof selectedSubmission.submission_details === 'string' && selectedSubmission.submission_details.startsWith('{') && selectedSubmission.submission_details.endsWith('}') ?
                                            (() => {
                                                try {
                                                    const parsedDetails = JSON.parse(selectedSubmission.submission_details);
                                                    return (
                                                        <>
                                                            <p>{parsedDetails.text}</p>
                                                            {parsedDetails.image && (
                                                                <img src={parsedDetails.image} alt="Submission Screenshot" className="mt-2 rounded-md max-h-48 object-contain w-full" />
                                                            )}
                                                            {parsedDetails.file && (
                                                                <a href={parsedDetails.file} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">View Submitted File</a>
                                                            )}
                                                        </>
                                                    );
                                                } catch (e) {
                                                    console.error("Failed to parse submission_details JSON:", e);
                                                    return selectedSubmission.submission_details; // পার্স না হলে raw স্ট্রিং দেখাবে
                                                }
                                            })()
                                            : selectedSubmission.submission_details // যদি সাধারণ স্ট্রিং হয়
                                        }
                                    </span>
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BuyerHomePage;