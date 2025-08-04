import { Link, useNavigate, useParams } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { EmployeeContext } from '../context/EmployeeContext';

const initialFormState = {
    firstName: '',
    lastName: '',
    role: '',
    project: '',
};

function EmployeeFormPage() {
    const [formData, setFormData] = useState(initialFormState);
    const { employees, handleAddEmployee, handleUpdateEmployee } = useContext(EmployeeContext);
    const navigate = useNavigate();
    const { employeeId } = useParams(); // Gets 'employeeId' from the URL

    useEffect(() => {
        // If there's an employeeId, we're in "edit" mode
        if (employeeId) {
            const employeeToEdit = employees.find((emp) => emp.id === Number(employeeId));
            if (employeeToEdit) {
                setFormData(employeeToEdit); // Pre-fill the form
            }
        }
    }, [employeeId, employees]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (employeeId) {
            handleUpdateEmployee(formData);
        } else {
            handleAddEmployee(formData);
        }
        navigate('/'); // Go back to the dashboard
    };

    // Determine the title and button text based on edit mode
    const pageTitle = employeeId ? 'Edit Employee' : 'Add New Employee';
    const buttonText = employeeId ? 'Update Employee' : 'Save Employee';

    return (
        <div>
            <header className="page__header">
                <h1 className="title">{pageTitle}</h1>
                <Link to="/" className="back-link">
                    Back to Dashboard
                </Link>
            </header>
            <form onSubmit={handleSubmit} className="page__content ax-form block-center">
                <div className="ax-form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="ax-form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="ax-form-group">
                    <label htmlFor="role">Role</label>
                    <input
                        type="text"
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="ax-form-group">
                    <label htmlFor="project">Project</label>
                    <input
                        type="text"
                        id="project"
                        name="project"
                        value={formData.project}
                        onChange={handleChange}
                        required
                    />
                </div>
                <footer>
                    <button type="submit" className="btn btn-primary">
                        {buttonText}
                    </button>
                </footer>
            </form>
        </div>
    );
}

export default EmployeeFormPage;
