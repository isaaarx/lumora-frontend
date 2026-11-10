import './StatCard.css';

function StatCard({ 
    icon: Icon,
    value,
    label,
    className = '' 
}) {
    return (
        <div className={`stat-card ${className}`}>
            <div className="stat-icon">
                {Icon && <Icon size={24} aria-hidden="true" />}
            </div>
            <div className="stat-info">
                <div className="stat-value">
                    {value}
                </div>
                <div className="stat-label">
                    {label}
                </div>
            </div>
        </div>
    )
}

export default StatCard;