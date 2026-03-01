import './StatusBadge.css';

function StatusBadge({ status }) {
    const statusMap = {
        'Aberto': 'aberto',
        'Em andamento': 'andamento',
        'Fechado': 'fechado',
    };

    const className = statusMap[status] || 'aberto';

    return (
        <span className={`status-badge status-${className}`}>
            <span className="status-dot"></span>
            {status}
        </span>
    );
}

export default StatusBadge;
