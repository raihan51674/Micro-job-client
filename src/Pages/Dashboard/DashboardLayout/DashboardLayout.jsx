
import { Outlet, } from 'react-router';

import Footer from '../../../Shared/Footer';
import DashboardNavbar from '../DashboardNavbar/DashboardNavbar';
import DashboardAside from '../DashboardAside/DashboardAside';

const DashboardLayout = () => {

    return (
        <div
            className="min-h-screen flex flex-col text-gray-100" // Changed to flex-col to place footer at the bottom of the whole page
            style={{
                background: 'radial-gradient(circle at center, #0d1117, #0d1117 80%, #1a202c)',
            }}
        >
            <DashboardNavbar></DashboardNavbar>
            <div className="flex flex-1"> {/* This div now holds the sidebar and main content */}
                {/* Sidebar - Desktop */}
                

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col">
                    
                    <DashboardAside></DashboardAside>

                    <main className="flex-1 p-4 md:p-8">
                        <Outlet></Outlet>
                    </main>
                </div>
            </div>
            {/* Footer moved outside the flex container to span the full width of the page */}
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default DashboardLayout;