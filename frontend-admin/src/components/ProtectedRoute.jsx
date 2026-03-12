import { Navigate, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../lib/api';

export default function ProtectedRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        console.log('🔍 Token vérification:', token ? '✅ Présent' : '❌ Absent');
        
        if (!token) {
          if (isMounted) {
            setIsAuthenticated(false);
            setLoading(false);
          }
          return;
        }

        const response = await api.get('/admin/verify');
        console.log('✅ Token valide:', response.data);
        
        if (isMounted) {
          setIsAuthenticated(true);
          setLoading(false);
        }
      } catch (error) {
        console.error('❌ Token invalide');
        localStorage.removeItem('adminToken');
        if (isMounted) {
          setIsAuthenticated(false);
          setLoading(false);
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // IMPORTANT: Outlet rend les routes enfants
  return <Outlet />;
}