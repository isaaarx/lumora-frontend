import './StatusBadge.css';

import {
  Clock,
  Play,
  Check,
} from 'lucide-react';

function StatusBadge({ status }) {
  let statusClass = '';
  let Icon = null;

  if (status === 'Aberto') {
    statusClass = 'status-open';
    Icon = Clock;
  } else if (status === 'Em andamento') {
    statusClass = 'status-in-progress';
    Icon = Play;
  } else if (status === 'Resolvido') {
    statusClass = 'status-solved';
    Icon = Check;
  }

  return (
    <div className={`status-badge ${statusClass}`}>
      {Icon && <Icon size={12} aria-hidden="true" />}
      {status}
    </div>
  );
}

export default StatusBadge;