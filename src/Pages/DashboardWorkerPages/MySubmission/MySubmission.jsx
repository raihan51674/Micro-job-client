import React, { useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, XCircle, Search, Filter, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoadingSpinner from '../../../Shared/LoadingSpinner';
import { AuthContext } from '../../../Provider/AuthProvider';
import ReactPaginate from 'react-paginate';

// স্টাইল করার জন্য react-paginate এর CSS ফাইল ইম্পোর্ট করার দরকার নেই, আমরা Tailwind দিয়ে করব।

const statusOptions = ['All', 'Approved', 'Pending', 'Rejected'];
const itemsPerPageOptions = [5, 10, 15, 20];

const MySubmission = () => {
    const { user } = useContext(AuthContext);
    const [expandedSubmission, setExpandedSubmission] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('All');

    const [itemOffset, setItemOffset] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);

    const {
        data: submissions = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ['mySubmissions', user?.email],
        queryFn: async () => {
            const { data } = await axios.get(
                `${import.meta.env.VITE_API_URL}/submissionData?worker_email=${user?.email}`, { withCredentials: true }
            );
            return data;
        },
        enabled: !!user?.email,
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

    const filteredSubmissions = submissions.filter(submission => {
        const matchesSearch =
            (submission.task_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            submission.Buyer_name?.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesStatus = selectedStatus === 'All' || submission.status === selectedStatus;
        return matchesSearch && matchesStatus;
    });

    const endOffset = itemOffset + itemsPerPage;
    const currentSubmissions = filteredSubmissions.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(filteredSubmissions.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % filteredSubmissions.length;
        setItemOffset(newOffset);
        setExpandedSubmission(null);
    };

    useEffect(() => {
        setItemOffset(0);
        setExpandedSubmission(null);
    }, [searchTerm, selectedStatus, itemsPerPage, filteredSubmissions.length]);

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
            case 'Rejected':
                return (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-900/30 text-red-300 border border-red-700/50">
                        <XCircle className="w-3 h-3 mr-1" /> Rejected
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
        if (!dateString) return 'N/A';
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch (e) {
            console.error("Invalid date string:", dateString, e);
            return 'Invalid Date';
        }
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-red-400 text-lg">
                <p>Error loading submissions: {error.message}. Please try again later.</p>
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
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-teal-400 via-sky-400 to-blue-500 bg-clip-text text-transparent mb-2 sm:mb-3 lg:mb-4">
                        My Submissions
                    </h1>
                    <p className="text-gray-300 text-sm sm:text-base max-w-md sm:max-w-lg mx-auto">
                        Track the status and details of all your task submissions
                    </p>
                </motion.div>

                {/* Search and Filters */}
                <motion.div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3" variants={itemVariants}>
                    <div className="relative col-span-1 sm:col-span-2 lg:col-span-2">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by task ID or buyer name..."
                            className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Filter className="h-4 w-4 text-gray-400" />
                        </div>
                        <select
                            className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
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

                    {/* Items per page selector */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                        </div>
                        <select
                            className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                            value={itemsPerPage}
                            onChange={(e) => setItemsPerPage(Number(e.target.value))}
                        >
                            {itemsPerPageOptions.map(option => (
                                <option key={option} value={option} className="bg-gray-800">
                                    {option} per page
                                </option>
                            ))}
                        </select>
                    </div>
                </motion.div>

                {/* Mobile View - Cards */}
                <div className="lg:hidden space-y-3">
                    {currentSubmissions.length === 0 ? (
                        <div className="p-6 text-center text-gray-400 bg-gray-800/50 rounded-lg">
                            No submissions found matching your criteria.
                        </div>
                    ) : (
                        currentSubmissions.map((submission) => (
                            <motion.div
                                key={submission._id}
                                className={`bg-gray-800/50 border rounded-lg p-4 ${submission.status === 'Rejected' ? 'border-red-700/50' :
                                    submission.status === 'Approved' ? 'border-green-700/50' : 'border-gray-700/50'
                                    }`}
                                variants={itemVariants}
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-blue-300 font-medium">Task ID: {submission.task_id}</h3>
                                        <p className="text-gray-300 text-xs mt-1">{submission.Buyer_name}</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className={`font-bold text-sm ${submission.status === 'Approved' ? 'text-green-400' :
                                            submission.status === 'Rejected' ? 'text-red-400' : 'text-yellow-400'
                                            }`}>
                                            ${submission.payable_amount?.toFixed(2)}
                                        </span>
                                        <button
                                            onClick={() => setExpandedSubmission(expandedSubmission === submission._id ? null : submission._id)}
                                            className="text-gray-400 hover:text-gray-300"
                                        >
                                            {expandedSubmission === submission._id ? (
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

                                {expandedSubmission === submission._id && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="mt-3 pt-3 border-t border-gray-700/50 space-y-3"
                                    >
                                        <div className="grid grid-cols-2 gap-3 text-xs">
                                            <div>
                                                <span className="text-gray-400">Submitted On:</span>
                                                <span className="text-gray-300 ml-1">{formatDate(submission.current_date)}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-400">Worker Email:</span>
                                                <span className="text-gray-300 ml-1">{submission.worker_email}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <span className="text-gray-400 text-xs">Submission Details:</span>
                                            <p className="text-gray-300 text-sm mt-1">{submission.submission_details || 'N/A'}</p>
                                        </div>
                                        {submission.feedback && (
                                            <div>
                                                <span className="text-gray-400 text-xs">Buyer Feedback:</span>
                                                <p className="text-gray-300 text-sm mt-1">{submission.feedback}</p>
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </motion.div>
                        ))
                    )}
                </div>

                {/* Desktop View - Table */}
                <div className="hidden lg:block overflow-x-auto rounded-lg border border-gray-700/50 shadow">
                    {currentSubmissions.length === 0 ? (
                        <div className="p-8 text-center text-gray-400 text-lg bg-gray-800/70">
                            No submissions found matching your criteria.
                        </div>
                    ) : (
                        <table className="min-w-full divide-y divide-gray-700/50">
                            <thead className="bg-gray-700/50">
                                <tr>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Task ID
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Buyer
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Submitted On
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Amount
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Submission Details
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-gray-800/70 divide-y divide-gray-700/50">
                                {currentSubmissions.map((submission) => (
                                    <motion.tr
                                        key={submission._id}
                                        className={`hover:bg-gray-700/60 transition-colors duration-200 ${submission.status === 'Rejected' ? 'bg-red-900/10' :
                                            submission.status === 'Approved' ? 'bg-green-900/10' : ''
                                            }`}
                                        variants={itemVariants}
                                    >
                                        <td className="px-4 py-3">
                                            <div className="text-blue-300 font-medium">{submission.task_id}</div>
                                            <div className="text-gray-400 text-xs mt-1">Worker: {submission.worker_name}</div>
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                                            {submission.Buyer_name}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">
                                            {formatDate(submission.current_date)}
                                        </td>
                                        <td className={`px-4 py-3 whitespace-nowrap font-bold ${
                                            submission.status === 'Approved' ? 'text-green-400' :
                                            submission.status === 'Rejected' ? 'text-red-400' : 'text-yellow-400'
                                            }`}>
                                            ${submission.payable_amount?.toFixed(2)}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            {renderStatusBadge(submission.status)}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-300 max-w-xs">
                                            <div className="line-clamp-2 hover:line-clamp-none transition-all">
                                                {submission.submission_details || 'N/A'}
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* --- Pagination Controls (using react-paginate) --- */}
                {filteredSubmissions.length > 0 && (
                    <motion.div className="mt-8 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0" variants={itemVariants}>
                        <div className="text-gray-400 text-sm">
                            Showing {itemOffset + 1} to {Math.min(endOffset, filteredSubmissions.length)} of {filteredSubmissions.length} submissions
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
                            // Small devices: hide page numbers, show only next/previous
                            // Medium/Large devices: show page numbers
                            pageLinkClassName="hidden sm:block px-3 py-1 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors cursor-pointer"
                            activeLinkClassName="!bg-blue-600 !text-white"
                            previousLinkClassName="px-3 py-1 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1 cursor-pointer"
                            nextLinkClassName="px-3 py-1 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1 cursor-pointer"
                            breakLinkClassName="hidden sm:block px-3 py-1 rounded-lg bg-gray-700 text-gray-300 cursor-pointer"
                        />
                    </motion.div>
                )}

                {/* Footer */}
                <motion.div className="mt-8 lg:mt-12 text-center text-gray-500 text-xs sm:text-sm" variants={itemVariants}>
                    <p className="mb-1">MicroJobs Platform</p>
                    <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default MySubmission;