
import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, LayoutDashboard, Settings, Users, ClipboardList, DollarSign, Menu, X } from 'lucide-react'; // Icons for navigation
import { Link, NavLink, Outlet, useNavigate } from 'react-router';
import WorkerNavigation from '../../../Component/DashboardNav/WorkerNavigation/WorkerNavigation';
import BuyerNavigation from '../../../Component/DashboardNav/BuyerNavigation/BuyerNavigation';
import AdminNavigation from '../../../Component/DashboardNav/AdminNavigation/AdminNavigation';
import { AuthContext } from '../../../Provider/AuthProvider';
import toast from 'react-hot-toast';

const DashboardLayout = () => { // Default role for demo
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const {logOut} = useContext((AuthContext))
    const navigate = useNavigate();

    const logout = () => {
        logOut();
        toast.success('Successfully Logout!')
        navigate("/")
    }



    return (
        <div
            className="min-h-screen flex flex-col md:flex-row text-gray-100"
            style={{
                background: 'radial-gradient(circle at center, #0d1117, #0d1117 80%, #1a202c)',
            }}
        >
            {/* Sidebar - Desktop */}
            <aside
                className="hidden md:flex flex-col w-64 bg-black/30 backdrop-blur-md border-r border-white/10 p-6 shadow-lg relative z-20"
                style={{
                    minHeight: '100vh',
                    background: 'rgba(255, 255, 255, 0.05)', // Lighter glassy effect for sidebar
                    backdropFilter: 'blur(15px) brightness(1.1)',
                    WebkitBackdropFilter: 'blur(15px) brightness(1.1)',
                    borderRight: '1px solid rgba(255, 255, 255, 0.1)',
                }}
            >
                {/* Logo */}
                <Link to={"/"} className="flex items-center space-x-3 mb-10 mt-2">
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-2 shadow-md">
                        <Briefcase className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                        MicroJobs
                    </h2>
                </Link>

                {/* Navigation */}
                <nav className="flex-1">
                    <ul className="space-y-3">
                        {/* Home navlink */}
                        <li>
                            <motion.div
                                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center p-3 rounded-lg transition-colors duration-200 cursor-pointer group"
                                // Apply the glassy background effect to the motion.div
                                style={{
                                    background: 'rgba(255, 255, 255, 0.02)', // Slightly transparent initial background
                                    backdropFilter: 'blur(5px)',
                                    WebkitBackdropFilter: 'blur(5px)',
                                    border: '1px solid rgba(255, 255, 255, 0.08)',
                                }}
                            >
                                <NavLink
                                    to="/dashboard" // Use 'to' prop for react-router-dom
                                    // Use a function for className to apply active styles
                                    className={({ isActive }) =>
                                        `flex items-center w-full h-full text-gray-300
                                        ${isActive ? 'text-blue-400 font-semibold' : 'hover:text-blue-400'}`
                                    }
                                >
                                    <LayoutDashboard className="h-5 w-5 mr-3 text-purple-400 group-hover:text-blue-400 transition-colors duration-200" />
                                    <span className="font-medium">Home</span>
                                </NavLink>
                            </motion.div>
                        </li>
                        <WorkerNavigation></WorkerNavigation>
                        <BuyerNavigation></BuyerNavigation>
                        <AdminNavigation></AdminNavigation>
                    </ul>
                </nav>

                {/* User Info / Footer in Sidebar */}
                <div className="mt-auto pt-6 border-t border-white/10 text-center">
                    <p className="text-sm text-gray-400">Logged in as: <span className="font-semibold capitalize">{"userRole"}</span></p>
                    <button onClick={logout} className="mt-3 px-4 py-2 text-sm bg-red-600 hover:bg-red-700 rounded-lg transition-colors">
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                {/* Mobile Header / Navbar */}
                <header
                    className="md:hidden bg-black/30 backdrop-blur-md border-b border-white/10 p-4 flex justify-between items-center relative z-20"
                    style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(15px) brightness(1.1)',
                        WebkitBackdropFilter: 'blur(15px) brightness(1.1)',
                    }}
                >
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-md p-1 shadow-sm">
                            <Briefcase className="h-5 w-5 text-white" />
                        </div>
                        <h2 className="text-lg font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                            MicroJobs
                        </h2>
                    </div>
                    <button onClick={() => setIsSidebarOpen(true)} className="text-gray-300">
                        <Menu className="h-7 w-7" />
                    </button>
                </header>

                {/* Mobile Sidebar Overlay */}
                <AnimatePresence>
                    {isSidebarOpen && (
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
                            className="fixed inset-0  z-50 md:hidden" // Dark overlay
                            onClick={() => setIsSidebarOpen(false)} // Close when clicking outside
                        >
                            <motion.aside
                                initial={{ x: '-100%' }} // Initial position for the sidebar itself
                                animate={{ x: 0 }}
                                exit={{ x: '-100%' }}
                                transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
                                className="flex flex-col w-64 h-full bg-black/60 backdrop-blur-xl p-6 border-r border-white/20"
                                style={{
                                    background: 'rgba(255, 255, 255, 0.08)',
                                    backdropFilter: 'blur(20px) brightness(1.2)',
                                    WebkitBackdropFilter: 'blur(20px) brightness(1.2)',
                                }}
                                onClick={e => e.stopPropagation()} // Prevent closing sidebar when clicking inside it
                            >
                                <div className="flex justify-between items-center mb-10 mt-2">
                                    <Link to={"/"} className="flex items-center space-x-2">
                                        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-2 shadow-md">
                                            <Briefcase className="h-6 w-6 text-white" />
                                        </div>
                                        <h2 className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                                            MicroJobs
                                        </h2>
                                    </Link>
                                    <button onClick={() => setIsSidebarOpen(false)} className="text-gray-300">
                                        <X className="h-7 w-7" />
                                    </button>
                                </div>

                                <nav className="flex-1">
                                    <ul className="space-y-3">
                                        {/* Home navlink */}
                                        <li>
                                            <motion.div
                                                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' }}
                                                whileTap={{ scale: 0.98 }}
                                                className="flex items-center p-3 rounded-lg transition-colors duration-200 cursor-pointer group"
                                                // Apply the glassy background effect to the motion.div
                                                style={{
                                                    background: 'rgba(255, 255, 255, 0.02)', // Slightly transparent initial background
                                                    backdropFilter: 'blur(5px)',
                                                    WebkitBackdropFilter: 'blur(5px)',
                                                    border: '1px solid rgba(255, 255, 255, 0.08)',
                                                }}
                                            >
                                                <NavLink
                                                    to="/dashboard" // Use 'to' prop for react-router-dom
                                                    // Use a function for className to apply active styles
                                                    className={({ isActive }) =>
                                                        `flex items-center w-full h-full text-gray-300
                                        ${isActive ? 'text-blue-400 font-semibold' : 'hover:text-blue-400'}`
                                                    }
                                                >
                                                    <LayoutDashboard className="h-5 w-5 mr-3 text-purple-400 group-hover:text-blue-400 transition-colors duration-200" />
                                                    <span className="font-medium">Home</span>
                                                </NavLink>
                                            </motion.div>
                                        </li>
                                        <WorkerNavigation></WorkerNavigation>
                                        <BuyerNavigation></BuyerNavigation>
                                        <AdminNavigation></AdminNavigation>
                                    </ul>
                                </nav>

                                <div className="mt-auto pt-6 border-t border-white/10 text-center">
                                    <p className="text-sm text-gray-400">Logged in as: <span className="font-semibold capitalize">{"userRole"}</span></p>
                                    <button onClick={logout} className="mt-3 px-4 py-2 text-sm bg-red-600 hover:bg-red-700 rounded-lg transition-colors">
                                        Logout
                                    </button>
                                </div>
                            </motion.aside>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main Content Area where actual dashboards (Worker/Buyer/Admin) will render */}
                <main className="flex-1 p-4 md:p-8">
                    <Outlet></Outlet>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;