import './App.css';
import './index.css';
import Navbar from './components/Navbar';
import React from 'react';
import ProductCard from './components/ProductCard';

const products = [
  {
    id: 1,
    category: "Clásica",
    name: "Gorra Clásica Negra",
    color: "Negro",
    price: "24.99",
    imageUrl: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=500"
  },
  {
    id: 2,
    category: "Snapback",
    name: "Gorra Snapback Azul",
    color: "Azul",
    price: "29.99",
    imageUrl: "https://images.unsplash.com/photo-1534215754734-18e55d13e346?q=80&w=500"
  },
  {
    id: 3,
    category: "Trucker",
    name: "Gorra Trucker Blanca",
    color: "Blanco",
    price: "22.99",
    imageUrl: "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=500"
  },
  {
    id: 4,
    category: "Deportiva",
    name: "Gorra Deportiva Roja",
    color: "Rojo",
    price: "27.99",
    imageUrl: "https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=500"
  }
];

function App() {
  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-black text-gray-800 mb-8 ml-2">Nuestra Colección</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;