import { UserCard } from './UserCard';

export function UserList({ employees, onDeleteEmployee }) {
    if (!employees.length) {
        return <p>No employees found.</p>;
    }

    return employees.map((employee) => (
        <UserCard user={employee} onDelete={onDeleteEmployee} key={employee.id} />
    ));
}
