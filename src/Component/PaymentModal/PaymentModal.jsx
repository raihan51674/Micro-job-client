// src/components/PaymentModal/PaymentModal.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../CheckOutForm/CheckOutForm'; // Adjust path as per your project structure

// Set your Stripe public key here
const stripePromise = loadStripe(`${import.meta.env.VITE_STRIPE_PK_KEY}`);

// Styles for CardElement
const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            fontSize: '18px', // Increased font size for better readability
            color: '#e2e8f0', // Light text color for dark background
            '::placeholder': {
                color: '#718096', // Softer placeholder color
            },
            padding: '12px 18px', // Explicit padding for CardElement
            '--webkit-font-smoothing': 'antialiased',
        },
        invalid: {
            color: '#fc8181', // Soft red for invalid input
            iconColor: '#fc8181',
        },
    },
    hidePostalCode: true, // Optionally hide postal code field
};

const PaymentModal = ({ isOpen, onClose, packageDetails, onConfirmPurchase, isProcessing }) => {

    if (!isOpen || !packageDetails) return null; // Ensure packageDetails are available

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50"
                    onClick={onClose} // Close modal when clicking outside
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 50 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 50 }}
                        transition={{ duration: 0.3 }}
                        className="bg-gray-800 rounded-lg p-6 md:p-8 max-w-md w-full shadow-lg relative"
                        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
                            aria-label="Close modal"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <h3 className="text-2xl font-bold text-white mb-4 text-center">
                            Confirm Purchase: {packageDetails.name}
                        </h3>
                        <p className="text-gray-300 text-center mb-6">
                            You are about to purchase **<span className="text-yellow-400">{packageDetails.coins} Coins</span>** for **<span className="text-green-400">${packageDetails.price}</span>**.
                        </p>

                        <div className="space-y-4">
                            <div className="p-4 bg-gray-700 rounded-md border border-gray-600 text-white text-center">

                                {/* Stripe Payment system */}
                                <Elements stripe={stripePromise}>
                                    <CheckoutForm
                                        key={packageDetails?.id || 'checkout-form'}
                                        packageDetails={packageDetails}
                                        onConfirmPurchase={onConfirmPurchase}
                                        isProcessing={isProcessing}
                                        cardElementOptions={CARD_ELEMENT_OPTIONS}
                                    />
                                </Elements>

                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PaymentModal;