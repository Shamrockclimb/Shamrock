import React, { useState } from 'react';
import VideoTutorialModal from './VideoTutorialModal';

const TechniqueLevelSection = ({ level, techniques, completedItems, onToggleItem, onOpenVideo }) => { // Recibir onOpenVideo
  const [isExpanded, setIsExpanded] = useState(false); // Estado para controlar la expansión

  const levelColors = {
    basic: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800'
  };

  const levelTitles = {
    basic: '🟢 Nivel Básico: Fundamentos Técnicos',
    intermediate: '🟡 Nivel Intermedio: Control y Equilibrio',
    advanced: '🔴 Nivel Avanzado: Potencia y Coordinación'
  };

  const completedCount = techniques.filter(tech => completedItems[tech.id]).length;
  const completionPercentage = techniques.length > 0 ? Math.round((completedCount / techniques.length) * 100) : 0;

  return (
    <div className="mb-8 border border-gray-200 rounded-lg overflow-hidden">
      {/* El modal de video ahora se maneja en el componente padre (TechniqueCatalogView) */}

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 bg-gray-100 hover:bg-gray-200 transition-colors flex justify-between items-center"
      >
        <h3 className="text-lg font-bold text-gray-800">{levelTitles[level]}</h3>
        <svg
          className={`w-5 h-5 text-gray-600 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isExpanded && (
        <div className="p-4">
           <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-gray-700">Progreso del Nivel</span>
              <span className={`text-xs px-2 py-1 rounded-full ${levelColors[level]}`}>
                {completionPercentage}% completado
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
              <div
                className={`h-2.5 rounded-full transition-all duration-500 ${levelColors[level].replace('100', '600').replace('800', '100')}`}
                style={{ width: `${completionPercentage}%` }}
              />
            </div>

          <div className="space-y-3">
            {techniques.map(technique => (
              <div
                key={technique.id}
                className={`p-3 rounded-lg border ${
                  completedItems[technique.id] ? 'border-[#073c26] bg-green-50' : 'border-gray-200'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-grow">
                    <h4 className="font-medium">{technique.name}</h4>
                    <p className="text-sm text-gray-600">{technique.description}</p>
                  </div>
                  <label className="flex items-center ml-4">
                    <input
                      type="checkbox"
                      checked={!!completedItems[technique.id]}
                      onChange={() => onToggleItem(technique.id)}
                      className="h-5 w-5 rounded border-gray-300 text-[#073c26] focus:ring-[#073c26]"
                    />
                  </label>
                </div>
                
                {technique.videoUrl && (
                  <button
                    onClick={() => onOpenVideo(technique.videoUrl)} // Usar la función pasada por props
                    className="mt-2 text-sm text-[#073c26] hover:text-green-800 flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Ver demostración
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TechniqueLevelSection;