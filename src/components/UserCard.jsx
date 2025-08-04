import { Link } from 'react-router-dom';

function ActionButtons({ employee, onDelete }) {
    return (
        <>
            <Link to={`/edit/${employee.id}`} className="card__action">
                Edit
            </Link>
            <a href="#" className="card__action" onClick={() => onDelete(employee.id)}>
                X
            </a>
        </>
    );
}

export function UserCard({ user, onDelete }) {
    return (
        <div className="card">
            <header className="card__header">
                <h3 className="card__title">
                    {user.firstName} {user.lastName}
                </h3>
                <aside className="card__actions">
                    <ActionButtons employee={user} onDelete={onDelete} />
                </aside>
            </header>
            <div className="card__content">
                <section>
                    <div>
                        <strong>Role: </strong>
                        <span>{user.role}</span>
                    </div>
                    <div>
                        <strong>Project: </strong>
                        <span>{user.project}</span>
                    </div>
                </section>
                <aside className="avatar"></aside>
            </div>
        </div>
    );
}
