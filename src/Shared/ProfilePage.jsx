import React, { useContext, useState, useEffect } from 'react';
import { FaUserCircle, FaEnvelope, FaCoins, FaEdit, FaSignOutAlt, FaTasks, FaDollarSign } from 'react-icons/fa';
import { Briefcase } from 'lucide-react';
import { useNavigate, Link } from 'react-router'; // Link imported
import Swal from 'sweetalert2';
import axios from 'axios';
import { AuthContext } from '../Provider/AuthProvider';

const ProfilePage = () => {
    const { user, logOut, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    const [userCoin, setUserCoin] = useState(0);
    const [userRole, setUserRole] = useState('Loading...'); // Could be 'Worker', 'Buyer', 'Admin', or 'User'

    // Function to fetch user's coin balance and role from the backend
    const fetchUserCoinsAndRole = async (email) => {
        if (!email) {
            setUserCoin(0);
            setUserRole('Guest');
            return;
        }
        try {
            // Fetch coins
            const coinRes = await axios.get(`${import.meta.env.VITE_API_URL}/my-coins?email=${email}`, {
                withCredentials: true
            });
            setUserCoin(coinRes.data?.currentCoin || 0);

            // Fetch user role
            const roleRes = await axios.get(`${import.meta.env.VITE_API_URL}/user/role/${email}`, {
                withCredentials: true
            });
            setUserRole(roleRes.data?.role || 'User'); // Default to 'User' if role not found
        } catch (error) {
            console.error('Error fetching user data:', error);
            setUserCoin(0);
            setUserRole('User'); // Default role on error
            Swal.fire({
                title: 'Error',
                text: 'Failed to load profile data. Please try again.',
                icon: 'error',
                confirmButtonColor: '#8B5CF6'
            });
        }
    };

    useEffect(() => {
        if (user) {
            fetchUserCoinsAndRole(user.email);
        } else if (!loading) {
            // If not loading and no user, set default states
            setUserCoin(0);
            setUserRole('Guest');
        }
    }, [user, loading]); // Depend on user and loading state

    const handleLogout = async () => {
        try {
            await logOut();
            Swal.fire({
                title: 'Logout Successful!',
                text: 'You have been successfully logged out.',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
            });
            navigate('/login'); // Redirect to login page after logout
        } catch (error) {
            console.error('Logout error:', error);
            Swal.fire({
                title: 'Error',
                text: 'Failed to log out. Please try again.',
                icon: 'error',
                confirmButtonColor: '#8B5CF6'
            });
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-white text-xl flex items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mr-3"></div>
                    Loading Profile...
                </div>
            </div>
        );
    }

    // Mock user data for demonstration if no user is logged in
    const displayUser = user || {
        displayName: 'Guest User',
        email: 'guest@example.com',
        photoURL: 'https://via.placeholder.com/150/8B5CF6/FFFFFF?text=Guest',
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl bg-gray-800/50 backdrop-blur-md rounded-xl shadow-xl overflow-hidden border border-gray-700 p-8 lg:p-10 text-white">
                <div className="flex items-center justify-between mb-8">
                    {/* Logo and Title */}
                    <div className="flex items-center">
                        <div className="bg-purple-600 rounded-xl p-3 shadow-lg mr-3">
                            <Briefcase className="h-8 w-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white">User Profile</h1>
                            <p className="text-sm text-gray-400 font-medium">Your Personal Dashboard</p>
                        </div>
                    </div>
                    {/* Edit Profile Button (Optional, can link to an edit form) */}
                    <Link
                        to="/edit-profile" // Example route for profile edit
                        className="flex items-center bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
                    >
                        <FaEdit className="mr-2" /> Edit Profile
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    {/* Profile Picture and Basic Info */}
                    <div className="md:col-span-1 flex flex-col items-center p-6 bg-gray-700/50 rounded-lg border border-gray-600">
                        {displayUser.photoURL ? (
                            <img
                                src={displayUser.photoURL}
                                alt="Profile"
                                className="w-32 h-32 rounded-full object-cover border-4 border-purple-500 shadow-lg mb-4"
                            />
                        ) : (
                            <FaUserCircle className="w-32 h-32 text-gray-400 mb-4" />
                        )}
                        <h2 className="text-2xl font-bold text-white mb-2 text-center">{displayUser.displayName || 'N/A'}</h2>
                        <p className="text-gray-400 text-sm mb-4">
                            <span className="font-semibold text-white">Role:</span> {userRole}
                        </p>
                        {user && ( // Only show logout button if user is logged in
                            <button
                                onClick={handleLogout}
                                className="flex items-center mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 w-full justify-center"
                            >
                                <FaSignOutAlt className="mr-2" /> Log Out
                            </button>
                        )}
                    </div>

                    {/* Contact and Other Details */}
                    <div className="md:col-span-2 p-6 bg-gray-700/50 rounded-lg border border-gray-600">
                        <h3 className="text-xl font-semibold text-white mb-4 border-b border-gray-600 pb-2">Account Details</h3>
                        <div className="space-y-4">
                            <div className="flex items-center text-lg">
                                <FaEnvelope className="mr-3 text-purple-400" />
                                <span className="font-medium text-gray-300">Email:</span>
                                <span className="ml-2 text-white">{displayUser.email || 'N/A'}</span>
                            </div>
                            <div className="flex items-center text-lg">
                                <FaCoins className="mr-3 text-yellow-400" />
                                <span className="font-medium text-gray-300">Current Coins:</span>
                                <span className="ml-2 text-white font-bold">{userCoin}</span>
                            </div>
                            {/* Additional details can be added here based on user data */}
                            <div className="flex items-center text-lg">
                                <FaTasks className="mr-3 text-blue-400" />
                                <span className="font-medium text-gray-300">Total Completed Tasks:</span>
                                <span className="ml-2 text-white">0</span> {/* Placeholder, replace with actual data */}
                            </div>
                            <div className="flex items-center text-lg">
                                <FaDollarSign className="mr-3 text-green-400" />
                                <span className="font-medium text-gray-300">Total Earnings:</span>
                                <span className="ml-2 text-white">$0.00</span> {/* Placeholder, replace with actual data */}
                            </div>
                        </div>

                        <h3 className="text-xl font-semibold text-white mt-8 mb-4 border-b border-gray-600 pb-2">Recent Activity</h3>
                        <div className="text-gray-400 text-sm italic">
                            No recent activity to display.
                            {/* You can populate this section with actual recent activities (e.g., task submissions, purchases) */}
                        </div>
                    </div>
                </div>

                {/* Navigation to Dashboard sections (optional, depends on your dashboard structure) */}
                <div className="mt-10 pt-6 border-t border-gray-700">
                    <h3 className="text-xl font-semibold text-white mb-4">Quick Links to Dashboard</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {userRole === 'Buyer' && (
                            <Link to="/dashboard/add-task" className="bg-purple-700 hover:bg-purple-800 text-white py-3 px-4 rounded-lg flex items-center justify-center font-semibold transition-colors duration-300">
                                <FaTasks className="mr-2" /> Add New Task
                            </Link>
                        )}
                        {userRole === 'Buyer' && (
                            <Link to="/dashboard/manage-tasks" className="bg-purple-700 hover:bg-purple-800 text-white py-3 px-4 rounded-lg flex items-center justify-center font-semibold transition-colors duration-300">
                                <FaTasks className="mr-2" /> Manage My Tasks
                            </Link>
                        )}
                        {userRole === 'Worker' && (
                            <Link to="/dashboard/my-submissions" className="bg-purple-700 hover:bg-purple-800 text-white py-3 px-4 rounded-lg flex items-center justify-center font-semibold transition-colors duration-300">
                                <FaTasks className="mr-2" /> My Submissions
                            </Link>
                        )}
                        {userRole === 'Admin' && (
                            <Link to="/dashboard/users" className="bg-purple-700 hover:bg-purple-800 text-white py-3 px-4 rounded-lg flex items-center justify-center font-semibold transition-colors duration-300">
                                <FaUserCircle className="mr-2" /> Manage Users
                            </Link>
                        )}
                        {/* Add more links based on role and available dashboard sections */}
                        <Link to="/dashboard" className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg flex items-center justify-center font-semibold transition-colors duration-300">
                                <Briefcase className="mr-2" size={20} /> Go to Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;