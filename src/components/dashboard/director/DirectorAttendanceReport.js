import React from 'react';
import { mockAttendance } from '../../../mock/attendance';
import { mockUsers } from '../../../mock/users';
import { events } from '../../../mock/events';

const DirectorAttendanceReport = () => {
  const studentAttendance = mockAttendance.filter(att => att.role === 'student');
  const instructorAttendance = mockAttendance.filter(att => att.role === 'instructor');

  const getEventTitle = (eventId) => {
    const event = events.find(e => e.id === eventId);
    return event ? event.title : 'Evento desconocido';
  };

  const getUserName = (userId) => {
    const user = mockUsers.find(u => u.id === userId);
    return user ? user.name : 'Usuario desconocido';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Reporte de Asistencia</h3>

      <div className="mb-8">
        <h4 className="font-medium text-gray-700 mb-3">Asistencia de Alumnos</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alumno</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Evento</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {studentAttendance.map((att, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{getUserName(att.userId)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{att.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getEventTitle(att.eventId)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h4 className="font-medium text-gray-700 mb-3">Asistencia de Instructores (para pago)</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Instructor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Evento</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Horas Trabajadas</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {instructorAttendance.map((att, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{getUserName(att.userId)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{att.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getEventTitle(att.eventId)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{att.hours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DirectorAttendanceReport;