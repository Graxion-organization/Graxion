import { useLocation } from 'react-router-dom';
import { useAuth } from '../AdminAuthContext';
import { Menu, Bell, Search } from 'lucide-react';
import './AdminHeader.css';

export default function AdminHeader({ onMenuToggle }) {
  const { admin } = useAuth();
  const location = useLocation();

  // Generate breadcrumb from path
  function getBreadcrumb() {
    const adminPath = import.meta.env.VITE_ADMIN_PATH || 'gx-ctrl-a7f3b2c1';
    const path = location.pathname
      .replace(`/${adminPath}/`, '')
      .split('/')
      .filter(Boolean);

    return path.map((segment) =>
      segment
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (l) => l.toUpperCase())
    );
  }

  const breadcrumb = getBreadcrumb();

  return (
    <header className="admin-header">
      <div className="admin-header-left">
        <button className="admin-header-menu" onClick={onMenuToggle}>
          <Menu size={20} />
        </button>

        <div className="admin-header-breadcrumb">
          <span className="admin-header-breadcrumb-root">Admin</span>
          {breadcrumb.map((item, i) => (
            <span key={i}>
              <span className="admin-header-breadcrumb-sep">/</span>
              <span
                className={
                  i === breadcrumb.length - 1
                    ? 'admin-header-breadcrumb-active'
                    : ''
                }
              >
                {item}
              </span>
            </span>
          ))}
        </div>
      </div>

      <div className="admin-header-right">
        <div className="admin-header-search">
          <Search size={16} />
          <input type="text" placeholder="Search..." />
        </div>

        <button className="admin-header-icon-btn" title="Notifications">
          <Bell size={18} />
          <span className="admin-header-notification-dot" />
        </button>

        <div className="admin-header-user">
          <div className="admin-header-user-avatar">
            {admin?.username?.[0]?.toUpperCase() || 'A'}
          </div>
          <span className="admin-header-user-name">{admin?.username || 'Admin'}</span>
        </div>
      </div>
    </header>
  );
}
