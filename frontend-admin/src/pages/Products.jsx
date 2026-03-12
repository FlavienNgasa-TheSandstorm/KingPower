import { useState, useEffect } from 'react';
import {
  CubeIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  XMarkIcon,
  PhotoIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import api from '../lib/api';
import toast from 'react-hot-toast';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    image: '',
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (error) {
      toast.error('Erreur chargement produits');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        images: formData.image ? [formData.image] : []
      };

      if (editingProduct) {
        await api.put(`/products/${editingProduct.id}`, productData);
        toast.success('Produit modifié avec succès');
      } else {
        await api.post('/products', productData);
        toast.success('Produit ajouté avec succès');
      }
      
      setShowModal(false);
      setEditingProduct(null);
      setFormData({ name: '', description: '', price: '', stock: '', image: '' });
      fetchProducts();
    } catch (error) {
      toast.error('Erreur lors de l\'enregistrement');
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      try {
        await api.delete(`/products/${id}`);
        toast.success('Produit supprimé');
        fetchProducts();
      } catch (error) {
        toast.error('Erreur lors de la suppression');
      }
    }
  };

  const getStockStatus = (stock) => {
    if (stock <= 0) return { label: 'Rupture', color: 'out', icon: XMarkIcon };
    if (stock < 10) return { label: 'Stock faible', color: 'low', icon: ExclamationTriangleIcon };
    return { label: 'En stock', color: 'ok', icon: CheckCircleIcon };
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="products-loading">
        <div className="premium-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <CubeIcon className="spinner-icon" />
        </div>
      </div>
    );
  }

  return (
    <div className="products-page">
      {/* En-tête */}
      <div className="products-header">
        <div>
          <h1 className="products-title">
            Gestion des Produits
            <span className="products-title-decoration"></span>
          </h1>
          <p className="products-subtitle">
            Gérez votre catalogue de produits
          </p>
        </div>
        <button
          onClick={() => {
            setEditingProduct(null);
            setFormData({ name: '', description: '', price: '', stock: '', image: '' });
            setShowModal(true);
          }}
          className="products-add-btn"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Nouveau produit</span>
        </button>
      </div>

      {/* Barre de recherche */}
      <div className="products-search-section">
        <div className="search-wrapper">
          <MagnifyingGlassIcon className="search-icon" />
          <input
            type="text"
            placeholder="Rechercher un produit par nom ou description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <button 
          onClick={fetchProducts} 
          className="products-refresh-btn"
          disabled={loading}
        >
          <ArrowPathIcon className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Statistiques rapides */}
      <div className="products-stats">
        <div className="stat-card">
          <CubeIcon className="stat-icon" />
          <div className="stat-content">
            <span className="stat-value">{products.length}</span>
            <span className="stat-label">Total produits</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-content">
            <span className="stat-value">
              {products.reduce((sum, p) => sum + (p.stock || 0), 0)}
            </span>
            <span className="stat-label">Stock total</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-content">
            <span className="stat-value">
              {products.filter(p => p.stock > 0 && p.stock < 10).length}
            </span>
            <span className="stat-label">Stock faible</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-content">
            <span className="stat-value">
              {products.filter(p => !p.stock || p.stock <= 0).length}
            </span>
            <span className="stat-label">Rupture</span>
          </div>
        </div>
      </div>

      {/* Vue alternative : Cartes */}
      <div className="products-grid-view">
        {filteredProducts.length === 0 ? (
          <div className="products-empty">
            <CubeIcon className="empty-icon" />
            <h3>Aucun produit trouvé</h3>
            <p>Essayez de modifier votre recherche ou ajoutez un nouveau produit</p>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => {
              const stockStatus = getStockStatus(product.stock);
              const StatusIcon = stockStatus.icon;
              
              return (
                <div key={product.id} className="product-card">
                  <div className="product-image-container">
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="product-image"
                        onError={(e) => {
                          e.target.src = '/placeholder.jpg';
                        }}
                      />
                    ) : (
                      <div className="product-image-placeholder">
                        <PhotoIcon className="placeholder-icon" />
                      </div>
                    )}
                    <div className={`product-stock-badge ${stockStatus.color}`}>
                      <StatusIcon className="h-3 w-3" />
                      <span>{stockStatus.label}</span>
                    </div>
                  </div>

                  <div className="product-card-content">
                    <h3 className="product-card-name">{product.name}</h3>
                    <p className="product-card-description">
                      {product.description?.substring(0, 60)}...
                    </p>

                    <div className="product-card-footer">
                      <div>
                        <p className="product-card-price">{product.price} USD</p>
                        <p className="product-card-stock">
                          Stock: <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                            {product.stock}
                          </span>
                        </p>
                      </div>

                      <div className="product-card-actions">
                        <button
                          onClick={() => {
                            setEditingProduct(product);
                            setFormData({
                              name: product.name,
                              description: product.description,
                              price: product.price,
                              stock: product.stock,
                              image: product.images?.[0] || ''
                            });
                            setShowModal(true);
                          }}
                          className="action-btn edit"
                          title="Modifier"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="action-btn delete"
                          title="Supprimer"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    {/* Modal d'ajout/édition - Version améliorée */}
    {showModal && (
      <div className="modal-overlay" onClick={() => setShowModal(false)}>
        <div className="modal-container" onClick={(e) => e.stopPropagation()}>
          {/* En-tête du modal */}
          <div className="modal-header">
            <div className="modal-header-content">
              <div className="modal-icon">
                {editingProduct ? <PencilIcon className="h-6 w-6" /> : <PlusIcon className="h-6 w-6" />}
              </div>
              <div>
                <h2 className="modal-title">
                  {editingProduct ? 'Modifier le produit' : 'Ajouter un nouveau produit'}
                </h2>
                <p className="modal-subtitle">
                  {editingProduct ? 'Modifiez les informations du produit' : 'Remplissez les informations pour ajouter un produit'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="modal-close-btn"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="modal-form">
            {/* Section informations de base */}
            <div className="modal-section">
              <h3 className="modal-section-title">
                <CubeIcon className="h-4 w-4" />
                Informations générales
              </h3>
              
              <div className="form-grid">
                <div className="form-group full-width">
                  <label className="form-label">
                    Nom du produit <span className="text-red-500">*</span>
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="form-input"
                      placeholder="Ex: Strong Man"
                    />
                  </div>
                </div>

                <div className="form-group full-width">
                  <label className="form-label">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="form-textarea"
                    rows="4"
                    placeholder="Description détaillée du produit..."
                  />
                </div>
              </div>
            </div>

            {/* Section prix et stock */}
            <div className="modal-section">
              <h3 className="modal-section-title">
                <CurrencyDollarIcon className="h-4 w-4" />
                Prix et stock
              </h3>
              
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">
                    Prix (USD) <span className="text-red-500">*</span>
                  </label>
                  <div className="input-wrapper price-input">
                    <span className="input-prefix">$</span>
                    <input
                      type="number"
                      required
                      step="0.01"
                      min="0"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      className="form-input with-prefix"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Stock <span className="text-red-500">*</span>
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.stock}
                      onChange={(e) => setFormData({...formData, stock: e.target.value})}
                      className="form-input"
                      placeholder="0"
                    />
                  </div>
                  <p className="input-hint">
                    {formData.stock <= 0 ? (
                      <span className="text-red-500">⚠️ Produit en rupture</span>
                    ) : formData.stock < 10 ? (
                      <span className="text-yellow-500">⚠️ Stock faible</span>
                    ) : (
                      <span className="text-green-500">✓ Stock suffisant</span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Section image */}
            <div className="modal-section">
              <h3 className="modal-section-title">
                <PhotoIcon className="h-4 w-4" />
                Image du produit
              </h3>
              
              <div className="form-group">
                <label className="form-label">URL de l'image</label>
                <div className="input-wrapper">
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    className="form-input"
                    placeholder="https://exemple.com/image.jpg"
                  />
                </div>
              </div>

              {/* Aperçu de l'image */}
              {formData.image && (
                <div className="image-preview-container">
                  <div className="image-preview-header">
                    <PhotoIcon className="h-4 w-4" />
                    <span>Aperçu</span>
                  </div>
                  <div className="image-preview">
                    <img
                      src={formData.image}
                      alt="Aperçu"
                      className="preview-img"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = '<p class="preview-error">Image non valide</p>';
                      }}
                      onLoad={() => console.log('✅ Image chargée')}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Barre de progression (optionnel) */}
            {!editingProduct && (
              <div className="modal-progress">
                <div className="progress-steps">
                  <div className="progress-step active">
                    <span className="step-number">1</span>
                    <span className="step-label">Infos</span>
                  </div>
                  <div className="progress-step">
                    <span className="step-number">2</span>
                    <span className="step-label">Prix</span>
                  </div>
                  <div className="progress-step">
                    <span className="step-number">3</span>
                    <span className="step-label">Image</span>
                  </div>
                </div>
              </div>
            )}

            {/* Actions du formulaire */}
            <div className="modal-actions">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="modal-btn-cancel"
              >
                <XMarkIcon className="h-4 w-4" />
                <span>Annuler</span>
              </button>
              <button
                type="submit"
                className="modal-btn-submit"
              >
                {editingProduct ? (
                  <>
                    <PencilIcon className="h-4 w-4" />
                    <span>Modifier le produit</span>
                  </>
                ) : (
                  <>
                    <PlusIcon className="h-4 w-4" />
                    <span>Ajouter le produit</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
    </div>
  );
}