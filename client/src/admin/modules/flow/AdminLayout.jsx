import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../AdminAuthContext";
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  Settings, 
  ArrowLeft,
  Activity,
  ShieldCheck,
  CreditCard,
  DollarSign,
  Terminal,
  Image as ImageIcon,
  UserX,
  Flag,
  UserCheck,
  History,
  ChevronDown,
  ChevronRight,
  Cpu,
  Globe,
  Mail,
  Zap,
  Key,
  Menu,
  X,
  Search,
  Bell
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AdminLayout = () => {
  const { adminPath } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
const sidebarGroups = [
    {
      title: "Overview",
      items: [
        { name: "Dashboard", icon: LayoutDashboard, path: "dashboard" },
        { name: "Activity & Audits", icon: History, path: "activities" },
        { name: "System Health", icon: Activity, path: "health" },
      ]
    },
    {
      title: "Customers & Billing",
      items: [
        { name: "Users", icon: Users, path: "users" },
        { name: "Subscriptions", icon: CreditCard, path: "subscriptions" },
        { name: "Payments", icon: DollarSign, path: "payments" },
        { name: "Sales Partners", icon: Users, path: "sales-partners" },
      ]
    },
    {
      title: "Requests & Support",
      items: [
        { name: "Sign-up Requests", icon: UserCheck, path: "signup-requests" },
        { name: "Deletion Requests", icon: UserX, path: "deletion-requests" },
        { name: "Contact Messages", icon: Mail, path: "contact-messages" },
        { name: "Conversations", icon: MessageSquare, path: "conversations" },
      ]
    },
    {
      title: "Platform Tools",
      items: [
        { name: "IG Manual Tool", icon: MessageSquare, path: "instagram-tools" },
        { name: "System Media", icon: ImageIcon, path: "media" },
        { name: "Fraud Detection", icon: ShieldCheck, path: "fraud" },
        { name: "Feature Flags", icon: Flag, path: "feature-flags" },
      ]
    },
    {
      title: "Settings & Config",
      items: [
        { name: "Core System", icon: Settings, path: "settings/core" },
        { name: "Branding", icon: Globe, path: "settings/branding" },
        { name: "Sidebar Customization", icon: LayoutDashboard, path: "settings/sidebar" },
        { name: "AI Configuration", icon: Cpu, path: "settings/ai" },
        { name: "Social Platforms", icon: Zap, path: "settings/social" },
        { name: "Email Templates", icon: Mail, path: "settings/email" },
        { name: "Languages", icon: MessageSquare, path: "settings/languages" },
        { name: "API Integrations", icon: Key, path: "settings/api" },
        { name: "API Explorer", icon: Terminal, path: "api-explorer" },
        { name: "System Logs", icon: Terminal, path: "logs" },
      ]
    }
  ];

  // Removed collapsible state to keep the sidebar clean and flat as requested

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  let activePageName = "Admin";
  let activePageDesc = "Manage and track system-wide activity";
  for (const group of sidebarGroups) {
    const activeItem = group.items.find(i => location.pathname.endsWith(`/flow/${i.path}`) || location.pathname.includes(`/flow/${i.path}/`));
    if (activeItem) {
      activePageName = activeItem.name;
      break;
    }
  }

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="p-5 pb-2 shrink-0">
        <Link to={`/${adminPath}/flow/dashboard`} className="flex items-center gap-2.5 group">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-brand-500 to-emerald-400 flex items-center justify-center shadow-glow-sm group-hover:shadow-glow transition-shadow">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-white font-bold text-base block leading-tight">Admin</span>
            <span className="text-gray-500 text-[10px] font-medium tracking-wider uppercase">Control Panel</span>
          </div>
        </Link>
      </div>

      {/* Nav groups */}
      <div className="flex-1 overflow-y-auto px-3 py-3 custom-scrollbar">
        <nav className="space-y-5">
          {sidebarGroups.map((group) => (
            <div key={group.title} className="mb-4">
              <div className="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-[0.15em]">
                {group.title}
              </div>
              <div className="mt-1 space-y-0.5">
                {group.items.map((item) => {
                  const isActive = location.pathname.endsWith(`/flow/${item.path}`) || location.pathname.includes(`/flow/${item.path}/`);
                  return (
                    <Link
                      key={item.path}
                      to={`/${adminPath}/flow/${item.path}`}
                      className={`group flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-300 text-sm font-medium border relative overflow-hidden ${
                        isActive 
                          ? "bg-gradient-to-r from-brand-500/20 to-transparent text-brand-400 border-brand-500/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]" 
                          : "text-gray-400 hover:text-gray-100 hover:bg-white/[0.06] border-transparent"
                      }`}
                    >
                      {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-brand-500 rounded-r-full shadow-[0_0_10px_rgba(255,106,0,0.8)]" />
                      )}
                      <item.icon className={`w-4 h-4 shrink-0 transition-all duration-300 ${isActive ? 'text-brand-400 scale-110 drop-shadow-[0_0_5px_rgba(255,106,0,0.5)]' : 'text-gray-500 group-hover:text-gray-300 group-hover:scale-110'}`} />
                      <span className="tracking-wide z-10 relative">{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Back to app */}
      <div className="p-4 border-t border-white/[0.04] shrink-0">
        <Link 
          to={`/${adminPath}/students/dashboard`}
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/[0.04] transition-all text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-medium">Back to App</span>
        </Link>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#03060d] text-white flex">
      {/* Desktop Sidebar */}
      <aside className="w-[280px] border-r border-white/[0.08] bg-[#060912]/95 backdrop-blur-2xl sticky top-0 h-screen flex-col hidden md:flex shadow-[4px_0_24px_rgba(0,0,0,0.4)]">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-[280px] bg-[#0a0e1a] border-r border-white/[0.06] z-50 flex flex-col md:hidden"
            >
              <div className="flex justify-end p-3">
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/[0.04] transition-all">
                  <X size={20} />
                </button>
              </div>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 min-w-0 flex flex-col h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-[#060912]/80 backdrop-blur-xl border-b border-white/[0.06] px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-gray-300 transition-all border border-white/[0.06]"
              >
                <Menu size={18} />
              </button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {activePageName}
                </h1>
                <p className="text-gray-500 text-xs mt-0.5 hidden sm:block">{activePageDesc}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="px-3 py-1.5 bg-brand-500/10 text-brand-400 rounded-full border border-brand-500/20 text-xs font-semibold tracking-wide flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
                <span className="hidden sm:inline">System Online</span>
                <span className="sm:hidden">Online</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-4 sm:p-6 lg:p-8"
          >
            <Outlet />
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
