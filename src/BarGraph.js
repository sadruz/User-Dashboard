import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; 
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function BarGraph() {
  const location = useLocation(); // navigate constant removed
  const employees = location.state?.employees || [];
  
  const [currentPage, setCurrentPage] = useState(0);
  const [employeesPerPage, setEmployeesPerPage] = useState(5);

  const totalPages = employeesPerPage === 'all' ? 1 : Math.ceil(employees.length / employeesPerPage);
  
  const handleLimitChange = (e) => {
    const newLimit = e.target.value === 'all' ? 'all' : Number(e.target.value);
    setEmployeesPerPage(newLimit);
    setCurrentPage(0);
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages - 1));
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 0));
  };

  const startIndex = currentPage * (employeesPerPage === 'all' ? employees.length : employeesPerPage);
  const currentEmployees = employeesPerPage === 'all' 
    ? employees 
    : employees.slice(startIndex, startIndex + employeesPerPage);
  
  const chartData = currentEmployees.map(emp => ({
    name: emp.name,
    'Salary ($)': parseInt(emp.salary.replace(/[^0-9]/g, ''), 10)
  }));
  
  const formatYAxis = (tickItem) => {
    return `$${(tickItem / 1000)}k`;
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Employee Salary Chart</h2>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="w-full h-96">
            {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <YAxis tickFormatter={formatYAxis} tick={{ fontSize: 12 }} />
                        <Tooltip 
                            formatter={(value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(value)}
                            cursor={{ fill: 'rgba(238, 242, 255, 0.6)' }}
                        />
                        <Legend />
                        <Bar dataKey="Salary ($)" fill="#8b5cf6" />
                    </BarChart>
                </ResponsiveContainer>
            ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                    No employee data available to display.
                </div>
            )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
        <div className="flex items-center gap-2">
            <label htmlFor="limit" className="text-sm font-medium text-gray-700">Show:</label>
            <select
                id="limit"
                value={employeesPerPage}
                onChange={handleLimitChange}
                className="border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={'all'}>All</option>
            </select>
        </div>
        
        {employeesPerPage !== 'all' && (
            <div className="flex items-center gap-4">
                <button 
                    onClick={handlePrevPage} 
                    disabled={currentPage === 0}
                    className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-300"
                >
                    Previous
                </button>
                <span className="text-sm text-gray-700">
                    Page {currentPage + 1} of {totalPages}
                </span>
                <button 
                    onClick={handleNextPage} 
                    disabled={currentPage >= totalPages - 1}
                    className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-300"
                >
                    Next
                </button>
            </div>
        )}
      </div>
    </div>
  );
}

export default BarGraph;