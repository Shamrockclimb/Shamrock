import React, { useState } from 'react';
import VideoTutorialModal from './VideoTutorialModal';
import CategoryProgress from './CategoryProgress';

const AchievementTracker = () => {
  const [activeCategory, setActiveCategory] = useState('safety');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const categories = {
    safety: [
      { name: 'Escalar en top rope', videoUrl: 'https://youtube.com/embed/safety1' },
      { name: 'Dar seguro de top rope', videoUrl: 'https://youtube.com/embed/safety2' },
      { name: 'Escalar de primero', videoUrl: 'https://youtube.com/embed/safety3' },
      { name: 'Dar seguro de primero', videoUrl: 'https://youtube.com/embed/safety4' },
      { name: 'Armar descuelgues', videoUrl: 'https://youtube.com/embed/safety5' },
      { name: 'Limpiar una vía', videoUrl: 'https://youtube.com/embed/safety6' }
    ],
    technique: [
      { name: 'Técnica de pies básica', videoUrl: 'https://youtube.com/embed/tech1' },
      { name: 'Técnica de manos básica', videoUrl: 'https://youtube.com/embed/tech2' },
      { name: 'Técnica de cadera básica', videoUrl: 'https://youtube.com/embed/tech3' },
      { name: 'Técnica de pies avanzada', videoUrl: 'https://youtube.com/embed/tech4' },
      { name: 'Movimientos complejos', videoUrl: 'https://youtube.com/embed/tech5' },
      { name: 'Dinámicos', videoUrl: 'https://youtube.com/embed/tech6' },
      { name: 'Coordinativos', videoUrl: 'https://youtube.com/embed/tech7' }
    ],
    strength: [
      { name: 'Cantidad de movimientos', videoUrl: 'https://youtube.com/embed/str1' },
      { name: 'Entrenamiento de dedos', videoUrl: 'https://youtube.com/embed/str2' },
      { name: 'Spread wall', videoUrl: 'https://youtube.com/embed/str3' },
      { name: 'Campus board', videoUrl: 'https://youtube.com/embed/str4' }
    ],
    mental: [
      { name: 'Control de miedo', videoUrl: 'https://youtube.com/embed/ment1' },
      { name: 'Visualización de rutas', videoUrl: 'https://youtube.com/embed/ment2' },
      { name: 'Manejo de presión', videoUrl: 'https://youtube.com/embed/ment3' },
      { name: 'Estrategia mental', videoUrl: 'https://youtube.com/embed/ment4' }
    ]
  };

  const [completedItems, setCompletedItems] = useState({});

  const toggleItem = (category, item) => {
    const key = `${category}-${item.name}`;
    setCompletedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const openVideo = (item) => {
    setSelectedItem(item);
    setShowVideoModal(true);
  };

  const countCompleted = (category) => {
    return categories[category].filter(
      item => completedItems[`${category}-${item.name}`]
    ).length;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <VideoTutorialModal 
        isOpen={showVideoModal} 
        onClose={() => setShowVideoModal(false)} 
        videoUrl={selectedItem?.videoUrl}
      />

      <h2 className="text-xl font-bold text-gray-800 mb-4">Mi Progreso</h2>
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        {Object.keys(categories).map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap ${
              activeCategory === category
                ? 'bg-[#073c26] text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {category === 'safety' && 'Seguridad'}
            {category === 'technique' && 'Técnica'}
            {category === 'strength' && 'Fuerza'}
            {category === 'mental' && 'Mental'}
          </button>
        ))}
      </div>

      <CategoryProgress 
        completed={countCompleted(activeCategory)} 
        total={categories[activeCategory].length} 
      />

      <div className="space-y-3">
        {categories[activeCategory].map(item => (
          <div
            key={item.name}
            className={`p-3 rounded-lg border ${
              completedItems[`${activeCategory}-${item.name}`]
                ? 'border-[#073c26] bg-green-50'
                : 'border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-3 flex-grow">
                <input
                  type="checkbox"
                  checked={!!completedItems[`${activeCategory}-${item.name}`]}
                  onChange={() => toggleItem(activeCategory, item)}
                  className="h-5 w-5 rounded border-gray-300 text-[#073c26] focus:ring-[#073c26]"
                />
                <span className="text-gray-700">{item.name}</span>
              </label>
              {item.videoUrl && (
                <button
                  onClick={() => openVideo(item)}
                  className="ml-2 text-[#073c26] hover:text-green-800"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementTracker;