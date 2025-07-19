import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';

import { FaBell } from 'react-icons/fa';
import { AuthContext } from '../../Provider/AuthProvider';
import NotificationItem from '../NotificationItem/NotificationItem';

const NotificationBell = () => {
    const { user, logoutUser } = useContext(AuthContext); // logoutUser ফাংশনটি ধরুন
    const [notifications, setNotifications] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [loading, setLoading] = useState(true);
    const popupRef = useRef(null);
    const bellRef = useRef(null);

    // Unread notifications count
    const unreadCount = notifications.filter(notif => !notif.isRead).length;

    // Fetch notifications
    useEffect(() => {
        const fetchNotifications = async () => {
            if (!user?.email) {
                setNotifications([]);
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/notifications/${user?.email}`,
                    { withCredentials: true }
                );
                setNotifications(response.data);
            } catch (error) {
                console.error('Failed to fetch notifications:', error);
                if (error.response?.data?.logout) {
                    // If server sends logout signal (401/403 with logout: true)
                    logoutUser(); // Force logout from AuthContext
                }
                setNotifications([]);
            } finally {
                setLoading(false);
            }
        };

        const intervalId = setInterval(fetchNotifications, 30000); // প্রতি ৩০ সেকেন্ড পর পর রিফ্রেশ

        // Initial fetch
        fetchNotifications();

        // Cleanup interval on unmount
        return () => clearInterval(intervalId);

    }, [user, logoutUser]); // user এবং logoutUser পরিবর্তন হলে useEffect আবার চলবে


    // Handle clicks outside the popup to close it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                popupRef.current &&
                !popupRef.current.contains(event.target) &&
                bellRef.current &&
                !bellRef.current.contains(event.target)
            ) {
                setShowPopup(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleBellClick = () => {
        setShowPopup(!showPopup);
    };

    const handleNotificationClick = () => {
        setShowPopup(false); // Hide popup after clicking a notification
        // Optionally refetch to update read status immediately if needed
        // fetchNotifications();
    };

    return (
        <div className="relative" ref={bellRef}>
            <button onClick={handleBellClick} className="relative p-2 rounded-full hover:bg-gray-800 cursor-pointer">
                <FaBell className="text-xl text-gray-200" />
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                        {unreadCount}
                    </span>
                )}
            </button>

            {showPopup && (
                <div
                    ref={popupRef}
                    className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden"
                    style={{ maxHeight: '400px', overflowY: 'auto' }} // Added scroll for many notifications
                >
                    <div className="p-3 font-bold text-gray-800 border-b border-gray-200">
                        Notifications
                    </div>
                    {loading ? (
                        <div className="p-4 text-center text-gray-500">Loading notifications...</div>
                    ) : notifications.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">No new notifications.</div>
                    ) : (
                        notifications.map((notif) => (
                            <NotificationItem
                                key={notif._id}
                                notification={notif}
                                onNotificationClick={handleNotificationClick}
                                currentUserEmail={user?.email}
                            />
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default NotificationBell;