import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import Swal from 'sweetalert2';
import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaUpload,
    FaUserTie,
    FaShoppingCart,
    FaCheck,
    FaTimes,
    FaGoogle // Import Google icon
} from 'react-icons/fa';
import registrationLotti from '../../assets/Lottie/registration-lottie.json';
import { Link } from 'react-router'; // Changed to react-router-dom for proper Link usage
import { AuthContext } from '../../Provider/AuthProvider';

const Registration = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [profilePreview, setProfilePreview] = useState(null);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const { createUser, signInWithGoogle, updateUserProfile, loading } = useContext(AuthContext)



    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
        setError,
        clearErrors
    } = useForm();

    const password = watch('password');
    const email = watch('email');
    const selectedRole = watch('role');

    // Password strength calculation
    useEffect(() => {
        if (password) {
            let strength = 0;
            if (password.length >= 8) strength++;
            if (/[A-Z]/.test(password)) strength++;
            if (/S[a-z]/.test(password)) strength++;
            if (/[0-9]/.test(password)) strength++;
            if (/[^A-Za-z0-9]/.test(password)) strength++;
            setPasswordStrength(strength);
        } else {
            setPasswordStrength(0);
        }
    }, [password]);

    // Email validation
    useEffect(() => {
        if (email && email.includes('@')) {
            // Simulate checking for existing email
            if (email === 'test@example.com') {
                setError('email', {
                    type: 'manual',
                    message: 'This email is already registered'
                });
            } else {
                clearErrors('email');
            }
        }
    }, [email, setError, clearErrors]);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                setError('profilePicture', {
                    type: 'manual',
                    message: 'File size must be less than 5MB'
                });
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePreview(reader.result);
            };
            reader.readAsDataURL(file);
            clearErrors('profilePicture');
        }
    };

    const onSubmit = async (data) => {
        setIsLoading(true);
        // Simulate API call
        const result = await createUser(email, password);


        await updateUserProfile(
            data?.name,
            'https://lh3.googleusercontent.com/a/ACg8ocKUMU3XIX-JSUB80Gj_bYIWfYudpibgdwZE1xqmAGxHASgdvCZZ=s96-c'
        )
        console.log(result?.user);
        setIsLoading(false);

        Swal.fire({
            title: 'Registration Successful!',
            text: `Welcome ${data.name}! Your account has been created successfully as a ${data.role}.`,
            icon: 'success',
            confirmButtonText: 'Continue',
            confirmButtonColor: '#8B5CF6'
        });
    };

    const handleGoogleSignUp = async () => {
        setIsLoading(true);
        console.log('Signing up with Google...');
        // Simulate Google sign-up process
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsLoading(false);
        Swal.fire({
            title: 'Google Sign-up Initiated!',
            text: 'You would typically be redirected to Google for authentication here.',
            icon: 'info',
            confirmButtonText: 'OK',
            confirmButtonColor: '#8B5CF6'
        });
        // Here you would integrate with Firebase, Auth0, or your backend for Google OAuth
    };

    const getPasswordStrengthColor = () => {
        switch (passwordStrength) {
            case 0:
            case 1: return 'bg-red-500';
            case 2: return 'bg-orange-500';
            case 3: return 'bg-yellow-500';
            case 4: return 'bg-blue-500';
            case 5: return 'bg-green-500';
            default: return 'bg-gray-300';
        }
    };

    const getPasswordStrengthText = () => {
        switch (passwordStrength) {
            case 0: return '';
            case 1: return 'Very Weak';
            case 2: return 'Weak';
            case 3: return 'Fair';
            case 4: return 'Good';
            case 5: return 'Strong';
            default: return '';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 font-sans">
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
                        className="lg:w-1/2 bg-gradient-to-br from-purple-600/20 to-blue-600/20 p-8 flex items-center justify-center relative overflow-hidden rounded-l-3xl lg:rounded-r-none rounded-b-3xl lg:rounded-bl-3xl"
                    >

                        <div className="text-center relative z-10">
                            <div className="w-80 h-80 mx-auto mb-6">
                                <Lottie
                                    animationData={registrationLotti}
                                    loop={true}
                                    className="w-full h-full"
                                />
                            </div>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="text-4xl font-bold text-white mb-4 drop-shadow-lg"
                            >
                                Join MicroJobs
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                className="text-purple-200 text-lg max-w-md mx-auto"
                            >
                                Create your account and start your professional journey today, connecting with opportunities.
                            </motion.p>
                        </div>
                    </motion.div>

                    {/* Right Side - Registration Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center"
                    >
                        <div className="max-w-md mx-auto w-full">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                className="text-4xl font-bold text-white mb-3"
                            >
                                Create Account
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                className="text-purple-200 mb-8 text-lg"
                            >
                                Fill in your details to get started
                            </motion.p>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                {/* Name Field */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.7 }}
                                >
                                    <label htmlFor="name" className="block text-white text-sm font-medium mb-2">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300" />
                                        <input
                                            id="name"
                                            {...register('name', {
                                                required: 'Name is required',
                                                minLength: { value: 2, message: 'Name must be at least 2 characters' }
                                            })}
                                            type="text"
                                            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-base"
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                    {errors.name && (
                                        <p className="text-red-400 text-sm mt-1 flex items-center">
                                            <FaTimes className="mr-1" />
                                            {errors.name.message}
                                        </p>
                                    )}
                                </motion.div>

                                {/* Email Field */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.8 }}
                                >
                                    <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300" />
                                        <input
                                            id="email"
                                            {...register('email', {
                                                required: 'Email is required',
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: 'Invalid email address'
                                                }
                                            })}
                                            type="email"
                                            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-base"
                                            placeholder="Enter your email"
                                        />
                                        {email && !errors.email && (
                                            <FaCheck className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400" />
                                        )}
                                    </div>
                                    {errors.email && (
                                        <p className="text-red-400 text-sm mt-1 flex items-center">
                                            <FaTimes className="mr-1" />
                                            {errors.email.message}
                                        </p>
                                    )}
                                </motion.div>

                                {/* Profile Picture Upload */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.9 }}
                                >
                                    <label htmlFor="profilePicture" className="block text-white text-sm font-medium mb-2">
                                        Profile Picture
                                    </label>
                                    <div className="relative">
                                        <input
                                            {...register('profilePicture', {
                                                required: profilePreview ? false : 'Profile picture is required'
                                            })}
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="hidden"
                                            id="profilePicture"
                                        />
                                        <label
                                            htmlFor="profilePicture"
                                            className="w-full flex items-center justify-center px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-purple-200 hover:bg-white/20 transition-all duration-300 cursor-pointer text-base"
                                        >
                                            <FaUpload className="mr-2" />
                                            {profilePreview ? 'Change Picture' : 'Upload Picture'}
                                        </label>
                                        {profilePreview && (
                                            <div className="mt-3 flex justify-center">
                                                <img
                                                    src={profilePreview}
                                                    alt="Profile Preview"
                                                    className="w-20 h-20 rounded-full object-cover border-2 border-purple-400 shadow-md"
                                                />
                                            </div>
                                        )}
                                    </div>
                                    {errors.profilePicture && (
                                        <p className="text-red-400 text-sm mt-1 flex items-center">
                                            <FaTimes className="mr-1" />
                                            {errors.profilePicture.message}
                                        </p>
                                    )}
                                </motion.div>

                                {/* Role Selection */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 1.0 }}
                                >
                                    <label className="block text-white text-sm font-medium mb-3">
                                        Select Your Role
                                    </label>
                                    <div className="grid grid-cols-2 gap-4">
                                        {/* Worker Role */}
                                        <label className="relative cursor-pointer" onClick={() => setValue('role', 'worker')}>
                                            <input
                                                {...register('role', { required: 'Please select a role' })}
                                                type="radio"
                                                value="worker"
                                                className="sr-only peer"
                                            />
                                            <div
                                                className={`p-4 bg-white/10 border-2 rounded-xl hover:bg-white/20 transition-all duration-300 text-center flex flex-col items-center justify-center h-full
                                        ${selectedRole === 'worker' ? 'border-purple-400 bg-purple-500/20 shadow-xl scale-[1.03] animate-pulse-once' : 'border-white/20'}
                                    `}
                                            >
                                                <FaUserTie className="text-3xl text-purple-300 mb-2" />
                                                <span className="text-white font-medium text-lg">Worker</span>
                                            </div>
                                        </label>
                                        {/* Buyer Role */}
                                        <label className="relative cursor-pointer" onClick={() => setValue('role', 'buyer')}>
                                            <input
                                                {...register('role', { required: 'Please select a role' })}
                                                type="radio"
                                                value="buyer"
                                                className="sr-only peer"
                                            />
                                            <div
                                                className={`p-4 bg-white/10 border-2 rounded-xl hover:bg-white/20 transition-all duration-300 text-center flex flex-col items-center justify-center h-full
                                        ${selectedRole === 'buyer' ? 'border-blue-400 bg-blue-500/20 shadow-xl scale-[1.03] animate-pulse-once' : 'border-white/20'}
                                    `}
                                            >
                                                <FaShoppingCart className="text-3xl text-purple-300 mb-2" />
                                                <span className="text-white font-medium text-lg">Buyer</span>
                                            </div>
                                        </label>
                                    </div>
                                    {errors.role && (
                                        <p className="text-red-400 text-sm mt-1 flex items-center">
                                            <FaTimes className="mr-1" />
                                            {errors.role.message}
                                        </p>
                                    )}
                                </motion.div>

                                {/* Password Field */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 1.1 }}
                                >
                                    <label htmlFor="password" className="block text-white text-sm font-medium mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300" />
                                        <input
                                            id="password"
                                            {...register('password', {
                                                required: 'Password is required',
                                                minLength: { value: 8, message: 'Password must be at least 8 characters' }
                                            })}
                                            type={showPassword ? 'text' : 'password'}
                                            className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-base"
                                            placeholder="Enter your password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-white transition-colors p-1"
                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                    {password && (
                                        <div className="mt-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-purple-200">Password Strength:</span>
                                                <span className={`font-medium ${passwordStrength <= 2 ? 'text-red-400' :
                                                    passwordStrength <= 3 ? 'text-yellow-400' :
                                                        passwordStrength <= 4 ? 'text-blue-400' : 'text-green-400'
                                                    }`}>
                                                    {getPasswordStrengthText()}
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-600 rounded-full h-2 mt-1">
                                                <div
                                                    className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                                                    style={{ width: `${(passwordStrength / 5) * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    )}
                                    {errors.password && (
                                        <p className="text-red-400 text-sm mt-1 flex items-center">
                                            <FaTimes className="mr-1" />
                                            {errors.password.message}
                                        </p>
                                    )}
                                </motion.div>

                                {/* Confirm Password Field */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 1.2 }}
                                >
                                    <label htmlFor="confirmPassword" className="block text-white text-sm font-medium mb-2">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300" />
                                        <input
                                            id="confirmPassword"
                                            {...register('confirmPassword', {
                                                required: 'Please confirm your password',
                                                validate: value => value === password || 'Passwords do not match'
                                            })}
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-base"
                                            placeholder="Confirm your password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-white transition-colors p-1"
                                            aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                                        >
                                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                    {errors.confirmPassword && (
                                        <p className="text-red-400 text-sm mt-1 flex items-center">
                                            <FaTimes className="mr-1" />
                                            {errors.confirmPassword.message}
                                        </p>
                                    )}
                                </motion.div>

                                {/* Submit Button */}
                                <motion.button
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 1.3 }}
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed text-lg shadow-lg"
                                >
                                    {isLoading ? (
                                        <div className="flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                            Creating Account...
                                        </div>
                                    ) : (
                                        'Create Account'
                                    )}
                                </motion.button>
                            </form>

                            {/* Separator */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 1.4 }}
                                className="my-6 flex items-center before:flex-1 before:border-t before:border-gray-600 after:flex-1 after:border-t after:border-gray-600"
                            >
                                <p className="text-center font-semibold mx-4 mb-0 text-white">OR</p>
                            </motion.div>

                            {/* Sign up with Google Button */}
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 1.5 }}
                                type="button"
                                onClick={handleGoogleSignUp}
                                disabled={isLoading}
                                className="w-full py-3 flex items-center justify-center bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed text-lg shadow-lg"
                            >
                                <FaGoogle className="mr-2 text-red-400" />
                                {isLoading ? 'Processing...' : 'Sign up with Google'}
                            </motion.button>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 1.6 }}
                                className="text-center text-purple-200 mt-6"
                            >
                                Already have an account?{' '}
                                <Link to="/login" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                                    Sign in
                                </Link>
                            </motion.p>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Registration;