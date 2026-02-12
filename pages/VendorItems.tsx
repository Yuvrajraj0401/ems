
import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Product, User } from '../types';

interface VendorItemsProps {
  currentUser: User;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const VendorItems: React.FC<VendorItemsProps> = ({ currentUser, products, setProducts }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mode, setMode] = useState<'view' | 'add' | 'update'>('view');
  
  // Form State
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [editId, setEditId] = useState<string | null>(null);
  

  useEffect(() => {
    const m = searchParams.get('mode');
    if (m === 'add') setMode('add');
    else setMode('view');
  }, [searchParams]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !image) return;

    if (mode === 'add') {
      const newProduct: Product = {
        id: Date.now().toString(),
        vendorId: currentUser.id,
        name,
        price: parseFloat(price),
        image,
        category: currentUser.category || 'General'
      };
      setProducts([...products, newProduct]);
    } else if (mode === 'update' && editId) {
      const updated = products.map(p => p.id === editId ? { ...p, name, price: parseFloat(price), image } : p);
      setProducts(updated);
    }
    
    setMode('view');
    resetForm();
    setSearchParams({});
  };

  const resetForm = () => {
    setName('');
    setPrice('');
    setImage('');
    setEditId(null);
  };

  const vendorProducts = products.filter(p => p.vendorId === currentUser.id);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <Link to="/vendor" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition">
          <i className="fas fa-arrow-left mr-2"></i> Back
        </Link>
        <div className="flex gap-2">
          <button 
            onClick={() => { setMode('view'); setSearchParams({}); }}
            className={`px-4 py-2 rounded font-bold ${mode === 'view' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Product List
          </button>
          <button 
            onClick={() => setMode('add')}
            className={`px-4 py-2 rounded font-bold ${mode === 'add' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Add New Item
          </button>
        </div>
      </div>

      {mode === 'view' ? (
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-xl font-bold mb-6">Manage Your Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendorProducts.map(p => (
              <div key={p.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
                <img src={p.image} alt={p.name} className="w-full h-48 object-cover bg-gray-100" />
                <div className="p-4">
                  <h4 className="font-bold text-lg">{p.name}</h4>
                  <p className="text-blue-600 font-bold mb-4">Rs. {p.price}/-</p>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => { 
                        setMode('update'); 
                        setEditId(p.id); 
                        setName(p.name); 
                        setPrice(p.price.toString()); 
                        setImage(p.image);
                      }}
                      className="flex-1 bg-orange-500 text-white py-1 rounded hover:bg-orange-600 text-sm"
                    >
                      Update
                    </button>
                    <button 
                      onClick={() => setProducts(products.filter(item => item.id !== p.id))}
                      className="flex-1 bg-red-500 text-white py-1 rounded hover:bg-red-600 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {vendorProducts.length === 0 && (
              <div className="col-span-full py-20 text-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 text-gray-400">
                <i className="fas fa-box-open text-4xl mb-4"></i>
                <p>No products added yet. Click 'Add New Item' to start.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-4">
            <h3 className="text-xl font-bold border-b pb-2 mb-4">
              {mode === 'add' ? 'Add The Product' : 'Update Product'}
            </h3>
            
            <div>
              <label className="block text-sm font-medium">Product Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="w-full border p-2 rounded mt-1" 
                required 
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Product Price (Rs)</label>
              <input 
                type="number" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)} 
                className="w-full border p-2 rounded mt-1" 
                required 
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Product Image</label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
                className="w-full border p-2 rounded mt-1 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" 
              />
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 shadow-md">
              {mode === 'add' ? 'Save Product' : 'Update Product'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default VendorItems;
