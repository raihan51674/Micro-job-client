// src/PurchaseCoinComponent.jsx
import React, { useContext, useState, useEffect } from 'react';
import { Sparkles, DollarSign, Gift, Rocket, Star, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

import PaymentModal from '../../../Component/PaymentModal/PaymentModal';
import { AuthContext } from '../../../Provider/AuthProvider';
import { useLoaderData } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios';
import useUserCoins from '../../../Hooks/useUserCoins';

const PurchaseCoinComponent = () => {

    const QueryClient = useQueryClient()

    const { user, loading: authLoading } = useContext(AuthContext);
    const [selectedPackageId, setSelectedPackageId] = useState(null);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalPackageDetails, setModalPackageDetails] = useState(null);

    // Get data from useLoaderData()
    const loaderData = useLoaderData();
    const initialCoinPackages = loaderData.data; // Data from the loader

    const [coinPackages, setCoinPackages] = useState([]); // New state to store fetched data

    const { coins, isLoading, refetch } = useUserCoins();
    // Use useEffect to add icons and gradients after receiving loader data
    useEffect(() => {
        if (initialCoinPackages && initialCoinPackages.length > 0) {
            const packagesWithIconsAndGradients = initialCoinPackages.map(pkg => {
                let iconComponent;
                let gradientClass;

                // Assign icons/gradients based on pkg.id.
                // This is a good approach if these properties are not in your JSON data.
                switch (pkg.id) {
                    case 'trial':
                        iconComponent = <Sparkles className="w-8 h-8 text-blue-400" />;
                        gradientClass = 'from-gray-600 to-gray-700';
                        break;
                    case 'starter':
                        iconComponent = <Gift className="w-8 h-8 text-purple-400" />;
                        gradientClass = 'from-indigo-600 to-indigo-700';
                        break;
                    case 'pro':
                        iconComponent = <Rocket className="w-8 h-8 text-orange-400" />;
                        gradientClass = 'from-orange-600 to-orange-700';
                        break;
                    case 'premium':
                        iconComponent = <Star className="w-8 h-8 text-yellow-400" />;
                        gradientClass = 'from-yellow-600 to-yellow-700';
                        break;
                    default:
                        iconComponent = <DollarSign className="w-8 h-8 text-gray-400" />;
                        gradientClass = 'from-gray-500 to-gray-600'; // Default gradient
                }
                return { ...pkg, icon: iconComponent, gradient: gradientClass };
            });
            setCoinPackages(packagesWithIconsAndGradients);
        }
    }, [initialCoinPackages]); // This will re-run when initialCoinPackages changes

    const openPaymentModal = (pkg) => {
        setModalPackageDetails(pkg);
        setIsModalOpen(true);
    };

    const closePaymentModal = () => {
        setIsModalOpen(false);
        setModalPackageDetails(null);
        setIsProcessingPayment(false);
    };


    
    const mutationKey = ['posts']

    
    // Some mutation that we want to get the state for
    const mutation = useMutation({
        mutationKey,
        mutationFn: (purchaseDataToSave) => {
            return axios.post(`${import.meta.env.VITE_API_URL}/save-purchase`, purchaseDataToSave, {withCredentials: true})
        },
        onSuccess: () => {
            QueryClient.invalidateQueries({ queryKey: ['coins'] })
            refetch()
        }
        
    })

    // This function will now receive the actual payment result from CheckoutForm
    const handleConfirmPurchase = async (packageToPurchase, transactionId, error) => {
        setIsProcessingPayment(false); // Stop processing indication

        if (error) {
            toast.error(error.message || "Payment failed. Please try again.", { id: 'payment-toast' });
            // You might want to keep the modal open to let the user try again
            // Or close it if it's a critical error
            // closePaymentModal(); // Uncomment to close modal on error
            return;
        }

        if (transactionId) {
            // Payment was successful, now save the purchase data to your backend
            if (!user || !user.email) {
                toast.error("User not logged in or email not available. Purchase recorded but user coin balance might not update.", { id: 'payment-toast' });
                closePaymentModal();
                return;
            }

            const purchaseDataToSave = {
                userName: user.displayName,
                userEmail: user.email,
                userImage: user.photoURL,
                packageId: packageToPurchase.id,
                coinsPurchased: packageToPurchase.coins,
                pricePaid: packageToPurchase.price,
                transactionId: transactionId,
                purchaseDate: new Date().toISOString(),
                status: 'succeeded',
            };

            // Here you would typically make an API call to your backend

            mutation.mutate(purchaseDataToSave)


        } else {
            toast.error("Payment could not be confirmed.", { id: 'payment-toast' });
        }

        setSelectedPackageId(null);
        closePaymentModal();
    };

    const calculateSavings = (pkg) => {
        const baseRate = 10;
        const totalCoins = pkg.coins;
        const expectedPrice = totalCoins / baseRate;
        const savings = expectedPrice - pkg.price;
        return savings > 0 ? savings : 0;
    };

    const calculateSavingsPercentage = (pkg) => {
        const savings = calculateSavings(pkg);
        if (savings === 0 || pkg.price === 0) return 0;
        return (savings / pkg.price) * 100;
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
                        {user && !authLoading && (
                            <p className="text-gray-300 text-xl font-semibold mt-4 flex items-center justify-center">
                                <span className="mr-2">Your Current Coins:</span>
                                <span className="text-yellow-300 flex items-center">
                                    <DollarSign className="w-6 h-6 mr-1" />
                                    {coins !== undefined ? coins : 'Loading...'}
                                </span>
                            </p>
                        )}
                    </div>

                    {/* Value comparison */}
                    <div className="bg-gray-700/30 rounded-xl p-4 mb-10 border border-gray-600/50 max-w-2xl mx-auto">
                        <div className="flex flex-wrap items-center justify-center space-x-0 sm:space-x-4 space-y-2 sm:space-y-0 text-sm text-gray-300">
                            <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                                <span>
                                    Best value: {coinPackages.length > 0 ? (
                                        (() => {
                                            const maxCoins = Math.max(...coinPackages.map(p => p.coins + p.bonus));
                                            const bestValuePkg = coinPackages.find(p => (p.coins + p.bonus) === maxCoins);
                                            return `${bestValuePkg.coins + bestValuePkg.bonus} coins for $${bestValuePkg.price}`;
                                        })()
                                    ) : '...'}
                                </span>
                            </div>
                            <div className="hidden sm:block h-4 w-px bg-gray-500"></div>
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
                                {/* Bonus Badge */}
                                {pkg.bonus > 0 && (
                                    <div className="absolute -top-3 right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10 animate-bounce-slow">
                                        +{pkg.bonus} Bonus!
                                    </div>
                                )}

                                <div className="mb-4 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
                                    {pkg.icon}
                                </div>

                                <h3 className="text-xl font-bold text-white mb-2 text-center">{pkg.name}</h3>

                                {/* Coin amount with visual indicator */}
                                <div className="relative w-full mb-4">
                                    <div className="h-2 bg-black/20 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-white/50 rounded-full"
                                            style={{ width: `${Math.min(100, ((pkg.coins + pkg.bonus) / 1000) * 100)}%` }}
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
                                    {calculateSavings(pkg) > 0 && (
                                        <div className="text-xs text-green-300 bg-green-900/30 px-2 py-1 rounded mt-1">
                                            Save ${calculateSavings(pkg).toFixed(2)} ({calculateSavingsPercentage(pkg).toFixed(0)}%)
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
                                            if (selectedPackageId === pkg.id) {
                                                openPaymentModal(pkg);
                                            } else {
                                                setSelectedPackageId(pkg.id);
                                            }
                                        }}
                                        disabled={isProcessingPayment}
                                        className={`w-full py-2.5 rounded-lg font-bold transition-all duration-300 relative overflow-hidden text-sm
                                                ${selectedPackageId === pkg.id
                                                ? 'bg-white text-gray-900 hover:bg-gray-100'
                                                : 'bg-white/10 text-white hover:bg-white/20'
                                            }
                                                ${isProcessingPayment ? 'opacity-70 cursor-not-allowed' : ''}
                                            `}
                                    >
                                        {selectedPackageId === pkg.id ? 'Proceed to Payment' : 'Select Package'}
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            <PaymentModal
                isOpen={isModalOpen}
                onClose={closePaymentModal}
                packageDetails={modalPackageDetails}
                onConfirmPurchase={handleConfirmPurchase}
                isProcessing={isProcessingPayment}
            />
        </div>
    );
};

export default PurchaseCoinComponent;