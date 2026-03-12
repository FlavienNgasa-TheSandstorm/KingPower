import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LockClosedIcon,
  EnvelopeIcon,
  KeyIcon,
  ArrowRightIcon,
  SparklesIcon,
  ShieldCheckIcon,
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline';
import api from '../lib/api';
import toast from 'react-hot-toast';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: 'admin@vitalis-help.cd',
    password: 'admin123',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      console.log('📤 Tentative de connexion...');
      const response = await api.post('/auth/admin-login', credentials);
      
      console.log('📦 Réponse reçue:', response.data);
      
      localStorage.setItem('adminToken', response.data.token);
      console.log('💾 Token stocké');
      
      toast.success('Connexion admin réussie');
      
      window.location.href = '/';
      
    } catch (error) {
      console.error('❌ Erreur:', error);
      console.error('📋 Détails:', error.response?.data);
      toast.error(error.response?.data?.message || 'Accès non autorisé');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      {/* Fond décoratif */}
      <div className="login-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <div className="login-container">
        {/* Carte de connexion */}
        <div className="login-card">
          {/* En-tête */}
          <div className="login-header">
            <div className="logo-wrapper">
              <div className="logo">
                <SparklesIcon className="logo-icon" />
                <span className="logo-text">VA</span>
              </div>
            </div>
            <h1 className="login-title">Administration</h1>
            <p className="login-subtitle">Vitalis Help</p>
            <div className="title-decoration"></div>
          </div>

          {/* Badge de sécurité */}
          <div className="security-badge">
            <ShieldCheckIcon className="badge-icon" />
            <span className="badge-text">Espace sécurisé</span>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label className="form-label">
                <EnvelopeIcon className="label-icon" />
                <span>Email administrateur</span>
              </label>
              <div className="input-wrapper">
                <input
                  type="email"
                  required
                  value={credentials.email}
                  onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                  className="form-input"
                  placeholder="admin@vitalis-help.cd"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                <KeyIcon className="label-icon" />
                <span>Mot de passe</span>
              </label>
              <div className="input-wrapper password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  className="form-input"
                  placeholder="••••••••"
                  disabled={loading}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className={`login-button ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="button-spinner"></div>
                  <span>Connexion en cours...</span>
                </>
              ) : (
                <>
                  <span>Accéder au tableau de bord</span>
                  <ArrowRightIcon className="button-icon" />
                </>
              )}
            </button>
          </form>

          {/* Pied de page */}
          <div className="login-footer">
            <p className="footer-text">
              © 2026 Vitalis Help - Tous droits réservés
            </p>
            <div className="footer-links">
              <a href="#" className="footer-link">Confidentialité</a>
              <span className="footer-separator">•</span>
              <a href="#" className="footer-link">Mentions légales</a>
            </div>
          </div>
        </div>

        {/* Message d'information */}
        <div className="login-info">
          <div className="info-card">
            <ShieldCheckIcon className="info-icon" />
            <h3 className="info-title">Accès sécurisé</h3>
            <p className="info-text">
              Cette zone est réservée aux administrateurs de Vitalis Help.
              Toute tentative d'accès non autorisée est enregistrée.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}