import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

function LogoutButton() {
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/';
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
    >
      Logout
    </button>
  );
}

function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  // Logic: Only show the 'Back' button if the user is not on the main '/list' page.
  // This prevents navigating back to the login screen from the initial dashboard page.
  const showBackButton = location.pathname !== '/list';

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                <h1 className="text-xl font-bold">Employee Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              {/* Conditionally render the Back button based on our logic */}
              {showBackButton && (
                <button
                  onClick={() => navigate(-1)}
                  className="px-4 py-2 text-sm font-semibold text-white bg-white/20 rounded-md hover:bg-white/30 transition-colors duration-300"
                >
                  Back
                </button>
              )}
              <LogoutButton />
            </div>
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;