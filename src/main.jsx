import React from "react";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

// Components
import MainLayouts from "./components/MainLayouts";
import Home from "./pages/Home";
import Details from "./pages/Details";
import SignIn from "./components/auth/SignIn";
import Login from "./components/auth/Login";
import AddComponents from "./pages/AddComponents";
import List from "./components/browser/List";
import AuthProvider from "./context/AuthProvider";
import ProtectedRoute from "./components/protected/ProtectedRoute";
import MyList from "./components/myList/MyList";

// Define the routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    children: [
      {
        index: true,
        loader: () => fetch("http://localhost:5000/rommatedata"),
        element: <Home />,
      },
      {
        path: "/details/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:5000/rommate/${params.id}`).then((res) =>
            res.json()
          ),
        element: (
          <ProtectedRoute>
            <Details />
          </ProtectedRoute>
        ),
      },
      {
        path: "/roommateadd",
        element: <AddComponents />,
      },
      {
        path: "/register",
        element: <SignIn />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/browse-listings",
        loader: () => fetch("http://localhost:5000/rommatedata"),
        element: <List />,
      },
      {
        path: "/my-listings",
        element: <MyList />,
      },
    ],
  },
]);

// Render the app
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
