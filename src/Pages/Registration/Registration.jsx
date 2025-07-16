import React, { useContext, useState } from 'react'; // Import useState
import Lottie from 'lottie-react';
import Swal from 'sweetalert2';
import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaUpload, // Still useful for the label
    FaUserTie,
    FaShoppingCart,
    FaGoogle,
    FaCheckCircle, // For success state
    FaExclamationCircle // For error state
} from 'react-icons/fa';
import registrationLotti from '../../assets/Lottie/registration-lottie.json';
import { Link, useNavigate } from 'react-router'; // Use react-router-dom for Link and useNavigate
import { AuthContext } from '../../Provider/AuthProvider';
import { imageUpload, saveUsersInDb } from '../../API/utils'; // Ensure this path is correct and function works as expected
import axios from 'axios';

const Registration = () => {
    const { createUser, loading, signInWithGoogle, updateUserProfile, setUser } = useContext(AuthContext);


    const navigate = useNavigate();

    // State for password visibility
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // State for selected role
    const [selectedRole, setSelectedRole] = useState('');

    // State for image file name display
    const [imageFileName, setImageFileName] = useState('No file chosen');

    // State for form validation errors
    const [errors, setErrors] = useState({});

    const validateForm = (name, email, imageFile, role, password, confirmPassword) => {
        const newErrors = {};
        if (!name.trim()) newErrors.name = 'Full name is required.';
        if (!email.trim()) newErrors.email = 'Email address is required.';
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email address is invalid.';
        if (!imageFile) newErrors.imageFile = 'Profile picture is required.'; // Assuming it's required
        if (!role) newErrors.role = 'Please select a role.';
        if (!password) newErrors.password = 'Password is required.';
        else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters.';
        else if (!/[A-Z]/.test(password)) newErrors.password = 'Password must contain at least one uppercase letter.';
        else if (!/[a-z]/.test(password)) newErrors.password = 'Password must contain at least one lowercase letter.';
        else if (!/\d/.test(password)) newErrors.password = 'Password must contain at least one digit.';
        else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) newErrors.password = 'Password must contain at least one special character.';
        if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const imageFile = form.image_file.files[0];
        const role = form.role.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;

        if (!validateForm(name, email, imageFile, role, password, confirmPassword)) {
            Swal.fire({
                icon: "error",
                title: "Validation Error",
                text: "Please correct the highlighted fields.",
                confirmButtonColor: '#8B5CF6'
            });
            return;
        }

        let imageURL = '';
        try {
            if (imageFile) {
                imageURL = await imageUpload(imageFile);
            }
        } catch (uploadError) {
            console.error("Image Upload Error:", uploadError);
            Swal.fire({
                icon: "error",
                title: "Image Upload Failed",
                text: uploadError.message || "Could not upload profile picture.",
                confirmButtonColor: '#8B5CF6'
            });
            return;
        }

        // const userData = { name, email, imageURL, role, password, confirmPassword };
        // console.log("user data is", userData);

        try {
            const result = await createUser(email, password);
            const user = result?.user;
            await updateUserProfile(name, imageURL);
            setUser({ ...user, displayName: name, photoURL: imageURL });

             const res = await axios.get(`${import.meta.env.VITE_API_URL}/my-coins?email=${user?.email}`);
             const coin = res?.data || 0;

            const userData = {
                name: result?.user?.displayName,
                email: result?.user?.email,
                image: result?.user?.photoURL,
                role: role,
                coin

            }
            await saveUsersInDb(userData)

            Swal.fire({
                title: 'Registration Successful!',
                text: `Welcome ${name}! Your account has been created as a ${role}.`,
                icon: 'success',
                confirmButtonText: 'Continue',
                confirmButtonColor: '#8B5CF6'
            });
            navigate("/dashboard");
            form.reset(); // Clear the form
            setErrors({}); // Clear validation errors
            setImageFileName('No file chosen'); // Reset file name display
            setSelectedRole(''); // Reset selected role
        } catch (error) {
            console.error("Registration Error:", error);
            Swal.fire({
                icon: "error",
                title: "Registration Failed",
                text: error.message || "Something went wrong during registration.",
                confirmButtonColor: '#8B5CF6'
            });
        }
    };

    const handleGoogleSignUp = async () => {
        try {
            const result = await signInWithGoogle();
            const user = result?.user;

            const res = await axios.get(`${import.meta.env.VITE_API_URL}/my-coins?email=${user?.email}`);
             const coin = res?.data || 0;

            const userData = {
                name: result?.user?.displayName,
                email: result?.user?.email,
                image: result?.user?.photoURL,
                coin

            }
            await saveUsersInDb(userData)

            navigate("/dashboard");
            Swal.fire({
                title: 'Google Sign-up Successful!',
                text: 'You have successfully signed in with Google.',
                icon: 'success',
                confirmButtonText: 'OK',
                confirmButtonColor: '#8B5CF6'
            });
        } catch (error) {
            console.error("Google Sign-up Error:", error);
            Swal.fire({
                icon: "error",
                title: "Google Sign-up Failed",
                text: error.message || "Something went wrong with Google sign-up.",
                confirmButtonColor: '#8B5CF6'
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 font-sans antialiased">
            <div className="w-full max-w-6xl bg-gray-900 bg-opacity-80 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden border border-gray-700/50 transform transition-all duration-300 hover:shadow-purple-500/30">
                <div className="flex flex-col lg:flex-row">
                    {/* Left Side - Lottie Animation */}
                    <div className="lg:w-1/2 bg-gradient-to-br from-gray-800 to-gray-900 p-8 flex items-center justify-center border-r border-gray-700/50">
                        <div className="text-center">
                            <div className="w-80 h-80 mx-auto mb-6 rounded-full overflow-hidden shadow-lg p-2 bg-gray-700/30">
                                <Lottie
                                    animationData={registrationLotti}
                                    loop={true}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h2 className="text-4xl font-extrabold text-white mb-4 animate-fade-in">
                                Join Our Community
                            </h2>
                            <p className="text-gray-300 text-lg max-w-sm mx-auto">
                                Sign up now to connect with professionals and find exciting opportunities.
                            </p>
                        </div>
                    </div>

                    {/* Right Side - Registration Form */}
                    <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center bg-gray-900/60">
                        <div className="max-w-md mx-auto w-full">
                            <h1 className="text-4xl font-extrabold text-white mb-3">
                                Create Your Account
                            </h1>
                            <p className="text-gray-300 mb-8">
                                Fill in your details to get started with our platform.
                            </p>

                            <form onSubmit={onSubmit} className="space-y-6">
                                {/* Name Field */}
                                <div>
                                    <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" />
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            className={`w-full pl-10 pr-4 py-3 bg-gray-800 border ${errors.name ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition-all`}
                                            placeholder="Enter your full name"
                                        />
                                        {errors.name && <p className="text-red-500 text-xs mt-1 flex items-center"><FaExclamationCircle className="mr-1" />{errors.name}</p>}
                                    </div>
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" />
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            className={`w-full pl-10 pr-10 py-3 bg-gray-800 border ${errors.email ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition-all`}
                                            placeholder="Enter your email"
                                        />
                                        {errors.email && <p className="text-red-500 text-xs mt-1 flex items-center"><FaExclamationCircle className="mr-1" />{errors.email}</p>}
                                    </div>
                                </div>

                                {/* Profile Picture Upload */}
                                <div>
                                    <label htmlFor="image_file" className="block text-gray-300 text-sm font-medium mb-2">
                                        Profile Picture
                                    </label>
                                    <div className="relative flex items-center bg-gray-800 border border-gray-700 rounded-lg p-2">
                                        <label
                                            htmlFor="image_file"
                                            className="cursor-pointer flex items-center justify-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md transition-colors text-sm"
                                        >
                                            <FaUpload className="mr-2" /> Upload Image
                                        </label>
                                        <input
                                            id="image_file"
                                            name="image_file"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => setImageFileName(e.target.files[0] ? e.target.files[0].name : 'No file chosen')}
                                        />
                                        <span className="ml-3 text-gray-400 text-sm truncate">{imageFileName}</span>
                                    </div>
                                    {errors.imageFile && <p className="text-red-500 text-xs mt-1 flex items-center"><FaExclamationCircle className="mr-1" />{errors.imageFile}</p>}
                                </div>


                                {/* Role Selection */}
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">
                                        Select Your Role
                                    </label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <label
                                            className={`flex items-center space-x-3 p-4 rounded-lg cursor-pointer transition-all duration-200 border-2 ${selectedRole === 'worker' ? 'border-purple-500 bg-purple-900/20' : 'border-gray-700 bg-gray-800 hover:border-purple-500 hover:bg-gray-700'}`}
                                        >
                                            <input
                                                type="radio"
                                                name="role"
                                                value="worker"
                                                checked={selectedRole === 'worker'}
                                                onChange={() => setSelectedRole('worker')}
                                                className="form-radio h-5 w-5 text-purple-600 bg-gray-800 border-gray-600 focus:ring-purple-500"
                                            />
                                            <FaUserTie className="text-purple-400 text-2xl" />
                                            <span className="text-white text-lg font-medium">Worker</span>
                                        </label>
                                        <label
                                            className={`flex items-center space-x-3 p-4 rounded-lg cursor-pointer transition-all duration-200 border-2 ${selectedRole === 'buyer' ? 'border-blue-500 bg-blue-900/20' : 'border-gray-700 bg-gray-800 hover:border-blue-500 hover:bg-gray-700'}`}
                                        >
                                            <input
                                                type="radio"
                                                name="role"
                                                value="buyer"
                                                checked={selectedRole === 'buyer'}
                                                onChange={() => setSelectedRole('buyer')}
                                                className="form-radio h-5 w-5 text-blue-600 bg-gray-800 border-gray-600 focus:ring-blue-500"
                                            />
                                            <FaShoppingCart className="text-blue-400 text-2xl" />
                                            <span className="text-white text-lg font-medium">Buyer</span>
                                        </label>
                                    </div>
                                    {errors.role && <p className="text-red-500 text-xs mt-1 flex items-center"><FaExclamationCircle className="mr-1" />{errors.role}</p>}
                                </div>

                                {/* Password Field */}
                                <div>
                                    <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" />
                                        <input
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            className={`w-full pl-10 pr-12 py-3 bg-gray-800 border ${errors.password ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition-all`}
                                            placeholder="Enter your password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                        {errors.password && <p className="text-red-500 text-xs mt-1 flex items-center"><FaExclamationCircle className="mr-1" />{errors.password}</p>}
                                    </div>
                                </div>

                                {/* Confirm Password Field */}
                                <div>
                                    <label htmlFor="confirmPassword" className="block text-gray-300 text-sm font-medium mb-2">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" />
                                        <input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            className={`w-full pl-10 pr-12 py-3 bg-gray-800 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition-all`}
                                            placeholder="Confirm your password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                                        >
                                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1 flex items-center"><FaExclamationCircle className="mr-1" />{errors.confirmPassword}</p>}
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                    {loading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                            Creating Account...
                                        </>
                                    ) : (
                                        'Create Account'
                                    )}
                                </button>
                            </form>

                            {/* Separator */}
                            <div className="my-8 flex items-center">
                                <div className="flex-1 border-t border-gray-700"></div>
                                <span className="px-4 text-gray-400 font-medium text-sm">OR</span>
                                <div className="flex-1 border-t border-gray-700"></div>
                            </div>

                            {/* Sign up with Google Button */}
                            <button
                                type="button"
                                onClick={handleGoogleSignUp}
                                disabled={loading}
                                className="w-full py-3 flex items-center justify-center bg-gray-800 border border-gray-700 text-white font-semibold rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FaGoogle className="mr-3 text-red-500 text-lg" />
                                {loading ? 'Processing...' : 'Sign up with Google'}
                            </button>

                            <p className="text-center text-gray-400 mt-8 text-sm">
                                Already have an account?{' '}
                                <Link to="/login" className="text-purple-400 hover:text-purple-300 font-semibold underline-offset-2 hover:underline">
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