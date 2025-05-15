import React, { useState } from 'react';

const CreateEventModal = ({ isOpen, onClose, onCreateEvent }) => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'class',
    level: 'beginner',
    date: '',
    time: '',
    duration: '',
    location: '',
    instructor: '',
    maxParticipants: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.type || !formData.level || !formData.date || !formData.time || !formData.duration || !formData.location || !formData.instructor || !formData.maxParticipants) {
      setError('Por favor completa todos los campos');
      return;
    }

    const newEvent = {
      id: Date.now(),
      ...formData,
      duration: parseInt(formData.duration, 10),
      maxParticipants: parseInt(formData.maxParticipants, 10),
      availableSpots: parseInt(formData.maxParticipants, 10) // Inicialmente todos los cupos disponibles
    };

    onCreateEvent(newEvent);
    setFormData({
      title: '',
      type: 'class',
      level: 'beginner',
      date: '',
      time: '',
      duration: '',
      location: '',
      instructor: '',
      maxParticipants: ''
    });
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg overflow-hidden w-full max-w-md">
        <div className="p-4 flex justify-between items-center border-b">
          <h3 className="text-lg font-bold">Crear Nuevo Evento</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4">
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1 text-sm">Título</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 text-sm">Tipo</label>
              <select name="type" value={formData.type} onChange={handleChange} className="w-full p-2 border rounded" required>
                <option value="class">Clase</option>
                <option value="workshop">Taller</option>
                <option value="outing">Salida a roca</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-1 text-sm">Nivel</label>
              <select name="level" value={formData.level} onChange={handleChange} className="w-full p-2 border rounded" required>
                <option value="beginner">Principiante</option>
                <option value="intermediate">Intermedio</option>
                <option value="advanced">Avanzado</option>
                <option value="all">Todos</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-1 text-sm">Fecha</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 text-sm">Hora</label>
              <input type="time" name="time" value={formData.time} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 text-sm">Duración (min)</label>
              <input type="number" name="duration" value={formData.duration} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 text-sm">Lugar</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 text-sm">Instructor</label>
              <input type="text" name="instructor" value={formData.instructor} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 text-sm">Cupos Máximos</label>
              <input type="number" name="maxParticipants" value={formData.maxParticipants} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>
            <button type="submit" className="w-full bg-[#073c26] text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
              Crear Evento
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEventModal;