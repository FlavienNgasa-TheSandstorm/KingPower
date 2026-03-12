import { Link } from 'react-router-dom';
import { 
  TrashIcon, 
  ShoppingBagIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  TruckIcon,
  CreditCardIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import useCartStore from '../stores/cartStore';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  
  // Calculer les valeurs directement à partir des items
  const itemCount = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const subtotal = items.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 0), 
    0
  );
  
  const shippingCost = subtotal > 50 ? 0 : 5;
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const finalTotal = subtotal + shippingCost - discount;

  console.log('🛒 Cart - items:', items);
  console.log('💰 Cart - subtotal:', subtotal);
  console.log('🔢 Cart - itemCount:', itemCount);

  // Afficher un toast quand le panier est vidé
  const handleClearCart = () => {
    clearCart();
    toast.success('Panier vidé avec succès', {
      duration: 2000,
      style: {
        background: '#10b981',
        color: 'white',
        borderRadius: '12px'
      }
    });
  };

  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <div className="cart-empty-content">
          <div className="cart-empty-icon-wrapper">
            <ShoppingBagIcon className="cart-empty-icon" />
          </div>
          <h2 className="cart-empty-title">Votre panier est vide</h2>
          <p className="cart-empty-text">
            Découvrez Strong Man, notre solution pour la santé masculine
          </p>
          <Link to="/product/1" className="cart-empty-btn">
            Découvrir Strong Man
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1 className="cart-title">Votre Panier</h1>
        <span className="cart-badge">{itemCount} article{itemCount > 1 ? 's' : ''}</span>
      </div>

      <div className="cart-grid">
        {/* Liste des articles */}
        <div className="cart-items-section">
          <div className="cart-items-header">
            <span className="cart-items-count">{itemCount} articles</span>
            <button onClick={handleClearCart} className="cart-clear-btn">
              <TrashIcon className="h-4 w-4" />
              Vider le panier
            </button>
          </div>

          <div className="cart-items-list">
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image-wrapper">
                  <img 
                    src={item.images?.[0] || item.image || '/placeholder.jpg'} 
                    alt={item.name} 
                    className="cart-item-image"
                  />
                </div>

                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-price">{Number(item.price).toFixed(2)} USD</p>
                  
                  <div className="cart-item-actions">
                    <div className="cart-quantity-selector">
                      <button 
                        className="cart-quantity-btn"
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      >
                        −
                      </button>
                      <span className="cart-quantity-value">{item.quantity}</span>
                      <button 
                        className="cart-quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="cart-remove-btn"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="cart-item-total">
                  <span className="cart-item-total-label">Sous-total</span>
                  <span className="cart-item-total-value">
                    {(Number(item.price) * item.quantity).toFixed(2)} USD
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Résumé de la commande */}
        <div className="cart-summary">
          <h2 className="summary-title">Récapitulatif</h2>
          
          {/* Code promo */}
          <div className="promo-section">
            <input
              type="text"
              placeholder="Code promo"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="promo-input"
            />
            <button 
              onClick={() => setPromoApplied(true)}
              className="promo-btn"
              disabled={!promoCode || promoApplied}
            >
              Appliquer
            </button>
          </div>

          {/* Détails des prix */}
          <div className="summary-details">
            <div className="summary-row">
              <span>Sous-total</span>
              <span className="summary-value">{subtotal.toFixed(2)} USD</span>
            </div>
            
            <div className="summary-row">
              <span>Livraison</span>
              <span className="summary-value">
                {shippingCost === 0 ? (
                  <span className="text-green-500">Gratuite</span>
                ) : (
                  `${shippingCost.toFixed(2)} USD`
                )}
              </span>
            </div>

            {promoApplied && (
              <div className="summary-row promo">
                <span>Réduction (10%)</span>
                <span className="summary-value text-green-500">
                  -{discount.toFixed(2)} USD
                </span>
              </div>
            )}

            <div className="summary-divider"></div>

            <div className="summary-total">
              <span>Total TTC</span>
              <span className="summary-total-value">{finalTotal.toFixed(2)} USD</span>
            </div>

            {shippingCost === 0 && (
              <div className="shipping-badge">
                <TruckIcon className="h-4 w-4" />
                <span>Livraison gratuite</span>
              </div>
            )}
          </div>

          {/* Bouton paiement */}
          <Link
            to="/checkout"
            className="checkout-btn"
          >
            <span>Procéder au paiement</span>
            <ArrowRightIcon className="h-5 w-5" />
          </Link>

          {/* Moyens de paiement */}
          <div className="payment-info">
            <div className="payment-icons">
              <span className="payment-icon">M-Pesa</span>
              <span className="payment-icon">Airtel</span>
              <span className="payment-icon">Orange</span>
              <span className="payment-icon">Visa</span>
              <span className="payment-icon">PayPal</span>
            </div>
            <p className="payment-security">
              <ShieldCheckIcon className="h-4 w-4" />
              Paiement 100% sécurisé
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}