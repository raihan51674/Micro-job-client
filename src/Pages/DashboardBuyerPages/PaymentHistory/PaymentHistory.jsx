import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Clock, CreditCard, Wallet, Zap, Loader2 } from 'lucide-react'; // Added Loader2 for loading icon
import useUserTransactions from '../../../Hooks/useUserTransactions';

const PaymentHistory = () => {
    const { transactions, isLoading, error } = useUserTransactions();

    // Helper function to format date
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        };
        return new Date(dateString).toLocaleString('en-US', options);
    };

    // Prepare payment history data
    // Use optional chaining (?.) and default values to prevent errors if data is missing
    const paymentHistory = transactions?.map(tx => ({
        id: tx.transactionId || 'N/A',
        date: formatDate(tx.purchaseDate),
        amount: parseFloat(tx.pricePaid || 0), 
        coins: parseInt(tx.coinsPurchased || 0), 
        status: tx.status === 'succeeded' ? 'Completed' : (tx.status || 'Unknown'), 
        method: tx.paymentMethod || 'Stripe', 
    })) || []; 

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
        // Use a consistent class structure for better reusability
        const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border";

        switch (status) {
            case 'Completed':
                return (
                    <span className={`${baseClasses} bg-green-900/30 text-green-300 border-green-700/50`}>
                        <CheckCircle className="w-3.5 h-3.5 mr-1" /> Completed
                    </span>
                );
            case 'Pending':
                return (
                    <span className={`${baseClasses} bg-yellow-900/30 text-yellow-300 border-yellow-700/50`}>
                        <Clock className="w-3.5 h-3.5 mr-1" /> Pending
                    </span>
                );
            case 'Failed':
                return (
                    <span className={`${baseClasses} bg-red-900/30 text-red-300 border-red-700/50`}>
                        <XCircle className="w-3.5 h-3.5 mr-1" /> Failed
                    </span>
                );
            default:
                return (
                    <span className={`${baseClasses} bg-gray-700/30 text-gray-300 border-gray-600/50`}>
                        <Zap className="w-3.5 h-3.5 mr-1" /> {status}
                    </span>
                );
        }
    };

    const renderMethodIcon = (method) => {
        if (method.toLowerCase().includes('stripe')) {
            return <CreditCard className="w-4 h-4 mr-1 text-blue-400" />;
        }
        if (method.toLowerCase().includes('paypal')) {
            return <Wallet className="w-4 h-4 mr-1 text-indigo-400" />;
        }
        // Default icon if method is unknown
        return <Zap className="w-4 h-4 mr-1 text-gray-400" />;
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

                {/* Loading State */}
                {isLoading && (
                    <motion.div
                        className="flex flex-col items-center justify-center py-12 text-blue-400"
                        variants={itemVariants}
                    >
                        <Loader2 className="w-10 h-10 animate-spin mb-4" />
                        <p className="text-lg font-medium">Loading transactions...</p>
                        <p className="text-sm text-gray-400">This might take a moment.</p>
                    </motion.div>
                )}

                {/* Error State */}
                {error && (
                    <motion.div
                        className="flex flex-col items-center justify-center py-12 text-red-400"
                        variants={itemVariants}
                    >
                        <XCircle className="w-10 h-10 mb-4" />
                        <p className="text-lg font-medium">Failed to load payment history</p>
                        <p className="text-sm text-gray-400">{error.message || 'Please try again later.'}</p>
                    </motion.div>
                )}

                {/* No Transactions State */}
                {!isLoading && !error && paymentHistory.length === 0 && (
                    <motion.div
                        className="p-6 text-center text-gray-400 bg-gray-800/50 border border-gray-700/50 rounded-lg shadow-inner flex flex-col items-center justify-center"
                        variants={itemVariants}
                    >
                        <Wallet className="w-16 h-16 mb-4 text-gray-500/80" />
                        <div className="text-lg mb-2 font-semibold text-gray-300">No transactions yet!</div>
                        <p className="text-sm">It looks like you haven't made any coin purchases.</p>
                        <p className="text-sm">Your transaction history will appear here once you buy some coins.</p>
                    </motion.div>
                )}

                {/* Mobile Cards (Conditional rendering based on data availability) */}
                {!isLoading && !error && paymentHistory.length > 0 && (
                    <div className="lg:hidden space-y-4"> {/* Increased spacing */}
                        {paymentHistory.map((payment) => (
                            <motion.div
                                key={payment.id}
                                className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-5 shadow-lg" // Increased padding, added shadow
                                variants={itemVariants}
                            >
                                <div className="flex justify-between items-start mb-3 border-b border-gray-700/50 pb-3"> {/* Added bottom border */}
                                    <div>
                                        <div className="text-xs text-gray-400 mb-1">Transaction ID</div>
                                        <div className="text-blue-300 font-semibold text-sm break-all">{payment.id}</div> {/* break-all for long IDs */}
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs text-gray-400 mb-1">Date & Time</div>
                                        <div className="text-gray-300 text-sm">{payment.date}</div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-y-4 gap-x-2 mt-4"> {/* Adjusted gaps */}
                                    <div>
                                        <div className="text-xs text-gray-400 mb-1">Amount</div>
                                        <div className="text-green-400 font-bold text-lg">${payment.amount.toFixed(2)}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-400 mb-1">Coins</div>
                                        <div className="text-yellow-300 font-bold text-lg">{payment.coins}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-400 mb-1">Status</div>
                                        <div className="mt-1">{renderStatusBadge(payment.status)}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-400 mb-1">Method</div>
                                        <div className="flex items-center text-gray-300 text-sm mt-1">
                                            {renderMethodIcon(payment.method)}
                                            {payment.method}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Desktop Table (Conditional rendering based on data availability) */}
                {!isLoading && !error && paymentHistory.length > 0 && (
                    <motion.div className="hidden lg:block overflow-hidden rounded-lg border border-gray-700/50 shadow-lg" variants={itemVariants}>
                        <table className="min-w-full divide-y divide-gray-700/50">
                            <thead className="bg-gray-700/50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Transaction ID
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Date & Time
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Amount
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Coins
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
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
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-300">
                                            {payment.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                            {payment.date}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-400 font-bold">
                                            ${payment.amount.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-300 font-bold">
                                            {payment.coins}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            {renderStatusBadge(payment.status)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
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