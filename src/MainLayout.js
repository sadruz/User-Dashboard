import React from 'react';
import { Outlet } from 'react-router-dom';

// The Logout button logic is now part of the main layout for consistency.
function LogoutButton() {
  const handleLogout = () => {
    // 1. Clear all data from localStorage and sessionStorage to remove any cached user data.
    localStorage.clear();
    sessionStorage.clear();

    console.log('User logged out and all cached data cleared.');

    // 2. Redirect to the login page. This also forces a hard refresh, clearing any in-memory state.
    window.location.href = '/';
  };

  return (
    <button
      onClick={handleLogout}
      className="px-5 py-2 text-sm font-semibold text-white bg-red-500 rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300"
    >
      Logout
    </button>
  );
}


function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-gray-800">Employee Dashboard</h1>
            <LogoutButton />
          </div>
        </nav>
      </header>
      <main>
        {/* The <Outlet> component will render the specific page component for the current route */}
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;