import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import Record from "./components/Record";
import RecordList from "./components/RecordList";
import "./index.css";

/**
 * Defines the application routes using React Router.
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Main layout (could contain a Navbar, etc.)
    children: [
      {
        path: "/", // Home route - Displays the list of records
        element: <RecordList />,
      },
    ],
  },
  {
    path: "/create",
    element: <App />, // Main layout
    children: [
      {
        path: "/create", // Create record page
        element: <Record />,
      },
    ],
  },
  {
    path: "/edit/:id",
    element: <App />, // Main layout
    children: [
      {
        path: "/edit/:id", // Edit record page
        element: <Record />,
      },
    ],
  },
]);

/**
 * Renders the application to the DOM.
 */
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
