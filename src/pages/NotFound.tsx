
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md">
        <div className="bg-polaris-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <span className="text-polaris-indigo-600 text-2xl font-bold">404</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Page not found</h1>
        <p className="text-gray-600 mb-6">Sorry, we couldn't find the page you're looking for.</p>
        <Link to="/" className="polaris-button">
          Return to dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
