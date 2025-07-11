import React from 'react';
import { Link } from 'react-router'; // Using react-router-dom Link
import { Bell, Briefcase, Menu } from 'lucide-react'; // Import Menu icon

const DashboardNavbar = ({
    userImage,
    userName = 'User Name',
    userRole = 'Guest',
    availableCoins = 0,
    toggleSidebar
}) => {
    return (
        <header
            className="w-full p-4 flex justify-between items-center sticky top-0 z-30" // Sticky top for persistent visibility, increased z-index
            style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(15px) brightness(1.1)',
                WebkitBackdropFilter: 'blur(15px) brightness(1.1)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' // Subtle shadow for depth
            }}
        >
            {/* Left Section: Mobile Hamburger & Always-Visible Logo */}
            <div className="flex items-center gap-4">
                {/* Hamburger menu for mobile, to toggle sidebar */}
                <button
                    onClick={toggleSidebar}
                    className="md:hidden text-gray-300 hover:text-blue-400 transition-colors duration-200 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Open sidebar menu"
                >
                    <Menu className="h-7 w-7" />
                </button>

                {/* Logo (now visible on all screens within the Navbar) */}
                <Link to={"/"} className="flex items-center space-x-2">
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-md p-1 shadow-sm">
                        <Briefcase className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-lg font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                        MicroJobs
                    </h2>
                </Link>
            </div>

            {/* Right Section: Notification, Available Coin | User Image, User Role | User Name */}
            <div className="flex items-center gap-5">

                {/* Notification Icon */}
                <button
                    className="relative text-gray-300 hover:text-blue-400 transition-colors duration-200 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Notifications"
                >
                    <Bell className="h-6 w-6" />
                    {/* Optional: Notification badge - only show if there are notifications */}
                    {true && ( // Replace 'true' with a condition like 'notificationCount > 0'
                        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                            3
                        </span>
                    )}
                </button>

                {/* Available Coins & User Image - now visible on all screen sizes */}
                <div className="flex items-center space-x-3 bg-black/20 rounded-full pr-3 py-1 pl-1 border border-white/10 shadow-sm">
                    {/* User Image */}
                    {userImage ? (
                        <img src={userImage} alt={`${userName}'s profile`} className="h-9 w-9 rounded-full object-cover border-2 border-blue-400" />
                    ) : (
                        <div className="h-9 w-9 rounded-full bg-gray-600 flex items-center justify-center text-sm font-semibold text-white border-2 border-blue-400">
                            {userName.charAt(0).toUpperCase()}
                        </div>
                    )}
                    {/* Available Coins - 'hidden sm:block' removed, now always visible */}
                    <span className="text-sm font-semibold text-gray-200">
                        Coins: {availableCoins}
                    </span>
                </div>

                {/* User Role & User Name - now visible on all screen sizes */}
                <div className="flex flex-col items-end"> {/* 'hidden md:flex' removed, now always visible */}
                    <span className="text-base font-semibold capitalize text-blue-300">{userRole}</span>
                    <span className="text-sm text-gray-300">{userName}</span>
                </div>
            </div>
        </header>
    );
};

export default DashboardNavbar;