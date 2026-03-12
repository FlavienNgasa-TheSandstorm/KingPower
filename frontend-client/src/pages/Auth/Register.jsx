import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  LockClosedIcon, 
  ArrowRightIcon,
  SparklesIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import api from '../../lib/api';
import toast from 'react-hot-toast';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }

    if (!acceptedTerms) {
      toast.error('Vous devez accepter les conditions d\'utilisation');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      toast.success('Inscription réussie !');
      navigate('/account');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container register">
        {/* Badge de bienvenue */}
        <div className="auth-welcome-badge">
          <SparklesIcon className="auth-welcome-icon" />
          <span>Rejoignez la communauté Vitalis Help</span>
        </div>

        {/* En-tête */}
        <div className="auth-header">
          <h1 className="auth-title">
            Inscription
            <span className="auth-title-decoration"></span>
          </h1>
          <p className="auth-subtitle">
            Créez votre compte en quelques secondes
          </p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-form-group">
            <label className="auth-label">
              <UserIcon className="auth-label-icon" />
              Nom complet
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="auth-input"
              placeholder="Jean Dupont"
              disabled={loading}
            />
          </div>

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
              placeholder="jean@email.com"
              disabled={loading}
            />
          </div>

          <div className="auth-form-group">
            <label className="auth-label">
              <PhoneIcon className="auth-label-icon" />
              Numéro de téléphone
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="auth-input"
              placeholder="+243 XXX XXX XXX"
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

          <div className="auth-form-group">
            <label className="auth-label">
              <LockClosedIcon className="auth-label-icon" />
              Confirmer le mot de passe
            </label>
            <div className="auth-password-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className="auth-input"
                placeholder="••••••••"
                disabled={loading}
              />
              <button
                type="button"
                className="auth-password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "Cacher" : "Afficher"}
              </button>
            </div>
          </div>

          <div className="auth-terms">
            <label className="auth-terms-label">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="auth-checkbox"
              />
              <span>
                J'accepte les <Link to="/terms" className="auth-terms-link">conditions d'utilisation</Link> et la <Link to="/privacy" className="auth-terms-link">politique de confidentialité</Link>
              </span>
            </label>
          </div>

          <button 
            type="submit" 
            className={`auth-button ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="auth-spinner"></div>
                <span>Inscription en cours...</span>
              </>
            ) : (
              <>
                <span>Créer mon compte</span>
                <ArrowRightIcon className="auth-button-icon" />
              </>
            )}
          </button>
        </form>

        {/* Liste des avantages */}
        <div className="auth-benefits">
          <h3 className="auth-benefits-title">Pourquoi créer un compte ?</h3>
          <ul className="auth-benefits-list">
            <li className="auth-benefit-item">
              <CheckCircleIcon className="auth-benefit-icon" />
              <span>Suivez vos commandes en temps réel</span>
            </li>
            <li className="auth-benefit-item">
              <CheckCircleIcon className="auth-benefit-icon" />
              <span>Accédez à votre historique d'achats</span>
            </li>
            <li className="auth-benefit-item">
              <CheckCircleIcon className="auth-benefit-icon" />
              <span>Recevez des offres personnalisées</span>
            </li>
            <li className="auth-benefit-item">
              <CheckCircleIcon className="auth-benefit-icon" />
              <span>Paiement plus rapide</span>
            </li>
          </ul>
        </div>

        {/* Séparateur */}
        <div className="auth-divider">
          <span>ou</span>
        </div>

        {/* Lien de connexion */}
        <div className="auth-footer">
          <p className="auth-footer-text">
            Déjà un compte ?
          </p>
          <Link to="/auth/login" className="auth-footer-link">
            Se connecter
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