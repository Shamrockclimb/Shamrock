import React, { useState } from 'react';
import TechniqueLevelSection from './TechniqueLevelSection';
import { techniques } from '../mock/techniques';

const TechniqueProgressView = () => {
  const [completedItems, setCompletedItems] = useState(() => {
    const saved = localStorage.getItem('completedTechniques');
    return saved ? JSON.parse(saved) : {};
  });

  const toggleItem = (techniqueId) => {
    const newCompletedItems = {
      ...completedItems,
      [techniqueId]: !completedItems[techniqueId]
    };
    setCompletedItems(newCompletedItems);
    localStorage.setItem('completedTechniques', JSON.stringify(newCompletedItems));
  };

  const totalTechniques = Object.values(techniques).reduce((sum, level) => sum + level.length, 0);
  const totalCompleted = Object.keys(completedItems).filter(id => completedItems[id]).length;
  const overallPercentage = Math.round((totalCompleted / totalTechniques) * 100);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Movimientos Técnicos de Escalada</h2>
        <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">
          <span className="font-medium">{overallPercentage}%</span> completado
        </div>
      </div>

      <TechniqueLevelSection
        level="basic"
        techniques={techniques.basic}
        completedItems={completedItems}
        onToggleItem={toggleItem}
      />

      <TechniqueLevelSection
        level="intermediate"
        techniques={techniques.intermediate}
        completedItems={completedItems}
        onToggleItem={toggleItem}
      />

      <TechniqueLevelSection
        level="advanced"
        techniques={techniques.advanced}
        completedItems={completedItems}
        onToggleItem={toggleItem}
      />

      <button className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
        Ver mi progreso técnico completo
      </button>
    </div>
  );
};

export default TechniqueProgressView;