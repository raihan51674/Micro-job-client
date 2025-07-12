import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, ShoppingCart, DollarSign, Wallet, CheckCircle, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import toast from 'react-hot-toast';

// Static Data
const dashboardMetrics = {
  totalWorkers: 1250,
  totalBuyers: 3400,
  totalAvailableCoins: 500000,
  totalPayments: 8750,
};

const initialWithdrawRequests = [
  {
    id: 'WDR1001',
    userId: 'USER001',
    username: 'Alice Smith',
    amount: 50.00,
    requestDate: '2025-07-08 10:00',
    status: 'Pending',
    method: 'PayPal',
  },
  {
    id: 'WDR1002',
    userId: 'USER005',
    username: 'Bob Johnson',
    amount: 120.00,
    requestDate: '2025-07-07 14:15',
    status: 'Pending',
    method: 'Bank Transfer',
  },
  {
    id: 'WDR1003',
    userId: 'USER010',
    username: 'Charlie Brown',
    amount: 30.00,
    requestDate: '2025-07-06 09:30',
    status: 'Pending',
    method: 'Stripe Payout',
  },
  {
    id: 'WDR1004',
    userId: 'USER015',
    username: 'Diana Prince',
    amount: 80.00,
    requestDate: '2025-07-05 18:00',
    status: 'Approved',
    method: 'PayPal',
  },
];

const AdminHome = () => {
  const [withdrawRequests, setWithdrawRequests] = useState(initialWithdrawRequests);
  const [expandedRequest, setExpandedRequest] = useState(null);

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

  const handlePaymentSuccess = (id) => {
    setWithdrawRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status: 'Approved' } : request
      )
    );
    toast.success(`Withdrawal ${id} approved successfully!`, {
      duration: 3000,
      style: {
        background: '#16a34a',
        color: '#fff',
      },
    });
  };

  const renderStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-900/30 text-yellow-300 border border-yellow-700/50">
            <Clock className="w-3 h-3 mr-1" /> Pending
          </span>
        );
      case 'Approved':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-900/30 text-green-300 border border-green-700/50">
            <CheckCircle className="w-3 h-3 mr-1" /> Approved
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

  const pendingRequests = withdrawRequests.filter(req => req.status === 'Pending');

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
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent mb-2 sm:mb-3 lg:mb-4">
            Admin Dashboard
          </h1>
          <p className="text-gray-300 text-sm sm:text-base max-w-md sm:max-w-lg mx-auto">
            Overview of system metrics and pending withdrawal requests
          </p>
        </motion.div>

        {/* Dashboard Metrics */}
        <motion.div className="mb-8 sm:mb-10 lg:mb-12" variants={itemVariants}>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-200 mb-4 sm:mb-6 text-center">System Metrics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {Object.entries(dashboardMetrics).map(([key, value]) => (
              <motion.div
                key={key}
                className="bg-gray-700/40 p-4 sm:p-5 lg:p-6 rounded-lg sm:rounded-xl shadow border border-gray-600/70 flex flex-col items-center text-center group"
                whileHover={{ scale: 1.03, boxShadow: "0 0 15px rgba(59, 130, 246, 0.3)" }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                variants={itemVariants}
              >
                <div className="p-2 sm:p-3 rounded-full bg-blue-600/30 text-blue-300 mb-3 group-hover:bg-blue-500/50 transition-colors">
                  {key === 'totalWorkers' && <Users className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />}
                  {key === 'totalBuyers' && <ShoppingCart className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />}
                  {key === 'totalAvailableCoins' && <Wallet className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />}
                  {key === 'totalPayments' && <DollarSign className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />}
                </div>
                <p className="text-gray-300 text-xs sm:text-sm uppercase tracking-wide">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mt-1 sm:mt-2">
                  {key === 'totalAvailableCoins' ? `${value.toLocaleString()} Coins` : value.toLocaleString()}
                </h3>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Withdrawal Requests */}
        <motion.div variants={itemVariants}>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-200 mb-4 sm:mb-6 text-center">
            Pending Withdrawal Requests ({pendingRequests.length})
          </h2>
          
          {/* Mobile View - Cards */}
          <div className="lg:hidden space-y-3">
            {pendingRequests.length === 0 ? (
              <div className="p-6 text-center text-gray-400 bg-gray-800/50 rounded-lg">
                No pending withdrawal requests. Great job!
              </div>
            ) : (
              pendingRequests.map((request) => (
                <motion.div
                  key={request.id}
                  className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4"
                  variants={itemVariants}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="text-xs text-gray-400">Request ID</div>
                      <div className="text-blue-300 font-medium text-sm">{request.id}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-400">Amount</div>
                      <div className="text-green-400 font-bold">${request.amount.toFixed(2)}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div>
                      <div className="text-xs text-gray-400">User</div>
                      <div className="text-gray-300 text-sm">
                        {request.username} ({request.userId})
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Method</div>
                      <div className="text-gray-300 text-sm">{request.method}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Date</div>
                      <div className="text-gray-300 text-sm">
                        {request.requestDate.split(' ')[0]}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Status</div>
                      <div className="mt-1">{renderStatusBadge(request.status)}</div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      onClick={() => {
                        if (expandedRequest === request.id) {
                          setExpandedRequest(null);
                        } else {
                          setExpandedRequest(request.id);
                        }
                      }}
                      className="text-xs text-blue-400 flex items-center"
                    >
                      {expandedRequest === request.id ? (
                        <>
                          <ChevronUp className="w-3 h-3 mr-1" /> Hide details
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-3 h-3 mr-1" /> Show details
                        </>
                      )}
                    </button>

                    {expandedRequest === request.id && (
                      <div className="mt-3 pt-3 border-t border-gray-700/50">
                        <div className="flex justify-between text-xs mb-2">
                          <span className="text-gray-400">Full Date:</span>
                          <span className="text-gray-300">{request.requestDate}</span>
                        </div>
                        <button
                          onClick={() => handlePaymentSuccess(request.id)}
                          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded text-sm shadow transition-all duration-200 flex items-center justify-center gap-1 mt-2"
                        >
                          <CheckCircle className="w-4 h-4" /> Approve Payment
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Desktop View - Table */}
          <div className="hidden lg:block overflow-x-auto rounded-lg border border-gray-700/50 shadow">
            {pendingRequests.length === 0 ? (
              <div className="p-8 text-center text-gray-400 text-lg bg-gray-800/70">
                No pending withdrawal requests. Great job!
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-700/50">
                <thead className="bg-gray-700/50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Request ID
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      User
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Method
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Request Date
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800/70 divide-y divide-gray-700/50">
                  {pendingRequests.map((request) => (
                    <motion.tr
                      key={request.id}
                      className="hover:bg-gray-700/60 transition-colors duration-200"
                      variants={itemVariants}
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-blue-300">
                        {request.id}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                        {request.username} ({request.userId})
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-green-400 font-bold">
                        ${request.amount.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                        {request.method}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">
                        {request.requestDate}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        {renderStatusBadge(request.status)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <motion.button
                          onClick={() => handlePaymentSuccess(request.id)}
                          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded text-sm shadow transition-all duration-200 flex items-center justify-center gap-1"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <CheckCircle className="w-4 h-4" /> Approve
                        </motion.button>
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
          <p className="mb-1">Admin panel for CoinFlow platform. All actions are logged for auditing.</p>
          <p>&copy; {new Date().getFullYear()} CoinFlow. All rights reserved.</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminHome;