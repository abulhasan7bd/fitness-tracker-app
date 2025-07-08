import { createBrowserRouter } from "react-router-dom";
import Login from "../components/auth/Login";
import MainLayouts from "../layouts/MainLayouts";
import Signup from "../components/auth/Signup";
import Home from "../pages/Home";
 

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    children: [
      { index: true, element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/about", element: <h3>about</h3> },
      { path: "/contact", element: <h3>Contact</h3> },
    ],
  },
]);

export default router;
