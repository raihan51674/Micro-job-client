import React from 'react';
import { Outlet } from 'react-router';
import DashboardAside from '../../Pages/Dashboard/DashboardAside/DashboardAside';

const DashboardStructure = () => {
    return (
        <div>
            <div className="flex flex-1"> 
                

                <DashboardAside></DashboardAside>
                {/* Main Content Area */}
                <div className="flex-1 flex flex-col">
                    
                    <main className="flex-1 px-4 md:px-8">
                        <Outlet></Outlet>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default DashboardStructure;