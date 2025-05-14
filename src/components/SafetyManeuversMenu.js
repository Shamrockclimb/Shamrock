import React, { useState } from 'react';

const SafetyManeuversMenu = ({ onSelectManeuver }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedManeuver, setSelectedManeuver] = useState(null);

  const maneuvers = [
    { id: 'm1', name: 'Nudo Dinámico', description: 'Para cuando necesitas elasticidad en el sistema' },
    { id: 'm2', name: 'Nudo de Prusik', description: 'Tu mejor amigo en autorrescate' },
    { id: 'm3', name: 'Sistema de Poleas', description: 'Para esos rescates que parecen de misión imposible' },
    { id: 'm4', name: 'Anclaje en Y', description: 'Doble seguridad nunca está de más' },
    { id: 'm5', name: 'Rappel Controlado', description: 'Bajar sin convertirte en un péndulo humano' }
  ];

  const handleSelect = (maneuver) => {
    setSelectedManeuver(maneuver);
    onSelectManeuver(maneuver);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-black text-white px-3 py-1 rounded-lg hover:bg-gray-800 transition-colors flex items-center"
      >
        <span>{selectedManeuver ? selectedManeuver.name : 'Agregar'}</span>
        <svg
          className={`ml-2 h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-56 bg-white rounded-md shadow-lg">
          <div className="py-1">
            {maneuvers.map((maneuver) => (
              <button
                key={maneuver.id}
                onClick={() => handleSelect(maneuver)}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <div className="font-medium">{maneuver.name}</div>
                <div className="text-xs text-gray-500">{maneuver.description}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SafetyManeuversMenu;