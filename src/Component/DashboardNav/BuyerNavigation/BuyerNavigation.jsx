

import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router';

import { LayoutDashboard, PlusSquare, Coins, History } from 'lucide-react';
import { FaTasks } from 'react-icons/fa'; // For My Tasks

const BuyerNavigation = () => {
  return (
    <ul className="space-y-3">

      {/* Add New Task NavLink */}
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
            to="/dashboard/add-task"
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
                <PlusSquare
                  className={`h-5 w-5 mr-3 transition-colors duration-200 ${isActive
                    ? 'text-blue-300' // Slightly brighter blue for icon
                    : 'text-purple-400 group-hover:text-blue-300'
                    }`}
                />
                <span className="font-medium">Add Task</span>
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

      {/* My Tasks NavLink */}
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
            to="/dashboard/my-tasks"
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
                <FaTasks
                  className={`h-5 w-5 mr-3 transition-colors duration-200 ${isActive
                    ? 'text-blue-300' // Slightly brighter blue for icon
                    : 'text-purple-400 group-hover:text-blue-300'
                    }`}
                />
                <span className="font-medium">My Tasks</span>
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

      {/* Purchase Coin NavLink */}
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
            to="/dashboard/purchase-coins"
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
                <Coins
                  className={`h-5 w-5 mr-3 transition-colors duration-200 ${isActive
                    ? 'text-blue-300' // Slightly brighter blue for icon
                    : 'text-purple-400 group-hover:text-blue-300'
                    }`}
                />
                <span className="font-medium">Purchase Coins</span>
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

      {/* Payment History NavLink */}
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
            to="/dashboard/payment-history"
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
                <History
                  className={`h-5 w-5 mr-3 transition-colors duration-200 ${isActive
                    ? 'text-blue-300' // Slightly brighter blue for icon
                    : 'text-purple-400 group-hover:text-blue-300'
                    }`}
                />
                <span className="font-medium">Payment History</span>
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
    </ul>
  );
};

export default BuyerNavigation;