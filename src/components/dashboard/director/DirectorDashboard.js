import React, { useState } from 'react';
import DirectorStudentList from './DirectorStudentList';
import DirectorAttendanceReport from './DirectorAttendanceReport';
import DirectorLevelDistribution from './DirectorLevelDistribution';

const DirectorDashboard = ({ director }) => {
  const [activeSubTab, setActiveSubTab] = useState('overview');

  const renderSubContent = () => {
    switch (activeSubTab) {
      case 'overview':
        return (
          <div className="space-y-4">
            <div className="p-4 bg-gray-100 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-2">Administrar Usuarios</h3>
              <p className="text-sm text-gray-600">Gestionar alumnos, instructores y otros directores.</p>
              <button onClick={() => setActiveSubTab('studentList')} className="mt-2 text-sm text-[#073c26] hover:text-green-800">Ver Listado de Alumnos</button>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-2">Administrar Cursos y Eventos</h3>
              <p className="text-sm text-gray-600">Crear, editar y eliminar cursos, clases y salidas.</p>
              <button className="mt-2 text-sm text-[#073c26] hover:text-green-800">Gestionar Actividades</button> {/* Este botón podría redirigir al CalendarView con permisos de edición */}
            </div>
            <div className="p-4 bg-gray-100 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-2">Estadísticas y Reportes</h3>
              <p className="text-sm text-gray-600">Ver métricas de uso, progreso y reservas.</p>
              <button onClick={() => setActiveSubTab('attendanceReport')} className="mt-2 text-sm text-[#073c26] hover:text-green-800">Ver Reporte de Asistencia</button>
              <button onClick={() => setActiveSubTab('levelDistribution')} className="mt-2 ml-4 text-sm text-[#073c26] hover:text-green-800">Ver Distribución por Nivel</button>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-2">Configuración General</h3>
              <p className="text-sm text-gray-600">Ajustar configuraciones de la plataforma.</p>
              <button className="mt-2 text-sm text-[#073c26] hover:text-green-800">Configurar App</button>
            </div>
          </div>
        );
      case 'studentList':
        return <DirectorStudentList />;
      case 'attendanceReport':
        return <DirectorAttendanceReport />;
      case 'levelDistribution':
        return <DirectorLevelDistribution />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Panel de Director</h2>
      <p className="text-gray-700 mb-4">Bienvenido, {director.name}. Tienes acceso completo a la plataforma.</p>

      <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveSubTab('overview')}
          className={`px-4 py-2 rounded-lg whitespace-nowrap ${activeSubTab === 'overview' ? 'bg-[#073c26] text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          General
        </button>
        <button
          onClick={() => setActiveSubTab('studentList')}
          className={`px-4 py-2 rounded-lg whitespace-nowrap ${activeSubTab === 'studentList' ? 'bg-[#073c26] text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Alumnos
        </button>
        <button
          onClick={() => setActiveSubTab('attendanceReport')}
          className={`px-4 py-2 rounded-lg whitespace-nowrap ${activeSubTab === 'attendanceReport' ? 'bg-[#073c26] text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Reportes
        </button>
         <button
          onClick={() => setActiveSubTab('levelDistribution')}
          className={`px-4 py-2 rounded-lg whitespace-nowrap ${activeSubTab === 'levelDistribution' ? 'bg-[#073c26] text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Niveles
        </button>
      </div>

      {renderSubContent()}
    </div>
  );
};

export default DirectorDashboard;

// DONE