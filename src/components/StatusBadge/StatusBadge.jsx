import './StatusBadge.css';

function StatusBadge({
    status,
    icon: Icon,
}) {
    let statusClass = '';

    if (status === 'Aberto') {
        statusClass = 'status-aberto';
    } else if (status === 'Em andamento') {
        statusClass = 'status-em-andamento';
    } else if (status === 'Resolvido') {
        statusClass = 'status-resolvido';
    }

    return (
        <div className={`status-badge ${statusClass}`}>
            {Icon && <Icon size={16} />}
            {status}
        </div>
    );
}

export default StatusBadge;