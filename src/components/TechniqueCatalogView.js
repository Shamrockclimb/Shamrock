import React, { useState, useEffect } from 'react';
import VideoTutorialModal from './VideoTutorialModal';
import TechniqueLevelSection from './TechniqueLevelSection';
import { techniques } from '../mock/techniques';

const TechniqueCatalogView = () => {
  const [completedItems, setCompletedItems] = useState({});
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showVideoModal, setShowVideoModal] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('completedTechniques');
    if (saved) {
      setCompletedItems(JSON.parse(saved));
    }
  }, []);

  const toggleItem = (techniqueId) => {
    const newCompletedItems = {
      ...completedItems,
      [techniqueId]: !completedItems[techniqueId]
    };
    setCompletedItems(newCompletedItems);
    localStorage.setItem('completedTechniques', JSON.stringify(newCompletedItems));
  };

  const openVideo = (videoUrl) => {
    setSelectedVideo(videoUrl);
    setShowVideoModal(true);
  };

  const totalTechniques = Object.values(techniques).reduce((sum, level) => sum + level.length, 0);
  const totalCompleted = Object.keys(completedItems).filter(id => completedItems[id]).length;
  const overallPercentage = totalTechniques > 0 ? Math.round((totalCompleted / totalTechniques) * 100) : 0;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <VideoTutorialModal
        isOpen={showVideoModal}
        onClose={() => setShowVideoModal(false)}
        videoUrl={selectedVideo}
      />

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">🧗 Catálogo Técnico de Escalada</h2>
        <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">
          <span className="font-medium">{overallPercentage}%</span> completado
        </div>
      </div>
      <p className="text-gray-600 mb-6">🔰 Marcá los movimientos que ya dominás y descubrí cuáles podés seguir practicando. Esta lista está organizada de menor a mayor complejidad. Cada técnica incluye un espacio para video o imagen de referencia.</p>

      <TechniqueLevelSection
        level="basic"
        techniques={techniques.basic}
        completedItems={completedItems}
        onToggleItem={toggleItem}
        onOpenVideo={openVideo} // Pasar la función para abrir video
      />

      <TechniqueLevelSection
        level="intermediate"
        techniques={techniques.intermediate}
        completedItems={completedItems}
        onToggleItem={toggleItem}
        onOpenVideo={openVideo} // Pasar la función para abrir video
      />

      <TechniqueLevelSection
        level="advanced"
        techniques={techniques.advanced}
        completedItems={completedItems}
        onToggleItem={toggleItem}
        onOpenVideo={openVideo} // Pasar la función para abrir video
      />

      <button className="mt-6 w-full bg-[#073c26] text-white py-2 rounded-lg hover:bg-green-800 transition-colors">
        Ver mi progreso técnico completo
      </button>
    </div>
  );
};

export default TechniqueCatalogView;