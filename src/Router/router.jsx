import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Registration from "../Pages/Registration/Registration";
import Login from "../Pages/Login/Login";






export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement: <p>Error page</p>,
    children: [
      {
        index: true,
        element: <p>Helllo coder</p>
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