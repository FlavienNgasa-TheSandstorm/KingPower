import { useState, useEffect } from 'react';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  UsersIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  CheckCircleIcon,
  XMarkIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import api from '../lib/api';
import toast from 'react-hot-toast';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, inactive

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/customers');
      setCustomers(response.data);
    } catch (error) {
      toast.error('Erreur lors du chargement des clients');
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone?.includes(searchTerm);
    
    if (filter === 'active') return matchesSearch && (customer.totalOrders > 0);
    if (filter === 'inactive') return matchesSearch && (customer.totalOrders === 0);
    return matchesSearch;
  });

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="customers-loading">
        <div className="premium-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <UsersIcon className="spinner-icon" />
        </div>
      </div>
    );
  }

  return (
    <div className="customers-page">
      {/* En-tête */}
      <div className="customers-header">
        <div>
          <h1 className="customers-title">
            Gestion des Clients
            <span className="customers-title-decoration"></span>
          </h1>
          <p className="customers-subtitle">
            Gérez et suivez tous vos clients
          </p>
        </div>
        <div className="customers-stats-badge">
          <UsersIcon className="h-5 w-5" />
          <span>{customers.length} clients</span>
        </div>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="customers-search-section">
        <div className="search-wrapper">
          <MagnifyingGlassIcon className="search-icon" />
          <input
            type="text"
            placeholder="Rechercher un client (nom, email, téléphone)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button 
              className="search-clear"
              onClick={() => setSearchTerm('')}
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Tous les clients
          </button>
          <button
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Actifs
          </button>
          <button
            className={`filter-btn ${filter === 'inactive' ? 'active' : ''}`}
            onClick={() => setFilter('inactive')}
          >
            Inactifs
          </button>
        </div>
      </div>

      {/* Grille principale */}
      <div className="customers-grid">
        {/* Liste des clients */}
        <div className="customers-list-section">
          {filteredCustomers.length === 0 ? (
            <div className="customers-empty">
              <UsersIcon className="empty-icon" />
              <h3>Aucun client trouvé</h3>
              <p>Essayez de modifier vos critères de recherche</p>
            </div>
          ) : (
            <div className="customers-list">
              {filteredCustomers.map((customer) => (
                <div
                  key={customer.id}
                  className={`customer-card ${selectedCustomer?.id === customer.id ? 'selected' : ''}`}
                  onClick={() => setSelectedCustomer(customer)}
                >
                  <div className="customer-card-header">
                    <div className="customer-avatar-wrapper">
                      <div className="customer-avatar">
                        {getInitials(customer.name)}
                      </div>
                      <div className={`customer-status ${customer.totalOrders > 0 ? 'active' : 'inactive'}`} />
                    </div>
                    <div className="customer-card-info">
                      <h3 className="customer-card-name">{customer.name}</h3>
                      <p className="customer-card-email">{customer.email}</p>
                    </div>
                  </div>

                  <div className="customer-card-stats">
                    <div className="stat-item">
                      <ShoppingBagIcon className="stat-icon" />
                      <span className="stat-value">{customer.totalOrders || 0}</span>
                      <span className="stat-label">commandes</span>
                    </div>
                    <div className="stat-item">
                      <CurrencyDollarIcon className="stat-icon" />
                      <span className="stat-value">{customer.totalSpent || 0}</span>
                      <span className="stat-label">USD</span>
                    </div>
                  </div>

                  <div className="customer-card-footer">
                    <PhoneIcon className="footer-icon" />
                    <span className="footer-text">{customer.phone}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Panneau de détails */}
        <div className="customer-detail-panel">
          {selectedCustomer ? (
            <div className="detail-card">
              <div className="detail-header">
                <button 
                  className="detail-close lg:hidden"
                  onClick={() => setSelectedCustomer(null)}
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
                <div className="detail-avatar-wrapper">
                  <div className="detail-avatar">
                    {getInitials(selectedCustomer.name)}
                  </div>
                  <div className={`detail-status ${selectedCustomer.totalOrders > 0 ? 'active' : 'inactive'}`} />
                </div>
                <h2 className="detail-name">{selectedCustomer.name}</h2>
                <p className="detail-email">{selectedCustomer.email}</p>
              </div>

              <div className="detail-stats">
                <div className="detail-stat">
                  <span className="detail-stat-label">Commandes</span>
                  <span className="detail-stat-value">{selectedCustomer.totalOrders || 0}</span>
                </div>
                <div className="detail-stat">
                  <span className="detail-stat-label">Total dépensé</span>
                  <span className="detail-stat-value">
                    {selectedCustomer.totalSpent || 0} USD
                  </span>
                </div>
                <div className="detail-stat">
                  <span className="detail-stat-label">Client depuis</span>
                  <span className="detail-stat-value">
                    {formatDate(selectedCustomer.createdAt)}
                  </span>
                </div>
              </div>

              <div className="detail-info">
                <h3 className="detail-info-title">Informations de contact</h3>
                
                <div className="detail-info-item">
                  <PhoneIcon className="detail-info-icon" />
                  <div>
                    <p className="detail-info-label">Téléphone</p>
                    <a href={`tel:${selectedCustomer.phone}`} className="detail-info-value">
                      {selectedCustomer.phone}
                    </a>
                  </div>
                </div>

                <div className="detail-info-item">
                  <EnvelopeIcon className="detail-info-icon" />
                  <div>
                    <p className="detail-info-label">Email</p>
                    <a href={`mailto:${selectedCustomer.email}`} className="detail-info-value">
                      {selectedCustomer.email}
                    </a>
                  </div>
                </div>

                {selectedCustomer.addresses?.map((address, index) => (
                  <div key={index} className="detail-info-item">
                    <MapPinIcon className="detail-info-icon" />
                    <div>
                      <p className="detail-info-label">
                        Adresse {address.isDefault ? '(par défaut)' : ''}
                      </p>
                      <p className="detail-info-value">
                        {address.street}<br />
                        {address.city}, {address.province}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="detail-actions">
                <a
                  href={`mailto:${selectedCustomer.email}`}
                  className="detail-action-btn primary"
                >
                  <EnvelopeIcon className="h-4 w-4" />
                  <span>Contacter par email</span>
                </a>
                <a
                  href={`tel:${selectedCustomer.phone}`}
                  className="detail-action-btn secondary"
                >
                  <PhoneIcon className="h-4 w-4" />
                  <span>Appeler</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="detail-empty">
              <UsersIcon className="empty-icon" />
              <h3>Aucun client sélectionné</h3>
              <p>Cliquez sur un client pour voir ses détails</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}