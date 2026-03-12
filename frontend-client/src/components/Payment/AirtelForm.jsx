import { useState } from 'react';
import { PhoneIcon, LockClosedIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export default function AirtelForm({ onSubmit }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    onSubmit({
      method: 'airtel-money',
      phoneNumber
    });
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <div className="payment-form-header">
        <div className="payment-form-icon airtel">
          <span>A</span>
        </div>
        <h3 className="payment-form-title">Paiement Airtel Money</h3>
      </div>

      <div className="payment-form-body">
        <div className="payment-form-field">
          <label className="payment-form-label">
            <PhoneIcon className="payment-form-label-icon" />
            Numéro Airtel Money
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
            Transaction sécurisée par Airtel
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
            <span>Sécurisé par Airtel</span>
          </div>
        </div>

        <button 
          type="submit" 
          className={`payment-form-submit airtel ${isSubmitting ? 'submitting' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <div className="payment-form-spinner"></div>
              <span>Traitement en cours...</span>
            </>
          ) : (
            <>
              <span>Payer avec Airtel Money</span>
              <PhoneIcon className="payment-form-submit-icon" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}