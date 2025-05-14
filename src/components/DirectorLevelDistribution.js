import React from 'react';
import { mockUsers } from '../mock/users';

const DirectorLevelDistribution = () => {
  const students = mockUsers.filter(user => user.role === 'student');
  const totalStudents = students.length;

  const levelCounts = students.reduce((counts, student) => {
    counts[student.level] = (counts[student.level] || 0) + 1;
    return counts;
  }, {});

  const levels = ['beginner', 'intermediate', 'advanced'];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Distribución de Alumnos por Nivel</h3>
      
      {totalStudents === 0 ? (
        <p className="text-gray-600">No hay alumnos registrados.</p>
      ) : (
        <div className="space-y-4">
          {levels.map(level => {
            const count = levelCounts[level] || 0;
            const percentage = Math.round((count / totalStudents) * 100);
            const levelName = level === 'beginner' ? 'Novatos' : level === 'intermediate' ? 'Intermedios' : 'Avanzados';

            return (
              <div key={level}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 capitalize">{levelName}</span>
                  <span className="text-sm font-medium text-gray-700">{percentage}% ({count})</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full transition-all duration-500 ${
                      level === 'beginner' ? 'bg-blue-500' : level === 'intermediate' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DirectorLevelDistribution;