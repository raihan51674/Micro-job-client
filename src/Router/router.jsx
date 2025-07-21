import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Registration from "../Pages/Registration/Registration";
import Login from "../Pages/Login/Login";
import Home from "../Pages/Home/Home";
import DashboardLayout from "../Pages/Dashboard/DashboardLayout/DashboardLayout";
import DashboardHomePage from "../Pages/Dashboard/DashboardHomePage/DashboardHomePage";
import AddTask from "../Pages/DashboardBuyerPages/AddTask/AddTask";
import MyTasks from "../Pages/DashboardBuyerPages/MyTasks/MyTasks";
import PurchaseCoinComponent from "../Pages/DashboardBuyerPages/PurchaseCoin/PurchaseCoin";
import PaymentHistory from "../Pages/DashboardBuyerPages/PaymentHistory/PaymentHistory";
import ManageUsers from "../Pages/DashboardAdminPages/ManageUsers/ManageUsers";
import ManageTasks from "../Pages/DashboardAdminPages/ManageTasks/ManageTasks";
import TaskList from "../Pages/DashboardWorkerPages/TaskList/TaskList";
import MySubmission from "../Pages/DashboardWorkerPages/MySubmission/MySubmission";
import WorkerWithdrawals from "../Pages/DashboardWorkerPages/WorkerWithdrawals/WorkerWithdrawals";
import PrivetRoute from "../Provider/PrivetRoute";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import LoadingSpinner from "../Shared/LoadingSpinner";
import axios from "axios";
import TaskDetails from "../Pages/DashboardWorkerPages/TaskDetails/TaskDetails";
import ProfilePage from "../Shared/ProfilePage";
import EditProfilePage from "../Pages/EditProfilePage/EditProfilePage ";
import NotificationsPage from "../Component/NotificationsPage/NotificationsPage";






export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home></Home>
      },
      {
        path: "/register",
        Component: Registration
      },
      {
        path: "/login",
        Component: Login
      },
      {
        path: "/profile",
        element: <PrivetRoute>
          <ProfilePage></ProfilePage>
        </PrivetRoute>
      },
      {
        path: "/edit-profile",
        element: <PrivetRoute>
          <EditProfilePage></EditProfilePage>
        </PrivetRoute>
      }
    ]
  },
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <PrivetRoute>
          <DashboardHomePage></DashboardHomePage>
        </PrivetRoute>
      },

      // Worker Routes
      {
        path: "tasks",
        element: <PrivetRoute>
          <TaskList></TaskList>
        </PrivetRoute>,
      },
      {
        path: "submissions",
        element: <PrivetRoute>
          <MySubmission></MySubmission>
        </PrivetRoute>
      },
      {
        path: "withdrawals",
        element: <PrivetRoute>
          <WorkerWithdrawals></WorkerWithdrawals>
        </PrivetRoute>
      },


      // Buyer routes
      {
        path: "add-task",
        element: <PrivetRoute>
          <AddTask></AddTask>
        </PrivetRoute>
      },
      {
        path: "my-tasks/:email",
        element: <PrivetRoute>
          <MyTasks></MyTasks>
        </PrivetRoute>,
        loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/my-tasks/${params?.email}`, {
          method: 'GET',
          credentials: "include"
        }).then(res => res.json()),
        hydrateFallbackElement: <LoadingSpinner></LoadingSpinner>
      },
      {
        path: 'task/:id',
        element: <TaskDetails />,
      },
      {
        path: "purchase-coins",
        element: <PrivetRoute>
          <PurchaseCoinComponent></PurchaseCoinComponent>
        </PrivetRoute>,
        loader: () => axios.get(`${import.meta.env.VITE_API_URL}/coins`)
      },
      {
        path: "payment-history",
        element: <PrivetRoute>
          <PaymentHistory></PaymentHistory>
        </PrivetRoute>
      },

      // admin routes
      {
        path: "manage-users",
        element: <PrivetRoute>
          <ManageUsers></ManageUsers>
        </PrivetRoute>
      },
      {
        path: "manage-tasks",
        element: <PrivetRoute>
          <ManageTasks></ManageTasks>
        </PrivetRoute>
      },
      {
        path: "/dashboard/notifications",
        element: <NotificationsPage />,
      },

    ]
  }
]);