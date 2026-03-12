import { useState } from 'react';
import { PhoneIcon, LockClosedIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export default function MpesaForm({ onSubmit }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    onSubmit({
      method: 'mpesa',
      phoneNumber
    });
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <div className="payment-form-header">
        <div className="payment-form-icon mpesa">
          <span>M</span>
        </div>
        <h3 className="payment-form-title">Paiement M-Pesa</h3>
      </div>

      <div className="payment-form-body">
        <div className="payment-form-field">
          <label className="payment-form-label">
            <PhoneIcon className="payment-form-label-icon" />
            Numéro M-Pesa
          </label>
          <div className="payment-form-input-wrapper">
            <input
              type="tel"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="payment-form-input"
              placeholder="+243 XX XXX XXXX"
              pattern="[0-9+\s]+"
              disabled={isSubmitting}
            />
          </div>
          <p className="payment-form-hint">
            <LockClosedIcon className="payment-form-hint-icon" />
            Vous recevrez une demande de confirmation sur votre téléphone
          </p>
        </div>

        <div className="payment-form-features">
          <div className="payment-form-feature">
            <CheckCircleIcon className="payment-form-feature-icon" />
            <span>Paiement instantané</span>
          </div>
          <div className="payment-form-feature">
            <CheckCircleIcon className="payment-form-feature-icon" />
            <span>Confirmation par SMS</span>
          </div>
          <div className="payment-form-feature">
            <CheckCircleIcon className="payment-form-feature-icon" />
            <span>Sécurisé par Vodacom</span>
          </div>
        </div>

        <button 
          type="submit" 
          className={`payment-form-submit mpesa ${isSubmitting ? 'submitting' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <div className="payment-form-spinner"></div>
              <span>Traitement en cours...</span>
            </>
          ) : (
            <>
              <span>Payer avec M-Pesa</span>
              <PhoneIcon className="payment-form-submit-icon" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}