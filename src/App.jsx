import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import EmployeeFormPage from './pages/EmployeeFormPage';
import { EmployeeContext } from './context/EmployeeContext';

function App() {
    const [employees, setEmployees] = useState([]);
    const API_URL = 'https://project-synapse-server.onrender.com/api/employees';

    // This effect runs once when the component mounts
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                setEmployees(data); // Update state with data from the API
            } catch (error) {
                console.error('Failed to fetch employees:', error);
            }
        };

        fetchEmployees();
    }, []); // The empty dependency array means this runs only once

    const handleDeleteEmployee = async (employeeId) => {
        try {
            const response = await fetch(`${API_URL}/${employeeId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // update the local state
                setEmployees(employees.filter((employee) => employee.id !== employeeId));
            } else {
                console.error('Failed to delete Employee');
            }
        } catch (error) {
            console.error('An error occurred: ', error);
        }
    };

    const handleAddEmployee = async (newEmployee) => {
        try {
            const response = await fetch(`${API_URL}`, {
                method: 'POST',
                headers: {
                    // Tells the server we're sending JSON data
                    'content-type': 'application/json',
                },
                // Convert the JavaScript object to a JSON string for the body
                body: JSON.stringify(newEmployee),
            });

            if (response.ok) {
                setEmployees([...employees, await response.json()]);
            } else {
                console.error('Failed to add employee');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const handleUpdateEmployee = async (employeeToUpdate) => {
        try {
            const response = await fetch(`${API_URL}/${employeeToUpdate.id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(employeeToUpdate),
            });

            if (response.ok) {
                const updatedEmployee = await response.json();
                setEmployees(
                    employees.map((employee) =>
                        employee.id === updatedEmployee.id ? updatedEmployee : employee
                    )
                );
            } else {
                console.error('Failed to update employee');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    return (
        // Data passed through the value will be available to all child component
        <EmployeeContext.Provider
            value={{ employees, handleDeleteEmployee, handleAddEmployee, handleUpdateEmployee }}
        >
            <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/add" element={<EmployeeFormPage />} />
                <Route path="/edit/:employeeId" element={<EmployeeFormPage />} />
            </Routes>
        </EmployeeContext.Provider>
    );
}

export default App;
