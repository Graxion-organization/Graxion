import React from "react";
import "./tailwind.css";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import AdminDashboard from "./AdminDashboard";
import UserManagement from "./UserManagement";
import AdminRequests from "./AdminRequests";
import AdminContactMessages from "./AdminContactMessages";
import AdminActivities from "./AdminActivities";
import Subscriptions from "./Subscriptions";
import Payments from "./Payments";
import SystemHealth from "./SystemHealth";
import SystemLogs from "./SystemLogs";
import SystemMedia from "./SystemMedia";
import FraudDashboard from "./FraudDashboard";
import DeletionRequests from "./DeletionRequests";
import FeatureFlagsManagement from "./FeatureFlagsManagement";
import ApiExplorer from "./ApiExplorer";
import InstagramTool from "./InstagramTool";
import SidebarSettings from "./settings/SidebarSettings";
import SystemSettings from "./SystemSettings";
import { useAuth } from "../../AdminAuthContext";

// Temporary placeholder for coming soon / unmigrated tabs
const ComingSoon = () => <div className="p-8 text-white">Coming Soon in Graxion</div>;
const SalesPartnerAdminTab = () => <div className="p-8 text-white">Sales Partners</div>;

export default function FlowAdminApp() {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/adminsecrate/login" replace />;

  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="sales-partners" element={<SalesPartnerAdminTab />} />
        <Route path="signup-requests" element={<AdminRequests />} />
        <Route path="contact-messages" element={<AdminContactMessages />} />
        <Route path="activities" element={<AdminActivities />} />
        <Route path="conversations" element={<ComingSoon />} />
        <Route path="subscriptions" element={<Subscriptions />} />
        <Route path="payments" element={<Payments />} />
        <Route path="health" element={<SystemHealth />} />
        <Route path="logs" element={<SystemLogs />} />
        <Route path="media" element={<SystemMedia />} />
        <Route path="fraud" element={<FraudDashboard />} />
        <Route path="deletion-requests" element={<DeletionRequests />} />
        <Route path="feature-flags" element={<FeatureFlagsManagement />} />
        <Route path="api-explorer" element={<ApiExplorer />} />
        <Route path="instagram-tools" element={<InstagramTool />} />
        <Route path="settings" element={<Navigate to="core" replace />} />
        <Route path="settings/sidebar" element={<SidebarSettings />} />
        <Route path="settings/:tab" element={<SystemSettings />} />
      </Route>
    </Routes>
  );
}
