import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  TruckIcon,
  ShoppingBagIcon,
  UserIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  CreditCardIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import api from '../lib/api';
import toast from 'react-hot-toast';

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/admin/orders/${id}`);
      setOrder(response.data);
      console.log('📦 Détail commande reçu:', response.data);
    } catch (error) {
      toast.error('Erreur lors du chargement de la commande');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (newStatus) => {
    try {
      setUpdating(true);
      await api.put(`/admin/orders/${id}`, { status: newStatus });
      setOrder({ ...order, paymentStatus: newStatus });
      toast.success('Statut mis à jour avec succès');
    } catch (error) {
      toast.error('Erreur lors de la mise à jour');
    } finally {
      setUpdating(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="h-5 w-5" />;
      case 'pending':
        return <ClockIcon className="h-5 w-5" />;
      case 'failed':
        return <XCircleIcon className="h-5 w-5" />;
      case 'delivered':
        return <TruckIcon className="h-5 w-5" />;
      default:
        return <ClockIcon className="h-5 w-5" />;
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

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="order-loading">
        <div className="premium-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <ShoppingBagIcon className="spinner-icon" />
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="order-not-found">
        <XCircleIcon className="not-found-icon" />
        <h2 className="not-found-title">Commande non trouvée</h2>
        <p className="not-found-text">La commande #{id} n'existe pas</p>
        <Link to="/orders" className="not-found-link">
          <ArrowLeftIcon className="h-4 w-4" />
          Retour aux commandes
        </Link>
      </div>
    );
  }

// Déterminer le nom du client
const getCustomerName = () => {
  console.log('🔍 Recherche nom:', {
    customer: order.customer,
    customerInfo: order.customerInfo
  });
  
  // Si l'utilisateur est connecté
  if (order.customer?.name) {
    return order.customer.name;
  }
  
  // Si c'est une commande sans compte
  if (order.customerInfo?.name) {
    return order.customerInfo.name;
  }
  
  // Si customerInfo est une chaîne JSON (au cas où)
  if (typeof order.customerInfo === 'string') {
    try {
      const parsed = JSON.parse(order.customerInfo);
      if (parsed.name) return parsed.name;
    } catch (e) {}
  }
  
  return 'Client inconnu';
};

  // Déterminer le téléphone du client
  const getCustomerPhone = () => {
    if (order.customer?.phone) {
      return order.customer.phone;
    }
    if (order.customerInfo?.phone) {
      return order.customerInfo.phone;
    }
    return 'Non renseigné';
  };

  // Déterminer l'email du client
  const getCustomerEmail = () => {
    if (order.customer?.email) {
      return order.customer.email;
    }
    if (order.customerInfo?.email) {
      return order.customerInfo.email;
    }
    return 'Non renseigné';
  };

  return (
    <div className="order-detail-page">
      {/* En-tête */}
      <div className="order-header">
        <div className="order-header-left">
          <Link to="/orders" className="order-back-link">
            <ArrowLeftIcon className="h-4 w-4" />
            <span>Retour aux commandes</span>
          </Link>
          <div>
            <h1 className="order-title">
              Commande #{order.id}
              <span className={`order-status-badge ${order.paymentStatus}`}>
                {getStatusIcon(order.paymentStatus)}
                <span>{getStatusText(order.paymentStatus)}</span>
              </span>
            </h1>
            <p className="order-date">Passée le {formatDate(order.createdAt)}</p>
          </div>
        </div>
      </div>

      {/* Grille principale */}
      <div className="order-grid">
        {/* Colonne gauche - Informations client et livraison */}
        <div className="order-left-column">
          {/* Informations client */}
          <div className="order-card">
            <h2 className="card-title">
              <UserIcon className="card-title-icon" />
              <span>Client</span>
            </h2>
            <div className="card-content">
              <p className="customer-name">
                {getCustomerName()}
              </p>
              
              <div className="customer-contact">
                <EnvelopeIcon className="contact-icon" />
                <a href={`mailto:${getCustomerEmail()}`} className="contact-link">
                  {getCustomerEmail()}
                </a>
              </div>

              <div className="customer-contact">
                <PhoneIcon className="contact-icon" />
                <a href={`tel:${getCustomerPhone()}`} className="contact-link">
                  {getCustomerPhone()}
                </a>
              </div>

              {order.customerInfo?.notes && (
                <div className="customer-note">
                  <p className="note-label">Notes :</p>
                  <p className="note-text">{order.customerInfo.notes}</p>
                </div>
              )}
            </div>
          </div>

          {/* Adresse de livraison */}
          <div className="order-card">
            <h2 className="card-title">
              <MapPinIcon className="card-title-icon" />
              <span>Adresse de livraison</span>
            </h2>
            <div className="card-content">
              <p className="address-street">{order.shippingAddress?.street}</p>
              <p className="address-city">{order.shippingAddress?.city}</p>
              <p className="address-province">{order.shippingAddress?.province}</p>
            </div>
          </div>
        </div>

        {/* Colonne droite - Articles et paiement */}
        <div className="order-right-column">
          {/* Mise à jour du statut */}
          <div className="order-card">
            <h2 className="card-title">
              <CreditCardIcon className="card-title-icon" />
              <span>Statut de paiement</span>
            </h2>
            <div className="card-content">
              <select
                value={order.paymentStatus}
                onChange={(e) => updateStatus(e.target.value)}
                disabled={updating}
                className={`status-select ${order.paymentStatus}`}
              >
                <option value="pending">En attente</option>
                <option value="completed">Payée</option>
                <option value="failed">Échouée</option>
                <option value="delivered">Livrée</option>
              </select>
              {updating && (
                <div className="updating-indicator">
                  <div className="spinner-small"></div>
                  <span>Mise à jour...</span>
                </div>
              )}
            </div>
          </div>

          {/* Articles commandés */}
          <div className="order-card">
            <h2 className="card-title">
              <ShoppingBagIcon className="card-title-icon" />
              <span>Articles commandés</span>
            </h2>
            <div className="card-content">
              <div className="items-list">
                {order.items?.map((item, index) => (
                  <div key={index} className="order-item">
                    <div className="item-info">
                      <p className="item-name">{item.product?.name || `Produit #${item.productId}`}</p>
                      <p className="item-price">{Number(item.price).toFixed(2)} USD × {item.quantity}</p>
                    </div>
                    <p className="item-total">
                      {(Number(item.price) * item.quantity).toFixed(2)} USD
                    </p>
                  </div>
                ))}
              </div>

              <div className="order-total">
                <div className="total-row">
                  <span>Sous-total</span>
                  <span>{Number(order.total).toFixed(2)} USD</span>
                </div>
                <div className="total-row grand-total">
                  <span>Total TTC</span>
                  <span className="total-amount">{Number(order.total).toFixed(2)} USD</span>
                </div>
              </div>
            </div>
          </div>

          {/* Méthode de paiement */}
          <div className="order-card">
            <h2 className="card-title">
              <CreditCardIcon className="card-title-icon" />
              <span>Méthode de paiement</span>
            </h2>
            <div className="card-content">
              <div className="payment-method">
                <span className="payment-method-name">
                  {order.paymentMethod === 'cash-on-delivery' ? 'Paiement à la livraison' : order.paymentMethod}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}