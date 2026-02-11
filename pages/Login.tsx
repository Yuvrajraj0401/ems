
import React, { useState } from 'react';
import { User, UserRole } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
  users: User[];
}

const Login: React.FC<LoginProps> = ({ onLogin, users }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Both email and password are required');
      return;
    }

    const foundUser = users.find(u => u.email === email && u.password === password);
    if (foundUser) {
      onLogin(foundUser);
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="flex justify-center items-center h-full pt-12">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border-t-4 border-blue-600">
        <div className="bg-blue-100 p-4 mb-6 rounded text-center">
          <h2 className="text-2xl font-bold text-blue-800">EMS Login</h2>
          <p className="text-sm text-blue-600">Event Management System</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">User Id (Email)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter User Id"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter Password"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              Login
            </button>
            <button
              type="button"
              className="flex-1 bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded hover:bg-gray-400 transition"
              onClick={() => { setEmail(''); setPassword(''); }}
            >
              Cancel
            </button>
          </div>
        </form>

        <div className="mt-6 text-xs text-gray-500">
          <p>Demo accounts:</p>
          <p>Admin: admin@ems.com / password</p>
          <p>Vendor: vendor1@ems.com / password</p>
          <p>User: user@ems.com / password</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
