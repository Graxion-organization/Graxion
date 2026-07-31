import React, { useState, useEffect } from 'react';
import { adminAPI } from '.././services/api';
import toast from 'react-hot-toast';
import { Check, Settings2, LayoutDashboard, MonitorSmartphone, EyeOff, FlaskConical } from 'lucide-react';

export default function SidebarSettings() {
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({});

  const sidebarSections = [
    { key: 'Overview', label: 'Overview Group' },
    { key: 'Analytics', label: 'Analytics' },
    { key: 'Live Inbox', label: 'Live Inbox' },
    { key: 'Customers', label: 'Customers' },
    { key: 'Deals Pipeline', label: 'Deals Pipeline' },
    { key: 'Leads', label: 'Leads' },
    { key: 'Broadcasts', label: 'Broadcasts' },
    { key: 'Campaigns', label: 'Campaigns' },
    { key: 'Templates', label: 'Templates' },
    { key: 'My AI Team', label: 'My AI Team' },
    { key: 'Auto-Replies', label: 'Auto-Replies' },
    { key: 'Chat Flows', label: 'Chat Flows' },
    { key: 'Social Hub', label: 'Social Hub' },
    { key: 'Auto Comments', label: 'Auto Comments' },
    { key: 'App Store', label: 'App Store' },
    { key: 'Meta Quality', label: 'Meta Quality' },
  ];

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await adminAPI.getSettings();
      const allSettings = res.data?.data?.settings || [];
      const sidebarConfig = allSettings.find(s => s.key === 'sidebar_settings');
      
      if (sidebarConfig && sidebarConfig.value) {
        setSettings(sidebarConfig.value);
      } else {
        // Initialize defaults if empty
        const defaults = {};
        sidebarSections.forEach(s => defaults[s.key] = true);
        setSettings(defaults);
      }
    } catch (err) {
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (key) => {
    const newVal = settings[key] === false ? true : false;
    const newSettings = {
      ...settings,
      [key]: !settings[key]
    };
    
    setSettings(newSettings);

    try {
      await adminAPI.updateSetting('sidebar_settings', newSettings);
      toast.success(`${key} sidebar section ${!newVal ? 'enabled' : 'disabled'} successfully!`);
    } catch (err) {
      toast.error('Failed to update setting');
      // Revert state if api fails
      setSettings(prev => ({
        ...prev,
        [key]: newVal
      }));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5 text-brand-400" />
            Sidebar Customization
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Toggle visibility of sidebar sections across the main application. Sections turned off will remain visible to Beta Testers.
          </p>
        </div>
      </div>

      <div className="bg-[#0a0e1a]/50 border border-white/[0.06] rounded-2xl overflow-hidden backdrop-blur-xl">
        <div className="p-4 sm:p-6 border-b border-white/[0.06] bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center">
              <MonitorSmartphone className="w-5 h-5 text-brand-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">App Navigation</h3>
              <p className="text-xs text-gray-400">Configure which menu items are globally visible</p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-white/[0.06]">
          {sidebarSections.map((section) => {
            const isEnabled = settings[section.key] !== false; // default true if undefined
            
            return (
              <div key={section.key} className="flex items-center justify-between p-4 sm:p-5 hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-colors ${
                    isEnabled 
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                      : 'bg-orange-500/10 border-orange-500/20 text-orange-400'
                  }`}>
                    {isEnabled ? <Check size={16} /> : <FlaskConical size={16} />}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-200">{section.label}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {isEnabled ? 'Visible to all workspace users' : 'Visible only to Beta Testers'}
                    </p>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={isEnabled}
                    onChange={() => handleToggle(section.key)}
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
