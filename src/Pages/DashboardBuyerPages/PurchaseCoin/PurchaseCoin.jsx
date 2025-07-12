import React, { useState } from 'react';
import { Sparkles, DollarSign, Wallet, Gem, BadgeCheck, Zap, Shield, Gift, Rocket, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const coinPackages = [
    {
        id: 'trial',
        name: 'Trial Pack',
        coins: 10,
        price: 1,
        bonus: 0,
        features: [
            'Instant Delivery',
            'Test basic features',
            'No commitment',
            '24-hour support'
        ],
        icon: <Sparkles className="w-8 h-8 text-blue-400" />,
        gradient: 'from-gray-600 to-gray-700',
        popular: false,
        bestValue: false
    },
    {
        id: 'starter',
        name: 'Starter Pack',
        coins: 150,
        price: 10,
        bonus: 0,
        features: [
            'Great for beginners',
            'Access to all basic tasks',
            'Email support',
            '7-day satisfaction'
        ],
        icon: <Gift className="w-8 h-8 text-purple-400" />,
        gradient: 'from-indigo-600 to-indigo-700',
        popular: false,
        bestValue: false
    },
    {
        id: 'pro',
        name: 'Pro Bundle',
        coins: 500,
        price: 20,
        bonus: 50,
        features: [
            '50 Bonus Coins',
            'Priority task access',
            '24/7 chat support',
            'Weekly rewards',
            'Best value!'
        ],
        icon: <Rocket className="w-8 h-8 text-orange-400" />,
        gradient: 'from-orange-600 to-orange-700',
        popular: true,
        bestValue: true
    },
    {
        id: 'premium',
        name: 'Premium',
        coins: 1000,
        price: 35,
        bonus: 100,
        features: [
            '100 Bonus Coins',
            'Exclusive premium tasks',
            'Dedicated manager',
            'VIP support channel',
            'Early feature access'
        ],
        icon: <Star className="w-8 h-8 text-yellow-400" />,
        gradient: 'from-yellow-600 to-yellow-700',
        popular: false,
        bestValue: false
    },
];

const PurchaseCoinComponent = () => {
    const [selectedPackageId, setSelectedPackageId] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePurchase = () => {
        setIsProcessing(true);

        // Simulate payment processing
        toast.success("Payment Successfull")
    };

    const calculateSavings = (pkg) => {
        const baseRate = 10; // 10 coins per $1
        const expectedPrice = pkg.coins / baseRate;
        return expectedPrice - pkg.price;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 md:p-8 flex items-center justify-center">
            <div className="max-w-7xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/50 p-6 md:p-10 overflow-hidden relative"
                >
                    {/* Decorative elements */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500"></div>
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl"></div>
                    <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-500/10 rounded-full filter blur-3xl"></div>

                    {/* Header */}
                    <div className="text-center mb-12 relative z-10">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="inline-block mb-6"
                        >
                            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-full shadow-lg">
                                <DollarSign className="w-12 h-12 text-gray-900" />
                            </div>
                        </motion.div>

                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                                Boost Your Coin Balance
                            </span>
                        </h1>
                        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                            Get more coins to unlock premium features and accelerate your progress. Better value with larger packages!
                        </p>
                    </div>

                    {/* Value comparison */}
                    <div className="bg-gray-700/30 rounded-xl p-4 mb-10 border border-gray-600/50 max-w-2xl mx-auto">
                        <div className="flex items-center justify-center space-x-4 text-sm text-gray-300">
                            <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                                <span>Best value: 500 coins for $20</span>
                            </div>
                            <div className="h-4 w-px bg-gray-500"></div>
                            <div className="flex items-center">
                                <Shield className="w-4 h-4 text-green-400 mr-2" />
                                <span>Secure payments</span>
                            </div>
                        </div>
                    </div>

                    {/* Coin Packages Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                        {coinPackages.map((pkg) => (
                            <motion.div
                                key={pkg.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: pkg.popular ? 0.2 : 0 }}
                                className={`relative flex flex-col items-center p-6 md:p-6 rounded-2xl shadow-xl border-2 
                                bg-gradient-to-br ${pkg.gradient}
                                ${selectedPackageId === pkg.id ? 'border-yellow-400 scale-[1.02] shadow-lg' : 'border-transparent hover:border-white/20'} 
                                transition-all duration-300 transform cursor-pointer
                                `}
                                whileHover={{ y: -5 }}
                                onClick={() => setSelectedPackageId(pkg.id)}
                            >


                                <div className="mb-4 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
                                    {pkg.icon}
                                </div>

                                <h3 className="text-xl font-bold text-white mb-2 text-center">{pkg.name}</h3>

                                {/* Coin amount with visual indicator */}
                                <div className="relative w-full mb-4">
                                    <div className="h-2 bg-black/20 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-white/50 rounded-full"
                                            style={{ width: `${Math.min(100, (pkg.coins / 1000) * 100)}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-gray-200 text-sm mt-2 text-center">
                                        <span className="font-extrabold text-white">{pkg.coins + pkg.bonus} Coins</span> Total
                                    </p>
                                </div>

                                {/* Price with savings */}
                                <div className="flex flex-col items-center mb-4">
                                    <div className="flex items-baseline">
                                        <span className="text-3xl font-extrabold text-white">${pkg.price}</span>
                                        <span className="text-gray-200 text-sm ml-1">USD</span>
                                    </div>
                                    {pkg.price < (pkg.coins / 10) && (
                                        <div className="text-xs text-green-300 bg-green-900/30 px-2 py-1 rounded mt-1">
                                            Save ${calculateSavings(pkg).toFixed(2)} ({(calculateSavings(pkg) / pkg.price * 100).toFixed(0)}%)
                                        </div>
                                    )}
                                </div>

                                <div className="mt-auto w-full">
                                    <AnimatePresence>
                                        {selectedPackageId === pkg.id && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="mb-3"
                                            >
                                                <div className="bg-black/20 p-2 rounded-lg text-center">
                                                    <p className="text-xs text-white font-medium">
                                                        <span className="text-yellow-300">${pkg.price}</span> • {pkg.coins + pkg.bonus} Coins
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handlePurchase(pkg);
                                        }}
                                        disabled={isProcessing}
                                        className={`w-full py-2.5 rounded-lg font-bold transition-all duration-300 relative overflow-hidden text-sm
                                            ${selectedPackageId === pkg.id
                                                ? 'bg-white text-gray-900 hover:bg-gray-100'
                                                : 'bg-white/10 text-white hover:bg-white/20'
                                            }
                                            ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}
                                        `}
                                    >
                                        {isProcessing && selectedPackageId === pkg.id ? (
                                            <span className="flex items-center justify-center">
                                                <svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Processing...
                                            </span>
                                        ) : (
                                            selectedPackageId === pkg.id ? 'Confirm Purchase' : 'Select Package'
                                        )}
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PurchaseCoinComponent;