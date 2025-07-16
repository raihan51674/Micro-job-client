// src/components/CheckOutForm/CheckOutForm.jsx
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./common.css";
import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider";
import toast from "react-hot-toast";
// import { updateCoinInDb } from "../../API/utils";

const CheckoutForm = ({ packageDetails, onConfirmPurchase, isProcessing, cardElementOptions }) => {
    const { user } = useContext(AuthContext);
    const stripe = useStripe();
    const elements = useElements();

    const [cardError, setCardError] = useState(null);
    const [loading, setLoading] = useState(false); // Local loading state

    const handleSubmit = async (event) => {
        event.preventDefault();
        setCardError(null);
        setLoading(true); // Start local loading

        if (!stripe || !elements) {
            setCardError("Stripe is not loaded properly.");
            setLoading(false);
            return;
        }

        const card = elements.getElement(CardElement);
        if (!card) {
            setCardError("Card details not loaded correctly.");
            setLoading(false);
            return;
        }

        let clientSecret;
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/create-payment-intent`, {
                coinsPurchased: packageDetails.coins,
                packageId: packageDetails.id,
                price: packageDetails.price,
            });
            clientSecret = data?.clientSecret;
        } catch (error) {
            console.error("Error creating payment intent:", error);
            setCardError("Failed to initialize payment.");
            setLoading(false);
            return;
        }

        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card,
                billing_details: {
                    name: user?.displayName || "Unknown",
                    email: user?.email,
                },
            },
        });

        if (confirmError) {
            console.error('[Stripe Confirmation Error]', confirmError);
            setCardError(confirmError.message || 'Payment confirmation failed.');
            setLoading(false);
            return;
        }

        if (paymentIntent.status === 'succeeded') {
            // await updateCoinInDb(user?.email, packageDetails.coins);
            toast.success("You purchased coins successfully!");
            await onConfirmPurchase?.(packageDetails, paymentIntent.id);
        } else {
            setCardError(`Payment status: ${paymentIntent.status}`);
        }

        setLoading(false); // End local loading
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement options={cardElementOptions} />
            {cardError && (
                <p className="text-red-500 text-sm mt-2">{cardError}</p>
            )}

            <button
                type="submit"
                disabled={!stripe || !elements || loading}
                className={`mt-8 w-full py-3 rounded-lg font-bold text-lg transition-all duration-300
                    ${loading
                        ? 'bg-blue-600 opacity-70 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
            >
                {loading ? (
                    <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing Payment...
                    </span>
                ) : (
                    `Buy Now ($${packageDetails?.price || '0'})`
                )}
            </button>
        </form>
    );
};

export default CheckoutForm;
