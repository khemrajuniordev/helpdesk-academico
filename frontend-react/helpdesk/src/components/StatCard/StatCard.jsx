import './StatCard.css';

function StatCard({ icon: Icon, label, value, description, color }) {
    return (
        <div className="stat-card animate-fade-in">
            <div className={`stat-icon stat-icon-${color}`}>
                <Icon size={22} />
            </div>
            <div className="stat-info">
                <span className="stat-label">{label}</span>
                <span className="stat-value">{value}</span>
                <span className="stat-description">{description}</span>
            </div>
        </div>
    );
}

export default StatCard;
