import React, { useState } from 'react';
import CreateEventModal from '../../calendar/CreateEventModal';
import InstructorStudentList from './InstructorStudentList';
import InstructorMaterialRepository from './InstructorMaterialRepository'; // Importamos el repositorio

const InstructorDashboard = ({ instructor }) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [showStudentList, setShowStudentList] = useState(false);
  const [showMaterialRepo, setShowMaterialRepo] = useState(false); // Estado para mostrar/ocultar repositorio

  const handleCreateEvent = (newEvent) => {
    // Aquí iría la lógica para agregar el evento a la lista global de eventos
    // Por ahora, solo lo mostramos en consola para simular
    console.log('Nuevo evento creado por instructor:', newEvent);
    // En una app real, esto actualizaría el estado global o haría una llamada a API
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <CreateEventModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateEvent={handleCreateEvent}
      />

      <h2 className="text-xl font-bold text-gray-800 mb-4">Panel de Instructor</h2>
      <p className="text-gray-700 mb-4">Bienvenido, {instructor.name}. Aquí puedes gestionar tus cursos y alumnos.</p>
      
      <div className="space-y-4">
        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="font-medium text-gray-800 mb-2">Mis Cursos y Horarios</h3>
          <p className="text-sm text-gray-600 mb-2">Agrega y gestiona tus clases y horarios disponibles.</p>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="mt-2 text-sm bg-[#073c26] text-white px-3 py-1 rounded-lg hover:bg-green-800 transition-colors"
          >
            + Agregar Clase/Horario
          </button>
          {/* Aquí se podría agregar un listado de las clases del instructor */}
        </div>
        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="font-medium text-gray-800 mb-2">Progreso de Alumnos</h3>
          <p className="text-sm text-gray-600 mb-2">Ver el avance de los estudiantes en tus clases.</p>
          <button
            onClick={() => setShowStudentList(!showStudentList)}
            className="mt-2 text-sm text-[#073c26] hover:text-green-800"
          >
            {showStudentList ? 'Ocultar Lista de Alumnos' : 'Ver Lista de Alumnos'}
          </button>
          {showStudentList && (
            <div className="mt-4">
              <InstructorStudentList instructorId={instructor.id} />
            </div>
          )}
        </div>
        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="font-medium text-gray-800 mb-2">Materiales y Retroalimentación</h3>
          <p className="text-sm text-gray-600 mb-2">Sube recursos y envía comentarios a tus alumnos.</p>
           <button
            onClick={() => setShowMaterialRepo(!showMaterialRepo)}
            className="mt-2 text-sm text-[#073c26] hover:text-green-800"
          >
            {showMaterialRepo ? 'Ocultar Repositorio' : 'Ver Repositorio de Materiales'}
          </button>
          {showMaterialRepo && (
            <div className="mt-4">
              <InstructorMaterialRepository instructorId={instructor.id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;

// DONE