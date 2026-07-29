import './StatsCard.css';

export default function StatsCard({ icon: Icon, label, value, trend, trendUp, color = 'cyan' }) {
  return (
    <div className={`stats-card stats-card-${color}`}>
      <div className="stats-card-icon">
        {Icon && <Icon size={22} />}
      </div>
      <div className="stats-card-info">
        <span className="stats-card-value">{value}</span>
        <span className="stats-card-label">{label}</span>
      </div>
      {trend !== undefined && (
        <div className={`stats-card-trend ${trendUp ? 'up' : 'down'}`}>
          {trendUp ? '↑' : '↓'} {trend}
        </div>
      )}
    </div>
  );
}
