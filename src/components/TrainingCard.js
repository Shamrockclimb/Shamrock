import React from 'react';
import SafetyManeuversMenu from './SafetyManeuversMenu';

const TrainingCard = ({ title, description, duration, difficulty, onAdd }) => {
  const difficultyColors = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800',
    expert: 'bg-purple-100 text-purple-800'
  };

  const handleManeuverSelect = (maneuver) => {
    if (onAdd) {
      onAdd({ ...maneuver, isSafetyManeuver: true });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <span className={`text-xs px-2 py-1 rounded-full ${difficultyColors[difficulty] || difficultyColors.easy}`}>
          {difficulty}
        </span>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>Duración: {duration} min</span>
        <SafetyManeuversMenu onSelectManeuver={handleManeuverSelect} />
      </div>
    </div>
  );
};

export default TrainingCard;