
import DashboardStructure from '../../../Component/DashboardStructure/DashboardStructure';
import Footer from '../../../Shared/Footer';
import DashboardNavbar from '../DashboardNavbar/DashboardNavbar';

const DashboardLayout = () => {

    return (
        <div
            className=" flex flex-col text-gray-100" 
            style={{
                background: 'radial-gradient(circle at center, #0d1117, #0d1117 80%, #1a202c)',
            }}
        >
            <DashboardNavbar></DashboardNavbar>
            <DashboardStructure></DashboardStructure>
            <Footer></Footer>
        </div>
    );
};

export default DashboardLayout;