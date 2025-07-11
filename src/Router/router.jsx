import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Registration from "../Pages/Registration/Registration";
import Login from "../Pages/Login/Login";
import Home from "../Pages/Home/Home";






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
]);