🚀 Employee Dashboard - Project Documentation
1. Overview
The Employee Dashboard is a modern, responsive single-page web application (SPA) built with React. It provides a clean and user-friendly interface for viewing, searching, and visualizing employee data. The application features a secure login, a detailed employee directory, interactive data visualizations, and a location mapping system.

✨ Key Features:
Secure Login: A simple but effective authentication flow to protect employee data.

Responsive Employee Directory: A searchable and sortable table of employees that adapts beautifully to all screen sizes.

Interactive Data Charts: A dynamic bar chart to visualize employee salaries, complete with pagination and display limits.

Geospatial Mapping: An interactive map powered by OpenStreetMap to display employee locations.

Smooth User Experience: Fluid page transitions and animations provide a polished, modern feel.

Professional UI/UX: The entire application is styled with Tailwind CSS for a clean and consistent design.

2. 💻 Core Technologies & Dependencies
This project relies on a curated set of powerful libraries to achieve its functionality and professional look.

Dependency

Role & Purpose

React

The core JavaScript library for building the user interface with its component-based architecture.

React Router DOM

Manages all client-side routing and enables the SPA functionality.

Tailwind CSS

A utility-first CSS framework used for all styling, following a mobile-first approach.

Axios

A promise-based HTTP client used for making network requests to the backend.

Leaflet & React-Leaflet

The open-source solution for creating interactive maps without an API key.

Recharts

A composable charting library used to build the responsive and beautiful salary bar chart.

Framer Motion

A production-ready animation library that creates the smooth page transitions.

3. 🧠 Key Logic & Implementation Details
a. 🔐 Authentication & Route Protection
The application uses a simple but effective token-less authentication strategy.

Login: Upon successful validation of credentials (testuser / Test123), an isAuthenticated flag is set in localStorage.

Route Protection: A ProtectedRoute component checks for this flag. If present, it renders the protected pages; otherwise, it redirects to the login screen.

Logout: The logout button clears all localStorage and sessionStorage and forces a redirect, ensuring all session data is removed.

b. ⬇️ Data Fetching
Employee data is fetched from a backend endpoint using axios within a useEffect hook in the List.js component.

The hook's empty dependency array ([]) ensures data is fetched only once when the component first mounts.

The application gracefully handles loading and error states, displaying informative messages to the user.

c. 🗺️ Interactive Maps (Leaflet)
The map implementation was carefully designed to be robust and handle multiple use cases.

Stable Rendering: The <MapContainer> is rendered unconditionally to prevent common "blank screen" issues. A helper component, MapViewUpdater, then dynamically adjusts the view, preventing React from unmounting the map during re-renders.

Context-Aware Views: The Map.js component intelligently adjusts its title and view (zooming in on a single city or fitting the bounds to multiple cities) based on the data it receives.

User Experience: Zooming via mouse scroll and pinch-to-zoom is disabled, relying only on the +/- buttons. A loading spinner is displayed as an overlay until all map tiles are loaded.

d. 🎬 Animations (Framer Motion)
To create a smooth navigational experience, the main <Routes> component is wrapped with <AnimatePresence>.

Each page is wrapped in a <motion.div> with predefined animation variants.

Crucially, the <Routes> component is passed a key tied to the location.pathname, which triggers the animations on every URL change.

4. ❗ Important Project Notes
⚠️ Critical Setup for Maps
For the Leaflet map to render correctly, its CSS file must be imported globally. The blank screen issue will persist until this is done. Please ensure the following line is at the top of your src/App.js or src/index.js file:

import 'leaflet/dist/leaflet.css';