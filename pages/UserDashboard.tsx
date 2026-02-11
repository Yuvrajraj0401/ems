
import React from 'react';
import { Link } from 'react-router-dom';

const UserDashboard: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">WELCOME USER</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/user/shop" className="flex flex-col items-center justify-center p-6 bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 rounded-xl transition-all group">
            <i className="fas fa-store text-3xl text-blue-600 mb-3 group-hover:scale-110 transition-transform"></i>
            <span className="font-bold text-blue-800">Browse Vendors</span>
          </Link>

          <Link to="/user/cart" className="flex flex-col items-center justify-center p-6 bg-green-50 hover:bg-green-100 border-2 border-green-200 rounded-xl transition-all group">
            <i className="fas fa-shopping-cart text-3xl text-green-600 mb-3 group-hover:scale-110 transition-transform"></i>
            <span className="font-bold text-green-800">My Cart</span>
          </Link>

          <Link to="/user/orders" className="flex flex-col items-center justify-center p-6 bg-orange-50 hover:bg-orange-100 border-2 border-orange-200 rounded-xl transition-all group">
            <i className="fas fa-truck text-3xl text-orange-600 mb-3 group-hover:scale-110 transition-transform"></i>
            <span className="font-bold text-orange-800">Order Status</span>
          </Link>

          <div className="flex flex-col items-center justify-center p-6 bg-gray-50 border-2 border-gray-200 rounded-xl opacity-60 cursor-not-allowed">
            <i className="fas fa-users text-3xl text-gray-400 mb-3"></i>
            <span className="font-bold text-gray-600">Guest List</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
