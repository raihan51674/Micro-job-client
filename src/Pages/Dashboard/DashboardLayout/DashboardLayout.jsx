// DashboardLayout.jsx
import React from 'react';
import { Outlet } from 'react-router'; // Make sure to import Outlet here
import DashboardAside from '../../../Pages/Dashboard/DashboardAside/DashboardAside';
import Footer from '../../../Shared/Footer';
import DashboardNavbar from '../DashboardNavbar/DashboardNavbar';

const DashboardLayout = () => {
    return (
        <div
            className="flex min-h-screen text-gray-100" // Use flex on the outer div
            style={{
                background: 'radial-gradient(circle at center, #0d1117, #0d1117 80%, #1a202c)',
            }}
        >
            {/* Left Side: DashboardAside (Navigation) */}
            {/* On large screens, the aside will be fixed and occupy lg:w-64 space */}
            {/* On smaller screens, it will handle its mobile toggle behavior internally */}
            <DashboardAside />

            {/* Right Side: Main Content Area (Navbar, Outlet, Footer) */}
            {/* flex-1 ensures it takes remaining space. lg:ml-64 adds space for the fixed sidebar. */}
            <div className="flex-1 flex flex-col lg:ml-64">
                {/* Navbar */}
                <DashboardNavbar />

                {/* Main content sections based on routes */}
                {/* overflow-y-auto allows content inside Outlet to scroll independently */}
                <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
                    <Outlet />
                </main>

                {/* Footer */}
                <Footer />
            </div>
        </div>
    );
};

export default DashboardLayout;