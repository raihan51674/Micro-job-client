import React, { useContext } from 'react';
import { Link } from 'react-router'; // Fixed import
import { Bell, Briefcase, Coins } from 'lucide-react'; // Added Coins icon
import { AuthContext } from '../../../Provider/AuthProvider';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../Shared/LoadingSpinner';
import useRole from '../../../Hooks/useRole';

const DashboardNavbar = () => {

    const { user } = useContext(AuthContext);

    const {role, isRoleLoading} = useRole()

    const { isPending, error, data } = useQuery({
        queryKey: ['coins'],
        queryFn: async() =>
            await axios.get(`${import.meta.env.VITE_API_URL}/my-coins?email=${user.email}`)
    })

    

    if (isPending || isRoleLoading) return <LoadingSpinner></LoadingSpinner>

    if (error) return `${error.message}`

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
            <div className="flex items-center gap-4">

                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2">
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-1 shadow-sm">
                        <Briefcase className="h-8 w-8 lg:h-5 lg:w-5 text-white" />
                    </div>
                    <h1 className="text-lg font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent hidden lg:block">
                        MicroJobs
                    </h1>
                </Link>
            </div>

            {/* Right: Notifications + Profile Info */}
            <div className="flex items-center gap-5">
                {/* Notification */}
                <button
                    className="relative text-gray-300 hover:text-blue-400 transition-colors duration-200 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Notifications"
                >
                    <Bell className="h-6 w-6" />
                    {/* Notification Badge (dynamic if needed) */}
                    <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                        3
                    </span>
                </button>

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
                            {user?.displayName.charAt(0).toUpperCase()}
                        </div>
                    )}
                    <div className="flex items-center gap-1 text-sm font-medium text-gray-100">
                        <Coins className="h-4 w-4 text-yellow-400" />
                        {data?.data}
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
