import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function List() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
        }));

        setEmployees(processedData);
        setError(null);
      } catch (err) {
        console.error("API Fetching Error: ", err);
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
  
  const navigateToBarGraph = () => {
    navigate('/bar-graph', { state: { employees } });
  };

  const navigateToMap = () => {
    navigate('/map', { state: { employees } });
  };

  if (loading) {
    return <div className="text-center mt-20 text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-20 font-semibold text-red-500">Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Employee List</h2>
        <div className="flex justify-center gap-4 mb-8">
            <button onClick={navigateToBarGraph} className="px-6 py-2 font-semibold text-white bg-green-500 rounded-md hover:bg-green-600 transition-colors duration-300">View Bar Graph</button>
            <button onClick={navigateToMap} className="px-6 py-2 font-semibold text-white bg-teal-500 rounded-md hover:bg-teal-600 transition-colors duration-300">View Map</button>
        </div>
        <ul className="space-y-4">
            {employees.map((employee) => (
            <li
                key={employee.id}
                onClick={() => handleListItemClick(employee.id)}
                className="p-5 bg-white border rounded-lg shadow-sm cursor-pointer hover:shadow-md hover:border-blue-500 transition-all duration-300"
            >
                <p className="font-bold text-lg text-gray-800">{employee.name}</p>
                <p className="text-gray-600">{employee.title}</p>
                <p className="text-sm text-gray-500 mt-1">{employee.city}</p>
            </li>
            ))}
        </ul>
    </div>
  );
}

export default List;