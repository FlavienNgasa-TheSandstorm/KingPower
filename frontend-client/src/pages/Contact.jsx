import { useState } from 'react';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simuler l'envoi du formulaire
    setTimeout(() => {
      setSubmitted(true);
      toast.success('Message envoyé avec succès !');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  return (
    <div className="contact-page">

      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-container">
          <h1 className="contact-hero-title">
            Contactez-<span>Nous</span>
          </h1>
          <p className="contact-hero-subtitle">
            Notre équipe est là pour répondre à toutes vos questions
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="contact-info">
        <div className="contact-container">
          <div className="contact-info-grid">
            <div className="contact-info-card">
              <div className="contact-info-icon-wrapper">
                <PhoneIcon className="contact-info-icon" />
              </div>
              <h3>Téléphone</h3>
              <p>+243 123 456 789</p>
              <p className="contact-info-note">Lun-Ven, 8h-20h</p>
            </div>
            <div className="contact-info-card">
              <div className="contact-info-icon-wrapper">
                <EnvelopeIcon className="contact-info-icon" />
              </div>
              <h3>Email</h3>
              <p>contact@vitalis-help.cd</p>
              <p className="contact-info-note">Réponse sous 24h</p>
            </div>
            <div className="contact-info-card">
              <div className="contact-info-icon-wrapper">
                <MapPinIcon className="contact-info-icon" />
              </div>
              <h3>Adresse</h3>
              <p>Kinshasa, RDC</p>
              <p className="contact-info-note">Bureau sur rendez-vous</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="contact-main">
        <div className="contact-container">
          <div className="contact-main-grid">
            {/* Formulaire */}
            <div className="contact-form-container">
              <h2 className="contact-section-title">
                Envoyez-nous un message
                <span className="contact-title-decoration"></span>
              </h2>
              
              {submitted ? (
                <div className="contact-success">
                  <div className="contact-success-icon-wrapper">
                    <CheckCircleIcon className="contact-success-icon" />
                  </div>
                  <h3>Message envoyé !</h3>
                  <p>Nous vous répondrons dans les plus brefs délais.</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="contact-success-btn"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="contact-form-group">
                    <label className="contact-form-label">Nom complet</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="contact-form-input"
                      placeholder="Jean Dupont"
                    />
                  </div>

                  <div className="contact-form-group">
                    <label className="contact-form-label">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="contact-form-input"
                      placeholder="jean@email.com"
                    />
                  </div>

                  <div className="contact-form-group">
                    <label className="contact-form-label">Sujet</label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="contact-form-input"
                      placeholder="Question sur Strong Man"
                    />
                  </div>

                  <div className="contact-form-group">
                    <label className="contact-form-label">Message</label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="contact-form-textarea"
                      rows="5"
                      placeholder="Votre message..."
                    />
                  </div>

                  <button type="submit" className="contact-form-submit">
                    <ChatBubbleLeftRightIcon className="contact-form-submit-icon" />
                    <span>Envoyer le message</span>
                  </button>
                </form>
              )}
            </div>

            {/* Informations supplémentaires */}
            <div className="contact-sidebar">
              <div className="contact-sidebar-card">
                <h3>Horaires d'ouverture</h3>
                <div className="contact-schedule">
                  <div className="contact-schedule-item">
                    <ClockIcon className="contact-schedule-icon" />
                    <div>
                      <p className="contact-schedule-day">Lundi - Vendredi</p>
                      <p className="contact-schedule-time">8h00 - 20h00</p>
                    </div>
                  </div>
                  <div className="contact-schedule-item">
                    <ClockIcon className="contact-schedule-icon" />
                    <div>
                      <p className="contact-schedule-day">Samedi</p>
                      <p className="contact-schedule-time">9h00 - 18h00</p>
                    </div>
                  </div>
                  <div className="contact-schedule-item">
                    <ClockIcon className="contact-schedule-icon" />
                    <div>
                      <p className="contact-schedule-day">Dimanche</p>
                      <p className="contact-schedule-time">Fermé</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="contact-sidebar-card">
                <h3>FAQ Rapide</h3>
                <div className="contact-faq">
                  <div className="contact-faq-item">
                    <p className="contact-faq-question">Livraison en combien de temps ?</p>
                    <p className="contact-faq-answer">2-3 jours ouvrés partout en RDC.</p>
                  </div>
                  <div className="contact-faq-item">
                    <p className="contact-faq-question">Paiement à la livraison ?</p>
                    <p className="contact-faq-answer">Oui, nous acceptons le paiement à la réception.</p>
                  </div>
                  <div className="contact-faq-item">
                    <p className="contact-faq-question">Produits naturels ?</p>
                    <p className="contact-faq-answer">100% naturels, sans effets secondaires.</p>
                  </div>
                </div>
              </div>

              <div className="contact-sidebar-card">
                <h3>Suivez-nous</h3>
                <div className="contact-social">
                  <a href="#" className="contact-social-link">Facebook</a>
                  <a href="#" className="contact-social-link">WhatsApp</a>
                  <a href="#" className="contact-social-link">Instagram</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map (Optionnel) */}
      <section className="contact-map">
        <div className="contact-map-container">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.780305812475!2d15.266639!3d-4.325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a6a3f9f9f9f9f9f%3A0x9f9f9f9f9f9f9f9f!2sKinshasa%2C%20R%C3%A9publique%20d%C3%A9mocratique%20du%20Congo!5e0!3m2!1sfr!2sfr!4v1620000000000!5m2!1sfr!2sfr" 
            width="100%" 
            height="400" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy"
            title="Carte Kinshasa"
            className="contact-map-iframe"
          ></iframe>
        </div>
      </section>

    </div>
  );
}