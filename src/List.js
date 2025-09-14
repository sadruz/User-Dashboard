import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const generateEmail = (name) => {
  return name.toLowerCase().replace(/\s+/g, '.') + '@example.com';
};

function List() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('/backend_dev/gettabledata.php', {
          username: 'test',
          password: '123456',
        });
        
        const rawData = response.data.TABLE_DATA.data;
        const processedData = rawData.map((item, index) => ({
          id: index,
          name: item[0],
          title: item[1],
          city: item[2],
          idNumber: item[3],
          hireDate: item[4],
          salary: item[5],
          department: item[1].split(' ').pop(),
          email: generateEmail(item[0]),
        }));

        setEmployees(processedData);
      } catch (err) {
        setError("Failed to fetch data from the API.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleListItemClick = (employeeId) => {
    const employee = employees.find(emp => emp.id === employeeId);
    navigate(`/details/${employeeId}`, { state: { employee } });
  };
  
  const navigateToBarGraph = () => navigate('/bar-graph', { state: { employees } });
  const navigateToMap = () => navigate('/map', { state: { employees } });

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="p-10 text-center text-gray-500">Loading Employee Data...</div>;
  if (error) return <div className="p-10 text-center font-semibold text-red-500">Error: {error}</div>;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* RESPONSIVE HEADER: Stacks vertically by default (mobile-first), then becomes a row on small screens (sm:) and up. */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full sm:max-w-xs">
          <input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <button onClick={navigateToBarGraph} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" /><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" /></svg>
            <span className="hidden sm:inline">Salary Chart</span>
          </button>
          <button onClick={navigateToMap} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
            <span className="hidden sm:inline">Employee Map</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4">
          <h2 className="text-2xl font-bold text-gray-800">Employee Directory</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                {/* RESPONSIVE COLUMNS: Department is hidden by default, but appears on medium screens (md:) and up. Email appears on large screens (lg:) and up. */}
                <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} onClick={() => handleListItemClick(employee.id)} className="hover:bg-gray-100 cursor-pointer transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{employee.title}</td>
                  <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-600">{employee.department}</td>
                  <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-600">{employee.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{employee.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredEmployees.length === 0 && (
            <div className="p-10 text-center text-gray-500">No employees found.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default List;