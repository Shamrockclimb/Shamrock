import React, { useState } from 'react';

const NotificationsPanel = () => {
  const [notifications] = useState([
    {
      id: 1,
      title: '¡Nuevo taller de seguridad!',
      message: 'Inscríbete al taller de seguridad este sábado a las 10am',
      date: 'Hace 2 horas',
      urgent: true
    },
    {
      id: 2,
      title: 'Cambio en horario',
      message: 'Las clases del miércoles se moverán a las 4pm esta semana',
      date: 'Ayer',
      urgent: false
    },
    {
      id: 3,
      title: 'Mantenimiento programado',
      message: 'El gimnasio estará cerrado el próximo lunes por mantenimiento',
      date: 'Hace 3 días',
      urgent: false
    }
  ]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Notificaciones</h2>
      <div className="space-y-4">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg border ${
              notification.urgent
                ? 'border-red-200 bg-red-50'
                : 'border-gray-200'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-800">{notification.title}</h3>
                <p className="text-sm text-gray-600">{notification.message}</p>
              </div>
              <span className="text-xs text-gray-400">{notification.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPanel;