

import React from 'react';
import { motion } from 'framer-motion'; // Import motion for animations
import { NavLink } from 'react-router'; // Correct import for react-router-dom's NavLink

// Import Lucide React icons
import { LayoutDashboard, ClipboardList, DollarSign } from 'lucide-react';
// Import React Icons
import { FaClipboardCheck } from 'react-icons/fa'; // Make sure you have react-icons installed: npm install react-icons

const WorkerNavigation = () => {
    return (
        <ul className="space-y-3">

            {/* Task List NavLink */}
            <li>
                <motion.div
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center p-3 rounded-lg transition-colors duration-200 cursor-pointer group"
                    style={{
                        background: 'rgba(255, 255, 255, 0.02)',
                        backdropFilter: 'blur(5px)',
                        WebkitBackdropFilter: 'blur(5px)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                >
                    <NavLink
                        to="/dashboard/tasks"
                        end
                        className={({ isActive }) =>
                            `flex items-center w-full h-full ${isActive
                                ? 'text-white font-semibold'
                                : 'text-gray-400 hover:text-blue-300'
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <LayoutDashboard
                                    className={`h-5 w-5 mr-3 transition-colors duration-200 ${isActive
                                        ? 'text-blue-300' // Slightly brighter blue for icon
                                        : 'text-purple-400 group-hover:text-blue-300'
                                        }`}
                                />
                                <span className="font-medium">Tasks List</span>
                                {isActive && (
                                    <motion.div
                                        className="ml-auto h-2 w-2 rounded-full bg-blue-400"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                    />
                                )}
                            </>
                        )}
                    </NavLink>
                </motion.div>
            </li>

            {/* My Submissions NavLink */}
            <li>
                <motion.div
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center p-3 rounded-lg transition-colors duration-200 cursor-pointer group"
                    style={{
                        background: 'rgba(255, 255, 255, 0.02)',
                        backdropFilter: 'blur(5px)',
                        WebkitBackdropFilter: 'blur(5px)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                >
                    <NavLink
                        to="/dashboard/submissions"
                        className={({ isActive }) =>
                            `flex items-center w-full h-full text-gray-300
               ${isActive ? 'text-blue-400 font-semibold' : 'hover:text-blue-400'}`
                        }
                    >
                        <FaClipboardCheck className="h-5 w-5 mr-3 text-purple-400 group-hover:text-blue-400 transition-colors duration-200" />
                        <span className="font-medium">My Submissions</span>
                    </NavLink>
                </motion.div>
            </li>

            {/* Withdrawals NavLink */}
            <li>
                <motion.div
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center p-3 rounded-lg transition-colors duration-200 cursor-pointer group"
                    style={{
                        background: 'rgba(255, 255, 255, 0.02)',
                        backdropFilter: 'blur(5px)',
                        WebkitBackdropFilter: 'blur(5px)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                >
                    <NavLink
                        to="/dashboard/withdrawals"
                        className={({ isActive }) =>
                            `flex items-center w-full h-full text-gray-300
               ${isActive ? 'text-blue-400 font-semibold' : 'hover:text-blue-400'}`
                        }
                    >
                        <DollarSign className="h-5 w-5 mr-3 text-purple-400 group-hover:text-blue-400 transition-colors duration-200" />
                        <span className="font-medium">Withdrawals</span>
                    </NavLink>
                </motion.div>
            </li>
        </ul>
    );
};

export default WorkerNavigation;