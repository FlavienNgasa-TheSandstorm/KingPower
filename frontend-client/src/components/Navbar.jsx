import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  BeakerIcon,
  InformationCircleIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          King<span className="text-yellow-400">Power</span>
        </Link>

        {/* Menu Desktop */}
        <div className="navbar-menu-desktop">
          <Link 
            to="/" 
            className={`navbar-link ${isActive('/') ? 'active' : ''}`}
          >
            <HomeIcon className="navbar-link-icon" />
            <span>Accueil</span>
            {isActive('/') && <span className="navbar-link-active-indicator"></span>}
          </Link>

          <Link 
            to="/product/1" 
            className={`navbar-link ${isActive('/product/1') ? 'active' : ''}`}
          >
            <BeakerIcon className="navbar-link-icon" />
            <span>Strong-Man</span>
            <span className="navbar-link-badge">Nouveau</span>
            {isActive('/product/1') && <span className="navbar-link-active-indicator"></span>}
          </Link>

          <Link 
            to="/about" 
            className={`navbar-link ${isActive('/about') ? 'active' : ''}`}
          >
            <InformationCircleIcon className="navbar-link-icon" />
            <span>À propos</span>
            {isActive('/about') && <span className="navbar-link-active-indicator"></span>}
          </Link>

          <Link 
            to="/contact" 
            className={`navbar-link ${isActive('/contact') ? 'active' : ''}`}
          >
            <EnvelopeIcon className="navbar-link-icon" />
            <span>Contact</span>
            {isActive('/contact') && <span className="navbar-link-active-indicator"></span>}
          </Link>
        </div>

        {/* Bouton Menu Mobile */}
        <button 
          className="navbar-mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Menu Mobile */}
      {isMobileMenuOpen && (
        <div className="navbar-menu-mobile">
          <Link 
            to="/" 
            className={`navbar-mobile-link ${isActive('/') ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <HomeIcon className="h-5 w-5" />
            <span>Accueil</span>
          </Link>
          <Link 
            to="/product/1" 
            className={`navbar-mobile-link ${isActive('/product/1') ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <BeakerIcon className="h-5 w-5" />
            <span>Strong-Man</span>
            <span className="navbar-mobile-badge">Nouveau</span>
          </Link>
          <Link 
            to="/about" 
            className={`navbar-mobile-link ${isActive('/about') ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <InformationCircleIcon className="h-5 w-5" />
            <span>À propos</span>
          </Link>
          <Link 
            to="/contact" 
            className={`navbar-mobile-link ${isActive('/contact') ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <EnvelopeIcon className="h-5 w-5" />
            <span>Contact</span>
          </Link>
        </div>
      )}
    </nav>
  );
}