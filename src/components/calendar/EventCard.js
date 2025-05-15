import React from 'react';

const EventCard = ({ event, onBook, isPast }) => {
  const levelColors = {
    beginner: 'bg-blue-100 text-blue-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800',
    all: 'bg-gray-100 text-gray-800'
  };

  const typeIcons = {
    class: '📚',
    workshop: '🛠️',
    outing: '⛰️',
    yoga: '🧘'
  };

  return (
    <div className={`p-4 rounded-lg shadow ${isPast ? 'bg-gray-100' : 'bg-white'}`}>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-lg">{event.title}</h3>
            <p className="text-sm text-gray-600">{event.instructor}</p>
          </div>
          <span className="text-2xl">{typeIcons[event.type] || '📅'}</span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <p className="text-xs text-gray-500">Fecha</p>
            <p className="text-sm font-medium">
              {new Date(event.date).toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' })}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Hora</p>
            <p className="text-sm font-medium">{event.time}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Duración</p>
            <p className="text-sm font-medium">{event.duration} min</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Lugar</p>
            <p className="text-sm font-medium">{event.location}</p>
          </div>
        </div>

        <div className="flex justify-between items-center mt-2">
          <span className={`text-xs px-2 py-1 rounded-full ${levelColors[event.level]}`}>
            {event.level === 'beginner' && 'Principiante'}
            {event.level === 'intermediate' && 'Intermedio'}
            {event.level === 'advanced' && 'Avanzado'}
            {event.level === 'all' && 'Todos los niveles'}
          </span>
          <span className="text-xs text-gray-500">
            {event.availableSpots}/{event.maxParticipants} cupos
          </span>
        </div>

        {!isPast && (
          <div className="mt-3 space-y-2">
            {event.availableSpots > 0 && (
              <button
                onClick={() => onBook(event)}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Reservar
              </button>
            )}

            {event.availableSpots === 0 && (
              <div className="text-center text-sm text-red-600">
                No hay cupos disponibles
              </div>
            )}

            <button
              disabled
              className="w-full bg-gray-300 text-gray-500 py-2 rounded-lg cursor-not-allowed relative group"
            >
              Próximamente: pago con PayPhone
              <div className="opacity-0 group-hover:opacity-100 absolute bottom-full mb-2 w-full bg-gray-700 text-white text-xs rounded py-1 px-2 transition-opacity">
                Podrás pagar directamente desde esta app cuando activemos el sistema de pagos
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;