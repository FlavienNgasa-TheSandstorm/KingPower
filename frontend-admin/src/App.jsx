import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';  // ← AJOUTER
import Header from './components/Header';    // ← AJOUTER
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';      // ← AJOUTER (si existant)
import Orders from './pages/Orders';          // ← AJOUTER (si existant)
import Customers from './pages/Customers';    // ← AJOUTER (si existant)
import OrderDetail from './pages/OrderDetail'; // ← AJOUTER (si existant)
import { Toaster } from 'react-hot-toast';

// Composant Layout pour la mise en page avec Sidebar et Header
function Layout({ children, title }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header title={title} />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route element={<ProtectedRoute />}>
          <Route 
            path="/" 
            element={
              <Layout title="Dashboard">
                <Dashboard />
              </Layout>
            } 
          />
          <Route 
            path="/products" 
            element={
              <Layout title="Produits">
                <Products />
              </Layout>
            } 
          />
          <Route 
            path="/orders" 
            element={
              <Layout title="Commandes">
                <Orders />
              </Layout>
            } 
          />
          <Route 
            path="/orders/:id" 
            element={
              <Layout title="Détail commande">
                <OrderDetail />
              </Layout>
            } 
          />
          <Route 
            path="/customers" 
            element={
              <Layout title="Clients">
                <Customers />
              </Layout>
            } 
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;