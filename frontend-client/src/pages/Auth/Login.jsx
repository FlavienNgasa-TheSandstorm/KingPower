import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EnvelopeIcon, LockClosedIcon, ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/outline';
import api from '../../lib/api';
import toast from 'react-hot-toast';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await api.post('/auth/login', formData);
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      toast.success('Connexion réussie !');
      navigate('/account');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Badge de bienvenue */}
        <div className="auth-welcome-badge">
          <SparklesIcon className="auth-welcome-icon" />
          <span>Bienvenue sur Vitalis Help</span>
        </div>

        {/* En-tête */}
        <div className="auth-header">
          <h1 className="auth-title">
            Connexion
            <span className="auth-title-decoration"></span>
          </h1>
          <p className="auth-subtitle">
            Accédez à votre espace personnel
          </p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-form-group">
            <label className="auth-label">
              <EnvelopeIcon className="auth-label-icon" />
              Adresse email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="auth-input"
              placeholder="votre@email.com"
              disabled={loading}
            />
          </div>

          <div className="auth-form-group">
            <label className="auth-label">
              <LockClosedIcon className="auth-label-icon" />
              Mot de passe
            </label>
            <div className="auth-password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="auth-input"
                placeholder="••••••••"
                disabled={loading}
              />
              <button
                type="button"
                className="auth-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Cacher" : "Afficher"}
              </button>
            </div>
          </div>

          <div className="auth-options">
            <label className="auth-remember">
              <input type="checkbox" className="auth-checkbox" />
              <span>Se souvenir de moi</span>
            </label>
            <Link to="/auth/forgot-password" className="auth-forgot-link">
              Mot de passe oublié ?
            </Link>
          </div>

          <button 
            type="submit" 
            className={`auth-button ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="auth-spinner"></div>
                <span>Connexion en cours...</span>
              </>
            ) : (
              <>
                <span>Se connecter</span>
                <ArrowRightIcon className="auth-button-icon" />
              </>
            )}
          </button>
        </form>

        {/* Séparateur */}
        <div className="auth-divider">
          <span>ou</span>
        </div>

        {/* Lien d'inscription */}
        <div className="auth-footer">
          <p className="auth-footer-text">
            Pas encore de compte ?
          </p>
          <Link to="/auth/register" className="auth-footer-link">
            Créer un compte
            <ArrowRightIcon className="auth-footer-icon" />
          </Link>
        </div>

        {/* Garanties */}
        <div className="auth-guarantees">
          <div className="auth-guarantee">
            <LockClosedIcon className="auth-guarantee-icon" />
            <span>Connexion sécurisée</span>
          </div>
          <div className="auth-guarantee">
            <SparklesIcon className="auth-guarantee-icon" />
            <span>Protection des données</span>
          </div>
        </div>
      </div>
    </div>
  );
}