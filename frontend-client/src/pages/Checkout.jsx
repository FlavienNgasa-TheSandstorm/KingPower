import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShoppingBagIcon,
  MapPinIcon,
  CreditCardIcon,
  LockClosedIcon,
  TruckIcon,
  ShieldCheckIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';
import useCartStore from '../stores/cartStore';
import api from '../lib/api';
import toast from 'react-hot-toast';
import MpesaForm from '../components/Payment/MpesaForm';
import AirtelForm from '../components/Payment/AirtelForm';
import OrangeForm from '../components/Payment/OrangeForm';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({
    street: '',
    city: '',
    province: ''
  });
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculs directs à partir des items
  const subtotal = items.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 0), 
    0
  );
  const shippingCost = subtotal > 50 ? 0 : 5;
  const finalTotal = subtotal + shippingCost;

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePayment = async (paymentDetails) => {
    setIsProcessing(true);
    try {
      // Préparer les données de commande
      const orderData = {
        items: items.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: Number(item.price)
        })),
        total: finalTotal,
        paymentMethod,
        shippingAddress: address,
        customerInfo: customerInfo // Ajouter les infos du client
      };

      // Envoyer la commande (sans vérification de token)
      const response = await api.post('/orders', orderData);
      
      toast.success('Commande créée avec succès !');
      clearCart();
      
      // Rediriger vers une page de confirmation ou la page d'accueil
      navigate('/');
      
    } catch (error) {
      console.error('Erreur commande:', error);
      toast.error(error.response?.data?.message || 'Erreur lors de la commande');
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="checkout-page">
      {/* En-tête */}
      <div className="checkout-header">
        <Link to="/cart" className="checkout-back-link">
          <ArrowLeftIcon className="h-5 w-5" />
          <span>Retour au panier</span>
        </Link>
        <h1 className="checkout-title">Finaliser la commande</h1>
        <div className="checkout-steps">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>
            <div className="step-number">1</div>
            <div className="step-label">Informations</div>
          </div>
          <div className={`step-line ${step >= 2 ? 'active' : ''}`}></div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>
            <div className="step-number">2</div>
            <div className="step-label">Paiement</div>
          </div>
        </div>
      </div>

      <div className="checkout-grid">
        {/* Formulaire principal */}
        <div className="checkout-form-container">
          {step === 1 && (
            <div className="checkout-form animate-fadeIn">
              <div className="form-header">
                <MapPinIcon className="form-header-icon" />
                <h2 className="form-header-title">Informations de livraison</h2>
              </div>

              <form onSubmit={handleAddressSubmit} className="form-fields">
                {/* Informations personnelles */}
                <div className="form-field">
                  <label className="form-label">
                    Nom complet <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                    className="form-input"
                    placeholder="Jean Dupont"
                  />
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label className="form-label">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                      className="form-input"
                      placeholder="jean@email.com"
                    />
                  </div>

                  <div className="form-field">
                    <label className="form-label">
                      Téléphone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                      className="form-input"
                      placeholder="+243 XXX XXX XXX"
                    />
                  </div>
                </div>

                {/* Adresse de livraison */}
                <div className="form-field">
                  <label className="form-label">
                    Rue et numéro <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={address.street}
                    onChange={(e) => setAddress({...address, street: e.target.value})}
                    className="form-input"
                    placeholder="Ex: 123 Avenue de la Libération"
                  />
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label className="form-label">
                      Ville <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={address.city}
                      onChange={(e) => setAddress({...address, city: e.target.value})}
                      className="form-input"
                      placeholder="Ex: Kinshasa"
                    />
                  </div>

                  <div className="form-field">
                    <label className="form-label">
                      Province <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={address.province}
                      onChange={(e) => setAddress({...address, province: e.target.value})}
                      className="form-select"
                    >
                      <option value="">Sélectionnez</option>
                      <option value="kinshasa">Kinshasa</option>
                      <option value="lubumbashi">Lubumbashi</option>
                      <option value="mbuji-mayi">Mbuji-Mayi</option>
                      <option value="goma">Goma</option>
                      <option value="bukavu">Bukavu</option>
                      <option value="kisangani">Kisangani</option>
                    </select>
                  </div>
                </div>

                <div className="form-note">
                  <TruckIcon className="form-note-icon" />
                  <p>Livraison gratuite pour toute commande supérieure à 50 USD</p>
                </div>

                <button type="submit" className="form-submit-btn">
                  <span>Continuer vers le paiement</span>
                  <CreditCardIcon className="h-5 w-5" />
                </button>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="checkout-form animate-fadeIn">
              <div className="form-header">
                <CreditCardIcon className="form-header-icon" />
                <h2 className="form-header-title">Moyen de paiement</h2>
              </div>

              <div className="payment-methods">
                <h3 className="payment-methods-title">
                  Choisissez votre méthode de paiement <span className="text-red-500">*</span>
                </h3>
                
                {/* M-Pesa */}
                <div className="payment-option-card">
                  <label className={`payment-option-label ${paymentMethod === 'mpesa' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="payment"
                      value="mpesa"
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="payment-radio"
                    />
                    <div className="payment-option-content">
                      <div className="payment-option-left">
                        <div className="payment-option-icon mpesa">M</div>
                        <div>
                          <span className="payment-option-title">M-Pesa</span>
                          <span className="payment-option-subtitle">Vodacom RDC</span>
                        </div>
                      </div>
                      <CheckCircleIcon className={`payment-option-check ${paymentMethod === 'mpesa' ? 'visible' : ''}`} />
                    </div>
                  </label>
                  
                  {paymentMethod === 'mpesa' && (
                    <div className="payment-form-direct">
                      <MpesaForm onSubmit={handlePayment} />
                    </div>
                  )}
                </div>

                {/* Airtel Money */}
                <div className="payment-option-card">
                  <label className={`payment-option-label ${paymentMethod === 'airtel-money' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="payment"
                      value="airtel-money"
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="payment-radio"
                    />
                    <div className="payment-option-content">
                      <div className="payment-option-left">
                        <div className="payment-option-icon airtel">A</div>
                        <div>
                          <span className="payment-option-title">Airtel Money</span>
                          <span className="payment-option-subtitle">Airtel RDC</span>
                        </div>
                      </div>
                      <CheckCircleIcon className={`payment-option-check ${paymentMethod === 'airtel-money' ? 'visible' : ''}`} />
                    </div>
                  </label>
                  
                  {paymentMethod === 'airtel-money' && (
                    <div className="payment-form-direct">
                      <AirtelForm onSubmit={handlePayment} />
                    </div>
                  )}
                </div>

                {/* Orange Money */}
                <div className="payment-option-card">
                  <label className={`payment-option-label ${paymentMethod === 'orange-money' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="payment"
                      value="orange-money"
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="payment-radio"
                    />
                    <div className="payment-option-content">
                      <div className="payment-option-left">
                        <div className="payment-option-icon orange">O</div>
                        <div>
                          <span className="payment-option-title">Orange Money</span>
                          <span className="payment-option-subtitle">Orange RDC</span>
                        </div>
                      </div>
                      <CheckCircleIcon className={`payment-option-check ${paymentMethod === 'orange-money' ? 'visible' : ''}`} />
                    </div>
                  </label>
                  
                  {paymentMethod === 'orange-money' && (
                    <div className="payment-form-direct">
                      <OrangeForm onSubmit={handlePayment} />
                    </div>
                  )}
                </div>

                {/* PayPal / Visa */}
                <div className="payment-option-card">
                  <label className={`payment-option-label ${paymentMethod === 'paypal' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="payment"
                      value="paypal"
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="payment-radio"
                    />
                    <div className="payment-option-content">
                      <div className="payment-option-left">
                        <div className="payment-option-icon paypal">P</div>
                        <div>
                          <span className="payment-option-title">PayPal / Visa</span>
                          <span className="payment-option-subtitle">Carte bancaire</span>
                        </div>
                      </div>
                      <CheckCircleIcon className={`payment-option-check ${paymentMethod === 'paypal' ? 'visible' : ''}`} />
                    </div>
                  </label>
                  
                  {paymentMethod === 'paypal' && (
                    <div className="payment-form-direct">
                      <button
                        onClick={() => handlePayment({ method: 'paypal' })}
                        disabled={isProcessing}
                        className="payment-paypal-btn"
                      >
                        {isProcessing ? (
                          <>
                            <div className="spinner-small"></div>
                            <span>Traitement en cours...</span>
                          </>
                        ) : (
                          <>
                            <span>Payer avec PayPal</span>
                            <CreditCardIcon className="h-5 w-5" />
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={() => setStep(1)}
                className="form-back-btn"
              >
                <ArrowLeftIcon className="h-4 w-4" />
                <span>Modifier les informations</span>
              </button>
            </div>
          )}
        </div>

        {/* Résumé de la commande */}
        <div className="checkout-summary">
          <div className="summary-card">
            <h3 className="summary-title">
              <ShoppingBagIcon className="summary-title-icon" />
              Récapitulatif
            </h3>

            <div className="summary-items">
              {items.map((item, index) => (
                <div key={index} className="summary-item">
                  <div className="summary-item-info">
                    <span className="summary-item-name">{item.name}</span>
                    <span className="summary-item-quantity">x{item.quantity}</span>
                  </div>
                  <span className="summary-item-price">
                    {(Number(item.price) * item.quantity).toFixed(2)} USD
                  </span>
                </div>
              ))}
            </div>

            <div className="summary-details">
              <div className="summary-row">
                <span>Sous-total</span>
                <span>{subtotal.toFixed(2)} USD</span>
              </div>
              <div className="summary-row">
                <span>Livraison</span>
                {shippingCost === 0 ? (
                  <span className="text-green-500 font-semibold">Gratuite</span>
                ) : (
                  <span>{shippingCost.toFixed(2)} USD</span>
                )}
              </div>
              {step === 2 && address.street && (
                <div className="summary-row address-summary">
                  <MapPinIcon className="h-4 w-4 text-gray-400" />
                  <span className="address-summary-text">
                    {address.street}, {address.city}, {address.province}
                  </span>
                </div>
              )}
            </div>

            <div className="summary-total">
              <span className="summary-total-label">Total TTC</span>
              <span className="summary-total-value">{finalTotal.toFixed(2)} USD</span>
            </div>

            <div className="summary-security">
              <LockClosedIcon className="summary-security-icon" />
              <span>Paiement 100% sécurisé</span>
            </div>

            <div className="summary-contact">
              <PhoneIcon className="h-4 w-4" />
              <span className="summary-contact-text">Support: +243 123 456 789</span>
            </div>
          </div>

          <div className="summary-guarantee">
            <ShieldCheckIcon className="summary-guarantee-icon" />
            <div>
              <h4>Garantie satisfait ou remboursé</h4>
              <p>Si vous n'êtes pas satisfait, nous vous remboursons</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}