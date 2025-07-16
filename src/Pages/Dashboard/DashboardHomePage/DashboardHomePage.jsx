import React from 'react';
import BuyerHomePage from '../../DashboardBuyerPages/BuyerHome/BuyerHomePage';
import AdminHome from '../../DashboardAdminPages/AdminHome/AdminHome';
import WorkerHome from '../../DashboardWorkerPages/WorkerHome/WorkerHomw';
import useRole from '../../../Hooks/useRole';
import LoadingSpinner from '../../../Shared/LoadingSpinner';

const DashboardHomePage = () => {
    const {role, isRoleLoading} = useRole()

    if(isRoleLoading) return <LoadingSpinner></LoadingSpinner>
    return (
        <div>
            {
                role === "worker" && <WorkerHome></WorkerHome>
            }

            {
                role === "buyer" && <BuyerHomePage></BuyerHomePage>
            }

            {
                role === "admin" && <AdminHome></AdminHome>
            }
            {/* <BuyerHomePage></BuyerHomePage>
            <AdminHome></AdminHome>
            <WorkerHome></WorkerHome> */}
        </div>
    );
};

export default DashboardHomePage;