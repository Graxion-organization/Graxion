import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AdminAuthContext';
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';
import './AdminLayout.css';

export default function AdminLayout() {
  const { isAuthenticated, loading } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="admin-loading-spinner" />
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    const adminPath = import.meta.env.VITE_ADMIN_PATH || 'gx-ctrl-a7f3b2c1';
    return <Navigate to={`/${adminPath}/login`} replace />;
  }

  return (
    <div className={`admin-layout ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <AdminSidebar
        collapsed={sidebarCollapsed}
        mobileOpen={mobileSidebarOpen}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />
      <div className="admin-main">
        <AdminHeader
          onMenuToggle={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        />
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
