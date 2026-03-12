import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  ShoppingBagIcon,
  CheckCircleIcon,
  TruckIcon,
  ShieldCheckIcon,
  ClockIcon,
  PhoneIcon,
  MapPinIcon,
  UserIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';
import api from '../lib/api';
import toast from 'react-hot-toast';

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [heroImageIndex, setHeroImageIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    address: '',
    notes: ''
  });

  // Images de secours et carrousel
  const placeholderImage = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400';
  
  // Tableau d'images pour la hero section (modifiable facilement)
  const heroImages = [
    "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?w=1200",
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200",
    "https://images.unsplash.com/photo-1522673607200-164d1b6c76e6?w=1200",
    "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?w=1200"
  ];

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/products/${id}`);
      setProduct(response.data);
      console.log('✅ Produit chargé:', response.data);
    } catch (error) {
      toast.error('Erreur lors du chargement du produit');
    } finally {
      setLoading(false);
    }
  };

  const changeHeroImage = (direction) => {
    if (direction === 'next') {
      setHeroImageIndex((prev) => (prev + 1) % heroImages.length);
    } else {
      setHeroImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const orderData = {
        items: [{
          productId: product.id,
          quantity: quantity,
          price: product.price
        }],
        total: product.price * quantity,
        paymentMethod: 'cash-on-delivery',
        shippingAddress: {
          street: formData.address,
          city: formData.city,
          province: 'RDC'
        },
        customerInfo: {
          name: formData.name,
          phone: formData.phone,
          email: formData.email || null,
          notes: formData.notes
        }
      };
      
      console.log('📦 Envoi commande avec customerInfo:', orderData.customerInfo);
      
      const response = await api.post('/orders', orderData);
      
      console.log('✅ Réponse backend:', response.data);
      toast.success('✅ Commande envoyée ! Nous vous contacterons bientôt.');
      
      setShowForm(false);
      setFormData({
        name: '', phone: '', email: '', city: '', address: '', notes: ''
      });
      
    } catch (error) {
      console.error('❌ Erreur commande:', error);
      toast.error(error.response?.data?.message || 'Erreur lors de la commande');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Produit non trouvé</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section avec image claire et carrousel */}
      <section className="product-hero">
        <div className="product-hero-container">
          <div className="product-hero-image-wrapper">
            <img 
              src={heroImages[heroImageIndex]}
              alt="Strong Man - Vitalité masculine"
              className="product-hero-image"
              onError={(e) => {
                console.log('❌ Erreur chargement image');
                e.target.src = 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200';
              }}
            />
            
            {/* Boutons de navigation du carrousel */}
            <button 
              onClick={() => changeHeroImage('prev')}
              className="hero-nav-btn prev"
            >
              ←
            </button>
            <button 
              onClick={() => changeHeroImage('next')}
              className="hero-nav-btn next"
            >
              →
            </button>
            
            {/* Indicateurs du carrousel */}
            <div className="hero-indicators">
              {heroImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setHeroImageIndex(idx)}
                  className={`hero-indicator ${idx === heroImageIndex ? 'active' : ''}`}
                />
              ))}
            </div>
            
            <div className="product-hero-overlay">
              <h1 className="product-hero-title">
                {product.name}
              </h1>
              <p className="product-hero-subtitle">
                La solution naturelle pour votre vitalité
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Image du produit avec design amélioré */}
          <div className="product-image-section">
            <div className="product-image-container">
              {imageLoading && (
                <div className="image-loading-spinner">
                  <div className="spinner"></div>
                </div>
              )}
              
              <div className="product-image-frame">
                <div className="product-image-inner">
                  <img 
                    src={!imageError ? (product.images?.[0] || placeholderImage) : placeholderImage}
                    alt={product.name}
                    className={`product-image-main ${imageLoading ? 'loading' : 'loaded'}`}
                    onError={() => {
                      setImageError(true);
                      setImageLoading(false);
                      console.log('❌ Utilisation de l\'image de secours');
                    }}
                    onLoad={() => {
                      setImageLoading(false);
                      console.log('✅ Image produit chargée');
                    }}
                  />
                </div>
                
                {/* Badge flottant */}
                <div className="product-image-badge">
                  <span className="badge-text">Nouveau</span>
                </div>
                
                {/* Effet de brillance */}
                <div className="image-shine"></div>
              </div>
              
              {/* Indicateur de qualité */}
              <div className="product-quality-badge">
                <div className="quality-dot"></div>
                <span>100% Naturel</span>
              </div>
            </div>
            
            {/* Badges de livraison et paiement */}
            <div className="badges-grid">
              <div className="badge-card">
                <TruckIcon className="badge-icon" />
                <p className="badge-title">Livraison gratuite</p>
                <p className="badge-subtitle">Partout en RDC</p>
              </div>
              <div className="badge-card">
                <ShieldCheckIcon className="badge-icon" />
                <p className="badge-title">Paiement à la livraison</p>
                <p className="badge-subtitle">Vous payez en mains propres</p>
              </div>
            </div>
          </div>

          {/* Infos produit */}
          <div className="product-info-section">
            <div>
              <h2 className="product-info-title">{product.name}</h2>
              <p className="product-info-description">{product.description}</p>
            </div>

            {/* Prix */}
            <div className="product-price-card">
              <div className="price-container">
                <span className="old-price">
                  {Math.round(product.price * 1.3)} USD
                </span>
                <span className="current-price">
                  {product.price} USD
                </span>
                <span className="discount-badge">-30%</span>
              </div>
            </div>

            {/* Bénéfices */}
            {product.benefits && product.benefits.length > 0 && (
              <div className="benefits-list">
                {product.benefits.map((benefit, index) => (
                  <div key={index} className="benefit-item">
                    <CheckCircleIcon className="benefit-icon" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Quantité */}
            <div className="quantity-selector">
              <label className="quantity-label">Quantité :</label>
              <div className="quantity-controls">
                <button 
                  className="quantity-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >−</button>
                <span className="quantity-display">{quantity}</span>
                <button 
                  className="quantity-btn"
                  onClick={() => setQuantity(quantity + 1)}
                >+</button>
              </div>
            </div>

            {/* Bouton commander */}
            {!showForm ? (
              <button
                onClick={() => setShowForm(true)}
                className="order-btn"
              >
                <ShoppingBagIcon className="order-btn-icon" />
                <span>Commander maintenant</span>
              </button>
            ) : (
              /* Formulaire de commande */
              <form onSubmit={handleSubmit} className="order-form">
                <h3 className="order-form-title">
                  Informations de livraison
                </h3>

                <div className="order-form-fields">
                  <div className="input-wrapper">
                    <UserIcon className="input-icon" />
                    <input
                      type="text"
                      placeholder="Nom complet *"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="form-input"
                    />
                  </div>

                  <div className="input-wrapper">
                    <PhoneIcon className="input-icon" />
                    <input
                      type="tel"
                      placeholder="Téléphone *"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="form-input"
                    />
                  </div>

                  <div className="input-wrapper">
                    <EnvelopeIcon className="input-icon" />
                    <input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="form-input"
                    />
                  </div>

                  <div className="input-wrapper">
                    <MapPinIcon className="input-icon" />
                    <input
                      type="text"
                      placeholder="Ville *"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      className="form-input"
                    />
                  </div>

                  <div className="input-wrapper">
                    <MapPinIcon className="input-icon textarea-icon" />
                    <textarea
                      placeholder="Adresse complète *"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="form-textarea"
                      rows="3"
                    />
                  </div>

                  <textarea
                    placeholder="Notes (optionnel)"
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    className="form-textarea"
                    rows="2"
                  />
                </div>

                <div className="payment-info">
                  <CheckCircleIcon className="payment-info-icon" />
                  <p>
                    <strong>Paiement à la livraison</strong><br />
                    Vous réglerez {(product.price * quantity).toFixed(2)} USD directement au livreur.
                  </p>
                </div>

                <div className="form-actions">
                  <button
                    type="submit"
                    className="submit-btn"
                  >
                    Confirmer la commande
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="cancel-btn"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            )}

            {/* Garanties */}
            <div className="guarantees-grid">
              <div className="guarantee-item">
                <TruckIcon className="guarantee-icon" />
                <p className="guarantee-text">Livraison gratuite</p>
              </div>
              <div className="guarantee-item">
                <ClockIcon className="guarantee-icon" />
                <p className="guarantee-text">24-48h</p>
              </div>
              <div className="guarantee-item">
                <ShieldCheckIcon className="guarantee-icon" />
                <p className="guarantee-text">Paiement à la livraison</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}