import React, { useContext, useEffect, useState } from 'react';

import { FaBell } from 'react-icons/fa';
import axios from 'axios';
import { Link } from 'react-router';
import { AuthContext } from '../../Provider/AuthProvider';

const NotificationBell = () => {
    const { user } = useContext(AuthContext);
    const [unreadCount, setUnreadCount] = useState(0);

    const fetchNotifications = async () => {
        if (!user || !user.email) {
            setUnreadCount(0);
            return;
        }
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/notifications?email=${user.email}`, {
                withCredentials: true
            });
            const unread = response.data.filter(notif => !notif.read).length;
            setUnreadCount(unread);
        } catch (error) {
            console.error('Error fetching notifications:', error);
            setUnreadCount(0);
        }
    };

    useEffect(() => {
        fetchNotifications();
        // Poll for new notifications every 60 seconds (adjust interval as needed)
        const intervalId = setInterval(fetchNotifications, 60000);
        return () => clearInterval(intervalId); // Cleanup on unmount
    }, [user]);

    return (
        <Link to="/dashboard/notifications" className="relative p-2 rounded-full hover:bg-gray-700 transition-colors">
            <FaBell className="text-white text-xl" />
            {unreadCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                    {unreadCount}
                </span>
            )}
        </Link>
    );
};

export default NotificationBell;