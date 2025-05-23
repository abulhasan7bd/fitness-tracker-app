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
import AuthProvider from "./context/AuthProvider";
import ProtectedRoute from "./components/protected/ProtectedRoute";
import MyList from "./components/myList/MyList";
import Edit from "./components/myList/Edit";
import NotFoundPage from "./pages/NotFoundPage";
import BrowserListinWrapper from "./components/browser/BrowserListinWrapper";

// Define the routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    children: [
      {
        index: true,
        loader: () =>
          fetch("https://rommate-founder-server.vercel.app/rommatedata"),
        element: <Home />,
      },
      { path: "*", element: <NotFoundPage /> },
      {
        path: "/details/:id",
        loader: ({ params }) =>
          fetch(
            `https://rommate-founder-server.vercel.app/rommate/${params.id}`
          ).then((res) => res.json()),
        element: (
          <ProtectedRoute>
            <Details />
          </ProtectedRoute>
        ),
      },
      {
        path: "/roommateadd",
        element: (
          <ProtectedRoute>
            <AddComponents />
          </ProtectedRoute>
        ),
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
        loader: () =>
          fetch("https://rommate-founder-server.vercel.app/rommatedata"),
        element: <BrowserListinWrapper />,
      },
      {
        path: "/my-listings",
        element: (
          <ProtectedRoute>
            <MyList />
          </ProtectedRoute>
        ),
      },
      {
        path: "/my-listings/edit/:id",
        loader: ({ params }) =>
          fetch(
            `https://rommate-founder-server.vercel.app/rommate/${params.id}`
          ),
        element: <Edit />,
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
