
import React from 'react';
import { Link } from 'react-router-dom';
import { Order, User, UserRole } from '../types';

interface OrderStatusProps {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  currentUser: User;
}

const OrderStatus: React.FC<OrderStatusProps> = ({ orders, setOrders, currentUser }) => {
  const filteredOrders = currentUser.role === UserRole.USER 
    ? orders.filter(o => o.userId === currentUser.id)
    : orders;

  const updateStatus = (orderId: string, status: Order['status']) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const deleteOrder = (orderId: string) => {
    setOrders(orders.filter(o => o.id !== orderId));
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <Link to="/" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition">
          <i className="fas fa-arrow-left mr-2"></i> Back
        </Link>
        <h2 className="text-2xl font-bold text-gray-800">Order Status</h2>
      </div>

      <div className="space-y-6">
        {filteredOrders.map(order => (
          <div key={order.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
              <div>
                <h4 className="font-bold text-lg text-blue-800">Order #{order.id}</h4>
                <p className="text-xs text-gray-400">Placed on: {new Date().toLocaleDateString()}</p>
              </div>
              <div className="flex flex-col items-end">
                <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase ${
                  order.status === 'Received' ? 'bg-blue-100 text-blue-800' :
                  order.status === 'Ready for Shipping' ? 'bg-orange-100 text-orange-800' :
                  order.status === 'Out For Delivery' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {order.status}
                </span>
                <p className="text-sm font-bold mt-1 text-gray-700">Total: Rs. {order.total}/-</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm">
              <div className="bg-gray-50 p-4 rounded border">
                <h5 className="font-bold text-gray-400 uppercase text-[10px] mb-2">Shipping Details</h5>
                <p className="font-medium">{currentUser.name}</p>
                <p>{order.address}</p>
                <p>{order.city}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded border">
                <h5 className="font-bold text-gray-400 uppercase text-[10px] mb-2">Items</h5>
                <ul className="space-y-1">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="flex justify-between">
                      <span>{item.name} (x{item.quantity})</span>
                      <span className="font-bold">Rs. {item.price * item.quantity}/-</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t pt-4">
              {currentUser.role === UserRole.USER && order.status === 'Received' && (
                <button 
                  onClick={() => updateStatus(order.id, 'Cancelled')}
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition text-sm font-bold"
                >
                  Cancel Order
                </button>
              )}
              {currentUser.role === UserRole.ADMIN && (
                <>
                  <select 
                    value={order.status} 
                    onChange={(e) => updateStatus(order.id, e.target.value as any)}
                    className="border p-1 rounded text-sm bg-white"
                  >
                    <option value="Received">Received</option>
                    <option value="Ready for Shipping">Ready for Shipping</option>
                    <option value="Out For Delivery">Out For Delivery</option>
                  </select>
                  <button 
                    onClick={() => deleteOrder(order.id)}
                    className="bg-gray-200 text-gray-600 px-4 py-1 rounded hover:bg-red-500 hover:text-white transition text-sm font-bold"
                  >
                    Delete Record
                  </button>
                </>
              )}
            </div>
          </div>
        ))}

        {filteredOrders.length === 0 && (
          <div className="text-center py-20 bg-white rounded-lg border border-dashed text-gray-400">
            <i className="fas fa-receipt text-4xl mb-4"></i>
            <p>No orders found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderStatus;
