

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
            className={({ isActive }) =>
              `flex items-center w-full h-full text-gray-300
               ${isActive ? 'text-blue-400 font-semibold' : 'hover:text-blue-400'}`
            }
          >
            <PlusSquare className="h-5 w-5 mr-3 text-purple-400 group-hover:text-blue-400 transition-colors duration-200" />
            <span className="font-medium">Add New Task</span>
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
            className={({ isActive }) =>
              `flex items-center w-full h-full text-gray-300
               ${isActive ? 'text-blue-400 font-semibold' : 'hover:text-blue-400'}`
            }
          >
            <FaTasks className="h-5 w-5 mr-3 text-purple-400 group-hover:text-blue-400 transition-colors duration-200" />
            <span className="font-medium">My Tasks</span>
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
            className={({ isActive }) =>
              `flex items-center w-full h-full text-gray-300
               ${isActive ? 'text-blue-400 font-semibold' : 'hover:text-blue-400'}`
            }
          >
            <Coins className="h-5 w-5 mr-3 text-purple-400 group-hover:text-blue-400 transition-colors duration-200" />
            <span className="font-medium">Purchase Coin</span>
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
            className={({ isActive }) =>
              `flex items-center w-full h-full text-gray-300
               ${isActive ? 'text-blue-400 font-semibold' : 'hover:text-blue-400'}`
            }
          >
            <History className="h-5 w-5 mr-3 text-purple-400 group-hover:text-blue-400 transition-colors duration-200" />
            <span className="font-medium">Payment History</span>
          </NavLink>
        </motion.div>
      </li>
    </ul>
  );
};

export default BuyerNavigation;