import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import axios from 'axios';
import { FaUserEdit, FaSave, FaTimes } from 'react-icons/fa';
import { AuthContext } from '../../Provider/AuthProvider';

const EditProfilePage = () => {
    const { user, loading, reloadUser } = useContext(AuthContext); // Assuming AuthContext provides reloadUser
    const navigate = useNavigate();

    const [displayName, setDisplayName] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [email, setEmail] = useState(''); // Email is usually not editable

    useEffect(() => {
        if (user) {
            setDisplayName(user.displayName || '');
            setPhotoURL(user.photoURL || '');
            setEmail(user.email || ''); // Set email, but keep it read-only
        } else if (!loading) {
            // If not loading and no user, redirect to login or home
            navigate('/login');
            Swal.fire({
                title: 'Access Denied',
                text: 'Please log in to edit your profile.',
                icon: 'warning',
                confirmButtonColor: '#8B5CF6'
            });
        }
    }, [user, loading, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user || !user.email) {
            Swal.fire({
                title: 'Error',
                text: 'User not logged in or email missing.',
                icon: 'error',
                confirmButtonColor: '#8B5CF6'
            });
            return;
        }

        const updatedProfileData = {
            displayName,
            photoURL,
            email: user.email // Ensure email is not changed, send the original
        };

        try {
            // Send updated data to your backend
            const response = await axios.put(
                `${import.meta.env.VITE_API_URL}/user/update-profile`, // Adjust this endpoint as per your backend
                updatedProfileData,
                {
                    withCredentials: true // Important for sending cookies/JWT
                }
            );

            if (response.data.success) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Profile updated successfully.',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });
                // Optionally reload user data from context or directly update it
                if (reloadUser) { // If your AuthContext has a function to reload user data
                    reloadUser();
                } else {
                    // Manual update (less ideal if user context is complex)
                    user.displayName = displayName;
                    user.photoURL = photoURL;
                }
                navigate('/profile'); // Redirect to profile page after update
            } else {
                Swal.fire({
                    title: 'Error',
                    text: response.data.message || 'Failed to update profile.',
                    icon: 'error',
                    confirmButtonColor: '#8B5CF6'
                });
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            Swal.fire({
                title: 'Error',
                text: 'An error occurred while updating profile. Please try again.',
                icon: 'error',
                confirmButtonColor: '#8B5CF6'
            });
        }
    };

    if (loading || !user) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-white text-xl flex items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mr-3"></div>
                    Loading Profile Editor...
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-gray-800/50 backdrop-blur-md rounded-xl shadow-xl overflow-hidden border border-gray-700 p-8 lg:p-10 text-white">
                <div className="flex items-center mb-8">
                    <FaUserEdit className="h-10 w-10 text-purple-500 mr-4" />
                    <div>
                        <h1 className="text-3xl font-bold text-white">Edit Profile</h1>
                        <p className="text-sm text-gray-400 font-medium">Update your personal information</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                            Email Address (Not editable)
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            readOnly
                            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-400 cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <label htmlFor="displayName" className="block text-sm font-medium text-gray-300 mb-1">
                            Display Name
                        </label>
                        <input
                            type="text"
                            id="displayName"
                            name="displayName"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-500"
                            placeholder="Enter your display name"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="photoURL" className="block text-sm font-medium text-gray-300 mb-1">
                            Photo URL
                        </label>
                        <input
                            type="url"
                            id="photoURL"
                            name="photoURL"
                            value={photoURL}
                            onChange={(e) => setPhotoURL(e.target.value)}
                            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-500"
                            placeholder="Enter your profile picture URL"
                        />
                        {photoURL && (
                            <div className="mt-4 flex justify-center">
                                <img src={photoURL} alt="Profile Preview" className="w-24 h-24 rounded-full object-cover border-2 border-gray-600" />
                            </div>
                        )}
                    </div>
                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            type="button"
                            onClick={() => navigate('/profile')} // Go back to profile page
                            className="flex items-center px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg font-semibold text-white transition-colors duration-300"
                        >
                            <FaTimes className="mr-2" /> Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold text-white transition-colors duration-300"
                        >
                            <FaSave className="mr-2" /> Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfilePage;