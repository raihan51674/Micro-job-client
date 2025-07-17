import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Wallet, Banknote, CreditCard } from 'lucide-react';
import toast from 'react-hot-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { AuthContext } from '../../../Provider/AuthProvider';

// --- Constants ---
const COINS_PER_DOLLAR = 20;
const MIN_WITHDRAW_COINS = 200; // Equivalent to $10

// --- Payment Systems ---
const paymentSystems = ['Bkash', 'Rocket', 'Nagad', 'PayPal', 'Bank Transfer'];

// --- WorkerWithdrawals Component ---
const WorkerWithdrawals = () => {
    const queryClient = useQueryClient();

    

    const {user} = useContext(AuthContext)

    const email = user?.email;
    const name = user?.displayName;


    const [coinsToWithdraw, setCoinsToWithdraw] = useState('');
    const [withdrawAmountDollars, setWithdrawAmountDollars] = useState(0);
    const [selectedPaymentSystem, setSelectedPaymentSystem] = useState('');
    const [accountNumber, setAccountNumber] = useState('');

    // --- Fetch Worker Balance using TanStack Query ---
    const { data: workerBalance = { currentCoins: 0 }, isLoading, isError } = useQuery({
        queryKey: ['workerBalance', email], // Query key includes email for uniqueness
        queryFn: async () => {
            if (!email) {
                // If no logged-in user email, prevent query from running
                throw new Error("Worker email not available for fetching balance.");
            }
            
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/worker/balance?email=${email}`);
            return res.data;
        },
        enabled: !!email, // Only run if worker email is available
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });

    const currentCoins = workerBalance.currentCoins;
    const hasEnoughCoins = currentCoins >= MIN_WITHDRAW_COINS;
    const canWithdrawInput = Number(coinsToWithdraw) >= MIN_WITHDRAW_COINS && Number(coinsToWithdraw) <= currentCoins;

    useEffect(() => {
        if (coinsToWithdraw && Number(coinsToWithdraw) > 0) {
            setWithdrawAmountDollars(Number(coinsToWithdraw) / COINS_PER_DOLLAR);
        } else {
            setWithdrawAmountDollars(0);
        }
    }, [coinsToWithdraw]);

    const handleCoinsChange = (e) => {
        const value = e.target.value;
        if (value === '' || /^\d+$/.test(value)) {
            const numValue = Number(value);
            if (numValue >= 0 && numValue <= currentCoins) {
                setCoinsToWithdraw(value);
            } else if (value === '') {
                setCoinsToWithdraw('');
            }
        }
    };

    // --- Withdraw Mutation using TanStack Query ---
    const withdrawMutation = useMutation({
        mutationFn: async (withdrawalData) => {
            // JWT ছাড়া, সরাসরি ডেটা পাঠান
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/worker/withdraw`, withdrawalData);
            return res.data;
        },
        onSuccess: (data) => {
            toast.success('Withdrawal request submitted successfully!', {
                duration: 5000,
                style: { background: '#16a34a', color: '#fff' },
            });
            queryClient.invalidateQueries(['workerBalance']);
            setCoinsToWithdraw('');
            setSelectedPaymentSystem('');
            setAccountNumber('');
            setWithdrawAmountDollars(0);
        },
        onError: (error) => {
            console.error("Withdrawal error:", error);
            const errorMessage = error.response?.data?.message || 'Failed to submit withdrawal request.';
            toast.error(errorMessage, {
                duration: 5000,
                style: { background: '#dc3545', color: '#fff' },
            });
        },
    });


    const handleWithdrawalSubmit = (e) => {
        e.preventDefault();

        const withdrawalCoins = Number(coinsToWithdraw);

        if (!withdrawalCoins || withdrawalCoins < MIN_WITHDRAW_COINS) {
            toast.error(`Minimum withdrawal is ${MIN_WITHDRAW_COINS} coins ($${MIN_WITHDRAW_COINS / COINS_PER_DOLLAR}).`, {
                duration: 4000,
                style: { background: '#dc3545', color: '#fff' }
            });
            return;
        }

        if (withdrawalCoins > currentCoins) {
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

        
        const dataToSubmit = {
            worker_email: email,
            worker_name: name,  
            withdrawal_coin: withdrawalCoins,
            withdrawal_amount: withdrawAmountDollars,
            payment_system: selectedPaymentSystem,
            accountNumber: accountNumber,
        };

        withdrawMutation.mutate(dataToSubmit); // Trigger the mutation
    };

    
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

    if (isLoading) {
        return (
            <div className="min-h-screen p-4 md:p-8 flex items-center justify-center font-sans text-white">
                <div className="text-gray-400 text-lg">Loading balance...</div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen p-4 md:p-8 flex items-center justify-center font-sans text-white">
                <div className="text-red-400 text-lg">Error loading balance. Please try again.</div>
            </div>
        );
    }

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
                            {currentCoins.toLocaleString()} Coins
                        </span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <DollarSign className="w-6 h-6 text-green-400" />
                        <span className="text-2xl font-semibold text-green-300">
                            (Equivalent to ${((currentCoins / COINS_PER_DOLLAR)).toFixed(2)})
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
                                type="text"
                                id="coinsToWithdraw"
                                value={coinsToWithdraw}
                                onChange={handleCoinsChange}
                                className="w-full p-3 rounded-lg bg-gray-700/60 border border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                                placeholder={`Enter coins (e.g., ${MIN_WITHDRAW_COINS})`}
                                disabled={!hasEnoughCoins}
                            />
                            {Number(coinsToWithdraw) > currentCoins && (
                                <p className="mt-2 text-red-400 text-sm">
                                    You only have {currentCoins} coins.
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
                                disabled={!canWithdrawInput || !selectedPaymentSystem || !accountNumber.trim() || withdrawMutation.isLoading}
                            >
                                {withdrawMutation.isLoading ? 'Processing...' : <><Banknote className="w-5 h-5" /> Withdraw Now</>}
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