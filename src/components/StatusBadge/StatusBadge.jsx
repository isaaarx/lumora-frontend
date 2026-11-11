import './StatusBadge.css';

function StatusBadge({
    status,
    icon: Icon,
}) {
    let statusClass = '';

    if (status === 'Aberto') {
        statusClass = 'status-open';
    } else if (status === 'Em andamento') {
        statusClass = 'status-in-progress';
    } else if (status === 'Resolvido') {
        statusClass = 'status-solved';
    }

    return (
        <div className={`status-badge ${statusClass}`}>
            {Icon && <Icon size={16} />}
            {status}
        </div>
    );
}

export default StatusBadge;