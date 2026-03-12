import { Link } from 'react-router-dom';
import { 
  ShieldCheckIcon,
  LockClosedIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  EnvelopeIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';

export default function Privacy() {
  return (
    <div className="privacy-page">

      {/* Hero Section */}
      <section className="privacy-hero">
        <div className="privacy-hero-container">
          <h1 className="privacy-hero-title">
            Politique de <span>Confidentialité</span>
          </h1>
          <p className="privacy-hero-subtitle">
            Dernière mise à jour : 14 février 2025
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="privacy-content">
        <div className="privacy-container">
          
          {/* Introduction */}
          <div className="privacy-section">
            <div className="privacy-section-header">
              <DocumentTextIcon className="privacy-section-icon" />
              <h2 className="privacy-section-title">Introduction</h2>
            </div>
            <div className="privacy-section-body">
              <p>
                Cette politique de confidentialité explique comment <strong>Vitalis Help</strong> (le « Site », « nous », « notre » ou « nos ») 
                collecte, utilise et divulgue vos informations personnelles lorsque vous visitez, utilisez nos services ou effectuez 
                un achat sur notre site (le « Site ») ou communiquez autrement avec nous au sujet du Site (conjointement, les « Services »).
              </p>
              <p className="privacy-highlight">
                Veuillez lire attentivement la présente politique de confidentialité. En utilisant les Services et en y accédant, 
                vous acceptez la collecte, l'utilisation et la divulgation de vos informations comme décrit dans la présente politique. 
                Si vous n'acceptez pas la présente politique, veuillez ne pas utiliser les Services ou y accéder.
              </p>
            </div>
          </div>

          {/* Modifications */}
          <div className="privacy-section">
            <div className="privacy-section-header">
              <GlobeAltIcon className="privacy-section-icon" />
              <h2 className="privacy-section-title">Modifications de la présente politique</h2>
            </div>
            <div className="privacy-section-body">
              <p>
                Nous pouvons mettre à jour la présente politique de confidentialité de temps à autre, notamment pour refléter 
                les changements apportés à nos pratiques ou pour d'autres raisons opérationnelles, juridiques ou réglementaires. 
                Nous publierons la politique révisée sur le Site, actualiserons la date de « Dernière mise à jour » et prendrons 
                toute autre mesure requise par la législation en vigueur.
              </p>
            </div>
          </div>

          {/* Collecte des informations */}
          <div className="privacy-section">
            <div className="privacy-section-header">
              <ShieldCheckIcon className="privacy-section-icon" />
              <h2 className="privacy-section-title">Comment nous collectons et utilisons vos informations</h2>
            </div>
            <div className="privacy-section-body">
              <p>
                Pour fournir les Services, nous collectons des informations personnelles vous concernant issues de diverses sources, 
                comme indiqué ci-dessous. Les informations que nous collectons et utilisons varient en fonction de la manière dont 
                vous interagissez avec nous.
              </p>
              
              <h3 className="privacy-subtitle">Informations personnelles que nous collectons directement</h3>
              <ul className="privacy-list">
                <li><strong>Coordonnées :</strong> votre nom, adresse, numéro de téléphone, et e-mail.</li>
                <li><strong>Informations de commande :</strong> votre nom, adresse de facturation, adresse d'expédition, confirmation de paiement, e-mail et numéro de téléphone.</li>
                <li><strong>Informations du compte :</strong> votre nom d'utilisateur, mot de passe, questions de sécurité et autres informations utilisées à des fins de sécurité du compte.</li>
                <li><strong>Service à la clientèle :</strong> les informations que vous choisissez d'inclure dans vos communications avec nous.</li>
              </ul>

              <h3 className="privacy-subtitle">Informations collectées automatiquement</h3>
              <p>
                Nous collectons automatiquement certaines informations sur votre interaction avec les Services (« Données d'utilisation »). 
                Pour ce faire, nous utilisons des cookies, des pixels et des technologies similaires. Les Données d'utilisation peuvent 
                inclure des informations sur l'appareil, le navigateur, la connexion réseau, votre adresse IP et d'autres informations 
                relatives à votre interaction avec les Services.
              </p>
            </div>
          </div>

          {/* Utilisation des informations */}
          <div className="privacy-section">
            <div className="privacy-section-header">
              <LockClosedIcon className="privacy-section-icon" />
              <h2 className="privacy-section-title">Comment nous utilisons vos informations</h2>
            </div>
            <div className="privacy-section-body">
              <ul className="privacy-list">
                <li><strong>Fourniture des produits et services :</strong> Traitement des paiements, exécution des commandes, gestion du compte.</li>
                <li><strong>Marketing et publicité :</strong> Envoi de communications marketing et promotionnelles.</li>
                <li><strong>Sécurité et prévention de la fraude :</strong> Détection et prévention des activités frauduleuses.</li>
                <li><strong>Communication et amélioration :</strong> Service client et amélioration de nos services.</li>
              </ul>
            </div>
          </div>

          {/* Cookies */}
          <div className="privacy-section">
            <div className="privacy-section-header">
              <DocumentTextIcon className="privacy-section-icon" />
              <h2 className="privacy-section-title">Cookies</h2>
            </div>
            <div className="privacy-section-body">
              <p>
                Nous utilisons des cookies pour faire fonctionner et améliorer notre Site et nos Services. La plupart des navigateurs 
                acceptent automatiquement les cookies, mais vous pouvez configurer votre navigateur pour les supprimer ou les rejeter.
              </p>
            </div>
          </div>

          {/* Partage des informations */}
          <div className="privacy-section">
            <div className="privacy-section-header">
              <GlobeAltIcon className="privacy-section-icon" />
              <h2 className="privacy-section-title">Comment nous divulguons les informations</h2>
            </div>
            <div className="privacy-section-body">
              <p>Nous pouvons divulguer vos informations à :</p>
              <ul className="privacy-list">
                <li>Fournisseurs de services (paiement, analyse, expédition)</li>
                <li>Partenaires commerciaux et marketing</li>
                <li>Affiliés au sein de notre groupe</li>
                <li>Dans le cadre d'une transaction commerciale</li>
                <li>Pour se conformer aux obligations légales</li>
              </ul>
            </div>
          </div>

          {/* Sécurité */}
          <div className="privacy-section">
            <div className="privacy-section-header">
              <LockClosedIcon className="privacy-section-icon" />
              <h2 className="privacy-section-title">Sécurité et conservation</h2>
            </div>
            <div className="privacy-section-body">
              <p>
                Aucune mesure de sécurité n'est parfaite. Nous prenons des mesures raisonnables pour protéger vos informations, 
                mais nous ne pouvons garantir une sécurité absolue. La durée de conservation de vos informations dépend de nos 
                besoins légaux et opérationnels.
              </p>
            </div>
          </div>

          {/* Vos droits */}
          <div className="privacy-section">
            <div className="privacy-section-header">
              <ShieldCheckIcon className="privacy-section-icon" />
              <h2 className="privacy-section-title">Vos droits</h2>
            </div>
            <div className="privacy-section-body">
              <p>Selon votre lieu de résidence, vous pouvez bénéficier de droits concernant vos informations personnelles :</p>
              <ul className="privacy-list">
                <li>Droit d'accès et de savoir</li>
                <li>Droit de suppression</li>
                <li>Droit de correction</li>
                <li>Droit de portabilité</li>
                <li>Droit de retrait du consentement</li>
              </ul>
              <p>
                Pour exercer ces droits, contactez-nous via les coordonnées ci-dessous. Nous ne pratiquons aucune discrimination 
                pour l'exercice de ces droits.
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="privacy-section contact">
            <div className="privacy-section-header">
              <EnvelopeIcon className="privacy-section-icon" />
              <h2 className="privacy-section-title">Contact</h2>
            </div>
            <div className="privacy-section-body">
              <p>
                Si vous avez des questions sur nos pratiques en matière de confidentialité ou cette politique, ou si vous souhaitez 
                exercer l'un de vos droits, veuillez nous contacter :
              </p>
              <div className="privacy-contact-info">
                <div className="privacy-contact-item">
                  <EnvelopeIcon className="privacy-contact-icon" />
                  <a href="mailto:contact@vitalis-help.cd">contact@vitalis-help.cd</a>
                </div>
                <div className="privacy-contact-item">
                  <PhoneIcon className="privacy-contact-icon" />
                  <a href="tel:+243123456789">+243 123 456 789</a>
                </div>
                <div className="privacy-contact-item">
                  <span>Kinshasa, République Démocratique du Congo</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}