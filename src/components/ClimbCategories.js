import React, { useState } from 'react';

const ClimbCategories = ({ onSelectCategory }) => {
  const [activeTab, setActiveTab] = useState('safety');
  
  const categories = [
    { id: 'safety', name: 'Seguridad', description: 'Aprende a no morir (tan fácil)' },
    { id: 'technique', name: 'Técnica', description: 'Movimientos que parecen magia' },
    { id: 'strength', name: 'Fuerza', description: 'Para cuando los dedos piden piedad' },
    { id: 'mental', name: 'Mental', description: 'Porque la mente es el primer músculo que se cansa' }
  ];

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mb-8">
      <div className="p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Planifica tu Entrenamiento</h2>
        <div className="flex space-x-1 mb-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setActiveTab(category.id);
                onSelectCategory(category.id);
              }}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === category.id
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          {activeTab && (
            <p className="text-gray-600">{categories.find(c => c.id === activeTab).description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClimbCategories;