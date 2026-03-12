import { Link } from 'react-router-dom';
import { 
  BoltIcon, 
  HeartIcon, 
  ShieldCheckIcon,
  CheckCircleIcon,
  StarIcon
} from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <div>
      {/* Hero Section avec image de femme */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Retrouvez Vitalité et Confiance avec <span>Strong-Man</span>
          </h1>
          <p className="hero-subtitle">
            La solution naturelle pour une santé masculine épanouie
          </p>
          <div className="hero-buttons">
            <Link to="/product/1" className="btn-hero-primary">
              Découvrir Strong Man
            </Link>
            <Link to="/about" className="btn-hero-secondary">
              En savoir plus
            </Link>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="solutions-section">
        <div className="container mx-auto px-4">
          <h2 className="section-title">
            Des solutions naturelles adaptées
          </h2>
          <p className="section-subtitle">
            Découvrez comment Strong-Man peut vous aider à retrouver une vie sexuelle épanouie
          </p>

          <div className="solutions-grid">
            {/* Carte 1 */}
            <div className="solution-card">
              <div className="solution-image">
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0iZkflBwCCY7DZ6U4CKT2308vL8RiJYt_PQ&s" 
                  alt="Couple heureux"
                />
                <div className="solution-icon-wrapper">
                  <BoltIcon />
                </div>
              </div>
              <div className="solution-content">
                <h3 className="solution-title">Éjaculation précoce ?</h3>
                <p className="solution-text">
                  Reprenez le contrôle et prolongez vos moments d'intimité naturellement.
                </p>
                <div className="solution-features">
                  <div className="solution-feature">
                    <CheckCircleIcon /> Contrôle accru
                  </div>
                  <div className="solution-feature">
                    <CheckCircleIcon /> Rapports plus longs
                  </div>
                </div>
              </div>
            </div>

            {/* Carte 2 */}
            <div className="solution-card">
              <div className="solution-image">
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0PxQA5yYOrO84gikEAG7Ym7SbQdKkM2PY9g&s" 
                  alt="Homme confiant"
                />
                <div className="solution-icon-wrapper">
                  <HeartIcon />
                </div>
              </div>
              <div className="solution-content">
                <h3 className="solution-title">Dysfonction érectile</h3>
                <p className="solution-text">
                  Retrouvez des érections fermes et durables naturellement.
                </p>
                <div className="solution-features">
                  <div className="solution-feature">
                    <CheckCircleIcon /> Érections fermes
                  </div>
                  <div className="solution-feature">
                    <CheckCircleIcon /> Vitalité retrouvée
                  </div>
                </div>
              </div>
            </div>

            {/* Carte 3 */}
            <div className="solution-card">
              <div className="solution-image">
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT97ngE5qjDIpN8GZ1tDs-CpoWKM2cTnOweZw&s" 
                  alt="Couple romantique"
                />
                <div className="solution-icon-wrapper">
                  <ShieldCheckIcon />
                </div>
              </div>
              <div className="solution-content">
                <h3 className="solution-title">Confiance en soi</h3>
                <p className="solution-text">
                  L'assurance qui fait la différence dans votre couple.
                </p>
                <div className="solution-features">
                  <div className="solution-feature">
                    <CheckCircleIcon /> Bien-être mental
                  </div>
                  <div className="solution-feature">
                    <CheckCircleIcon /> Épanouissement
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bloc Produit Strong Man - Image au centre */}
      <section className="product-showcase">
        <div className="product-showcase-container">
          <div className="product-showcase-badge">
            <StarIcon className="h-5 w-5" />
            <span>Approuvé par la NAFDAC</span>
          </div>
          
          <h2 className="product-showcase-title">
            Le produit qui a déjà changé des milliers de vies
          </h2>
          
          <div className="product-showcase-image-wrapper">
            <img 
              src="https://scontent.ffih1-2.fna.fbcdn.net/v/t39.30808-6/474018133_122136311594560757_6323897318294672808_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=100&ccb=1-7&_nc_sid=e06c5d&_nc_ohc=uill5htd8wwQ7kNvwGrz-pD&_nc_oc=Adneg9MrBsvv8x8gcBxC2YoCbs9YtveUm3CndFqqAfDa6betc1kC_NEoS18KELzssbA&_nc_zt=23&_nc_ht=scontent.ffih1-2.fna&_nc_gid=rgN-ArKwfGEmkcO4Co4VbQ&_nc_ss=8&oh=00_AfzL8FkZoxqmw7ODfShEhtyeteWBxbmT6f067H8H9rQw6w&oe=69B41BE5"
              alt="Strong Man - Le produit"
              className="product-showcase-image"
            />
            <div className="product-showcase-overlay">
              <span className="product-showcase-caption">VERIFIÉ PAR NAFDAC: A8-4517L</span>
            </div>
          </div>
          
          <div className="product-showcase-features">
            <div className="showcase-feature">
              <CheckCircleIcon className="feature-icon" />
              <span>100% Naturel</span>
            </div>
            <div className="showcase-feature">
              <CheckCircleIcon className="feature-icon" />
              <span>Sans effets secondaires</span>
            </div>
            <div className="showcase-feature">
              <CheckCircleIcon className="feature-icon" />
              <span>Approuvé par la NAFDAC</span>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">
            Prêt à <span>changer votre vie</span> ?
          </h2>
          <p className="cta-text">
            Rejoignez des milliers d'hommes satisfaits en RDC
          </p>
          <div className="cta-buttons">
            <Link to="/product/1" className="cta-btn-primary">
              Commander Strong-Man
            </Link>
            <Link to="/contact" className="cta-btn-secondary">
              Nous contacter
            </Link>
          </div>
          <p className="cta-note">
            Livraison discrète • Paiement sécurisé
          </p>
        </div>
      </section>
    </div>
  );
}