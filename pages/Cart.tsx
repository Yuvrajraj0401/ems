
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartItem, User, Order } from '../types';

interface CartProps {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  currentUser: User;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

const Cart: React.FC<CartProps> = ({ cart, setCart, currentUser, orders, setOrders }) => {
  const navigate = useNavigate();
  const [isCheckout, setIsCheckout] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // Form State
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'UPI'>('Cash');
  const [pinCode, setPinCode] = useState('');

  const grandTotal = cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);

  const removeItem = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, qty: number) => {
    if (qty < 1) return;
    setCart(cart.map(item => item.id === id ? { ...item, quantity: qty } : item));
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      userId: currentUser.id,
      items: [...cart],
      total: grandTotal,
      status: 'Received',
      address,
      city,
      paymentMethod
    };
    setOrders([...orders, newOrder]);
    setShowPopup(true);
  };

  const completeOrder = () => {
    setCart([]);
    setShowPopup(false);
    navigate('/user/orders');
  };

  if (cart.length === 0 && !showPopup) {
    return (
      <div className="max-w-4xl mx-auto pt-20 text-center">
        <i className="fas fa-shopping-basket text-6xl text-gray-200 mb-6"></i>
        <h2 className="text-2xl font-bold text-gray-500">Your cart is empty</h2>
        <Link to="/user/shop" className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">Go Shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <Link to="/user/shop" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition">
          <i className="fas fa-arrow-left mr-2"></i> Back to Shop
        </Link>
        <h2 className="text-2xl font-bold text-gray-800">Shopping Cart</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="bg-blue-50 p-4 border-b font-bold text-blue-800 flex justify-between">
              <span>Item Details</span>
              <button onClick={() => setCart([])} className="text-red-500 text-sm hover:underline">Delete All</button>
            </div>
            <div className="divide-y">
              {cart.map(item => (
                <div key={item.id} className="p-4 flex gap-4 items-center">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded bg-gray-50" />
                  <div className="flex-grow">
                    <h4 className="font-bold">{item.name}</h4>
                    <p className="text-sm text-gray-500">Price: Rs. {item.price}/-</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <select 
                      value={item.quantity} 
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      className="border rounded px-2 py-1 bg-white"
                    >
                      {[1, 2, 3, 4, 5, 10].map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                  </div>
                  <div className="w-24 text-right font-bold text-blue-800">
                    Rs. {item.price * item.quantity}/-
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-red-500 transition">
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              ))}
            </div>
            <div className="p-4 bg-gray-50 flex justify-between items-center">
              <span className="text-lg font-bold text-gray-700">Grand Total</span>
              <span className="text-2xl font-bold text-blue-800">Rs. {grandTotal}/-</span>
            </div>
          </div>
          
          {!isCheckout && (
            <button 
              onClick={() => setIsCheckout(true)}
              className="w-full bg-blue-600 text-white font-bold py-4 rounded-lg shadow hover:bg-blue-700 transition"
            >
              Proceed to CheckOut
            </button>
          )}
        </div>

        {isCheckout && (
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-600">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <i className="fas fa-shipping-fast text-blue-600"></i> Checkout Details
            </h3>
            <form onSubmit={handleCheckout} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Shipping Address</label>
                <textarea 
                  value={address} 
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full border p-2 rounded h-20" 
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <input 
                  type="text" 
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full border p-2 rounded" 
                  required 
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium mb-1">State</label>
                  <input type="text" className="w-full border p-2 rounded" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Pin Code</label>
                  <input 
                    type="text" 
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    className="w-full border p-2 rounded" 
                    required 
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Payment Method</label>
                <select 
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as any)}
                  className="w-full border p-2 rounded bg-white"
                >
                  <option value="Cash">Cash</option>
                  <option value="UPI">UPI</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 shadow-md">
                Order Now
              </button>
            </form>
          </div>
        )}
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full text-center border-t-8 border-green-500">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-check text-3xl"></i>
            </div>
            <h3 className="text-2xl font-bold mb-2">THANK YOU!</h3>
            <p className="text-gray-500 mb-6">Your order has been placed successfully.</p>
            <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left space-y-2">
              <div className="flex justify-between text-sm"><span className="text-gray-400">Total Amount:</span> <span className="font-bold">Rs. {grandTotal}/-</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-400">Payment:</span> <span className="font-bold">{paymentMethod}</span></div>
            </div>
            <button 
              onClick={completeOrder}
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 shadow transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
