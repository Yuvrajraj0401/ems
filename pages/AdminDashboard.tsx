
import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Admin Dashboard</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/maintenance" className="flex flex-col items-center justify-center p-8 bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 rounded-xl transition-all group">
            <i className="fas fa-tools text-4xl text-blue-600 mb-4 group-hover:scale-110 transition-transform"></i>
            <span className="font-bold text-blue-800">Maintenance Menu</span>
            <span className="text-xs text-blue-500 mt-2">(Admin Access Only)</span>
          </Link>

          <div className="flex flex-col items-center justify-center p-8 bg-gray-50 border-2 border-gray-200 rounded-xl opacity-60 cursor-not-allowed">
            <i className="fas fa-file-invoice text-4xl text-gray-400 mb-4"></i>
            <span className="font-bold text-gray-600">Transactions</span>
            <span className="text-xs text-gray-400 mt-2">Coming Soon</span>
          </div>

          <div className="flex flex-col items-center justify-center p-8 bg-gray-50 border-2 border-gray-200 rounded-xl opacity-60 cursor-not-allowed">
            <i className="fas fa-chart-bar text-4xl text-gray-400 mb-4"></i>
            <span className="font-bold text-gray-600">Reports</span>
            <span className="text-xs text-gray-400 mt-2">Coming Soon</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
