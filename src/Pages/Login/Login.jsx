import React, { useState, useEffect, useContext } from 'react';
import Lottie from 'lottie-react';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router';
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
import { saveUsersInDb } from '../../API/utils';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    const { signIn, signInWithGoogle } = useContext(AuthContext);
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
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            const result = await signIn(email, password);
            const user = result?.user;
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/my-coins?email=${user.email}`, {
                withCredentials: true
            });
            // console.log(res); // এখানে res এর ভ্যালু দেখুন: { data: { currentCoin: 100 } }
            const currentCoin = res?.data?.currentCoin || 0; // শুধু সংখ্যাটি নিন

            const userData = {
                name: result?.user?.displayName,
                email: result?.user?.email,
                image: result?.user?.photoURL,
                coin: currentCoin // শুধু সংখ্যা পাঠান
            };

            await saveUsersInDb(userData);

            Swal.fire({
                title: 'Login Successful!',
                text: 'Welcome back! Redirecting to dashboard...',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false,
                confirmButtonColor: '#8B5CF6'
            });
            navigate("/dashboard");
        } catch (error) {
            console.error(error);
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
            const result = await signInWithGoogle();
            const user = result?.user;
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/my-coins?email=${user.email}`, {
                withCredentials: true
            });
            const currentCoin = res?.data?.currentCoin || 0; // শুধু সংখ্যাটি নিন

            const userData = {
                name: result?.user?.displayName,
                email: result?.user?.email,
                image: result?.user?.photoURL,
                coin: currentCoin // শুধু সংখ্যা পাঠান
            };

            await saveUsersInDb(userData);

            Swal.fire({
                title: 'Google Sign-In Successful!',
                text: 'Welcome! Redirecting to dashboard...',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false,
                confirmButtonColor: '#8B5CF6'
            });
            navigate("/dashboard");
        } catch (error) {
            console.error(error);
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
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl bg-gray-800/50 backdrop-blur-md rounded-xl shadow-xl overflow-hidden border border-gray-700">
                <div className="flex flex-col lg:flex-row">
                    {/* Left Side - Lottie Animation */}
                    <div className="lg:w-1/2 bg-gray-800/70 p-8 flex items-center justify-center">
                        <div className="text-center">
                            <div className="w-80 h-80 mx-auto mb-6">
                                <Lottie
                                    animationData={loginLottie}
                                    loop={true}
                                    className="w-full h-full"
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
                                className="w-full mb-6 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all flex items-center justify-center space-x-3 border border-gray-600 disabled:opacity-50"
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
                                            onBlur={validateForm}
                                            className="w-full pl-10 pr-12 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
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
                                            onBlur={validateForm}
                                            className="w-full pl-10 pr-12 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                            placeholder="Enter your password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
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
                                    disabled={isLoading}
                                    className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all disabled:opacity-50"
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