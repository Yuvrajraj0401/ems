
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product, CartItem } from '../types';

interface UserShopProps {
  products: Product[];
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const UserShop: React.FC<UserShopProps> = ({ products, cart, setCart }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];
  
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const addToCart = (product: Product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex gap-4">
          <Link to="/user" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition">
            <i className="fas fa-home mr-2"></i> Home
          </Link>
          <Link to="/user/cart" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition relative">
            <i className="fas fa-shopping-cart mr-2"></i> Cart
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {cart.reduce((acc, curr) => acc + curr.quantity, 0)}
              </span>
            )}
          </Link>
        </div>

        <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm border">
          <span className="text-sm font-bold text-gray-500">Filter:</span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-sm font-semibold transition ${selectedCategory === cat ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map(p => (
          <div key={p.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col border border-gray-100">
            <div className="h-48 overflow-hidden bg-gray-50">
              <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <div className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-1">{p.category}</div>
              <h4 className="font-bold text-lg text-gray-800 mb-1">{p.name}</h4>
              <p className="text-xl font-bold text-blue-800 mb-4">Rs. {p.price}/-</p>
              <button 
                onClick={() => addToCart(p)}
                className="mt-auto w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <i className="fas fa-cart-plus"></i> Add to Cart
              </button>
            </div>
          </div>
        ))}
        {filteredProducts.length === 0 && (
          <div className="col-span-full py-20 text-center bg-white rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-400 italic">No products available in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserShop;
