import React from 'react';

const WeekPlanOverview = ({ plan }) => {
  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Resumen Semanal</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {days.map((day) => (
          <div key={day} className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-700 mb-2">{day}</h3>
            {plan[day.toLowerCase()]?.length > 0 ? (
              <ul className="space-y-2">
                {plan[day.toLowerCase()].map((activity, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    - {activity}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-gray-400">Descanso</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekPlanOverview;