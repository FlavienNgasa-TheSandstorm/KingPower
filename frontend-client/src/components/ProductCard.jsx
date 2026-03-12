import { Link } from 'react-router-dom';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import useCartStore from '../stores/cartStore';
import toast from 'react-hot-toast';

export default function ProductCard({ product }) {
  const addItem = useCartStore(state => state.addItem);

  const handleAddToCart = () => {
    addItem(product);
    toast.success(`${product.name} ajouté au panier !`);
  };

  return (
    <div className="card group">
      <div className="relative h-48 bg-gray-100 rounded-lg mb-4 overflow-hidden">
        {product.image ? (
        <img 
          src={product.images?.[0] || '/placeholder.jpg'} 
          alt={product.name} 
          className="w-full h-full object-contain p-4"
          onError={(e) => {
            e.target.src = '/placeholder.jpg';
          }}
        />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            Image bientôt disponible
          </div>
        )}
      </div>

      <h3 className="text-xl font-bold mb-2">{product.name}</h3>
      <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
      
      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold text-blue-900">
          {product.price} USD
        </span>
        
        <button
          onClick={handleAddToCart}
          className="bg-blue-900 text-white p-2 rounded-full hover:bg-blue-800 transition"
        >
          <ShoppingCartIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}