import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  ShoppingBagIcon,
  UsersIcon,
  CubeIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { path: '/', icon: HomeIcon, label: 'Dashboard' },
    { path: '/products', icon: CubeIcon, label: 'Produits' },
    { path: '/orders', icon: ShoppingBagIcon, label: 'Commandes' },
    { path: '/customers', icon: UsersIcon, label: 'Clients' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/login';
  };

  return (
    <>
      {/* Bouton pour collapse (optionnel) */}
      <div 
        className="sidebar-collapse-btn"
        onClick={() => setCollapsed(!collapsed)}
      >
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </div>

      {/* Sidebar avec les classes CSS */}
      <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <h1 className={`sidebar-logo ${collapsed ? 'collapsed' : ''}`}>
            {collapsed ? 'VA' : 'KingPower'}
          </h1>
          {!collapsed && <p className="sidebar-version">v1.0.0</p>}
        </div>
        
        <nav className="sidebar-nav">
          <div className="sidebar-menu">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <div key={item.path} className="sidebar-menu-item">
                  <Link
                    to={item.path}
                    className={`sidebar-link ${isActive ? 'sidebar-link-active' : ''}`}
                  >
                    <Icon className="sidebar-icon" />
                    {!collapsed && <span className="sidebar-label">{item.label}</span>}
                    {collapsed && (
                      <span className="sidebar-tooltip">{item.label}</span>
                    )}
                    {isActive && <span className="sidebar-active-indicator"></span>}
                  </Link>
                </div>
              );
            })}
          </div>
        </nav>
        
        <div className="sidebar-footer">
          <div className={`sidebar-user ${collapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-avatar">A</div>
            {!collapsed && (
              <div className="sidebar-user-info">
                <div className="sidebar-user-name">Admin</div>
                <div className="sidebar-user-role">Super Admin</div>
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="sidebar-link w-full mt-2"
          >
            <ArrowLeftOnRectangleIcon className="sidebar-icon" />
            {!collapsed && <span className="sidebar-label">Déconnexion</span>}
            {collapsed && <span className="sidebar-tooltip">Déconnexion</span>}
          </button>
        </div>
      </div>
    </>
  );
}