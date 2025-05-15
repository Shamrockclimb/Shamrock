import React from 'react';

const CalendarFilters = ({ activeFilters, setActiveFilters }) => {
  const filters = [
    { id: 'class', label: 'Clases' },
    { id: 'workshop', label: 'Talleres' },
    { id: 'outing', label: 'Salidas' }
  ];

  const toggleFilter = (filterId) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterId]: !prev[filterId]
    }));
  };

  return (
    <div className="flex space-x-2 mb-4 overflow-x-auto">
      {filters.map(filter => (
        <button
          key={filter.id}
          onClick={() => toggleFilter(filter.id)}
          className={`px-4 py-2 rounded-lg whitespace-nowrap ${activeFilters[filter.id] ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default CalendarFilters;