import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import EmployeeFormPage from './pages/EmployeeFormPage';
import { EmployeeContext } from './context/EmployeeContext';

function App() {
    const initialEmployees = [
        {
            id: 1,
            firstName: 'Alex',
            lastName: 'Feebly',
            role: 'Senior Engineer',
            project: 'Meta AI',
        },
        {
            id: 2,
            firstName: 'John',
            lastName: 'Doe',
            role: 'Product Owner',
            project: 'Illios',
        },
        {
            id: 3,
            firstName: 'Alexandra',
            lastName: 'Chan',
            role: 'Quality Analyst',
            project: 'Illios',
        },
    ];

    const [employees, setEmployees] = useState(initialEmployees);

    const handleDeleteEmployee = (employeeId) => {
        const updatedEmployees = employees.filter((e) => e.id !== employeeId);
        return setEmployees(updatedEmployees);
    };

    const handleAddEmployee = (newEmployee) => {
        const employeeWithId = { ...newEmployee, id: Date.now() };
        setEmployees([...employees, employeeWithId]);
    };

    const handleUpdateEmployee = (updatedEmployee) => {
        setEmployees(
            employees.map((employee) => {
                return employee.id === updatedEmployee.id ? updatedEmployee : employee;
            })
        );
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
