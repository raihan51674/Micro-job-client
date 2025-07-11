import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
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
    FaGoogle
} from 'react-icons/fa';
import registrationLotti from '../../assets/Lottie/registration-lottie.json';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../Provider/AuthProvider';

const Registration = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [profilePreview, setProfilePreview] = useState(null);
    const [passwordStrength, setPasswordStrength] = useState(0);

    const { createUser, signInWithGoogle, updateUserProfile, loading, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

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
            if (/[a-z]/.test(password)) strength++;
            if (/[0-9]/.test(password)) strength++;
            if (/[^A-Za-z0-9]/.test(password)) strength++;
            setPasswordStrength(strength);
        } else {
            setPasswordStrength(0);
        }
    }, [password]);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
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
        try {
            await createUser(email, password)
                .then((result) => {
                    const user = result?.user;
                    updateUserProfile(
                        data?.name,
                        'https://lh3.googleusercontent.com/a/ACg8ocKUMU3XIX-JSUB80Gj_bYIWfYudpibgdwZE1xqmAGxHASgdvCZZ=s96-c'
                    )
                        .then(() => {
                            setUser({ ...user, displayName: data?.name, photoURL: 'https://lh3.googleusercontent.com/a/ACg8ocKUMU3XIX-JSUB80Gj_bYIWfYudpibgdwZE1xqmAGxHASgdvCZZ=s96-c' })
                        })
                        .catch(error => {
                            console.log(error);
                        })
                })

            Swal.fire({
                title: 'Registration Successful!',
                text: `Welcome ${data.name}! Your account has been created as a ${data.role}.`,
                icon: 'success',
                confirmButtonText: 'Continue',
                confirmButtonColor: '#8B5CF6'
            });
            navigate("/");
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Registration Failed",
                text: error.message || "Something went wrong during registration.",
            });
        }
    };

    const handleGoogleSignUp = async () => {
        try {
            await signInWithGoogle();
            navigate("/");
            Swal.fire({
                title: 'Google Sign-up Successful!',
                text: 'You have successfully signed in with Google.',
                icon: 'success',
                confirmButtonText: 'OK',
                confirmButtonColor: '#8B5CF6'
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Google Sign-up Failed",
                text: error.message || "Something went wrong with Google sign-up.",
            });
        }
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
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 font-sans">
            <div className="w-full max-w-6xl bg-black bg-opacity-50 backdrop-blur-lg rounded-xl shadow-xl overflow-hidden border border-gray-700">
                <div className="flex flex-col lg:flex-row">
                    {/* Left Side - Lottie Animation */}
                    <div className="lg:w-1/2 bg-gray-800/70 p-8 flex items-center justify-center">
                        <div className="text-center">
                            <div className="w-80 h-80 mx-auto mb-6">
                                <Lottie
                                    animationData={registrationLotti}
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

                    {/* Right Side - Registration Form */}
                    <div className="lg:w-1/2 p-8 lg:p-10 flex flex-col justify-center bg-gray-900/30">
                        <div className="max-w-md mx-auto w-full">
                            <h1 className="text-3xl font-bold text-white mb-2">
                                Create Account
                            </h1>
                            <p className="text-gray-300 mb-6">
                                Fill in your details to get started
                            </p>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                {/* Name Field */}
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" />
                                        <input
                                            {...register('name', {
                                                required: 'Name is required',
                                                minLength: { value: 2, message: 'Name must be at least 2 characters' }
                                            })}
                                            type="text"
                                            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                    {errors.name && (
                                        <p className="text-red-400 text-sm mt-1 flex items-center">
                                            <FaTimes className="mr-1" />
                                            {errors.name.message}
                                        </p>
                                    )}
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" />
                                        <input
                                            {...register('email', {
                                                required: 'Email is required',
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: 'Invalid email address'
                                                }
                                            })}
                                            type="email"
                                            className="w-full pl-10 pr-10 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
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
                                </div>

                                {/* Profile Picture Upload */}
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">
                                        Profile Picture
                                    </label>
                                    <div className="flex items-center space-x-4">
                                        <label className="cursor-pointer">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                className="hidden"
                                            />
                                            <div className="w-16 h-16 rounded-full bg-gray-800 border-2 border-dashed border-gray-700 flex items-center justify-center overflow-hidden">
                                                {profilePreview ? (
                                                    <img src={profilePreview} alt="Preview" className="w-full h-full object-cover" />
                                                ) : (
                                                    <FaUpload className="text-gray-500" />
                                                )}
                                            </div>
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => document.querySelector('input[type="file"]').click()}
                                            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors"
                                        >
                                            {profilePreview ? 'Change' : 'Upload'} Photo
                                        </button>
                                    </div>
                                    {errors.profilePicture && (
                                        <p className="text-red-400 text-sm mt-1 flex items-center">
                                            <FaTimes className="mr-1" />
                                            {errors.profilePicture.message}
                                        </p>
                                    )}
                                </div>

                                {/* Role Selection */}
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">
                                        Select Your Role
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <label
                                            className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all ${selectedRole === 'worker'
                                                ? 'bg-purple-900/30 border border-purple-500'
                                                : 'bg-gray-800 border border-gray-700 hover:bg-gray-700'
                                                }`}
                                            onClick={() => setValue('role', 'worker')}
                                        >
                                            <input
                                                {...register('role', { required: 'Please select a role' })}
                                                type="radio"
                                                value="worker"
                                                className="text-purple-600"
                                            />
                                            <FaUserTie className="text-purple-400 text-xl" />
                                            <span className="text-white">Worker</span>
                                        </label>
                                        <label
                                            className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all ${selectedRole === 'buyer'
                                                ? 'bg-blue-900/30 border border-blue-500'
                                                : 'bg-gray-800 border border-gray-700 hover:bg-gray-700'
                                                }`}
                                            onClick={() => setValue('role', 'buyer')}
                                        >
                                            <input
                                                {...register('role', { required: 'Please select a role' })}
                                                type="radio"
                                                value="buyer"
                                                className="text-blue-600"
                                            />
                                            <FaShoppingCart className="text-blue-400 text-xl" />
                                            <span className="text-white">Buyer</span>
                                        </label>
                                    </div>
                                    {errors.role && (
                                        <p className="text-red-400 text-sm mt-1 flex items-center">
                                            <FaTimes className="mr-1" />
                                            {errors.role.message}
                                        </p>
                                    )}
                                </div>

                                {/* Password Field */}
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" />
                                        <input
                                            {...register('password', {
                                                required: 'Password is required',
                                                minLength: { value: 8, message: 'Password must be at least 8 characters' }
                                            })}
                                            type={showPassword ? 'text' : 'password'}
                                            className="w-full pl-10 pr-12 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                                            placeholder="Enter your password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white"
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                    {password && (
                                        <div className="mt-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-400">Password Strength:</span>
                                                <span className={`font-medium ${passwordStrength <= 2 ? 'text-red-400' :
                                                    passwordStrength <= 3 ? 'text-yellow-400' :
                                                        passwordStrength <= 4 ? 'text-blue-400' : 'text-green-400'
                                                    }`}>
                                                    {getPasswordStrengthText()}
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
                                                <div
                                                    className={`h-1.5 rounded-full ${getPasswordStrengthColor()}`}
                                                    style={{ width: `${(passwordStrength / 5) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                    {errors.password && (
                                        <p className="text-red-400 text-sm mt-1 flex items-center">
                                            <FaTimes className="mr-1" />
                                            {errors.password.message}
                                        </p>
                                    )}
                                </div>

                                {/* Confirm Password Field */}
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" />
                                        <input
                                            {...register('confirmPassword', {
                                                required: 'Please confirm your password',
                                                validate: value => value === password || 'Passwords do not match'
                                            })}
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            className="w-full pl-10 pr-12 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                                            placeholder="Confirm your password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white"
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
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all disabled:opacity-50"
                                >
                                    {loading ? (
                                        <div className="flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                            Creating Account...
                                        </div>
                                    ) : (
                                        'Create Account'
                                    )}
                                </button>
                            </form>

                            {/* Separator */}
                            <div className="my-6 flex items-center">
                                <div className="flex-1 border-t border-gray-700"></div>
                                <span className="px-4 text-gray-400">OR</span>
                                <div className="flex-1 border-t border-gray-700"></div>
                            </div>

                            {/* Sign up with Google Button */}
                            <button
                                type="button"
                                onClick={handleGoogleSignUp}
                                disabled={loading}
                                className="w-full py-3 flex items-center justify-center bg-gray-800 border border-gray-700 text-white font-semibold rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all disabled:opacity-50"
                            >
                                <FaGoogle className="mr-2 text-red-400" />
                                {loading ? 'Processing...' : 'Sign up with Google'}
                            </button>

                            <p className="text-center text-gray-400 mt-6">
                                Already have an account?{' '}
                                <Link to="/login" className="text-purple-400 hover:text-purple-300 font-medium">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;