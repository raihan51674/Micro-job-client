import React, { useContext, useEffect, useState } from 'react';

import axios from 'axios';
import Swal from 'sweetalert2';
import { FaBell, FaCheckCircle, FaTrashAlt } from 'react-icons/fa';
import { format } from 'date-fns';
import { Link } from 'react-router';
import { AuthContext } from '../../Provider/AuthProvider';

const NotificationsPage = () => {
    const { user, loading } = useContext(AuthContext);
    const [notifications, setNotifications] = useState([]);
    const [pageLoading, setPageLoading] = useState(true);

    const fetchNotifications = async () => {
        if (!user || !user.email) {
            setNotifications([]);
            setPageLoading(false);
            return;
        }
        try {
            setPageLoading(true);
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/notifications?email=${user.email}`, {
                withCredentials: true
            });
            setNotifications(response.data);
        } catch (error) {
            console.error('Error fetching notifications:', error);
            Swal.fire('Error', 'Failed to load notifications.', 'error');
        } finally {
            setPageLoading(false);
        }
    };

    useEffect(() => {
        if (!loading && user) {
            fetchNotifications();
        }
    }, [user, loading]);

    const handleMarkAsRead = async (id) => {
        try {
            await axios.patch(`${import.meta.env.VITE_API_URL}/notifications/mark-read/${id}`, {}, {
                withCredentials: true
            });
            fetchNotifications(); // Reload notifications to update status
        } catch (error) {
            console.error('Error marking as read:', error);
            Swal.fire('Error', 'Failed to mark notification as read.', 'error');
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            await axios.patch(`${import.meta.env.VITE_API_URL}/notifications/mark-all-read`, {}, {
                withCredentials: true
            });
            fetchNotifications(); // Reload notifications
            Swal.fire('Success', 'All notifications marked as read.', 'success');
        } catch (error) {
            console.error('Error marking all as read:', error);
            Swal.fire('Error', 'Failed to mark all notifications as read.', 'error');
        }
    };

    const handleDeleteNotification = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`${import.meta.env.VITE_API_URL}/notifications/${id}`, {
                        withCredentials: true
                    });
                    fetchNotifications();
                    Swal.fire('Deleted!', 'Your notification has been deleted.', 'success');
                } catch (error) {
                    console.error('Error deleting notification:', error);
                    Swal.fire('Error', 'Failed to delete notification.', 'error');
                }
            }
        });
    };

    if (loading || pageLoading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-white text-xl flex items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mr-3"></div>
                    Loading Notifications...
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 text-white text-lg">
                Please log in to view your notifications.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 p-4 lg:p-8">
            <div className="max-w-4xl mx-auto bg-gray-800/50 backdrop-blur-md rounded-xl shadow-xl overflow-hidden border border-gray-700 p-6 lg:p-8 text-white">
                <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
                    <h2 className="text-3xl font-bold flex items-center">
                        <FaBell className="mr-3 text-purple-500" /> Notifications
                    </h2>
                    {notifications.some(n => !n.read) && (
                        <button
                            onClick={handleMarkAllAsRead}
                            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center"
                        >
                            <FaCheckCircle className="mr-2" /> Mark All as Read
                        </button>
                    )}
                </div>

                {notifications.length === 0 ? (
                    <div className="text-center text-gray-400 text-lg py-10">
                        You have no notifications yet.
                    </div>
                ) : (
                    <div className="space-y-4">
                        {notifications.map((notification) => (
                            <div
                                key={notification._id}
                                className={`p-4 rounded-lg flex items-start justify-between transition-all duration-200 ${
                                    notification.read ? 'bg-gray-700 text-gray-400' : 'bg-blue-900/40 border border-blue-600 text-white'
                                }`}
                            >
                                <div className="flex-grow">
                                    <p className={`font-semibold ${notification.read ? 'text-gray-300' : 'text-white'}`}>
                                        {notification.message}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        {format(new Date(notification.timestamp), 'PPP p')}
                                    </p>
                                </div>
                                <div className="flex space-x-2 ml-4">
                                    {!notification.read && (
                                        <button
                                            onClick={() => handleMarkAsRead(notification._id)}
                                            className="p-2 text-green-400 hover:text-green-300"
                                            title="Mark as Read"
                                        >
                                            <FaCheckCircle />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDeleteNotification(notification._id)}
                                        className="p-2 text-red-400 hover:text-red-300"
                                        title="Delete Notification"
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotificationsPage;