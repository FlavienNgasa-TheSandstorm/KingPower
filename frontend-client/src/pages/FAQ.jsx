import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronDownIcon,
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  EnvelopeIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

export default function FAQ() {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const faqCategories = [
    {
      category: "Commandes & Livraison",
      icon: "📦",
      questions: [
        {
          q: "Comment passer une commande ?",
          a: "Pour passer une commande, il vous suffit de sélectionner le produit souhaité sur notre site, de choisir la quantité, puis de cliquer sur 'Ajouter au panier'. Ensuite, suivez les étapes du processus de paiement pour finaliser votre commande."
        },
        {
          q: "Quels sont les délais de livraison ?",
          a: "Les délais de livraison sont généralement de 2 à 3 jours ouvrés pour Kinshasa, et de 3 à 5 jours ouvrés pour les autres villes de la RDC."
        },
        {
          q: "Combien coûte la livraison ?",
          a: "La livraison est gratuite pour toute commande supérieure à 50 USD. Pour les commandes inférieures, les frais de livraison sont de 5 USD."
        },
        {
          q: "Puis-je suivre ma commande ?",
          a: "Oui, une fois votre commande expédiée, vous recevrez un numéro de suivi par SMS et email pour suivre votre colis en temps réel."
        }
      ]
    },
    {
      category: "Paiement",
      icon: "💳",
      questions: [
        {
          q: "Quels sont les moyens de paiement acceptés ?",
          a: "Nous acceptons M-Pesa (Vodacom), Airtel Money, Orange Money, ainsi que PayPal et les cartes Visa internationales."
        },
        {
          q: "Le paiement à la livraison est-il possible ?",
          a: "Oui, nous proposons le paiement à la livraison pour toutes les commandes en RDC. Vous payez directement au livreur à la réception de votre colis."
        },
        {
          q: "Est-ce que le paiement est sécurisé ?",
          a: "Absolument ! Tous les paiements sont 100% sécurisés. Vos informations bancaires ne sont jamais stockées sur nos serveurs."
        },
        {
          q: "Puis-je payer en plusieurs fois ?",
          a: "Pour le moment, nous ne proposons pas de paiement en plusieurs fois. Le règlement s'effectue en une seule fois."
        }
      ]
    },
    {
      category: "Produits",
      icon: "💊",
      questions: [
        {
          q: "Les produits sont-ils naturels ?",
          a: "Oui, Strong Man est composé d'ingrédients 100% naturels, soigneusement sélectionnés pour leur efficacité et leur sécurité."
        },
        {
          q: "Y a-t-il des effets secondaires ?",
          a: "Strong Man est fabriqué à partir d'ingrédients naturels et ne présente aucun effet secondaire connu lorsqu'il est utilisé conformément aux instructions."
        },
        {
          q: "Comment utiliser Strong Man ?",
          a: "Prenez une cuillère à soupe de sirop au moins une heure avant l'activité sexuelle. Une dose suffit pour 3 jours d'effets optimaux."
        },
        {
          q: "Combien de temps durent les effets ?",
          a: "Les effets d'une dose peuvent durer jusqu'à 3 jours, avec une amélioration significative de l'endurance et de la qualité des érections."
        }
      ]
    },
    {
      category: "Compte & Sécurité",
      icon: "🔒",
      questions: [
        {
          q: "Comment créer un compte ?",
          a: "Cliquez sur 'Connexion' en haut de la page, puis sur 'Créer un compte'. Remplissez le formulaire avec vos informations et validez."
        },
        {
          q: "J'ai oublié mon mot de passe, que faire ?",
          a: "Sur la page de connexion, cliquez sur 'Mot de passe oublié' et suivez les instructions pour réinitialiser votre mot de passe."
        },
        {
          q: "Mes informations personnelles sont-elles protégées ?",
          a: "Oui, nous prenons la protection de vos données très au sérieux. Toutes vos informations sont cryptées et sécurisées."
        },
        {
          q: "Puis-je supprimer mon compte ?",
          a: "Oui, vous pouvez demander la suppression de votre compte en nous contactant via la page Contact ou par email."
        }
      ]
    },
    {
      category: "Retours & Remboursements",
      icon: "🔄",
      questions: [
        {
          q: "Puis-je retourner un produit ?",
          a: "Oui, vous disposez de 14 jours après réception pour retourner un produit non ouvert et en parfait état."
        },
        {
          q: "Comment fonctionne le remboursement ?",
          a: "Une fois le produit retourné et vérifié, nous procédons au remboursement sous 5 à 7 jours ouvrés via le même moyen de paiement."
        },
        {
          q: "Que faire si je reçois un produit endommagé ?",
          a: "Contactez immédiatement notre service client avec une photo du produit endommagé. Nous vous renverrons un produit neuf sans frais."
        }
      ]
    }
  ];

  return (
    <div className="faq-page">

      {/* Hero Section */}
      <section className="faq-hero">
        <div className="faq-hero-container">
          <h1 className="faq-hero-title">
            Foire Aux <span>Questions</span>
          </h1>
          <p className="faq-hero-subtitle">
            Trouvez rapidement des réponses à vos questions les plus fréquentes
          </p>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="faq-section">
        <div className="faq-container">
          <div className="faq-grid">
            {faqCategories.map((category, catIndex) => (
              <div key={catIndex} className="faq-category">
                <div className="faq-category-header">
                  <span className="faq-category-icon">{category.icon}</span>
                  <h2 className="faq-category-title">{category.category}</h2>
                </div>
                
                <div className="faq-items">
                  {category.questions.map((item, itemIndex) => {
                    const globalIndex = `${catIndex}-${itemIndex}`;
                    return (
                      <div key={itemIndex} className="faq-item">
                        <button
                          className="faq-question"
                          onClick={() => toggleItem(globalIndex)}
                        >
                          <span className="faq-question-text">{item.q}</span>
                          <ChevronDownIcon 
                            className={`faq-question-icon ${openItems[globalIndex] ? 'open' : ''}`} 
                          />
                        </button>
                        {openItems[globalIndex] && (
                          <div className="faq-answer">
                            <p>{item.a}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="faq-contact">
        <div className="faq-contact-container">
          <h2 className="faq-contact-title">Vous n'avez pas trouvé votre réponse ?</h2>
          <p className="faq-contact-text">
            Notre équipe est là pour vous aider. N'hésitez pas à nous contacter directement.
          </p>
          <div className="faq-contact-options">
            <Link to="/contact" className="faq-contact-btn">
              <ChatBubbleLeftRightIcon className="faq-contact-icon" />
              <span>Formulaire de contact</span>
              <ArrowRightIcon className="faq-contact-arrow" />
            </Link>
            <a href="tel:+243123456789" className="faq-contact-btn phone">
              <PhoneIcon className="faq-contact-icon" />
              <span>+243 123 456 789</span>
            </a>
            <a href="mailto:contact@vitalis-help.cd" className="faq-contact-btn email">
              <EnvelopeIcon className="faq-contact-icon" />
              <span>contact@vitalis-help.cd</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}