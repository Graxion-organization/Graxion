import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AdminAuthContext';
import { internshipAPI } from '../../../utils/api';
import StatsCard from '../../components/StatsCard';
import {
  Users,
  GraduationCap,
  Award,
  TrendingUp,
  UserPlus,
  Clock,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import './InternshipDashboard.css';

export default function InternshipDashboard() {
  const { adminPath } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      const response = await internshipAPI.getStats();
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="admin-loading-spinner" />
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="internship-dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Overview of internship & course management</p>
        </div>
        <button
          className="admin-btn-primary"
          onClick={() => navigate(`/${adminPath}/students/internships/new`)}
        >
          <UserPlus size={18} />
          Add New Record
        </button>
      </div>

      {/* Stats Grid */}
      <div className="dashboard-stats-grid">
        <StatsCard
          icon={Users}
          label="Total Records"
          value={stats?.total || 0}
          color="cyan"
        />
        <StatsCard
          icon={Clock}
          label="Ongoing"
          value={stats?.ongoing || 0}
          color="amber"
        />
        <StatsCard
          icon={CheckCircle}
          label="Completed"
          value={stats?.completed || 0}
          color="emerald"
        />
        <StatsCard
          icon={Award}
          label="Certificates Issued"
          value={stats?.certificatesIssued || 0}
          color="purple"
        />
        <StatsCard
          icon={GraduationCap}
          label="Enrolled"
          value={stats?.enrolled || 0}
          color="blue"
        />
        <StatsCard
          icon={XCircle}
          label="Dropped"
          value={stats?.dropped || 0}
          color="rose"
        />
      </div>

      {/* Domain Distribution & Recent Activity */}
      <div className="dashboard-grid-2">
        {/* Domain Stats */}
        <div className="dashboard-card">
          <h3 className="dashboard-card-title">
            <TrendingUp size={18} />
            Domain Distribution
          </h3>
          <div className="domain-stats">
            {stats?.domainStats && stats.domainStats.length > 0 ? (
              stats.domainStats.map((item) => {
                const percentage = stats.total > 0
                  ? Math.round((item.count / stats.total) * 100)
                  : 0;
                return (
                  <div key={item._id} className="domain-stat-item">
                    <div className="domain-stat-info">
                      <span className="domain-stat-name">{item._id}</span>
                      <span className="domain-stat-count">{item.count}</span>
                    </div>
                    <div className="domain-stat-bar">
                      <div
                        className="domain-stat-bar-fill"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="dashboard-empty">No data available yet</p>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="dashboard-card">
          <h3 className="dashboard-card-title">
            <Clock size={18} />
            Recent Activity
          </h3>
          <div className="recent-activity">
            {stats?.recentActivity && stats.recentActivity.length > 0 ? (
              stats.recentActivity.map((item) => (
                <div key={item._id} className="activity-item">
                  <div className="activity-dot" />
                  <div className="activity-info">
                    <span className="activity-name">{item.studentName}</span>
                    <span className="activity-detail">{item.internshipTitle}</span>
                  </div>
                  <span className={`status-badge ${item.status}`}>
                    {item.status.replace('-', ' ')}
                  </span>
                </div>
              ))
            ) : (
              <p className="dashboard-empty">No recent activity</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
