import React, { use, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import Swal from 'sweetalert2';
import { Link, Navigate, useNavigate } from 'react-router'; // Changed to react-router-dom
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
import { Briefcase } from 'lucide-react';
import loginLottie from '../../assets/Lottie/login-lottie.json';
import { AuthContext } from '../../Provider/AuthProvider';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    const { signIn, signInWithGoogle } = use(AuthContext)
    const navigate = useNavigate();



    // Simulate checking for existing email
    useEffect(() => {
        if (email && email.includes('@')) {
            const timeout = setTimeout(() => {
                if (email === 'notfound@example.com') {
                    setEmailError('No account found with this email address');
                } else {
                    setEmailError('');
                }
            }, 500);

            return () => clearTimeout(timeout);
        } else if (email === '') {
            setEmailError('');
        }
    }, [email]);

    const validateForm = () => {
        let isValid = true;
        // Email validation
        if (!email) {
            setEmailError('Email is required');
            isValid = false;
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            setEmailError('Invalid email address');
            isValid = false;
        } else {
            setEmailError('');
        }

        // Password validation
        if (!password) {
            setPasswordError('Password is required');
            isValid = false;
        } else if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters');
            isValid = false;
        } else {
            setPasswordError('');
        }
        return isValid;
    };

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            // Simulate API call

            await signIn(email, password)
            Swal.fire({
                title: 'Login Successful!',
                text: 'Welcome back! Redirecting to dashboard...',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false,
                confirmButtonColor: '#8B5CF6'
            });
            navigate("/")
        } catch (error) {
            console.error(error); // Changed to console.error for better error logging
            Swal.fire({
                title: 'Error',
                text: 'Something went wrong. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#8B5CF6'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setIsGoogleLoading(true);
        try {
            // Simulate Google Sign-In API call
            await signInWithGoogle()

            Swal.fire({
                title: 'Google Sign-In Successful!',
                text: 'Welcome! Redirecting to dashboard...',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false,
                confirmButtonColor: '#8B5CF6'
            });
            navigate("/")

        } catch (error) {
            console.error(error); // Changed to console.error
            Swal.fire({
                title: 'Google Sign-In Failed',
                text: 'Unable to sign in with Google. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#8B5CF6'
            });
        } finally {
            setIsGoogleLoading(false);
        }
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-6xl bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20"
            >
                <div className="flex flex-col lg:flex-row">
                    {/* Left Side - Lottie Animation */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:w-1/2 bg-gradient-to-br from-purple-600/20 to-blue-600/20 p-8 flex items-center justify-center"
                    >
                        <div className="text-center">
                            <div className="w-80 h-80 mx-auto mb-6">
                                <Lottie
                                    animationData={loginLottie}
                                    loop={true}
                                    className="w-full h-full"
                                />
                            </div>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="text-3xl font-bold text-white mb-4"
                            >
                                Welcome Back
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                className="text-purple-200 text-lg"
                            >
                                Sign in to continue your professional journey
                            </motion.p>
                        </div>
                    </motion.div>

                    {/* Right Side - Login Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="lg:w-1/2 p-8 lg:p-12"
                    >
                        <div className="max-w-md mx-auto">
                            {/* Logo and Brand */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="flex items-center justify-center mb-8"
                            >
                                <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl p-3 shadow-lg mr-3">
                                    <Briefcase className="h-8 w-8 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                                        MicroJobs
                                    </h1>
                                    <p className="text-sm text-purple-300 font-medium">Professional Services</p>
                                </div>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                className="text-3xl font-bold text-white mb-2 text-center"
                            >
                                Sign In
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                className="text-purple-200 mb-8 text-center"
                            >
                                Enter your credentials to access your account
                            </motion.p>

                            {/* Google Sign-In Button */}
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.7 }}
                                onClick={handleGoogleSignIn}
                                disabled={isGoogleLoading}
                                className="w-full mb-6 py-3 bg-white text-gray-700 font-semibold rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 border border-gray-200"
                            >
                                {isGoogleLoading ? (
                                    <div className="flex items-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-700 mr-2"></div>
                                        Signing in with Google...
                                    </div>
                                ) : (
                                    <>
                                        <FaGoogle className="text-red-500" />
                                        <span>Continue with Google</span>
                                    </>
                                )}
                            </motion.button>

                            {/* Divider */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                                className="relative mb-6"
                            >
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-white/20"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-transparent text-purple-200">Or continue with email</span>
                                </div>
                            </motion.div>

                            <form onSubmit={handleLogin} className="space-y-6">
                                {/* Email Field */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.9 }}
                                >
                                    <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300" />
                                        <input
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            onBlur={validateForm} // Validate on blur
                                            className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                            placeholder="Enter your email"
                                        />
                                        {email && !emailError && (
                                            <FaCheck className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400" />
                                        )}
                                    </div>
                                    {emailError && (
                                        <p className="text-red-400 text-sm mt-1 flex items-center">
                                            <FaTimes className="mr-1" />
                                            {emailError}
                                        </p>
                                    )}
                                </motion.div>

                                {/* Password Field */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 1.0 }}
                                >
                                    <label htmlFor="password" className="block text-white text-sm font-medium mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300" />
                                        <input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            onBlur={validateForm} // Validate on blur
                                            className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                            placeholder="Enter your password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-white transition-colors"
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                    {passwordError && (
                                        <p className="text-red-400 text-sm mt-1 flex items-center">
                                            <FaTimes className="mr-1" />
                                            {passwordError}
                                        </p>
                                    )}
                                </motion.div>

                                {/* Forgot Password Link */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 1.1 }}
                                    className="flex justify-end"
                                >
                                    <a
                                        href="/forgot-password"
                                        className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
                                    >
                                        Forgot your password?
                                    </a>
                                </motion.div>

                                {/* Submit Button */}
                                <motion.button
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 1.2 }}
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
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
                                </motion.button>
                            </form>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 1.4 }}
                                className="text-center text-purple-200 mt-6"
                            >
                                Don't have an account?{' '}
                                <Link to="/register" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                                    Sign up
                                </Link>
                            </motion.p>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;