import React from 'react';
import BuyerHomePage from '../../DashboardBuyerPages/BuyerHome/BuyerHomePage';
import AdminHome from '../../DashboardAdminPages/AdminHome/AdminHome';
import WorkerHome from '../../DashboardWorkerPages/WorkerHome/WorkerHomw';

const DashboardHomePage = () => {
    return (
        <div>
            <BuyerHomePage></BuyerHomePage>
            <AdminHome></AdminHome>
            <WorkerHome></WorkerHome>
        </div>
    );
};

export default DashboardHomePage;