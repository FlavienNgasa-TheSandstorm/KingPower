import { useState, useEffect } from 'react';
import { 
  BellIcon, 
  MagnifyingGlassIcon,
  ChevronDownIcon,
  ShoppingBagIcon,
  UserIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  CurrencyDollarIcon,
  ExclamationTriangleIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import notificationService from '../services/notificationService';

export default function Header({ title, onMenuClick }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Démarrer la surveillance des notifications
    notificationService.startPolling();

    // S'abonner aux mises à jour
    const unsubscribe = notificationService.subscribe((notifs, count) => {
      setNotifications(notifs);
      setUnreadCount(count);
    });

    return () => {
      unsubscribe();
      notificationService.stopPolling();
    };
  }, []);

  const handleMarkAsRead = (id) => {
    notificationService.markAsRead(id);
  };

  const handleMarkAllAsRead = () => {
    notificationService.markAllAsRead();
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'new_order':
        return <ShoppingBagIcon className="h-5 w-5 text-blue-400" />;
      case 'payment':
        return <CurrencyDollarIcon className="h-5 w-5 text-green-400" />;
      case 'low_stock':
        return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" />;
      default:
        return <BellIcon className="h-5 w-5 text-gray-400" />;
    }
  };

  const formatTime = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'À l\'instant';
    if (minutes < 60) return `Il y a ${minutes} min`;
    if (hours < 24) return `Il y a ${hours} h`;
    return `Il y a ${days} j`;
  };

  return (
    <header className="admin-header">
      <div className="header-container">
        {/* Partie gauche */}
        <div className="header-left">
          {/* Menu mobile toggle */}
          <button 
            className="header-menu-toggle lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
          
          {/* Titre avec décoration */}
          <div className="header-title-wrapper">
            <h1 className="header-title">{title}</h1>
            <div className="header-title-decoration"></div>
          </div>
          
          {/* Fil d'Ariane (caché sur mobile) */}
          <div className="header-breadcrumb hide-mobile">
            <span className="breadcrumb-item">Dashboard</span>
            <span className="breadcrumb-separator">
              <ChevronDownIcon className="h-3 w-3 rotate-[-90deg]" />
            </span>
            <span className="breadcrumb-item active">{title}</span>
          </div>
        </div>

        {/* Partie droite */}
        <div className="header-right">
          {/* Barre de recherche desktop */}
          <div className="header-search hide-mobile">
            <div className="search-input-wrapper">
              <MagnifyingGlassIcon className="search-icon" />
              <input 
                type="text" 
                placeholder="Rechercher..." 
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="search-shortcut">
                <span className="shortcut-key">⌘</span>
                <span className="shortcut-key">K</span>
              </span>
            </div>
          </div>

          {/* Bouton recherche mobile */}
          <button 
            className="mobile-search-toggle md:hidden"
            onClick={() => setShowMobileSearch(!showMobileSearch)}
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>

          {/* Barre de recherche mobile */}
          {showMobileSearch && (
            <div className="mobile-search">
              <input
                type="text"
                placeholder="Rechercher..."
                className="mobile-search-input"
                autoFocus
              />
            </div>
          )}

          {/* Notifications */}
          <div className="header-notifications">
            <button 
              className="notifications-button"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <BellIcon className="notifications-icon" />
              {unreadCount > 0 && (
                <>
                  <span className="notifications-badge">{unreadCount}</span>
                  <span className="notifications-pulse"></span>
                </>
              )}
            </button>

            {showNotifications && (
              <div className="notifications-dropdown">
                <div className="notifications-header">
                  <h3 className="notifications-title">
                    Notifications
                    {unreadCount > 0 && (
                      <span className="notifications-unread-badge">
                        {unreadCount} nouvelle{unreadCount > 1 ? 's' : ''}
                      </span>
                    )}
                  </h3>
                  {unreadCount > 0 && (
                    <button 
                      className="notifications-mark-read"
                      onClick={handleMarkAllAsRead}
                    >
                      Tout marquer comme lu
                    </button>
                  )}
                </div>

                <div className="notifications-list">
                  {notifications.length === 0 ? (
                    <div className="notifications-empty">
                      <BellIcon className="h-12 w-12 text-gray-600 mb-3" />
                      <p className="text-gray-400">Aucune notification</p>
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div 
                        key={notif.id} 
                        className={`notification-item ${!notif.read ? 'unread' : ''}`}
                        onClick={() => handleMarkAsRead(notif.id)}
                      >
                        <div className="notification-content">
                          <div className={`notification-icon ${notif.type}`}>
                            {getNotificationIcon(notif.type)}
                          </div>
                          <div className="notification-text">
                            <p className="notification-message">
                              <span className="font-bold">{notif.title}</span>
                              <br />
                              {notif.message}
                            </p>
                            <p className="notification-time">
                              {formatTime(notif.time)}
                              {notif.amount && (
                                <span className="notification-amount">
                                  • {notif.amount} USD
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                        {!notif.read && <div className="notification-dot"></div>}
                      </div>
                    ))
                  )}
                </div>

                {notifications.length > 0 && (
                  <div className="notifications-footer">
                    <button className="notifications-view-all">
                      Voir toutes les notifications
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Profil utilisateur */}
          <div className="header-profile">
            <button 
              className="profile-button"
              onClick={() => setShowProfile(!showProfile)}
            >
              <div className="profile-avatar-wrapper">
                <div className="profile-avatar">A</div>
                <div className="profile-status online"></div>
              </div>
              <div className="profile-info hide-mobile">
                <div className="profile-name">Administrateur</div>
                <div className="profile-role">Super Admin</div>
              </div>
              <ChevronDownIcon className={`profile-chevron hide-mobile ${showProfile ? 'open' : ''}`} />
            </button>

            {showProfile && (
              <div className="profile-dropdown">
                <div className="profile-dropdown-header">
                  <div className="dropdown-avatar">A</div>
                  <div className="dropdown-info">
                    <p className="dropdown-name">Administrateur</p>
                    <p className="dropdown-email">admin@vitalis-help.cd</p>
                  </div>
                </div>
                <div className="profile-dropdown-divider"></div>
                
                <button className="profile-dropdown-item">
                  <UserIcon className="h-4 w-4" />
                  <span>Mon profil</span>
                </button>
                <button className="profile-dropdown-item">
                  <Cog6ToothIcon className="h-4 w-4" />
                  <span>Paramètres</span>
                </button>
                <div className="profile-dropdown-divider"></div>
                <button className="profile-dropdown-item logout">
                  <ArrowLeftOnRectangleIcon className="h-4 w-4" />
                  <span>Déconnexion</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Menu mobile overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay">
          <div className="mobile-menu">
            <nav className="mobile-nav">
              <a href="/admin" className="mobile-nav-item active">
                <span>Dashboard</span>
              </a>
              <a href="/admin/products" className="mobile-nav-item">
                <span>Produits</span>
              </a>
              <a href="/admin/orders" className="mobile-nav-item">
                <span>Commandes</span>
              </a>
              <a href="/admin/customers" className="mobile-nav-item">
                <span>Clients</span>
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}