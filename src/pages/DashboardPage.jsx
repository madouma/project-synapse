import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserList } from '../components/UserList';
import { EmployeeContext } from '../context/EmployeeContext';

function DashboardPage() {
    const { employees, handleDeleteEmployee } = useContext(EmployeeContext);
    return (
        <div>
            <header className="page__header">
                <h1 className="title">Employees Dashboard</h1>
                <Link to="/add" className="btn btn-primary">
                    Add Employee
                </Link>
            </header>
            <main>
                <UserList employees={employees} onDeleteEmployee={handleDeleteEmployee} />
            </main>
        </div>
    );
}

export default DashboardPage;
