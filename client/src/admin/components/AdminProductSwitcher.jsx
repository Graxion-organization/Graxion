import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AdminAuthContext';
import { Grid, GraduationCap, MessageSquare, ChevronDown, Monitor } from 'lucide-react';
import './AdminProductSwitcher.css';

export default function AdminProductSwitcher() {
  const { adminPath, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isAuthenticated) return null;

  const products = [
    {
      id: 'students',
      name: 'Graxion Students',
      description: 'Internships & Courses',
      icon: GraduationCap,
      path: `/${adminPath}/students/dashboard`,
      activePath: `/${adminPath}/students`,
      color: '#4f46e5' // Indigo
    },
    {
      id: 'flow',
      name: 'Flow SaaS',
      description: 'AI Agents & Messaging',
      icon: MessageSquare,
      path: `/${adminPath}/flow/dashboard`,
      activePath: `/${adminPath}/flow`,
      color: '#22c55e' // Emerald
    }
  ];

  const currentProduct = products.find(p => location.pathname.startsWith(p.activePath)) || products[0];

  return (
    <div className="admin-product-switcher" ref={menuRef}>
      <button 
        className={`switcher-fab ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        style={{ '--product-color': currentProduct.color }}
        title="Switch Product Modules"
      >
        <Grid size={24} />
      </button>

      {isOpen && (
        <div className="switcher-menu fade-in-up">
          <div className="switcher-menu-header">
            <Monitor size={16} />
            <span>Product Modules</span>
          </div>
          <div className="switcher-menu-list">
            {products.map(product => {
              const isActive = location.pathname.startsWith(product.activePath);
              return (
                <button
                  key={product.id}
                  className={`switcher-item ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    navigate(product.path);
                    setIsOpen(false);
                  }}
                  style={{ '--item-color': product.color }}
                >
                  <div className="switcher-item-icon">
                    <product.icon size={20} />
                  </div>
                  <div className="switcher-item-text">
                    <div className="switcher-item-name">{product.name}</div>
                    <div className="switcher-item-desc">{product.description}</div>
                  </div>
                  {isActive && (
                    <div className="switcher-item-active-dot" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
