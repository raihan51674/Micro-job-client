// src/components/CheckOutForm/CheckOutForm.jsx
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./common.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider";
import toast from "react-hot-toast";

// Props received: packageDetails, onConfirmPurchase, isProcessing, cardElementOptions
const CheckoutForm = ({ packageDetails, onConfirmPurchase, isProcessing, cardElementOptions }) => {
    const { user } = useContext(AuthContext);

    const stripe = useStripe();
    const elements = useElements();

    const [cardError, setCardError] = useState(null);
    const [clientSecret, setClientSecret] = useState(null);

    useEffect(() => {
        const getClientSecret = async () => {
            // Ensure packageDetails are available and clientSecret is not already set
            if (!packageDetails || clientSecret) {
                console.warn("packageDetails not yet available in CheckoutForm useEffect or clientSecret already exists.");
                return;
            }

            try {
                const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/create-payment-intent`, {
                    coinsPurchased: packageDetails.coins + packageDetails.bonus, // Total coins (coins + bonus)
                    packageId: packageDetails.id, // Package ID
                    price: packageDetails.price // Price
                });
                setClientSecret(data?.clientSecret);
            } catch (error) {
                console.error("Error fetching client secret:", error);
                setCardError("Failed to initialize payment. Please try again.");
            }
        };
        getClientSecret();
    }, [packageDetails, clientSecret]); // Re-run effect if packageDetails or clientSecret changes

    const handleSubmit = async (event) => {
        event.preventDefault();
        setCardError(null); // Clear previous errors before new submission

        if (!stripe || !elements || !clientSecret) {
            // Stripe.js has not loaded or client secret is not available
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            setCardError('Card details not loaded correctly.');
            return;
        }

        // Confirm payment using the client secret
        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
            clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName,
                    email: user?.email,
                },
            },
        }
        );

        if (confirmError) {
            console.log('[Stripe Confirmation Error]', confirmError);
            setCardError(confirmError?.message || 'Payment confirmation failed.');
            onConfirmPurchase(packageDetails, null, confirmError);
        } else {
            if (paymentIntent.status === 'succeeded') {
                // Payment successful!
                if (onConfirmPurchase) {
                    onConfirmPurchase(packageDetails, paymentIntent.id); // Pass package and transaction ID
                    toast.success("You Purchase Coin Successfully!!!")
                } else {
                    console.error("onConfirmPurchase function is not available in CheckoutForm.");
                    setCardError("Payment callback function is missing.");
                }
            } else {
                setCardError(`Payment status: ${paymentIntent.status}`);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={cardElementOptions} // Use options passed from outside
            />
            {
                cardError && <p className="text-red-400 text-left font-medium text-sm mt-2">{cardError}</p> // Light red color for error
            }
            <button
                type="submit"
                disabled={!stripe || !elements || isProcessing || !clientSecret} // Use isProcessing and clientSecret props
                className={`mt-8 w-full py-3 rounded-lg font-bold text-lg transition-all duration-300
                                ${isProcessing || !clientSecret // Class based on isProcessing prop
                        ? 'bg-blue-600 opacity-70 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
            >
                {isProcessing ? (
                    <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing Payment...
                    </span>
                ) : (
                    `Buy Now ($${packageDetails?.price || '0'})` // Use packageDetails
                )}
            </button>
        </form>
    );
};

export default CheckoutForm;