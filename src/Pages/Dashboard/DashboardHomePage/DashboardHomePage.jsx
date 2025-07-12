import React from 'react';
import BuyerHomePage from '../../DashboardBuyerPages/BuyerHome/BuyerHomePage';
import AdminHome from '../../DashboardAdminPages/AdminHome/AdminHome';

const DashboardHomePage = () => {
    return (
        <div>
            <BuyerHomePage></BuyerHomePage>
            <AdminHome></AdminHome>
        </div>
    );
};

export default DashboardHomePage;