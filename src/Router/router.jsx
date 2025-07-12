import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Registration from "../Pages/Registration/Registration";
import Login from "../Pages/Login/Login";
import Home from "../Pages/Home/Home";
import DashboardLayout from "../Pages/Dashboard/DashboardLayout/DashboardLayout";
import DashboardHomePage from "../Pages/Dashboard/DashboardHomePage/DashboardHomePage";
import AddTask from "../Pages/DashboardBuyerPages/AddTask/AddTask";
import MyTasks from "../Pages/DashboardBuyerPages/MyTasks/MyTasks";






export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement: <p>Error page</p>,
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
      }
    ]
  },
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    errorElement: <p>404 Error....</p>,
    children: [
      {
        index: true,
        Component: DashboardHomePage
      },
      {
        path: "add-task",
        Component: AddTask
      },
      {
        path: "my-tasks",
        Component: MyTasks
      }
    ]
  }
]);