import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function BarGraph() {
  const navigate = useNavigate();
  const location = useLocation();
  const employees = location.state?.employees || [];
  const [currentPage, setCurrentPage] = useState(0);

  const employeesPerPage = 10;
  const totalPages = Math.ceil(employees.length / employeesPerPage);
  const startIndex = currentPage * employeesPerPage;
  const endIndex = startIndex + employeesPerPage;
  const currentEmployees = employees.slice(startIndex, endIndex);

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages - 1));
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 0));
  };
  
  const buttonStyles = "px-6 py-2 font-semibold text-white bg-gray-600 rounded-md hover:bg-gray-700 transition-colors duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed";

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 text-center">
        <div className="p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Employee Salaries</h2>
            <p className="text-gray-500 mb-8">Showing {startIndex + 1} - {Math.min(endIndex, employees.length)} of {employees.length}</p>
            
            <div className="flex items-end justify-center h-64 border-b-2 border-gray-300 pb-2">
            {currentEmployees.length > 0 ? currentEmployees.map((emp) => {
                const salary = parseInt(emp.salary.replace(/[^0-9]/g, ''), 10);
                const maxSalary = 200000; // Adjusted for better visual scaling
                const barHeight = Math.min((salary / maxSalary) * 100, 100);
                return (
                <div
                    key={emp.id}
                    className="relative w-10 mx-1 bg-blue-500 rounded-t-md"
                    // Dynamic height must be an inline style
                    style={{ height: `${barHeight}%`, transition: 'height 0.3s ease-in-out' }}
                    title={`${emp.name}: ${emp.salary}`}
                >
                    <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-gray-600">
                    {emp.name.split(' ')[0]}
                    </div>
                </div>
                );
            }) : <p className="self-center text-gray-400">No data available to plot.</p>}
            </div>

            <div className="flex justify-center mt-12 gap-4">
                <button onClick={handlePrevPage} disabled={currentPage === 0} className={buttonStyles}>
                    Previous 10
                </button>
                <button onClick={handleNextPage} disabled={currentPage >= totalPages - 1} className={buttonStyles}>
                    Next 10
                </button>
            </div>
        </div>
        <button onClick={() => navigate(-1)} className="px-6 py-2 mt-8 font-semibold text-white bg-gray-500 rounded-md hover:bg-gray-600 transition-colors duration-300">
            Go Back
        </button>
    </div>
  );
}

export default BarGraph;