import React from 'react';

const StudentDashboard = ({ student }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Mi Perfil</h2> {/* Cambiado de "Mi Área" */}
      <div className="mb-6">
        <h3 className="font-medium text-gray-700 mb-2">Información</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Nombre</p>
            <p className="font-medium">{student.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Nivel</p>
            <p className="font-medium capitalize">{student.level}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Edad</p>
            <p className="font-medium">{student.age}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{student.email}</p>
          </div>
        </div>
      </div>
      <div>
        <h3 className="font-medium text-gray-700 mb-2">Próximas clases</h3>
        <div className="space-y-2">
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="font-medium">Taller de seguridad</p>
            <p className="text-sm text-gray-500">Sábado 9:00</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="font-medium">Entrenamiento avanzado</p>
            <p className="text-sm text-gray-500">Miércoles 15:00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;

// DONE