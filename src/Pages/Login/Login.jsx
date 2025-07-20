import React, { useState, useEffect, useContext } from 'react';
import Lottie from 'lottie-react';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router'; // Changed to react-router-dom for consistency
import {
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaGoogle,
    FaCheck,
    FaTimes,
    FaSignInAlt
} from 'react-icons/fa';
import { Briefcase } from 'lucide-react'; // Assuming Lucide-React is installed for the Briefcase icon

// Local imports
import loginLottie from '../../assets/Lottie/login-lottie.json'; // Path to your Lottie animation JSON
import { AuthContext } from '../../Provider/AuthProvider'; // Context for authentication
import { saveUsersInDb } from '../../API/utils'; // Utility to save user data to database
import axios from 'axios'; // HTTP client for API requests

const Login = () => {
    // State variables for form inputs and UI feedback
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // For email/password login button
    const [isGoogleLoading, setIsGoogleLoading] = useState(false); // For Google sign-in button

    // Auth context and navigation hook
    const { signIn, signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();

    // Effect for real-time email validation (e.g., checking format, simulating existence)
    // Note: For a login form, real-time "account existence" checks might be a security concern (user enumeration).
    // Typically, only format validation happens client-side, and existence is confirmed server-side after full login attempt.
    useEffect(() => {
        if (email && email.includes('@')) {
            const timeout = setTimeout(() => {
                // This is a simulated check. In a real app, you might validate email format only here
                // and rely on the backend authentication response for actual account existence.
                if (email === 'notfound@example.com') { // Example for demonstrating an error
                    setEmailError('No account found with this email address');
                } else {
                    setEmailError(''); // Clear error if email format seems valid or passes simulated check
                }
            }, 500); // Debounce the validation

            return () => clearTimeout(timeout); // Cleanup function for debounce
        } else if (email === '') {
            setEmailError(''); // Clear error when email field is empty
        }
    }, [email]);

    /**
     * Client-side form validation for email and password fields.
     * Sets specific error messages for invalid inputs.
     * @returns {boolean} True if the form inputs are valid, false otherwise.
     */
    const validateForm = () => {
        let isValid = true;

        // Email validation
        if (!email.trim()) { // Use .trim() to handle leading/trailing spaces
            setEmailError('Email is required');
            isValid = false;
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            setEmailError('Invalid email address format');
            isValid = false;
        } else {
            setEmailError(''); // Clear email error if valid
        }

        // Password validation
        if (!password) {
            setPasswordError('Password is required');
            isValid = false;
        } else if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters long');
            isValid = false;
        } else {
            setPasswordError(''); // Clear password error if valid
        }
        return isValid;
    };

    /**
     * Handles the form submission for email/password login.
     * Performs client-side validation, calls Firebase sign-in,
     * fetches user coins from the backend, saves user to DB, and navigates.
     * @param {Event} e - The form submission event.
     */
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        if (!validateForm()) {
            return; // Stop if client-side validation fails
        }

        setIsLoading(true); // Set loading state for the login button

        try {
            // Attempt to sign in with email and password using Firebase
            const result = await signIn(email, password);
            const user = result?.user;

            if (!user) {
                // This case should ideally be caught by Firebase errors, but added as a safeguard
                throw new Error('User object not returned from sign-in.');
            }

            // Fetch current coin balance from the backend
            // Assumes VITE_API_URL is correctly configured in .env
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/my-coins?email=${user?.email}`, {
                withCredentials: true // Important for sending cookies/credentials
            });
            // Extract currentCoin, defaulting to 0 if not found
            const currentCoin = res?.data?.currentCoin || 0;

            // Prepare user data to be saved or updated in the database
            const userData = {
                name: user?.displayName,
                email: user?.email,
                image: user?.photoURL,
                coin: currentCoin // Ensure this is a number
            };

            // Save or update user data in your backend database
            await saveUsersInDb(userData);

            // Show success alert using SweetAlert2
            Swal.fire({
                title: 'Login Successful!',
                text: 'Welcome back! Redirecting to dashboard...',
                icon: 'success',
                timer: 2000, // Auto-close after 2 seconds
                showConfirmButton: false, // No confirmation button needed
                confirmButtonColor: '#8B5CF6' // Tailwind purple-600 like color
            });

            navigate("/dashboard"); // Redirect to the dashboard page
        } catch (error) {
            console.error('Login error:', error);
            // Customize error messages based on Firebase error codes if needed
            let errorMessage = 'Something went wrong. Please try again.';
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                errorMessage = 'Invalid email or password. Please check your credentials.';
            } else if (error.code === 'auth/too-many-requests') {
                errorMessage = 'Too many login attempts. Please try again later.';
            } else if (error.message.includes('Network Error')) {
                errorMessage = 'Network error. Please check your internet connection.';
            }

            // Show error alert using SweetAlert2
            Swal.fire({
                title: 'Login Failed',
                text: errorMessage,
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#8B5CF6'
            });
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    /**
     * Handles Google Sign-In process.
     * Calls Firebase Google sign-in, fetches user coins, saves user to DB, and navigates.
     */
    const handleGoogleSignIn = async () => {
        setIsGoogleLoading(true); // Set loading state for Google button
        try {
            // Attempt to sign in with Google using Firebase
            const result = await signInWithGoogle();
            const user = result?.user;

            if (!user) {
                throw new Error('User object not returned from Google sign-in.');
            }

            // Fetch current coin balance from the backend
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/my-coins?email=${user.email}`, {
                withCredentials: true
            });
            const currentCoin = res?.data?.currentCoin || 0; // Extract coin, default to 0

            // Prepare user data for database
            const userData = {
                name: user?.displayName,
                email: user?.email,
                image: user?.photoURL,
                coin: currentCoin
            };

            // Save or update user data in your database
            await saveUsersInDb(userData);

            // Show success alert
            Swal.fire({
                title: 'Google Sign-In Successful!',
                text: 'Welcome! Redirecting to dashboard...',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false,
                confirmButtonColor: '#8B5CF6'
            });

            navigate("/dashboard"); // Redirect to dashboard
        } catch (error) {
            console.error('Google Sign-In error:', error);
            // Customize error messages for Google sign-in if needed
            let errorMessage = 'Unable to sign in with Google. Please try again.';
            if (error.code === 'auth/popup-closed-by-user') {
                errorMessage = 'Google sign-in window was closed.';
            } else if (error.code === 'auth/cancelled-popup-request') {
                errorMessage = 'Google sign-in was cancelled.';
            } else if (error.message.includes('Network Error')) {
                errorMessage = 'Network error during Google sign-in. Please check your internet connection.';
            }

            // Show error alert
            Swal.fire({
                title: 'Google Sign-In Failed',
                text: errorMessage,
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#8B5CF6'
            });
        } finally {
            setIsGoogleLoading(false); // Reset Google loading state
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl bg-gray-800/50 backdrop-blur-md rounded-xl shadow-xl overflow-hidden border border-gray-700">
                <div className="flex flex-col lg:flex-row">
                    {/* Left Side - Lottie Animation and Welcome Message */}
                    <div className="lg:w-1/2 bg-gray-800/70 p-8 flex items-center justify-center">
                        <div className="text-center">
                            <div className="w-80 h-80 mx-auto mb-6">
                                <Lottie
                                    animationData={loginLottie}
                                    loop={true}
                                    className="w-full h-full"
                                    aria-label="Login animation"
                                />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4">
                                Welcome Back
                            </h2>
                            <p className="text-gray-300 text-lg">
                                Sign in to continue your professional journey
                            </p>
                        </div>
                    </div>

                    {/* Right Side - Login Form */}
                    <div className="lg:w-1/2 p-8 lg:p-10 bg-gray-800/30">
                        <div className="max-w-md mx-auto">
                            {/* Logo and Brand */}
                            <div className="flex items-center justify-center mb-8">
                                <div className="bg-purple-600 rounded-xl p-3 shadow-lg mr-3">
                                    <Briefcase className="h-8 w-8 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-white">
                                        MicroJobs
                                    </h1>
                                    <p className="text-sm text-gray-400 font-medium">Professional Services</p>
                                </div>
                            </div>

                            <h1 className="text-3xl font-bold text-white mb-2 text-center">
                                Sign In
                            </h1>
                            <p className="text-gray-400 mb-8 text-center">
                                Enter your credentials to access your account
                            </p>

                            {/* Google Sign-In Button */}
                            <button
                                onClick={handleGoogleSignIn}
                                disabled={isGoogleLoading}
                                className="w-full mb-6 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all flex items-center justify-center space-x-3 border border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                aria-label="Sign in with Google"
                            >
                                {isGoogleLoading ? (
                                    <div className="flex items-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-300 mr-2"></div>
                                        Signing in with Google...
                                    </div>
                                ) : (
                                    <>
                                        <FaGoogle className="text-red-400" />
                                        <span>Continue with Google</span>
                                    </>
                                )}
                            </button>

                            {/* Divider */}
                            <div className="relative mb-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-600"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-gray-800/30 text-gray-400">Or continue with email</span>
                                </div>
                            </div>

                            <form onSubmit={handleLogin} className="space-y-6">
                                {/* Email Field */}
                                <div>
                                    <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            onBlur={validateForm} // Validate on blur for immediate feedback
                                            className="w-full pl-10 pr-12 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                            placeholder="Enter your email"
                                            aria-invalid={!!emailError} // Indicate invalid state for accessibility
                                            aria-describedby="email-error" // Link to error message
                                        />
                                        {email && !emailError && (
                                            <FaCheck className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400" />
                                        )}
                                    </div>
                                    {emailError && (
                                        <p id="email-error" className="text-red-400 text-sm mt-1 flex items-center" role="alert">
                                            <FaTimes className="mr-1" />
                                            {emailError}
                                        </p>
                                    )}
                                </div>

                                {/* Password Field */}
                                <div>
                                    <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            onBlur={validateForm} // Validate on blur
                                            className="w-full pl-10 pr-12 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                            placeholder="Enter your password"
                                            aria-invalid={!!passwordError}
                                            aria-describedby="password-error"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white p-1"
                                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                    {passwordError && (
                                        <p id="password-error" className="text-red-400 text-sm mt-1 flex items-center" role="alert">
                                            <FaTimes className="mr-1" />
                                            {passwordError}
                                        </p>
                                    )}
                                </div>

                                {/* Forgot Password Link */}
                                <div className="flex justify-end">
                                    <Link
                                        to="/forgot-password"
                                        className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
                                    >
                                        Forgot your password?
                                    </Link>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isLoading} // Disable button when loading
                                    className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <div className="flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                            Signing In...
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center">
                                            <FaSignInAlt className="mr-2" />
                                            Sign In
                                        </div>
                                    )}
                                </button>
                            </form>

                            {/* Register Link */}
                            <p className="text-center text-gray-400 mt-6">
                                Don't have an account?{' '}
                                <Link to="/register" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;