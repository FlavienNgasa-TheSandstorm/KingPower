import { Link } from 'react-router-dom';
import { 
  HeartIcon, 
  ShieldCheckIcon, 
  UserGroupIcon,
  SparklesIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/outline';

export default function About() {
  return (
    <div className="about-page">

      {/* Hero Section avec photo de Strong Man */}
      <section className="about-hero">
        <div className="about-hero-container">
          <h1 className="about-hero-title">
            À propos de <span>KingPower</span>
          </h1>
          <p className="about-hero-subtitle">
            Votre partenaire de confiance pour une santé masculine épanouie depuis 2024
          </p>
          
          {/* Photo de Strong Man au centre */}
          <div className="hero-product-wrapper">
            <div className="hero-product-image-container">
              <img 
                src="https://scontent.ffih1-2.fna.fbcdn.net/v/t39.30808-6/474018133_122136311594560757_6323897318294672808_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=100&ccb=1-7&_nc_sid=e06c5d&_nc_ohc=uill5htd8wwQ7kNvwGrz-pD&_nc_oc=Adneg9MrBsvv8x8gcBxC2YoCbs9YtveUm3CndFqqAfDa6betc1kC_NEoS18KELzssbA&_nc_zt=23&_nc_ht=scontent.ffih1-2.fna&_nc_gid=rgN-ArKwfGEmkcO4Co4VbQ&_nc_ss=8&oh=00_AfzL8FkZoxqmw7ODfShEhtyeteWBxbmT6f067H8H9rQw6w&oe=69B41BE5"
                alt="Strong Man - Le produit"
                className="hero-product-image"
              />
              <div className="hero-product-badge">
                <SparklesIcon className="badge-icon" />
                <span>Nouveau</span>
              </div>
            </div>
            
            {/* Bouton Commander maintenant */}
            <Link to="/product/1" className="hero-product-btn">
              <ShoppingBagIcon className="btn-icon" />
              <span>Commander maintenant</span>
              <ArrowRightIcon className="btn-icon-arrow" />
            </Link>
          </div>
        </div>
      </section>

      {/* Notre Mission - MODIFIÉ EN DEUX BLOCS */}
      <section className="about-mission">
        <div className="about-container">
          <div className="about-mission-grid">
            {/* Bloc gauche - Texte */}
            <div className="about-mission-content">
              <h2 className="about-section-title">
                À propos de KingPower
                <span className="about-title-decoration"></span>
              </h2>
              <p className="about-mission-text">
                Chez KingPower, nous croyons que chaque homme mérite de vivre une vie sexuelle épanouie et confiante. 
                Notre mission est de fournir des solutions naturelles et efficaces pour aider les hommes à retrouver leur vitalité 
                et leur confiance en eux.
              </p>
              <p className="about-mission-text">
                Fondé depuis quelques années , nous nous engageons à offrir des produits de haute qualité, testés et approuvés, 
                tout en assurant une expérience d'achat discrète et sécurisée pour nos clients en RDC et au-delà.
              </p>
              <div className="about-mission-stats">
                <div className="about-stat">
                  <span className="about-stat-number">1000+</span>
                  <span className="about-stat-label">Clients satisfaits</span>
                </div>
                <div className="about-stat">
                  <span className="about-stat-number">50+</span>
                  <span className="about-stat-label">Villes desservies</span>
                </div>
                <div className="about-stat">
                  <span className="about-stat-number">4.8/5</span>
                  <span className="about-stat-label">Note moyenne</span>
                </div>
              </div>
            </div>

            {/* Bloc droit - Image d'une femme */}
            <div className="about-mission-image">
              <div className="image-frame">
                <img 
                  src="https://img.freepik.com/photos-premium/triste-fille-moitie-nue-assise-sol_158676-237.jpg"
                  alt="Femme confiante"
                  className="about-image"
                />
                <div className="image-overlay">
                  <p className="overlay-text">La confiance au féminin</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="about-values">
        <div className="about-container">
          <h2 className="about-section-title centered">
            Nos Valeurs
            <span className="about-title-decoration centered"></span>
          </h2>
          <div className="about-values-grid">
            <div className="about-value-card">
              <div className="about-value-icon-wrapper">
                <ShieldCheckIcon className="about-value-icon" />
              </div>
              <h3>Intégrité</h3>
              <p>Nous croyons en la transparence et l'honnêteté dans tout ce que nous faisons.</p>
            </div>
            <div className="about-value-card">
              <div className="about-value-icon-wrapper">
                <HeartIcon className="about-value-icon" />
              </div>
              <h3>Bien-être</h3>
              <p>Notre priorité est d'améliorer la qualité de vie de nos clients.</p>
            </div>
            <div className="about-value-card">
              <div className="about-value-icon-wrapper">
                <UserGroupIcon className="about-value-icon" />
              </div>
              <h3>Communauté</h3>
              <p>Nous construisons une communauté d'hommes confiants et épanouis.</p>
            </div>
            <div className="about-value-card">
              <div className="about-value-icon-wrapper">
                <SparklesIcon className="about-value-icon" />
              </div>
              <h3>Innovation</h3>
              <p>Nous recherchons constamment les meilleures solutions naturelles.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Notre Histoire */}
      <section className="about-story">
        <div className="about-container">
          <div className="about-story-grid">
            <div className="about-story-image">
              <img 
                src="https://media.sciencephoto.com/c0/35/94/70/c0359470-800px-wm.jpg" 
                alt="Notre histoire"
              />
            </div>
            <div className="about-story-content">
              <h2 className="about-section-title">
                Notre Histoire
                <span className="about-title-decoration"></span>
              </h2>
              <p className="about-story-text">
                Tout a commencé avec une simple constatation : de nombreux hommes souffrent en silence de problèmes de santé 
                sexuelle, sans savoir qu'il existe des solutions naturelles et efficaces.
              </p>
              <p className="about-story-text">
                Notre fondateur, après avoir personnellement surmonté ces défis, a décidé de créer Vitalis Help pour partager 
                ces solutions avec d'autres hommes. Aujourd'hui, nous sommes fiers d'avoir aidé des milliers d'hommes à 
                retrouver leur confiance et leur vitalité.
              </p>
              <div className="about-story-features">
                <div className="about-story-feature">
                  <CheckCircleIcon className="about-story-feature-icon" />
                  <span>Produits naturels</span>
                </div>
                <div className="about-story-feature">
                  <CheckCircleIcon className="about-story-feature-icon" />
                  <span>Livraison discrète</span>
                </div>
                <div className="about-story-feature">
                  <CheckCircleIcon className="about-story-feature-icon" />
                  <span>Service client 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="about-cta">
        <div className="about-cta-container">
          <h2 className="about-cta-title">Prêt à transformer votre vie ?</h2>
          <p className="about-cta-text">
            Rejoignez des milliers d'hommes satisfaits qui ont retrouvé confiance et vitalité.
          </p>
          <Link to="/product/1" className="about-cta-btn">
            <span>Découvrir Strong Man</span>
            <ArrowRightIcon className="about-cta-icon" />
          </Link>
        </div>
      </section>

    </div>
  );
}