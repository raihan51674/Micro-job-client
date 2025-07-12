import React from 'react';
import { Outlet } from 'react-router';
import DashboardAside from '../../Pages/Dashboard/DashboardAside/DashboardAside';

const DashboardStructure = () => {
    return (
        <div>
            <div className="flex">

                <DashboardAside></DashboardAside>
                {/* Main Content Area */}
                <div className="flex-1 px-4 lg:px-6">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default DashboardStructure;