import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../AdminAuthContext';
import {
  LayoutDashboard,
  GraduationCap,
  UserPlus,
  List,
  Award,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Settings,
  Shield,
  X,
} from 'lucide-react';
import './AdminSidebar.css';

const menuItems = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    path: 'dashboard',
  },
  {
    label: 'Internships & Courses',
    icon: GraduationCap,
    children: [
      { label: 'All Records', icon: List, path: 'internships' },
      { label: 'Add New', icon: UserPlus, path: 'internships/new' },
      { label: 'Certificates', icon: Award, path: 'internships?filter=certificates' },
    ],
  },
];

export default function AdminSidebar({ collapsed, mobileOpen, onToggle, onMobileClose }) {
  const { admin, logout, adminPath } = useAuth();
  const location = useLocation();

  function isActive(path) {
    return location.pathname.includes(path);
  }

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="admin-sidebar-overlay" onClick={onMobileClose} />
      )}

      <aside
        className={`admin-sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}
      >
        {/* Logo */}
        <div className="admin-sidebar-logo">
          <div className="admin-sidebar-logo-icon">
            <Shield size={collapsed ? 20 : 22} />
          </div>
          {!collapsed && (
            <div className="admin-sidebar-logo-text">
              <span className="admin-sidebar-brand">GRAXION</span>
              <span className="admin-sidebar-sub">Admin Panel</span>
            </div>
          )}
          <button className="admin-sidebar-mobile-close" onClick={onMobileClose}>
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="admin-sidebar-nav">
          {menuItems.map((item) => {
            if (item.children) {
              return (
                <div key={item.label} className="admin-sidebar-group">
                  {!collapsed && (
                    <div className="admin-sidebar-group-label">
                      <item.icon size={14} />
                      {item.label}
                    </div>
                  )}
                  {item.children.map((child) => (
                    <NavLink
                      key={child.path}
                      to={`/${adminPath}/${child.path}`}
                      className={({ isActive: active }) =>
                        `admin-sidebar-link ${active ? 'active' : ''}`
                      }
                      title={collapsed ? child.label : undefined}
                      onClick={onMobileClose}
                    >
                      <child.icon size={18} />
                      {!collapsed && <span>{child.label}</span>}
                    </NavLink>
                  ))}
                </div>
              );
            }

            return (
              <NavLink
                key={item.path}
                to={`/${adminPath}/${item.path}`}
                className={({ isActive: active }) =>
                  `admin-sidebar-link ${active ? 'active' : ''}`
                }
                title={collapsed ? item.label : undefined}
                onClick={onMobileClose}
              >
                <item.icon size={18} />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="admin-sidebar-bottom">
          <NavLink
            to={`/${adminPath}/settings`}
            className="admin-sidebar-link"
            title={collapsed ? 'Settings' : undefined}
          >
            <Settings size={18} />
            {!collapsed && <span>Settings</span>}
          </NavLink>

          <button className="admin-sidebar-link logout-btn" onClick={logout}>
            <LogOut size={18} />
            {!collapsed && <span>Logout</span>}
          </button>

          {/* User info */}
          {!collapsed && admin && (
            <div className="admin-sidebar-user">
              <div className="admin-sidebar-user-avatar">
                {admin.username?.[0]?.toUpperCase() || 'A'}
              </div>
              <div className="admin-sidebar-user-info">
                <span className="admin-sidebar-user-name">{admin.username}</span>
                <span className="admin-sidebar-user-role">{admin.role}</span>
              </div>
            </div>
          )}
        </div>

        {/* Collapse toggle */}
        <button className="admin-sidebar-collapse-btn" onClick={onToggle}>
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </aside>
    </>
  );
}
