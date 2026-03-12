import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CurrencyDollarIcon,
  ShoppingBagIcon,
  UsersIcon,
  CubeIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import api from '../lib/api';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    totalCustomers: 0,
    recentOrders: [],
  });
  const [chartData, setChartData] = useState([]);
  const [distributionData, setDistributionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeframe, setTimeframe] = useState('week');
  const [chartType, setChartType] = useState('line');

  useEffect(() => {
    fetchStats();
    fetchChartData();
  }, [timeframe]);

  const fetchStats = async () => {
    try {
      console.log('📦 Récupération des stats...');
      const response = await api.get('/admin/stats');
      console.log('✅ Stats reçues:', response.data);
      setStats(response.data);
    } catch (err) {
      console.error('❌ Erreur stats:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchChartData = async () => {
    try {
      // Simuler des données pour le graphique
      // À remplacer par un vrai endpoint API
      const days = timeframe === 'week' ? 7 : timeframe === 'month' ? 30 : 12;
      const data = [];
      
      for (let i = 0; i < days; i++) {
        const date = new Date();
        date.setDate(date.getDate() - (days - i - 1));
        
        data.push({
          date: date.toLocaleDateString('fr-FR', { 
            day: 'numeric', 
            month: 'short' 
          }),
          commandes: Math.floor(Math.random() * 20) + 5,
          revenus: Math.floor(Math.random() * 500) + 100,
          clients: Math.floor(Math.random() * 15) + 2
        });
      }
      
      setChartData(data);
      
      // Données pour le graphique circulaire
      setDistributionData([
        { name: 'En attente', value: stats.pendingOrders || 5, color: '#F59E0B' },
        { name: 'Payées', value: stats.completedOrders || 8, color: '#10B981' },
        { name: 'Livrées', value: stats.deliveredOrders || 4, color: '#3B82F6' },
        { name: 'Échouées', value: stats.failedOrders || 2, color: '#EF4444' }
      ]);
      
    } catch (err) {
      console.error('❌ Erreur chargement graphique:', err);
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    fetchStats();
    fetchChartData();
  };

  const COLORS = ['#F59E0B', '#10B981', '#3B82F6', '#EF4444'];

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="premium-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <CubeIcon className="spinner-icon" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <XCircleIcon className="error-icon" />
        <h2>Erreur de chargement</h2>
        <p>{error}</p>
        <button onClick={handleRefresh} className="error-retry">
          <ArrowPathIcon className="h-4 w-4" />
          Réessayer
        </button>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Chiffre d\'affaires',
      value: `${stats.totalRevenue} USD`,
      icon: CurrencyDollarIcon,
      color: 'green',
      bg: 'from-green-500 to-green-400',
    },
    {
      title: 'Commandes',
      value: stats.totalOrders,
      icon: ShoppingBagIcon,
      color: 'blue',
      bg: 'from-blue-500 to-blue-400',
    },
    {
      title: 'Produits',
      value: stats.totalProducts,
      icon: CubeIcon,
      color: 'purple',
      bg: 'from-purple-500 to-purple-400',
    },
    {
      title: 'Clients',
      value: stats.totalCustomers,
      icon: UsersIcon,
      color: 'yellow',
      bg: 'from-yellow-500 to-yellow-400',
    }
  ];

  return (
    <div className="dashboard">
      {/* En-tête */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">
            Tableau de bord
            <span className="dashboard-title-decoration"></span>
          </h1>
          <p className="dashboard-date">
            <ClockIcon className="h-4 w-4" />
            {new Date().toLocaleDateString('fr-FR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
        
        <div className="dashboard-actions">
          <select 
            className="dashboard-timeframe"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
          >
            <option value="week">7 derniers jours</option>
            <option value="month">30 derniers jours</option>
            <option value="year">Cette année</option>
          </select>
          <button onClick={handleRefresh} className="dashboard-refresh">
            <ArrowPathIcon className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="stats-grid">
        {statCards.map((stat, index) => (
          <div key={index} className="stat-card-premium">
            <div className={`stat-icon-wrapper bg-gradient-to-br ${stat.bg}`}>
              <stat.icon className="stat-icon" />
            </div>
            <div className="stat-content">
              <span className="stat-label">{stat.title}</span>
              <span className="stat-value">{stat.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Graphiques */}
      <div className="charts-grid">
        {/* Graphique d'évolution */}
        <div className="chart-card large">
          <div className="chart-header">
            <h2 className="card-title">
              <span>Évolution des activités</span>
            </h2>
            <div className="chart-controls">
              <select 
                className="chart-type-select"
                value={chartType}
                onChange={(e) => setChartType(e.target.value)}
              >
                <option value="line">Ligne</option>
                <option value="area">Aire</option>
                <option value="bar">Barres</option>
              </select>
            </div>
          </div>
          
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              {chartType === 'line' ? (
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="date" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="revenus" 
                    stroke="#F59E0B" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Revenus (USD)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="commandes" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    name="Commandes"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="clients" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    name="Clients"
                  />
                </LineChart>
              ) : chartType === 'area' ? (
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="date" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="revenus" 
                    stackId="1"
                    stroke="#F59E0B" 
                    fill="#F59E0B" 
                    fillOpacity={0.3}
                    name="Revenus (USD)"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="commandes" 
                    stackId="2"
                    stroke="#3B82F6" 
                    fill="#3B82F6" 
                    fillOpacity={0.3}
                    name="Commandes"
                  />
                </AreaChart>
              ) : (
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="date" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="revenus" fill="#F59E0B" name="Revenus (USD)" />
                  <Bar dataKey="commandes" fill="#3B82F6" name="Commandes" />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Graphique circulaire - Distribution des commandes */}
        <div className="chart-card small">
          <h2 className="card-title">
            <span>Distribution des commandes</span>
          </h2>
          <div className="pie-chart-container">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="pie-chart-legend">
            {distributionData.map((item, index) => (
              <div key={index} className="legend-item">
                <span className="legend-color" style={{ backgroundColor: COLORS[index] }}></span>
                <span className="legend-label">{item.name}</span>
                <span className="legend-value">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Commandes récentes */}
      <div className="recent-orders-card">
        <div className="card-header">
          <h2 className="card-title">
            <span>Commandes récentes</span>
          </h2>
          <Link to="/orders" className="card-link">
            Voir tout
            <ArrowTrendingUpIcon className="h-4 w-4" />
          </Link>
        </div>
        
        <div className="recent-orders-list">
          {stats.recentOrders?.length > 0 ? (
            stats.recentOrders.map((order) => (
              <div key={order.id} className="recent-order-item">
                <div className="order-info">
                  <div>
                    <span className="order-id">#{order.id}</span>
                    <span className="order-customer">{order.customerName || 'Client'}</span>
                  </div>
                  <span className="order-date">
                    {new Date(order.date).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'short'
                    })}
                  </span>
                </div>
                <div className="order-details">
                  <span className="order-amount">{order.total} USD</span>
                  <span className={`order-status ${order.status}`}>
                    {order.status === 'completed' && <CheckCircleIcon className="h-3 w-3" />}
                    {order.status === 'pending' && <ClockIcon className="h-3 w-3" />}
                    {order.status === 'failed' && <XCircleIcon className="h-3 w-3" />}
                    <span>
                      {order.status === 'completed' ? 'Payée' : 
                       order.status === 'pending' ? 'En attente' : 'Échouée'}
                    </span>
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="recent-orders-empty">
              <ShoppingBagIcon className="h-12 w-12 text-gray-600 mb-3" />
              <p>Aucune commande récente</p>
            </div>
          )}
        </div>
      </div>

      {/* Actions rapides */}
      <div className="quick-actions">
        <h2 className="quick-actions-title">Actions rapides</h2>
        <div className="quick-actions-grid">
          <Link to="/products/new" className="quick-action-card">
            <CubeIcon className="quick-action-icon" />
            <span>Nouveau produit</span>
          </Link>
          <Link to="/orders" className="quick-action-card">
            <ShoppingBagIcon className="quick-action-icon" />
            <span>Gérer commandes</span>
          </Link>
          <Link to="/customers" className="quick-action-card">
            <UsersIcon className="quick-action-icon" />
            <span>Voir clients</span>
          </Link>
          <Link to="/products" className="quick-action-card">
            <CubeIcon className="quick-action-icon" />
            <span>Inventaire</span>
          </Link>
        </div>
      </div>
    </div>
  );
}