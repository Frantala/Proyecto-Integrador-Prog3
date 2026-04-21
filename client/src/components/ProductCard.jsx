import React from 'react';

const ProductCard = ({ category, name, color, price, imageUrl }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col max-w-sm">
      {/* Imagen del Producto */}
      <div className="h-64 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
      </div>

      {/* Contenido */}
      <div className="p-4 flex flex-col flex-grow">
        <span className="inline-block bg-gray-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase w-fit mb-2">
          {category}
        </span>
        
        <h3 className="text-lg font-bold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-500 mb-4 italic">Color: {color}</p>
        
        <div className="mt-auto">
          <p className="text-2xl font-black text-gray-900 mb-4">${price}</p>
          
          <div className="flex gap-2">
            <button className="flex-1 border border-gray-300 text-gray-600 py-2 rounded text-sm font-medium hover:bg-gray-50 transition-colors">
              Ver Detalles
            </button>
            <button className="flex-1 bg-blue-600 text-white py-2 rounded text-sm font-medium flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Agregar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;