
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import { UserRole, User, Product, Membership, CartItem, Order } from './types';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import VendorDashboard from './pages/VendorDashboard';
import UserDashboard from './pages/UserDashboard';
import Maintenance from './pages/Maintenance';
import VendorItems from './pages/VendorItems';
import UserShop from './pages/UserShop';
import Cart from './pages/Cart';
import OrderStatus from './pages/OrderStatus';

// Initial Mock Data
const INITIAL_USERS: User[] = [
  { id: '1', name: 'Admin User', email: 'admin@ems.com', role: UserRole.ADMIN, password: 'password' },
  { id: '2', name: 'Vendor 1', email: 'vendor1@ems.com', role: UserRole.VENDOR, password: 'password', category: 'Catering' },
  { id: '3', name: 'John Doe', email: 'user@ems.com', role: UserRole.USER, password: 'password' },
];

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [products, setProducts] = useState<Product[]>([]);
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Simple Session Logic
  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCart([]);
  };

  return (
    <HashRouter>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {currentUser && (
          <header className="bg-blue-800 text-white p-4 flex justify-between items-center shadow-lg">
            <h1 className="text-xl font-bold">EMS - Event Management System</h1>
            <div className="flex items-center gap-4">
              <span>Welcome, {currentUser.name} ({currentUser.role})</span>
              <button 
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition-colors"
              >
                Log Out
              </button>
            </div>
          </header>
        )}

        <main className="flex-grow p-4">
          <Routes>
            <Route 
              path="/" 
              element={currentUser ? <DashboardRedirect user={currentUser} /> : <Login onLogin={handleLogin} users={users} />} 
            />
            
            {/* Protected Routes */}
            {currentUser?.role === UserRole.ADMIN && (
              <>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route 
                  path="/maintenance" 
                  element={
                    <Maintenance 
                      users={users} 
                      setUsers={setUsers} 
                      memberships={memberships} 
                      setMemberships={setMemberships} 
                    />
                  } 
                />
              </>
            )}

            {currentUser?.role === UserRole.VENDOR && (
              <>
                <Route path="/vendor" element={<VendorDashboard />} />
                <Route 
                  path="/vendor/items" 
                  element={
                    <VendorItems 
                      currentUser={currentUser} 
                      products={products} 
                      setProducts={setProducts} 
                    />
                  } 
                />
              </>
            )}

            {currentUser?.role === UserRole.USER && (
              <>
                <Route path="/user" element={<UserDashboard />} />
                <Route 
                  path="/user/shop" 
                  element={
                    <UserShop 
                      products={products} 
                      cart={cart} 
                      setCart={setCart} 
                    />
                  } 
                />
                <Route 
                  path="/user/cart" 
                  element={
                    <Cart 
                      cart={cart} 
                      setCart={setCart} 
                      currentUser={currentUser} 
                      orders={orders} 
                      setOrders={setOrders} 
                    />
                  } 
                />
                <Route 
                  path="/user/orders" 
                  element={<OrderStatus orders={orders} setOrders={setOrders} currentUser={currentUser} />} 
                />
              </>
            )}

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
};

const DashboardRedirect: React.FC<{ user: User }> = ({ user }) => {
  if (user.role === UserRole.ADMIN) return <Navigate to="/admin" replace />;
  if (user.role === UserRole.VENDOR) return <Navigate to="/vendor" replace />;
  return <Navigate to="/user" replace />;
};

export default App;
