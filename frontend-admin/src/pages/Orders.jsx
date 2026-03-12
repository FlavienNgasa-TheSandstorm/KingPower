import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBagIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  TruckIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowPathIcon,
  EyeIcon,
  CalendarIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline';
import api from '../lib/api';
import toast from 'react-hot-toast';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/orders');
      setOrders(response.data);
    } catch (error) {
      toast.error('Erreur chargement commandes');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      setUpdatingId(orderId);
      await api.put(`/admin/orders/${orderId}`, { status });
      toast.success('Statut mis à jour');
      await fetchOrders();
    } catch (error) {
      toast.error('Erreur lors de la mise à jour');
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="h-4 w-4" />;
      case 'pending':
        return <ClockIcon className="h-4 w-4" />;
      case 'failed':
        return <XCircleIcon className="h-4 w-4" />;
      case 'delivered':
        return <TruckIcon className="h-4 w-4" />;
      default:
        return <ClockIcon className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'delivered':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Payée';
      case 'pending':
        return 'En attente';
      case 'failed':
        return 'Échouée';
      case 'delivered':
        return 'Livrée';
      default:
        return status;
    }
  };

  const formatPaymentMethod = (method) => {
    switch (method) {
      case 'cash-on-delivery':
        return {
          full: 'Paiement à la livraison',
          short: 'À la livraison',
          icon: TruckIcon,
          color: 'bg-green-100 text-green-800'
        };
      case 'mpesa':
        return {
          full: 'M-Pesa',
          short: 'M-Pesa',
          icon: CreditCardIcon,
          color: 'bg-green-100 text-green-800'
        };
      case 'airtel-money':
        return {
          full: 'Airtel Money',
          short: 'Airtel',
          icon: CreditCardIcon,
          color: 'bg-red-100 text-red-800'
        };
      case 'orange-money':
        return {
          full: 'Orange Money',
          short: 'Orange',
          icon: CreditCardIcon,
          color: 'bg-orange-100 text-orange-800'
        };
      default:
        return {
          full: method,
          short: method,
          icon: CreditCardIcon,
          color: 'bg-gray-100 text-gray-800'
        };
    }
  };

  // Grouper les commandes par jour
  const groupOrdersByDay = (orders) => {
    const groups = {};
    orders.forEach(order => {
      const date = new Date(order.createdAt).toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(order);
    });
    return groups;
  };

  const filteredOrders = orders.filter(order => {
    const matchesFilter = filter === 'all' ? true : order.status === filter;
    const matchesSearch = 
      order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toString().includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  const groupedOrders = groupOrdersByDay(filteredOrders);

  const stats = {
    all: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    completed: orders.filter(o => o.status === 'completed' || o.status === 'delivered').length,
    failed: orders.filter(o => o.status === 'failed').length
  };

  if (loading) {
    return (
      <div className="orders-loading">
        <div className="premium-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <ShoppingBagIcon className="spinner-icon" />
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      {/* En-tête */}
      <div className="orders-header">
        <div>
          <h1 className="orders-title">
            Gestion des Commandes
            <span className="orders-title-decoration"></span>
          </h1>
          <p className="orders-subtitle">
            Suivez et gérez toutes les commandes
          </p>
        </div>
        <button 
          onClick={fetchOrders} 
          className="orders-refresh-btn"
          disabled={loading}
        >
          <ArrowPathIcon className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
          <span>Actualiser</span>
        </button>
      </div>

      {/* Statistiques */}
      <div className="orders-stats">
        <div className="stat-card" onClick={() => setFilter('all')}>
          <div className="stat-icon all">
            <ShoppingBagIcon className="h-5 w-5" />
          </div>
          <div className="stat-content">
            <span className="stat-value">{stats.all}</span>
            <span className="stat-label">Total</span>
          </div>
        </div>
        <div className="stat-card" onClick={() => setFilter('pending')}>
          <div className="stat-icon pending">
            <ClockIcon className="h-5 w-5" />
          </div>
          <div className="stat-content">
            <span className="stat-value">{stats.pending}</span>
            <span className="stat-label">En attente</span>
          </div>
        </div>
        <div className="stat-card" onClick={() => setFilter('completed')}>
          <div className="stat-icon completed">
            <CheckCircleIcon className="h-5 w-5" />
          </div>
          <div className="stat-content">
            <span className="stat-value">{stats.completed}</span>
            <span className="stat-label">Terminées</span>
          </div>
        </div>
        <div className="stat-card" onClick={() => setFilter('failed')}>
          <div className="stat-icon failed">
            <XCircleIcon className="h-5 w-5" />
          </div>
          <div className="stat-content">
            <span className="stat-value">{stats.failed}</span>
            <span className="stat-label">Échouées</span>
          </div>
        </div>
      </div>

      {/* Recherche et filtres */}
      <div className="orders-search-section">
        <div className="search-wrapper">
          <MagnifyingGlassIcon className="search-icon" />
          <input
            type="text"
            placeholder="Rechercher par ID ou client..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            <span>Toutes</span>
            <span className="filter-count">{stats.all}</span>
          </button>
          <button
            className={`filter-btn pending ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            <ClockIcon className="h-4 w-4" />
            <span>En attente</span>
            <span className="filter-count">{stats.pending}</span>
          </button>
          <button
            className={`filter-btn completed ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            <CheckCircleIcon className="h-4 w-4" />
            <span>Terminées</span>
            <span className="filter-count">{stats.completed}</span>
          </button>
          <button
            className={`filter-btn failed ${filter === 'failed' ? 'active' : ''}`}
            onClick={() => setFilter('failed')}
          >
            <XCircleIcon className="h-4 w-4" />
            <span>Échouées</span>
            <span className="filter-count">{stats.failed}</span>
          </button>
        </div>
      </div>

      {/* Liste des commandes groupées par jour */}
      <div className="orders-by-day">
        {Object.entries(groupedOrders).map(([date, dayOrders]) => (
          <div key={date} className="day-group">
            <div className="day-header">
              <CalendarIcon className="day-icon" />
              <h2 className="day-title">{date}</h2>
              <span className="day-count">{dayOrders.length} commande{dayOrders.length > 1 ? 's' : ''}</span>
            </div>

            <div className="day-orders">
              {dayOrders.map((order) => {
                const paymentInfo = formatPaymentMethod(order.paymentMethod);
                const PaymentIcon = paymentInfo.icon;
                const orderTime = new Date(order.createdAt).toLocaleTimeString('fr-FR', {
                  hour: '2-digit',
                  minute: '2-digit'
                });

                return (
                  <div key={order.id} className="order-row-enhanced">
                    <div className="order-main-info">
                      <div className="order-badge">
                        <span className="order-id">#{order.id}</span>
                        <span className="order-time">
                          <ClockIcon className="h-3 w-3" />
                          {orderTime}
                        </span>
                      </div>

                      <div className="order-customer-info">
                        <span className="customer-name">{order.customerName || 'Client'}</span>
                      </div>

                      <div className="order-amount-info">
                        <span className="amount-value">{order.total} USD</span>
                      </div>

                      <div className={`payment-method-badge ${paymentInfo.color}`}>
                        <PaymentIcon className="h-3 w-3" />
                        <span className="payment-full">{paymentInfo.full}</span>
                        <span className="payment-short">{paymentInfo.short}</span>
                      </div>

                      <div className="order-status-selector">
                        <select
                          value={order.status}
                          onChange={(e) => updateStatus(order.id, e.target.value)}
                          disabled={updatingId === order.id}
                          className={`status-select ${order.status}`}
                        >
                          <option value="pending">En attente</option>
                          <option value="completed">Payée</option>
                          <option value="delivered">Livrée</option>
                          <option value="failed">Échouée</option>
                        </select>
                        {updatingId === order.id && (
                          <ArrowPathIcon className="h-4 w-4 animate-spin ml-2" />
                        )}
                      </div>

                      <Link
                        to={`/orders/${order.id}`}
                        className="view-details-btn"
                      >
                        <EyeIcon className="h-4 w-4" />
                        <span>Détails</span>
                      </Link>
                    </div>

                    {/* Timeline de livraison (si livrée) */}
                    {order.status === 'delivered' && (
                      <div className="delivery-timeline">
                        <div className="timeline-item">
                          <span className="timeline-label">Commandé</span>
                          <span className="timeline-time">
                            {new Date(order.createdAt).toLocaleString('fr-FR')}
                          </span>
                        </div>
                        <div className="timeline-arrow">→</div>
                        <div className="timeline-item">
                          <span className="timeline-label">Livré</span>
                          <span className="timeline-time">
                            {order.deliveredAt 
                              ? new Date(order.deliveredAt).toLocaleString('fr-FR')
                              : 'Non spécifié'}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}