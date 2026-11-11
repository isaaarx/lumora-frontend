import './PriorityBadge.css';

import {
  ArrowDown,
  TriangleExclamationPoint,
  CircleExclamationPoint,
} from 'lucide-react';

function PriorityBadge({ priority }) {
  let priorityClass = '';
  let Icon = null;

  if (priority === 'Baixa') {
    priorityClass = 'priority-low';
    Icon = ArrowDown;
  } else if (priority === 'Média') {
    priorityClass = 'priority-medium';
    Icon = TriangleExclamationPoint;
  } else if (priority === 'Alta') {
    priorityClass = 'priority-high';
    Icon = CircleExclamationPoint;
  }

  return (
    <div className={`priority-badge ${priorityClass}`}>
      {Icon && <Icon size={12} aria-hidden="true" />}
      {priority}
    </div>
  );
}

export default PriorityBadge;