import './PriorityBadge.css';

function PriorityBadge({
    priority,
    icon: Icon,
}) {
    let priorityClass = '';

    if (priority === 'Baixa') {
        priorityClass = 'priority-baixa';
    } else if (priority === 'Média') {
        priorityClass = 'priority-media';
    } else if (priority === 'Alta') {
        priorityClass = 'priority-alta';
    }

    return (
        <div className={`priority-badge ${priorityClass}`}>
            {Icon && <Icon size={16} aria-hidden="true"/>}
            {priority}
        </div>
    );
}

export default PriorityBadge;