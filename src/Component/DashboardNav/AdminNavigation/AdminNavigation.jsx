

import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router';

import { LayoutDashboard, Users, ClipboardList, DollarSign, Gavel } from 'lucide-react';

const AdminNavigation = () => {
  return (
    <ul className="space-y-3">

      {/* Manage Users NavLink */}
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
            to="/dashboard/manage-users"
            className={({ isActive }) =>
              `flex items-center w-full h-full text-gray-300
               ${isActive ? 'text-blue-400 font-semibold' : 'hover:text-blue-400'}`
            }
          >
            <Users className="h-5 w-5 mr-3 text-purple-400 group-hover:text-blue-400 transition-colors duration-200" />
            <span className="font-medium">Manage Users</span>
          </NavLink>
        </motion.div>
      </li>

      {/* Manage Tasks NavLink */}
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
            to="/dashboard/manage-tasks"
            className={({ isActive }) =>
              `flex items-center w-full h-full text-gray-300
               ${isActive ? 'text-blue-400 font-semibold' : 'hover:text-blue-400'}`
            }
          >
            <ClipboardList className="h-5 w-5 mr-3 text-purple-400 group-hover:text-blue-400 transition-colors duration-200" />
            <span className="font-medium">Manage Tasks</span>
          </NavLink>
        </motion.div>
      </li>
    </ul>
  );
};

export default AdminNavigation;