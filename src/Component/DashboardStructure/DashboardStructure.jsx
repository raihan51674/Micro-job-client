// DashboardStructure.jsx

import React from 'react';
import { Outlet } from 'react-router'; // Make sure to import from 'react-router-dom'
import DashboardAside from '../../Pages/Dashboard/DashboardAside/DashboardAside';

const DashboardStructure = () => {
    return (
        <div className="flex flex-1"> {/* Added flex-1 to allow the main content to take remaining space */}
            {/* The DashboardAside component itself now handles its fixed positioning on large screens */}
            <DashboardAside></DashboardAside>

            {/* Main Content Area */}
            {/* Added lg:ml-64 to push content to the right of the fixed sidebar on large screens */}
            <div className="flex-1 px-4 lg:px-6 lg:ml-64 overflow-y-auto"> {/* Added overflow-y-auto here */}
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashboardStructure;