import React, { useState } from 'react';
import EventCard from './EventCard';
import CalendarFilters from './CalendarFilters';
import CalendarViewToggle from './CalendarViewToggle';
import CreateEventModal from './CreateEventModal';
import { events as initialEvents } from '../mock/events';

const CalendarView = ({ userRole }) => {
  const [view, setView] = useState('grid');
  const [activeFilters, setActiveFilters] = useState({
    class: true,
    workshop: true,
    outing: true
  });
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [currentEvents, setCurrentEvents] = useState(initialEvents); // Usar estado local para eventos

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const filteredEvents = currentEvents.filter(event => 
    activeFilters[event.type]
  ).sort((a, b) => new Date(a.date) - new Date(b.date));

  const handleBook = (event) => {
    setBookingSuccess({
      title: event.title,
      date: event.date,
      time: event.time,
      price: event.type === 'class' ? '25' : event.type === 'workshop' ? '40' : '60'
    });
    // Simular reducción de cupos
    setCurrentEvents(prevEvents => 
      prevEvents.map(e => 
        e.id === event.id ? { ...e, availableSpots: Math.max(0, e.availableSpots - 1) } : e
      )
    );
    setTimeout(() => setBookingSuccess(null), 3000);
  };

  const handleCreateEvent = (newEvent) => {
    setCurrentEvents(prevEvents => [...prevEvents, newEvent]);
  };

  if (bookingSuccess) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-[#073c26]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900">¡Reserva confirmada!</h3>
          <div className="mt-4 space-y-2">
            <p className="text-sm text-gray-500">
              Has reservado para <span className="font-medium">{bookingSuccess.title}</span>
            </p>
            <p className="text-sm text-gray-500">
              Fecha: {new Date(bookingSuccess.date).toLocaleDateString('es-ES')} a las {bookingSuccess.time}
            </p>
            <p className="text-sm text-gray-500">
              Precio: ${bookingSuccess.price} USD
            </p>
          </div>
          
          <div className="mt-6">
            <button
              disabled
              className="w-full max-w-xs mx-auto bg-gray-300 text-gray-500 py-2 rounded-lg cursor-not-allowed mb-2"
            >
              Pagar con PayPhone (próximamente)
            </button>
            <p className="text-xs text-gray-500 mt-2">
              Pronto podrás pagar directamente desde esta app
            </p>
          </div>
          
          <div className="mt-6">
            <button
              onClick={() => setBookingSuccess(null)}
              className="bg-[#073c26] text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Volver al calendario
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <CreateEventModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        onCreateEvent={handleCreateEvent} 
      />

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Calendario</h2>
        <div className="flex items-center space-x-2">
          {(userRole === 'instructor' || userRole === 'director') && (
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-[#073c26] text-white px-3 py-1 rounded-lg text-sm hover:bg-green-700"
            >
              + Crear Evento
            </button>
          )}
          <CalendarViewToggle view={view} setView={setView} />
        </div>
      </div>
      
      <CalendarFilters activeFilters={activeFilters} setActiveFilters={setActiveFilters} />

      {view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredEvents.map(event => {
            const isPast = new Date(event.date) < today;
            return (
              <EventCard
                key={event.id}
                event={event}
                onBook={handleBook}
                isPast={isPast}
              />
            );
          })}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredEvents.map(event => {
            const isPast = new Date(event.date) < today;
            return (
              <div
                key={event.id}
                className={`p-4 rounded-lg border ${isPast ? 'bg-gray-50' : 'bg-white'}`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{event.title}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(event.date).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })} - {event.time}
                    </p>
                  </div>
                  {!isPast && event.availableSpots > 0 && (
                    <button
                      onClick={() => handleBook(event)}
                      className="bg-[#073c26] text-white px-3 py-1 rounded-lg hover:bg-green-700"
                    >
                      Reservar
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CalendarView;