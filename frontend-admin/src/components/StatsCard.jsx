import { useState, useEffect } from 'react';
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  MinusIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

export default function StatsCard({ 
  title, 
  value, 
  icon: Icon, 
  color = 'blue',
  trend = 'stable',
  trendValue,
  progress,
  progressMax = 100,
  details,
  onClick,
  className = ''
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [animatedValue, setAnimatedValue] = useState(0);

  // Animation du compteur
  useEffect(() => {
    if (typeof value === 'number') {
      const duration = 1000;
      const steps = 60;
      const stepValue = value / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += stepValue;
        if (current >= value) {
          setAnimatedValue(value);
          clearInterval(timer);
        } else {
          setAnimatedValue(current);
        }
      }, duration / steps);
      
      return () => clearInterval(timer);
    } else {
      setAnimatedValue(value);
    }
  }, [value]);

  const colorClasses = {
    blue: {
      bg: 'from-blue-500 to-blue-400',
      light: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'border-blue-200',
      hover: 'hover:border-blue-300'
    },
    green: {
      bg: 'from-green-500 to-green-400',
      light: 'bg-green-50',
      text: 'text-green-600',
      border: 'border-green-200',
      hover: 'hover:border-green-300'
    },
    yellow: {
      bg: 'from-yellow-500 to-yellow-400',
      light: 'bg-yellow-50',
      text: 'text-yellow-600',
      border: 'border-yellow-200',
      hover: 'hover:border-yellow-300'
    },
    purple: {
      bg: 'from-purple-500 to-purple-400',
      light: 'bg-purple-50',
      text: 'text-purple-600',
      border: 'border-purple-200',
      hover: 'hover:border-purple-300'
    },
    red: {
      bg: 'from-red-500 to-red-400',
      light: 'bg-red-50',
      text: 'text-red-600',
      border: 'border-red-200',
      hover: 'hover:border-red-300'
    }
  };

  const trendIcons = {
    up: <ArrowTrendingUpIcon className="trend-icon up" />,
    down: <ArrowTrendingDownIcon className="trend-icon down" />,
    stable: <MinusIcon className="trend-icon stable" />
  };

  const formatValue = (val) => {
    if (typeof val === 'number') {
      return new Intl.NumberFormat('fr-FR', {
        maximumFractionDigits: 0
      }).format(Math.round(animatedValue));
    }
    return val;
  };

  return (
    <div 
      className={`stats-card ${color} ${className} ${onClick ? 'clickable' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      role={onClick ? 'button' : 'article'}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* Effet de fond animé */}
      <div className="card-background">
        <div className={`gradient-spot ${color}`}></div>
      </div>

      {/* En-tête avec titre et icône */}
      <div className="stats-card-header">
        <h3 className="stats-card-title">{title}</h3>
        <div className={`stats-card-icon-wrapper ${color}`}>
          <Icon className="stats-card-icon" />
        </div>
      </div>

      {/* Valeur principale avec animation */}
      <div className="stats-card-value-wrapper">
        <span className="stats-card-value">
          {formatValue(value)}
        </span>
        
        {/* Badge de tendance */}
        {trend && trendValue && (
          <div className={`trend-badge ${trend}`}>
            {trendIcons[trend]}
            <span className="trend-value">{trendValue}</span>
          </div>
        )}
      </div>

      {/* Barre de progression */}
      {progress !== undefined && (
        <div className="progress-container">
          <div className="progress-bar-bg">
            <div 
              className={`progress-bar-fill ${color}`}
              style={{ width: `${(progress / progressMax) * 100}%` }}
            >
              <span className="progress-tooltip">
                {progress} / {progressMax}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Informations supplémentaires */}
      {details && (
        <div className="stats-card-footer">
          {details.map((detail, index) => (
            <div key={index} className="footer-item">
              <span className="footer-label">{detail.label}</span>
              <span className={`footer-value ${detail.color || ''}`}>
                {detail.value}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Mini graphique sparkline (optionnel) */}
      {isHovered && (
        <div className="sparkline-container">
          <svg viewBox="0 0 100 30" className="sparkline">
            <polyline
              points="0,25 10,20 20,22 30,15 40,18 50,10 60,12 70,5 80,8 90,2 100,0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={`sparkline-path ${color}`}
            />
          </svg>
        </div>
      )}
    </div>
  );
}