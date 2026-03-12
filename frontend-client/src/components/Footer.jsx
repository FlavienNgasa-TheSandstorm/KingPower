import { Link } from 'react-router-dom';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* Section principale */}
      <div className="footer-container">
        <div className="footer-grid">
          {/* À propos */}
          <div>
            <h3 className="footer-about-title">kingPower</h3>
            <p className="footer-about-text">
              Votre partenaire de confiance pour une santé masculine épanouie et une vie de couple épanouissante.
            </p>
            <div className="footer-social">
              <a href="#" className="footer-social-link">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
             <a href="#" className="footer-social-link">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.198.297-.767.966-.94 1.164-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.67-.51l-.571-.01c-.198 0-.52.074-.792.372-.273.297-1.04 1.016-1.04 2.479s1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.693.626.711.226 1.358.194 1.87.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              </svg>
            </a>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h4 className="footer-section-title">Liens rapides</h4>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link">Accueil</Link></li>
              <li><Link to="/product/1" className="footer-link">Strong-Man</Link></li>
              <li><Link to="/about" className="footer-link">À propos</Link></li>
              <li><Link to="/contact" className="footer-link">Contact</Link></li>
              <li><Link to="/faq" className="footer-link">FAQ</Link></li>
            </ul>
          </div>

          {/* Moyens de paiement */}
          <div>
            <h4 className="footer-section-title">Paiements acceptés</h4>
            <ul className="space-y-2">
              <li className="footer-payment-item">
                <span className="text-2xl">🇨🇩</span>
                <span className="footer-payment-text">M-Pesa (Vodacom)</span>
              </li>
              <li className="footer-payment-item">
                <span className="text-2xl">🇨🇩</span>
                <span className="footer-payment-text">Airtel Money</span>
              </li>
              <li className="footer-payment-item">
                <span className="text-2xl">🇨🇩</span>
                <span className="footer-payment-text">Orange Money</span>
              </li>
              <li className="footer-payment-item">
                <span className="text-2xl">💳</span>
                <span className="footer-payment-text">Visa / PayPal</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="footer-section-title">Contactez-nous</h4>
            <ul className="footer-contact-list">
              <li className="footer-contact-item">
                <MapPinIcon className="footer-contact-icon" />
                <span className="footer-contact-text">Kinshasa, République Démocratique du Congo</span>
              </li>
              <li className="footer-contact-item">
                <EnvelopeIcon className="footer-contact-icon" />
                <a href="mailto:contact@vitalis-help.cd" className="footer-contact-link">
                  contact@King-Power.cd
                </a>
              </li>
              <li className="footer-contact-item">
                <PhoneIcon className="footer-contact-icon" />
                <a href="tel:+24385456789" className="footer-contact-link">
                  +243 85 456 789
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-copyright">
        <div className="footer-copyright-container">
          <div className="footer-copyright-content">
            <p>© {currentYear} KingPower. Tous droits réservés.</p>
            <div className="footer-legal-links">
              <Link to="/privacy" className="footer-legal-link">
                Confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}