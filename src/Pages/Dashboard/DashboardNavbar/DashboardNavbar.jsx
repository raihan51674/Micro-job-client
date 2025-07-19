import React, { useContext } from 'react';
import { Link } from 'react-router'; // 'react-router-dom' সঠিক ইম্পোর্ট
import { Briefcase, Coins } from 'lucide-react'; // Bell আইকন NotificationBell এর ভেতরে থাকবে

import LoadingSpinner from '../../../Shared/LoadingSpinner';
import useUserCoins from '../../../Hooks/useUserCoins';
import NotificationBell from '../../../Component/NotificationBell/NotificationBell';
import { AuthContext } from '../../../Provider/AuthProvider';
import useRole from '../../../Hooks/useRole';


const DashboardNavbar = () => {
    const { user } = useContext(AuthContext);

    const { role, isRoleLoading } = useRole();
    const { coins, isLoading, refetch } = useUserCoins(); // refetch ব্যবহার না করলেও রাখা ভালো

    // যদি user ডেটা লোড না হয়, তবে loadingSpinner দেখান
    if (isLoading || isRoleLoading || !user) return <LoadingSpinner />;

    return (
        <header
            className="w-full px-6 lg:px-14 py-3 flex justify-between items-center sticky top-0 z-30 backdrop-blur-xl border-b border-white/10 shadow-md"
            style={{
                background: 'rgba(255, 255, 255, 0.04)',
                WebkitBackdropFilter: 'blur(15px) brightness(1.05)',
                backdropFilter: 'blur(15px) brightness(1.05)'
            }}
        >
            {/* Left: Logo & Hamburger */}
            <div></div>

            {/* Right: Notifications + Profile Info */}
            <div className="flex items-center gap-5">
                {/* Notification Bell Component */}
                {/* ✅ এখানে NotificationBell কম্পোনেন্টটি যোগ করুন */}
                <NotificationBell />

                {/* Coins + User Image */}
                <div className="flex items-center gap-2 bg-black/30 px-3 py-1 rounded-full border border-white/10 shadow-sm">
                    {user?.photoURL ? (
                        <img
                            src={user?.photoURL}
                            alt={`${user?.displayName}'s avatar`}
                            className="h-9 w-9 rounded-full object-cover border-2 border-blue-500"
                        />
                    ) : (
                        <div className="h-9 w-9 rounded-full bg-gray-600 flex items-center justify-center text-white font-semibold border-2 border-blue-500">
                            {user?.displayName?.charAt(0).toUpperCase() || ''} {/* ✅ Added nullish coalescing for safety */}
                        </div>
                    )}
                    <div className="flex items-center gap-1 text-sm font-medium text-gray-100">
                        <Coins className="h-4 w-4 text-yellow-400" />
                        {coins} {/* ✅ Display coins from useUserCoins */}
                    </div>
                </div>

                {/* User Name + Role */}
                <div className="flex flex-col items-end text-right">
                    <span className="text-sm text-blue-300 font-semibold capitalize">{role}</span>
                    <span className="text-sm text-gray-300 truncate max-w-[120px]">{user?.displayName}</span>
                </div>
            </div>
        </header>
    );
};

export default DashboardNavbar;