import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Clock, CreditCard, Wallet, Zap } from 'lucide-react';

const paymentHistory = [
  {
    id: 'TXN78901234',
    date: '2025-07-10 14:30',
    amount: 35.00,
    coins: 1000,
    status: 'Completed',
    method: 'Credit Card',
  },
  {
    id: 'TXN67890123',
    date: '2025-06-25 09:15',
    amount: 20.00,
    coins: 500,
    status: 'Completed',
    method: 'PayPal',
  },
  {
    id: 'TXN56789012',
    date: '2025-06-18 18:00',
    amount: 10.00,
    coins: 150,
    status: 'Completed',
    method: 'Stripe',
  },
  {
    id: 'TXN45678901',
    date: '2025-05-30 11:45',
    amount: 1.00,
    coins: 10,
    status: 'Completed',
    method: 'Credit Card',
  },
  {
    id: 'TXN34567890',
    date: '2025-05-15 16:20',
    amount: 20.00,
    coins: 500,
    status: 'Pending',
    method: 'PayPal',
  },
  {
    id: 'TXN23456789',
    date: '2025-04-01 10:00',
    amount: 1.00,
    coins: 10,
    status: 'Failed',
    method: 'Credit Card',
  },
];

const PaymentHistory = () => {
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
      case 'Completed':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-900/30 text-green-300 border border-green-700/50">
            <CheckCircle className="w-3 h-3 mr-1" /> Completed
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-900/30 text-yellow-300 border border-yellow-700/50">
            <Clock className="w-3 h-3 mr-1" /> Pending
          </span>
        );
      case 'Failed':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-900/30 text-red-300 border border-red-700/50">
            <XCircle className="w-3 h-3 mr-1" /> Failed
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

  const renderMethodIcon = (method) => {
    switch (method) {
      case 'Credit Card':
        return <CreditCard className="w-4 h-4 mr-1" />;
      case 'PayPal':
        return <Wallet className="w-4 h-4 mr-1" />;
      default:
        return <Zap className="w-4 h-4 mr-1" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-zinc-900 to-gray-950 p-4 sm:p-6 lg:p-8 flex items-center justify-center font-sans text-white">
      <motion.div
        className="w-full max-w-7xl mx-auto bg-gray-800/30 backdrop-blur-3xl rounded-xl lg:rounded-3xl shadow-xl lg:shadow-2xl border border-gray-700/60 p-4 sm:p-6 lg:p-8 overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="text-center mb-6 sm:mb-8 lg:mb-10" variants={itemVariants}>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 via-sky-400 to-teal-400 bg-clip-text text-transparent mb-2 sm:mb-3 lg:mb-4">
            Your Payment History
          </h1>
          <p className="text-gray-300 text-sm sm:text-base max-w-md sm:max-w-lg mx-auto">
            Overview of all your coin purchases and transactions
          </p>
        </motion.div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-3">
          {paymentHistory.map((payment) => (
            <motion.div
              key={payment.id}
              className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4"
              variants={itemVariants}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="text-xs text-gray-400">Transaction ID</div>
                  <div className="text-blue-300 font-medium text-sm">{payment.id}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400">Date</div>
                  <div className="text-gray-300 text-sm">{payment.date.split(' ')[0]}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div>
                  <div className="text-xs text-gray-400">Amount</div>
                  <div className="text-green-400 font-bold">${payment.amount.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Coins</div>
                  <div className="text-yellow-300 font-bold">{payment.coins}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Status</div>
                  <div className="mt-1">{renderStatusBadge(payment.status)}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Method</div>
                  <div className="flex items-center text-gray-300 text-sm mt-1">
                    {renderMethodIcon(payment.method)}
                    {payment.method}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop Table */}
        <motion.div className="hidden lg:block overflow-x-auto rounded-lg border border-gray-700/50 shadow" variants={itemVariants}>
          <table className="min-w-full divide-y divide-gray-700/50">
            <thead className="bg-gray-700/50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Date & Time
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Coins
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Method
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800/70 divide-y divide-gray-700/50">
              {paymentHistory.map((payment) => (
                <motion.tr
                  key={payment.id}
                  className="hover:bg-gray-700/60 transition-colors duration-200"
                  variants={itemVariants}
                >
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-blue-300">
                    {payment.id}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                    {payment.date}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-green-400 font-bold">
                    ${payment.amount.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-yellow-300 font-bold">
                    {payment.coins}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    {renderStatusBadge(payment.status)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                    <div className="flex items-center">
                      {renderMethodIcon(payment.method)}
                      {payment.method}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Empty State */}
        {paymentHistory.length === 0 && (
          <motion.div className="p-6 text-center text-gray-400" variants={itemVariants}>
            <div className="text-lg mb-2">No payment history found</div>
            <p className="text-sm">Your transactions will appear here once you make a purchase</p>
          </motion.div>
        )}

        {/* Footer */}
        <motion.div className="mt-8 lg:mt-12 text-center text-gray-500 text-xs sm:text-sm" variants={itemVariants}>
          <p className="mb-1">All transactions are securely processed and recorded</p>
          <p>&copy; {new Date().getFullYear()} CoinFlow. All rights reserved.</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PaymentHistory;