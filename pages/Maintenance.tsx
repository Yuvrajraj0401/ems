
import React, { useState } from 'react';
import { User, Membership, UserRole } from '../types';
import { Link } from 'react-router-dom';

interface MaintenanceProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  memberships: Membership[];
  setMemberships: React.Dispatch<React.SetStateAction<Membership[]>>;
}

const Maintenance: React.FC<MaintenanceProps> = ({ users, setUsers, memberships, setMemberships }) => {
  const [activeTab, setActiveTab] = useState<'membership' | 'users'>('membership');
  const [mode, setMode] = useState<'view' | 'add' | 'update'>('view');
  
  // Form State
  const [membershipNo, setMembershipNo] = useState('');
  const [userId, setUserId] = useState('');
  const [type, setType] = useState<'6 months' | '1 year' | '2 years'>('6 months');
  const [error, setError] = useState('');

  const handleAddMembership = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !membershipNo) {
      setError('All fields are mandatory');
      return;
    }
    const newMembership: Membership = {
      membershipNumber: membershipNo,
      userId,
      type,
      startDate: new Date().toISOString()
    };
    setMemberships([...memberships, newMembership]);
    setMode('view');
    resetForm();
  };

  const handleUpdateMembership = (e: React.FormEvent) => {
    e.preventDefault();
    if (!membershipNo) {
      setError('Membership Number is mandatory');
      return;
    }
    const exists = memberships.find(m => m.membershipNumber === membershipNo);
    if (!exists) {
      setError('Membership Number not found');
      return;
    }
    const updated = memberships.map(m => m.membershipNumber === membershipNo ? { ...m, type } : m);
    setMemberships(updated);
    setMode('view');
    resetForm();
  };

  const resetForm = () => {
    setMembershipNo('');
    setUserId('');
    setType('6 months');
    setError('');
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex gap-4 mb-6">
        <Link to="/admin" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition">
          <i className="fas fa-arrow-left mr-2"></i> Back
        </Link>
        <button 
          onClick={() => setActiveTab('membership')}
          className={`flex-1 py-3 px-6 rounded-lg font-bold transition ${activeTab === 'membership' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 shadow-sm border border-gray-200'}`}
        >
          Manage Memberships
        </button>
        <button 
          onClick={() => setActiveTab('users')}
          className={`flex-1 py-3 px-6 rounded-lg font-bold transition ${activeTab === 'users' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 shadow-sm border border-gray-200'}`}
        >
          Manage Users/Vendors
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
        {activeTab === 'membership' ? (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Memberships Management</h3>
              <div className="flex gap-2">
                <button onClick={() => { setMode('add'); resetForm(); }} className="bg-green-600 text-white px-4 py-2 rounded font-semibold hover:bg-green-700">Add Membership</button>
                <button onClick={() => { setMode('update'); resetForm(); }} className="bg-orange-600 text-white px-4 py-2 rounded font-semibold hover:bg-orange-700">Update Membership</button>
              </div>
            </div>

            {mode === 'view' ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {memberships.map(m => (
                      <tr key={m.membershipNumber}>
                        <td className="px-6 py-4 whitespace-nowrap">{m.membershipNumber}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{m.userId}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">{m.type}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(m.startDate).toLocaleDateString()}</td>
                      </tr>
                    ))}
                    {memberships.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-6 py-10 text-center text-gray-400 italic">No memberships found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <form onSubmit={mode === 'add' ? handleAddMembership : handleUpdateMembership} className="max-w-md mx-auto space-y-4 p-6 border rounded-lg bg-gray-50">
                <h4 className="text-lg font-bold border-b pb-2 mb-4">
                  {mode === 'add' ? 'Add Membership' : 'Update Membership'}
                </h4>
                
                <div>
                  <label className="block text-sm font-medium">Membership Number</label>
                  <input 
                    type="text" 
                    value={membershipNo}
                    onChange={(e) => setMembershipNo(e.target.value)}
                    className="w-full border p-2 rounded" 
                    required
                  />
                </div>

                {mode === 'add' && (
                  <div>
                    <label className="block text-sm font-medium">Select Vendor (User ID)</label>
                    <select 
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      className="w-full border p-2 rounded"
                      required
                    >
                      <option value="">Select a vendor</option>
                      {users.filter(u => u.role === UserRole.VENDOR).map(u => (
                        <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2">Duration</label>
                  <div className="space-y-2">
                    {['6 months', '1 year', '2 years'].map(opt => (
                      <label key={opt} className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="duration" 
                          value={opt} 
                          checked={type === opt}
                          onChange={() => setType(opt as any)}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div className="flex gap-2 pt-4">
                  <button type="submit" className="flex-1 bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700">Save</button>
                  <button type="button" onClick={() => setMode('view')} className="flex-1 bg-gray-400 text-white font-bold py-2 rounded hover:bg-gray-500">Cancel</button>
                </div>
              </form>
            )}
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-6">User/Vendor Management</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map(u => (
                    <tr key={u.id}>
                      <td className="px-6 py-4 whitespace-nowrap font-medium">{u.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">{u.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-bold rounded ${u.role === UserRole.ADMIN ? 'bg-purple-100 text-purple-800' : u.role === UserRole.VENDOR ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {u.category || 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Maintenance;
