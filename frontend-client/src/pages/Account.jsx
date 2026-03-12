import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  UserIcon,
  ShoppingBagIcon,
  MapPinIcon,
  HeartIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  PencilIcon,
  CheckCircleIcon,
  ClockIcon,
  TruckIcon,
  StarIcon,
  XCircleIcon,
  ArrowPathIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import api from '../lib/api';
import toast from 'react-hot-toast';

export default function Account() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [refreshKey, setRefreshKey] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Initialisation unique
  useEffect(() => {
    const init = async () => {
      await fetchUser();
      await fetchOrders();
    };
    init();
  }, []);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/auth/login');
        return;
      }
      
      const response = await api.get('/auth/me');
      setUser(response.data);
      setFormData(prev => ({
        ...prev,
        name: response.data.name,
        email: response.data.email,
        phone: response.data.phone
      }));
    } catch (error) {
      toast.error('Erreur de chargement');
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      setOrdersLoading(true);
      const response = await api.get('/orders/my-orders');
      
      console.log('📦 Commandes reçues du backend:', response.data);
      
      // Transformer les données pour s'assurer que le statut est correct
      const newOrders = response.data.map(order => ({
        ...order,
        // Utiliser paymentStatus comme source principale du statut
        status: order.paymentStatus || 'pending',
        _updated: Date.now()
      }));
      
      setOrders(newOrders);
      setLastUpdate(Date.now());
      setRefreshKey(prev => prev + 1);
      
      console.log('✅ Commandes traitées:', newOrders.map(o => ({ id: o.id, status: o.status })));
      
    } catch (error) {
      console.error('❌ Erreur chargement commandes:', error);
    } finally {
      setOrdersLoading(false);
    }
  };

  const handleManualRefresh = () => {
    fetchOrders();
    toast.success('Commandes mises à jour');
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }

    try {
      const updateData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      };

      if (formData.currentPassword && formData.newPassword) {
        updateData.currentPassword = formData.currentPassword;
        updateData.newPassword = formData.newPassword;
      }

      await api.put('/auth/update', updateData);
      toast.success('Profil mis à jour avec succès');
      setIsEditing(false);
      fetchUser();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur lors de la mise à jour');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
    toast.success('Déconnexion réussie');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <span className="status-badge completed"><CheckCircleIcon className="h-4 w-4" /> Payée</span>;
      case 'pending':
        return <span className="status-badge pending"><ClockIcon className="h-4 w-4" /> En attente</span>;
      case 'failed':
        return <span className="status-badge failed"><XCircleIcon className="h-4 w-4" /> Échouée</span>;
      case 'delivered':
        return <span className="status-badge delivered"><TruckIcon className="h-4 w-4" /> Livrée</span>;
      default:
        return <span className="status-badge"><ClockIcon className="h-4 w-4" /> En attente</span>;
    }
  };

  if (loading) {
    return (
      <div className="account-loading">
        <div className="premium-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <UserIcon className="spinner-icon" />
        </div>
      </div>
    );
  }

  // Calcul des statistiques avec les bons statuts
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const completedOrders = orders.filter(o => o.status === 'completed' || o.status === 'delivered').length;
  const failedOrders = orders.filter(o => o.status === 'failed').length;
  const totalSpent = orders
    .filter(o => o.status === 'completed' || o.status === 'delivered')
    .reduce((sum, order) => sum + (Number(order.total) || 0), 0);

  return (
    <div key={`account-${refreshKey}`} className="account-page">
      {/* En-tête */}
      <div className="account-header">
        <div className="account-header-content">
          <h1 className="account-title">Mon Compte</h1>
          <p className="account-subtitle">Bienvenue, {user?.name}</p>
        </div>
        <div className="account-header-actions">
          <button onClick={handleManualRefresh} className="account-refresh-btn" title="Mettre à jour">
            <ArrowPathIcon className={`h-5 w-5 ${ordersLoading ? 'animate-spin' : ''}`} />
          </button>
          <button onClick={handleLogout} className="account-logout-btn">
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            <span>Déconnexion</span>
          </button>
        </div>
      </div>

      {/* Statistiques détaillées */}
      <div className="account-stats">
        <div className="stat-card">
          <div className="stat-icon-wrapper orders">
            <ShoppingBagIcon className="stat-icon" />
          </div>
          <div className="stat-content">
            <span className="stat-value">{totalOrders}</span>
            <span className="stat-label">Commandes totales</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrapper pending">
            <ClockIcon className="stat-icon" />
          </div>
          <div className="stat-content">
            <span className="stat-value">{pendingOrders}</span>
            <span className="stat-label">En attente</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrapper completed">
            <TruckIcon className="stat-icon" />
          </div>
          <div className="stat-content">
            <span className="stat-value">{completedOrders}</span>
            <span className="stat-label">Livrées / Payées</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrapper failed">
            <XCircleIcon className="stat-icon" />
          </div>
          <div className="stat-content">
            <span className="stat-value">{failedOrders}</span>
            <span className="stat-label">Échouées</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrapper spent">
            <StarIcon className="stat-icon" />
          </div>
          <div className="stat-content">
            <span className="stat-value">{(totalSpent || 0).toFixed(2)} USD</span>
            <span className="stat-label">Total dépensé</span>
          </div>
        </div>
      </div>

      {/* Navigation des onglets */}
      <div className="account-tabs">
        <button
          className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <UserIcon className="tab-icon" />
          <span>Profil</span>
        </button>
        <button
          className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          <ShoppingBagIcon className="tab-icon" />
          <span>Commandes</span>
        </button>
        <button
          className={`tab-btn ${activeTab === 'addresses' ? 'active' : ''}`}
          onClick={() => setActiveTab('addresses')}
        >
          <MapPinIcon className="tab-icon" />
          <span>Adresses</span>
        </button>
        <button
          className={`tab-btn ${activeTab === 'wishlist' ? 'active' : ''}`}
          onClick={() => setActiveTab('wishlist')}
        >
          <HeartIcon className="tab-icon" />
          <span>Favoris</span>
        </button>
        <button
          className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          <Cog6ToothIcon className="tab-icon" />
          <span>Paramètres</span>
        </button>
      </div>

      {/* Contenu des onglets */}
      <div className="account-content">
        {activeTab === 'profile' && (
          <div className="profile-section animate-fadeIn">
            <div className="profile-header">
              <h2 className="profile-section-title">Informations personnelles</h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="profile-edit-btn"
                >
                  <PencilIcon className="h-4 w-4" />
                  <span>Modifier</span>
                </button>
              )}
            </div>

            {!isEditing ? (
              <div className="profile-info">
                <div className="info-card">
                  <div className="info-row">
                    <span className="info-label">Nom complet</span>
                    <span className="info-value">{user?.name}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Email</span>
                    <span className="info-value">{user?.email}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Téléphone</span>
                    <span className="info-value">{user?.phone}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Membre depuis</span>
                    <span className="info-value">
                      {new Date(user?.createdAt).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleUpdateProfile} className="profile-form">
                <div className="form-grid">
                  <div className="form-field">
                    <label className="form-label">Nom complet</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Téléphone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="password-section">
                  <h3 className="password-title">Changer le mot de passe</h3>
                  <p className="password-subtitle">Laissez vide si vous ne souhaitez pas le modifier</p>
                  
                  <div className="form-grid">
                    <div className="form-field">
                      <label className="form-label">Mot de passe actuel</label>
                      <input
                        type="password"
                        value={formData.currentPassword}
                        onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
                        className="form-input"
                      />
                    </div>
                    <div className="form-field">
                      <label className="form-label">Nouveau mot de passe</label>
                      <input
                        type="password"
                        value={formData.newPassword}
                        onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                        className="form-input"
                      />
                    </div>
                    <div className="form-field">
                      <label className="form-label">Confirmer le mot de passe</label>
                      <input
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                        className="form-input"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="form-submit-btn">
                    Enregistrer les modifications
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="form-cancel-btn"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="orders-section animate-fadeIn">
            <div className="orders-header">
              <h2 className="orders-section-title">Mes commandes</h2>
              <div className="orders-controls">
                <div className="orders-last-update">
                  Dernière mise à jour : {new Date(lastUpdate).toLocaleTimeString()}
                </div>
                <button 
                  onClick={handleManualRefresh} 
                  className="orders-refresh-btn" 
                  title="Mettre à jour"
                  disabled={ordersLoading}
                >
                  <ArrowPathIcon className={`h-5 w-5 ${ordersLoading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {ordersLoading ? (
              <div className="orders-loading">
                <div className="spinner-small"></div>
                <p>Chargement des commandes...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="orders-empty">
                <ShoppingBagIcon className="orders-empty-icon" />
                <h3>Aucune commande pour le moment</h3>
                <p>Découvrez nos produits et passez votre première commande</p>
                <Link to="/product/1" className="orders-empty-btn">
                  Découvrir Strong Man
                </Link>
              </div>
            ) : (
              <div className="orders-list">
                {orders
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((order) => (
                    <div key={`${order.id}-${order._updated}`} className="order-card">
                      <div className="order-header">
                        <div className="order-info">
                          <span className="order-number">Commande #{order.id}</span>
                          <span className="order-date">
                            {new Date(order.createdAt).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                        {getStatusBadge(order.status)}
                      </div>

                      <div className="order-items">
                        {order.items?.map((item, idx) => (
                          <div key={idx} className="order-item">
                            <span className="order-item-name">{item.product?.name || 'Produit'}</span>
                            <span className="order-item-details">
                              {item.quantity} x {Number(item.price).toFixed(2)} USD
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="order-footer">
                        <div className="order-total">
                          <span className="total-label">Total</span>
                          <span className="total-value">{Number(order.total).toFixed(2)} USD</span>
                        </div>
                        <Link to={`/account/orders/${order.id}`} className="order-details-link">
                          Voir les détails
                          <ArrowRightOnRectangleIcon className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'addresses' && (
          <div className="addresses-section animate-fadeIn">
            <h2 className="addresses-section-title">Mes adresses</h2>
            
            <div className="addresses-grid">
              <div className="address-card">
                <div className="address-header">
                  <MapPinIcon className="address-icon" />
                  <h3>Adresse par défaut</h3>
                </div>
                <div className="address-content">
                  <p>123 Avenue de la Libération</p>
                  <p>Kinshasa, Gombe</p>
                  <p>République Démocratique du Congo</p>
                </div>
                <div className="address-actions">
                  <button className="address-edit">Modifier</button>
                  <button className="address-delete">Supprimer</button>
                </div>
              </div>

              <button className="address-add-card">
                <div className="address-add-icon">+</div>
                <span>Ajouter une adresse</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'wishlist' && (
          <div className="wishlist-section animate-fadeIn">
            <h2 className="wishlist-section-title">Mes favoris</h2>
            <div className="wishlist-empty">
              <HeartIcon className="wishlist-empty-icon" />
              <h3>Votre liste de favoris est vide</h3>
              <p>Ajoutez des produits à vos favoris pour les retrouver facilement</p>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="settings-section animate-fadeIn">
            <h2 className="settings-section-title">Paramètres du compte</h2>
            
            <div className="settings-card">
              <h3>Préférences de communication</h3>
              <div className="settings-option">
                <input type="checkbox" id="newsletter" className="settings-checkbox" />
                <label htmlFor="newsletter">Recevoir la newsletter</label>
              </div>
              <div className="settings-option">
                <input type="checkbox" id="offers" className="settings-checkbox" />
                <label htmlFor="offers">Recevoir les offres promotionnelles</label>
              </div>
            </div>

            <div className="settings-card">
              <h3>Confidentialité</h3>
              <div className="settings-option">
                <input type="checkbox" id="profile-public" className="settings-checkbox" />
                <label htmlFor="profile-public">Profil public</label>
              </div>
            </div>

            <div className="settings-card danger">
              <h3>Zone de danger</h3>
              <p>La suppression du compte est irréversible</p>
              <button className="settings-delete-btn">
                Supprimer mon compte
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Après les statistiques ou dans l'en-tête */}
        <div className="continue-shopping-container">
          <Link to="/product/1" className="continue-shopping-btn">
            <ShoppingBagIcon className="h-5 w-5" />
            <span>Continuer mes achats</span>
            <ArrowRightIcon className="h-5 w-5" />
          </Link>
        </div>
    </div>
  );
}