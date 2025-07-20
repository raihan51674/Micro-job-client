import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, ShoppingCart, DollarSign, Wallet, CheckCircle, Clock, ChevronDown, ChevronUp, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';



const AdminHome = () => {
  // ... (keep all your existing state and effect hooks)
   const [dashboardMetrics, setDashboardMetrics] = useState({
    totalWorkers: 0,
    totalBuyers: 0,
    totalAvailableCoins: 0,
    totalPayments: 0,
    totalPendingWithdrawals: 0,
    totalPendingSubmissions: 0,
  });
  const [withdrawRequests, setWithdrawRequests] = useState([]);
  const [expandedRequest, setExpandedRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
    fetchWithdrawalRequests();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [
        usersRes,
        coinRes,
        purchasedCoinRes,
        withdrawalCountRes,
        submissionCountRes
      ] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/users-management`, {
          withCredentials: true
        }),
        axios.get(`${import.meta.env.VITE_API_URL}/admin/total-available-coins`, {
          withCredentials: true
        }),
        axios.get(`${import.meta.env.VITE_API_URL}/transactions-admin`, {withCredentials: true}),
        axios.get(`${import.meta.env.VITE_API_URL}/admin/total-pending-withdrawals`, {
          withCredentials: true
        }),
        axios.get(`${import.meta.env.VITE_API_URL}/admin/total-pending-submissions`, {
          withCredentials: true
        }),
      ]);

      const users = usersRes.data;
      const totalWorkers = users.filter(user => user.role === 'worker').length;
      const totalBuyers = users.filter(user => user.role === 'buyer').length;
      const totalAvailableCoins = coinRes.data.totalCoins;
      const totalPayments = purchasedCoinRes.data.length;

      setDashboardMetrics({
        totalWorkers,
        totalBuyers,
        totalAvailableCoins,
        totalPayments,
        totalPendingWithdrawals: withdrawalCountRes.data.count,
        totalPendingSubmissions: submissionCountRes.data.count,
      });

    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Failed to load dashboard metrics.");
      toast.error("Failed to load dashboard metrics.");
    } finally {
      setLoading(false);
    }
  };

  const fetchWithdrawalRequests = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/withdrawal-requests`, {
        withCredentials: true
      });
      setWithdrawRequests(response.data.map(req => ({
        id: req._id,
        userId: req.worker_id,
        username: req.worker_name,
        worker_email: req.worker_email,
        amount: req.withdrawal_amount,
        withdrawal_coin: req.withdrawal_coin,
        requestDate: new Date(req.withdraw_date).toLocaleString(),
        status: req.status,
        method: req.payment_system,
        accountNumber: req.account_number,
      })));
    } catch (err) {
      console.error("Error fetching withdrawal requests:", err);
      setError("Failed to load withdrawal requests.");
      toast.error("Failed to load withdrawal requests.");
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async (id) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/admin/approve-withdrawal/${id}`,{}, {
        withCredentials: true
      });
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
      fetchDashboardData();
    } catch (err) {
      console.error("Error approving withdrawal:", err);
      toast.error(`Failed to approve withdrawal ${id}.`);
    }
  };

  const handlePaymentReject = async (id) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/admin/reject-withdrawal/${id}`,{}, {
        withCredentials: true
      });
      setWithdrawRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === id ? { ...request, status: 'Rejected' } : request
        )
      );
      toast.success(`Withdrawal ${id} rejected and coins refunded!`, {
        duration: 3000,
        style: {
          background: '#dc2626',
          color: '#fff',
        },
      });
      fetchDashboardData();
    } catch (err) {
      console.error("Error rejecting withdrawal:", err);
      toast.error(`Failed to reject withdrawal ${id}.`);
    }
  };

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
      case 'pending':
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

  const pendingRequests = withdrawRequests.filter(req => req.status === 'pending');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-xl">Loading dashboard data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-red-400">
        <p className="text-xl">{error}</p>
      </div>
    );
  }


  return (
    <div className="min-h-screen p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 flex items-start justify-center font-sans text-white bg-gray-900">
      <motion.div
        className="w-full max-w-[95vw] xl:max-w-7xl mx-auto bg-gray-800/30 backdrop-blur-xl rounded-lg md:rounded-xl lg:rounded-2xl shadow-lg border border-gray-700/60 p-3 sm:p-4 md:p-5 lg:p-6 overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="text-center mb-4 sm:mb-5 md:mb-6" variants={itemVariants}>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[2rem] font-bold bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent mb-1 sm:mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm md:text-[0.9rem] max-w-md mx-auto">
            Overview of system metrics and pending requests
          </p>
        </motion.div>

        {/* Dashboard Metrics */}
        <motion.div className="mb-5 sm:mb-6 md:mb-8" variants={itemVariants}>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-200 mb-3 sm:mb-4 text-center">System Metrics</h2>
          <div className="grid grid-cols-1 min-[400px]:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
            {/* Metric Cards - Adjusted for better responsive behavior */}
            {[
              {
                title: "Total Workers",
                value: dashboardMetrics.totalWorkers,
                icon: Users,
                color: "blue"
              },
              {
                title: "Total Buyers",
                value: dashboardMetrics.totalBuyers,
                icon: ShoppingCart,
                color: "purple"
              },
              {
                title: "Total Coins",
                value: dashboardMetrics.totalAvailableCoins,
                icon: Wallet,
                color: "yellow",
                suffix: "Coins"
              },
              {
                title: "Total Payments",
                value: dashboardMetrics.totalPayments,
                icon: DollarSign,
                color: "green"
              },
              {
                title: "Pending Withdrawals",
                value: dashboardMetrics.totalPendingWithdrawals,
                icon: Clock,
                color: "red"
              },
              {
                title: "Pending Submissions",
                value: dashboardMetrics.totalPendingSubmissions,
                icon: CheckCircle,
                color: "orange"
              }
            ].map((metric, index) => (
              <motion.div
                key={index}
                className={`bg-gray-700/40 p-3 sm:p-3 md:p-4 rounded-lg shadow border border-gray-600/70 flex flex-col items-center text-center group`}
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                variants={itemVariants}
              >
                <div className={`p-2 rounded-full bg-${metric.color}-600/30 text-${metric.color}-300 mb-2 group-hover:bg-${metric.color}-500/50 transition-colors`}>
                  <metric.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <p className="text-gray-300 text-[0.65rem] xs:text-xs sm:text-[0.75rem] md:text-sm uppercase tracking-wide">
                  {metric.title}
                </p>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mt-1">
                  {metric.value.toLocaleString()}{metric.suffix ? ` ${metric.suffix}` : ''}
                </h3>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Withdrawal Requests */}
        <motion.div variants={itemVariants}>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-200 mb-3 sm:mb-4 text-center">
            Pending Withdrawal Requests ({pendingRequests.length})
          </h2>

          {/* Mobile View - Cards */}
          <div className="block md:hidden space-y-3">
            {pendingRequests.length === 0 ? (
              <div className="p-4 sm:p-5 text-center text-gray-400 bg-gray-800/50 rounded-lg text-sm">
                No pending withdrawal requests.
              </div>
            ) : (
              pendingRequests.map((request) => (
                <motion.div
                  key={request.id}
                  className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-3 sm:p-4"
                  variants={itemVariants}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="text-xs text-gray-400">User</div>
                      <div className="text-blue-300 font-medium text-sm truncate max-w-[120px]">
                        {request.username}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-400">Amount</div>
                      <div className="text-green-400 font-bold text-sm">${request.amount.toFixed(2)}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-x-3 gap-y-2 mt-2 text-xs sm:text-sm">
                    <div>
                      <div className="text-gray-400">Coins</div>
                      <div className="text-gray-300">{request.withdrawal_coin}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Method</div>
                      <div className="text-gray-300 truncate">{request.method}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Account</div>
                      <div className="text-gray-300 truncate">{request.accountNumber}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Status</div>
                      <div className="mt-1">{renderStatusBadge(request.status)}</div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <button
                      onClick={() => setExpandedRequest(expandedRequest === request.id ? null : request.id)}
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
                      <div className="mt-2 pt-2 border-t border-gray-700/50 flex flex-col gap-2">
                        <div className="text-xs text-gray-300">
                          <span className="text-gray-400">Email:</span> {request.worker_email}
                        </div>
                        <div className="text-xs text-gray-300">
                          <span className="text-gray-400">Date:</span> {request.requestDate}
                        </div>
                        <div className="flex gap-2 mt-1">
                          <button
                            onClick={() => handlePaymentSuccess(request.id)}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-1.5 px-2 rounded text-xs shadow flex items-center justify-center gap-1"
                          >
                            <CheckCircle className="w-3 h-3" /> Approve
                          </button>
                          <button
                            onClick={() => handlePaymentReject(request.id)}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-1.5 px-2 rounded text-xs shadow flex items-center justify-center gap-1"
                          >
                            <XCircle className="w-3 h-3" /> Reject
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Tablet/Desktop View - Table */}
          <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-700/50 shadow">
            {pendingRequests.length === 0 ? (
              <div className="p-6 text-center text-gray-400 text-sm md:text-base bg-gray-800/70">
                No pending withdrawal requests.
              </div>
            ) : (
              <div className="min-w-[700px] lg:min-w-full">
                <table className="w-full divide-y divide-gray-700/50">
                  <thead className="bg-gray-700/50">
                    <tr>
                      <th scope="col" className="px-3 py-2 md:px-4 md:py-3 text-left text-xs md:text-sm font-medium text-gray-300 uppercase tracking-wider whitespace-nowrap">
                        Request ID
                      </th>
                      <th scope="col" className="px-3 py-2 md:px-4 md:py-3 text-left text-xs md:text-sm font-medium text-gray-300 uppercase tracking-wider whitespace-nowrap">
                        User
                      </th>
                      <th scope="col" className="px-3 py-2 md:px-4 md:py-3 text-left text-xs md:text-sm font-medium text-gray-300 uppercase tracking-wider whitespace-nowrap">
                        Amount
                      </th>
                      <th scope="col" className="px-3 py-2 md:px-4 md:py-3 text-left text-xs md:text-sm font-medium text-gray-300 uppercase tracking-wider whitespace-nowrap">
                        Coins
                      </th>
                      <th scope="col" className="px-3 py-2 md:px-4 md:py-3 text-left text-xs md:text-sm font-medium text-gray-300 uppercase tracking-wider whitespace-nowrap">
                        Method
                      </th>
                      <th scope="col" className="px-3 py-2 md:px-4 md:py-3 text-left text-xs md:text-sm font-medium text-gray-300 uppercase tracking-wider whitespace-nowrap">
                        Account
                      </th>
                      <th scope="col" className="px-3 py-2 md:px-4 md:py-3 text-left text-xs md:text-sm font-medium text-gray-300 uppercase tracking-wider whitespace-nowrap">
                        Status
                      </th>
                      <th scope="col" className="px-3 py-2 md:px-4 md:py-3 text-left text-xs md:text-sm font-medium text-gray-300 uppercase tracking-wider whitespace-nowrap">
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
                        <td className="px-3 py-2 md:px-4 md:py-3 whitespace-nowrap text-xs md:text-sm font-medium text-blue-300">
                          {request.id.substring(0, 8)}...
                        </td>
                        <td className="px-3 py-2 md:px-4 md:py-3 whitespace-nowrap">
                          <div className="text-xs md:text-sm text-gray-300 font-medium">{request.username}</div>
                          <div className="text-[0.65rem] md:text-xs text-gray-400 truncate max-w-[120px] md:max-w-[180px]">
                            {request.worker_email}
                          </div>
                        </td>
                        <td className="px-3 py-2 md:px-4 md:py-3 whitespace-nowrap text-xs md:text-sm text-green-400 font-bold">
                          ${request.amount.toFixed(2)}
                        </td>
                        <td className="px-3 py-2 md:px-4 md:py-3 whitespace-nowrap text-xs md:text-sm text-gray-300">
                          {request.withdrawal_coin}
                        </td>
                        <td className="px-3 py-2 md:px-4 md:py-3 whitespace-nowrap text-xs md:text-sm text-gray-300">
                          {request.method}
                        </td>
                        <td className="px-3 py-2 md:px-4 md:py-3 whitespace-nowrap text-xs md:text-sm text-gray-300">
                          {request.accountNumber}
                        </td>
                        <td className="px-3 py-2 md:px-4 md:py-3 whitespace-nowrap">
                          {renderStatusBadge(request.status)}
                        </td>
                        <td className="px-3 py-2 md:px-4 md:py-3 whitespace-nowrap">
                          <div className="flex gap-1 md:gap-2">
                            <motion.button
                              onClick={() => handlePaymentSuccess(request.id)}
                              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-1 md:py-2 px-2 md:px-3 rounded text-xs md:text-sm shadow transition-all duration-200 flex items-center justify-center gap-1 cursor-pointer"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <CheckCircle className="w-3 h-3 md:w-4 md:h-4" />
                              <span className="hidden sm:inline"></span>
                            </motion.button>
                            <motion.button
                              onClick={() => handlePaymentReject(request.id)}
                              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 md:py-2 px-2 md:px-3 rounded text-xs md:text-sm shadow transition-all duration-200 flex items-center justify-center gap-1 cursor-pointer"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <XCircle className="w-3 h-3 md:w-4 md:h-4" />
                              <span className="hidden sm:inline"></span>
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div className="mt-5 sm:mt-6 md:mt-8 text-center text-gray-500 text-xs sm:text-sm" variants={itemVariants}>
          <p className="mb-1">Admin panel for CoinFlow platform. All actions are logged for auditing.</p>
          <p>&copy; {new Date().getFullYear()} CoinFlow. All rights reserved.</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminHome;