import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, XCircle, FileText, ChevronDown, ChevronUp, Search, Filter } from 'lucide-react';

const workerSubmissionHistory = [
  {
    id: 'sub001',
    taskTitle: 'Complete market research for Q3 report',
    submissionDate: '2025-07-10',
    payableAmount: 150.00,
    buyerName: 'Alpha Corp',
    status: 'Approved',
    feedback: 'Excellent research, very thorough and insightful.',
  },
  {
    id: 'sub002',
    taskTitle: 'Design new landing page banner',
    submissionDate: '2025-07-08',
    payableAmount: 200.00,
    buyerName: 'Design Solutions',
    status: 'Approved',
    feedback: 'Stunning design! Exactly what we needed.',
  },
  {
    id: 'sub003',
    taskTitle: 'Review user feedback on new feature',
    submissionDate: '2025-07-07',
    payableAmount: 80.00,
    buyerName: 'Beta Innovations',
    status: 'Pending',
    feedback: 'Awaiting review by the buyer.',
  },
  {
    id: 'sub004',
    taskTitle: 'Write blog post about CoinFlow updates',
    submissionDate: '2025-07-05',
    payableAmount: 120.00,
    buyerName: 'Content Hub',
    status: 'Approved',
    feedback: 'Well-written and informative. Good job!',
  },
  {
    id: 'sub005',
    taskTitle: 'Bug fix: Login error on mobile',
    submissionDate: '2025-07-03',
    payableAmount: 180.00,
    buyerName: 'Tech Solutions Inc.',
    status: 'Rejected',
    feedback: 'The fix introduced a new bug on Android devices. Please re-check.',
  },
  {
    id: 'sub006',
    taskTitle: 'Translate product documentation to Spanish',
    submissionDate: '2025-07-01',
    payableAmount: 300.00,
    buyerName: 'Global Reach',
    status: 'Pending',
    feedback: 'Translation submitted, currently under review.',
  },
];

const statusOptions = ['All', 'Approved', 'Pending', 'Rejected'];

const MySubmission = () => {
  const [expandedSubmission, setExpandedSubmission] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
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

  const filteredSubmissions = workerSubmissionHistory.filter(submission => {
    const matchesSearch = submission.taskTitle.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         submission.buyerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || submission.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

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
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-teal-400 via-sky-400 to-blue-500 bg-clip-text text-transparent mb-2 sm:mb-3 lg:mb-4">
            My Submissions
          </h1>
          <p className="text-gray-300 text-sm sm:text-base max-w-md sm:max-w-lg mx-auto">
            Track the status and details of all your task submissions
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3" variants={itemVariants}>
          <div className="relative col-span-1 sm:col-span-2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search submissions..."
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
        </motion.div>

        {/* Mobile View - Cards */}
        <div className="lg:hidden space-y-3">
          {filteredSubmissions.length === 0 ? (
            <div className="p-6 text-center text-gray-400 bg-gray-800/50 rounded-lg">
              No submissions found matching your criteria
            </div>
          ) : (
            filteredSubmissions.map((submission) => (
              <motion.div
                key={submission.id}
                className={`bg-gray-800/50 border rounded-lg p-4 ${
                  submission.status === 'Rejected' ? 'border-red-700/50' : 
                  submission.status === 'Approved' ? 'border-green-700/50' : 'border-gray-700/50'
                }`}
                variants={itemVariants}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-blue-300 font-medium">{submission.taskTitle}</h3>
                    <p className="text-gray-300 text-xs mt-1">{submission.buyerName}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`font-bold text-sm ${
                      submission.status === 'Approved' ? 'text-green-400' : 
                      submission.status === 'Rejected' ? 'text-red-400' : 'text-yellow-400'
                    }`}>
                      ${submission.payableAmount.toFixed(2)}
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
                  <div className="mt-3 pt-3 border-t border-gray-700/50 space-y-3">
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-gray-400">Submitted:</span>
                        <span className="text-gray-300 ml-1">{formatDate(submission.submissionDate)}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">ID:</span>
                        <span className="text-gray-300 ml-1">{submission.id}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-400 text-xs">Feedback:</span>
                      <p className="text-gray-300 text-sm mt-1">{submission.feedback}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>

        {/* Desktop View - Table */}
        <div className="hidden lg:block overflow-x-auto rounded-lg border border-gray-700/50 shadow">
          {filteredSubmissions.length === 0 ? (
            <div className="p-8 text-center text-gray-400 text-lg bg-gray-800/70">
              No submissions found matching your criteria
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
                    Submitted
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Feedback
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/70 divide-y divide-gray-700/50">
                {filteredSubmissions.map((submission) => (
                  <motion.tr
                    key={submission.id}
                    className={`hover:bg-gray-700/60 transition-colors duration-200 ${
                      submission.status === 'Rejected' ? 'bg-red-900/10' : 
                      submission.status === 'Approved' ? 'bg-green-900/10' : ''
                    }`}
                    variants={itemVariants}
                  >
                    <td className="px-4 py-3">
                      <div className="text-blue-300 font-medium">{submission.taskTitle}</div>
                      <div className="text-gray-400 text-xs mt-1">ID: {submission.id}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                      {submission.buyerName}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">
                      {formatDate(submission.submissionDate)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap font-bold ${
                      submission.status === 'Approved' ? 'text-green-400' : 
                      submission.status === 'Rejected' ? 'text-red-400' : 'text-yellow-400'
                    }">
                      ${submission.payableAmount.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {renderStatusBadge(submission.status)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-300 max-w-xs">
                      <div className="line-clamp-2 hover:line-clamp-none transition-all">
                        {submission.feedback}
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
          <p className="mb-1">Showing {filteredSubmissions.length} of {workerSubmissionHistory.length} submissions</p>
          <p>&copy; {new Date().getFullYear()} CoinFlow. All rights reserved.</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MySubmission;