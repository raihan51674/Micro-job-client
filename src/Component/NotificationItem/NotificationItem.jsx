import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import axios from 'axios';

const NotificationItem = ({ notification, onNotificationClick, currentUserEmail }) => {
    const navigate = useNavigate();

    const handleClick = async () => {
        // Mark as read on the backend
        try {
            await axios.patch(
                `${import.meta.env.VITE_API_URL}/notifications/mark-as-read/${notification._id}`,
                {}, // Empty body
                { withCredentials: true }
            );
        } catch (error) {
            console.error('Failed to mark notification as read:', error);
            // Optionally handle errors, but don't block navigation
        }

        onNotificationClick(); // Hide the pop-up
        if (notification.actionRoute) {
            navigate(notification.actionRoute);
        }
    };

    const formattedTime = new Date(notification.createdAt).toLocaleString();

    return (
        <div
            className={`p-3 border-b border-gray-200 cursor-pointer ${notification.isRead ? 'bg-gray-50 text-gray-600' : 'bg-white text-gray-800 font-semibold'}`}
            onClick={handleClick}
        >
            <p className="text-sm">{notification.message}</p>
            <p className="text-xs text-gray-500 mt-1">
                {formattedTime}
            </p>
        </div>
    );
};

NotificationItem.propTypes = {
    notification: PropTypes.object.isRequired,
    onNotificationClick: PropTypes.func.isRequired,
    currentUserEmail: PropTypes.string.isRequired,
};

export default NotificationItem;