import React from 'react';

const PlanProgress = ({ progress }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Tu Progreso</h2>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Completado esta semana</span>
            <span className="text-sm font-medium text-gray-700">{progress.weekPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-black h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${progress.weekPercentage}%` }}
            ></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Objetivo mensual</span>
            <span className="text-sm font-medium text-gray-700">{progress.monthPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${progress.monthPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanProgress;