import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Wallet, Banknote, CreditCard } from 'lucide-react';
import toast from 'react-hot-toast'; // Ensure react-hot-toast is installed and <Toaster/> is in your app root

// --- Constants ---
const COINS_PER_DOLLAR = 20;
const MIN_WITHDRAW_COINS = 200; // Equivalent to $10

// --- Static Data for a specific worker ---
// In a real application, this would come from an API based on the logged-in worker's ID.
const workerCurrentBalance = {
    currentCoins: 350, // Example: user has 350 coins
};

// --- Payment Systems ---
const paymentSystems = ['Bkash', 'Rocket', 'Nagad', 'PayPal', 'Bank Transfer'];

// --- WorkerWithdrawals Component ---
const WorkerWithdrawals = () => {
    const [coinsToWithdraw, setCoinsToWithdraw] = useState('');
    const [withdrawAmountDollars, setWithdrawAmountDollars] = useState(0);
    const [selectedPaymentSystem, setSelectedPaymentSystem] = useState('');
    const [accountNumber, setAccountNumber] = useState('');

    const hasEnoughCoins = workerCurrentBalance.currentCoins >= MIN_WITHDRAW_COINS;
    const canWithdrawInput = coinsToWithdraw >= MIN_WITHDRAW_COINS && coinsToWithdraw <= workerCurrentBalance.currentCoins;

    useEffect(() => {
        if (coinsToWithdraw && coinsToWithdraw > 0) {
            setWithdrawAmountDollars(coinsToWithdraw / COINS_PER_DOLLAR);
        } else {
            setWithdrawAmountDollars(0);
        }
    }, [coinsToWithdraw]);

    const handleCoinsChange = (e) => {
        const value = e.target.value;
        // Allow empty string or numbers
        if (value === '' || /^\d+$/.test(value)) {
            const numValue = Number(value);
            // Ensure it's not negative
            if (numValue >= 0) {
                setCoinsToWithdraw(value);
            } else if (value === '') {
                setCoinsToWithdraw(''); // Allow clearing the input
            }
        }
    };

    const handleWithdrawalSubmit = (e) => {
        e.preventDefault();

        if (!coinsToWithdraw || Number(coinsToWithdraw) < MIN_WITHDRAW_COINS) {
            toast.error(`Minimum withdrawal is ${MIN_WITHDRAW_COINS} coins ($${MIN_WITHDRAW_COINS / COINS_PER_DOLLAR}).`, {
                duration: 4000,
                style: { background: '#dc3545', color: '#fff' }
            });
            return;
        }

        if (Number(coinsToWithdraw) > workerCurrentBalance.currentCoins) {
            toast.error('You cannot withdraw more coins than you have.', {
                duration: 4000,
                style: { background: '#dc3545', color: '#fff' }
            });
            return;
        }

        if (!selectedPaymentSystem) {
            toast.error('Please select a payment system.', {
                duration: 3000,
                style: { background: '#dc3545', color: '#fff' }
            });
            return;
        }

        if (!accountNumber.trim()) {
            toast.error('Please enter your account number.', {
                duration: 3000,
                style: { background: '#dc3545', color: '#fff' }
            });
            return;
        }

        // Simulate API call to process withdrawal
        toast.success(
            `Withdrawal request for ${coinsToWithdraw} coins ($${withdrawAmountDollars.toFixed(2)}) via ${selectedPaymentSystem} to ${accountNumber} submitted successfully!`,
            {
                duration: 5000,
                style: {
                    background: '#16a34a', // Tailwind green-600
                    color: '#fff',
                },
            }
        );

        // Reset form fields after successful submission (in a real app, you'd update currentCoins too)
        setCoinsToWithdraw('');
        setSelectedPaymentSystem('');
        setAccountNumber('');
        setWithdrawAmountDollars(0);
        // For static, we don't change workerCurrentBalance.currentCoins
        // In a real app: update workerCurrentBalance.currentCoins -= Number(coinsToWithdraw);
    };

    // Framer Motion variants
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

    return (
        <div className="min-h-screen p-4 md:p-8 flex items-start justify-center font-sans text-white">
            <motion.div
                className="max-w-xl mx-auto w-full bg-gray-800/30 backdrop-blur-3xl rounded-3xl shadow-2xl border border-gray-700/60 p-6 md:p-10 overflow-hidden"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Header */}
                <motion.div className="text-center mb-10" variants={itemVariants}>
                    <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-green-400 via-lime-400 to-yellow-500 bg-clip-text text-transparent tracking-tight leading-tight mb-4 drop-shadow-lg">
                        Withdraw Earnings
                    </h1>
                    <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                        Convert your earned coins into real money.
                    </p>
                </motion.div>

                {/* Current Balance */}
                <motion.div className="mb-8 p-6 bg-gray-700/40 rounded-xl shadow-lg border border-gray-600/70 flex flex-col items-center text-center" variants={itemVariants}>
                    <h2 className="text-2xl font-bold text-gray-200 mb-4">Your Current Balance</h2>
                    <div className="flex items-center justify-center gap-4 mb-3">
                        <Wallet className="w-8 h-8 text-yellow-400" />
                        <span className="text-4xl font-extrabold text-white">
                            {workerCurrentBalance.currentCoins.toLocaleString()} Coins
                        </span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <DollarSign className="w-6 h-6 text-green-400" />
                        <span className="text-2xl font-semibold text-green-300">
                            (Equivalent to ${((workerCurrentBalance.currentCoins / COINS_PER_DOLLAR)).toFixed(2)})
                        </span>
                    </div>
                    <p className="text-sm text-gray-400 mt-3">
                        Minimum withdrawal amount: {MIN_WITHDRAW_COINS} Coins (${(MIN_WITHDRAW_COINS / COINS_PER_DOLLAR).toFixed(2)})
                    </p>
                </motion.div>

                {/* Withdrawal Form */}
                <motion.div variants={itemVariants}>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-200 mb-6 text-center">Withdrawal Request</h2>
                    {!hasEnoughCoins && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-900/50 text-red-300 border border-red-700 p-4 rounded-lg mb-6 text-center text-lg font-semibold"
                        >
                            Insufficient Coins: You need at least {MIN_WITHDRAW_COINS} coins to withdraw.
                        </motion.div>
                    )}

                    <form onSubmit={handleWithdrawalSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="coinsToWithdraw" className="block text-sm font-medium text-gray-300 mb-2">
                                Coins To Withdraw (Min {MIN_WITHDRAW_COINS})
                            </label>
                            <input
                                type="text" // Use text to allow empty string for controlled component, validate as number
                                id="coinsToWithdraw"
                                value={coinsToWithdraw}
                                onChange={handleCoinsChange}
                                className="w-full p-3 rounded-lg bg-gray-700/60 border border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                                placeholder={`Enter coins (e.g., ${MIN_WITHDRAW_COINS})`}
                                disabled={!hasEnoughCoins}
                            />
                            {coinsToWithdraw > workerCurrentBalance.currentCoins && (
                                <p className="mt-2 text-red-400 text-sm">
                                    You only have {workerCurrentBalance.currentCoins} coins.
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="withdrawAmountDollars" className="block text-sm font-medium text-gray-300 mb-2">
                                Withdrawal Amount ($)
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="withdrawAmountDollars"
                                    value={withdrawAmountDollars.toFixed(2)}
                                    className="w-full p-3 rounded-lg bg-gray-700/60 border border-gray-600 text-white placeholder-gray-400 cursor-not-allowed"
                                    readOnly
                                    disabled={!hasEnoughCoins}
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <DollarSign className="w-5 h-5 text-green-400" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="paymentSystem" className="block text-sm font-medium text-gray-300 mb-2">
                                Select Payment System
                            </label>
                            <div className="relative">
                                <select
                                    id="paymentSystem"
                                    value={selectedPaymentSystem}
                                    onChange={(e) => setSelectedPaymentSystem(e.target.value)}
                                    className="block w-full py-3 px-3 pr-8 rounded-lg bg-gray-700 border border-gray-600 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none"
                                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1.5em 1.5em' }}
                                    disabled={!hasEnoughCoins}
                                >
                                    <option value="" className="bg-gray-800 text-gray-400">Select an option</option>
                                    {paymentSystems.map((system) => (
                                        <option key={system} value={system} className="bg-gray-800 text-white">
                                            {system}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                                    {selectedPaymentSystem === 'Bkash' && <Banknote className="w-4 h-4" />}
                                    {selectedPaymentSystem === 'Rocket' && <Banknote className="w-4 h-4" />}
                                    {selectedPaymentSystem === 'Nagad' && <Banknote className="w-4 h-4" />}
                                    {selectedPaymentSystem === 'PayPal' && <CreditCard className="w-4 h-4" />}
                                    {selectedPaymentSystem === 'Bank Transfer' && <Banknote className="w-4 h-4" />}
                                </div>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-300 mb-2">
                                Account Number
                            </label>
                            <input
                                type="text"
                                id="accountNumber"
                                value={accountNumber}
                                onChange={(e) => setAccountNumber(e.target.value)}
                                className="w-full p-3 rounded-lg bg-gray-700/60 border border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your account number"
                                disabled={!hasEnoughCoins}
                            />
                        </div>

                        {hasEnoughCoins ? (
                            <motion.button
                                type="submit"
                                className={`w-full py-3 px-6 rounded-lg text-lg font-semibold shadow-md transition-all duration-200 flex items-center justify-center gap-2 ${
                                    canWithdrawInput && selectedPaymentSystem && accountNumber.trim()
                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                                        : 'bg-gray-600 text-gray-400 cursor-not-allowed opacity-70'
                                }`}
                                whileHover={canWithdrawInput && selectedPaymentSystem && accountNumber.trim() ? { scale: 1.02 } : {}}
                                whileTap={canWithdrawInput && selectedPaymentSystem && accountNumber.trim() ? { scale: 0.98 } : {}}
                                disabled={!canWithdrawInput || !selectedPaymentSystem || !accountNumber.trim()}
                            >
                                <Banknote className="w-5 h-5" /> Withdraw Now
                            </motion.button>
                        ) : null}
                    </form>
                </motion.div>

                {/* Footer */}
                <motion.div className="mt-12 text-center text-gray-500 text-sm md:text-base" variants={itemVariants}>
                    <p className="mb-2">Your earnings, your control. Withdraw securely.</p>
                    <p>&copy; {new Date().getFullYear()} CoinFlow. All rights reserved.</p>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default WorkerWithdrawals;