import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

/**
 * Main application layout component.
 * - Includes the Navbar for navigation.
 * - Uses React Router's `Outlet` to render the current route's component.
 */
const App = () => {
  return (
    <div className="w-full p-6">
      {/* Navigation bar */}
      <Navbar />
      
      {/* Renders the child components based on the current route */}
      <Outlet />
    </div>
  );
};

export default App;
