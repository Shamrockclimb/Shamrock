import React, { useState } from 'react';

const InstructorMaterialRepository = ({ instructorId }) => {
  const [materials, setMaterials] = useState([
    // Datos simulados de materiales
    { id: 1, name: 'Manual de Nudos Básicos', type: 'PDF', url: '#', instructorId: 2 },
    { id: 2, name: 'Guía de Técnica de Pies', type: 'PDF', url: '#', instructorId: 2 },
    { id: 3, name: 'Video: Cómo dar seguro', type: 'Video', url: '#', instructorId: 2 },
  ]);
  const [newMaterial, setNewMaterial] = useState({ name: '', type: 'PDF', url: '' });
  const [showAddForm, setShowAddForm] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMaterial(prev => ({ ...prev, [name]: value }));
  };

  const handleAddMaterial = (e) => {
    e.preventDefault();
    if (!newMaterial.name || !newMaterial.url) {
      alert('Por favor completa todos los campos');
      return;
    }
    const materialToAdd = {
      id: Date.now(),
      ...newMaterial,
      instructorId: instructorId // Asignar al instructor actual
    };
    setMaterials([...materials, materialToAdd]);
    setNewMaterial({ name: '', type: 'PDF', url: '' });
    setShowAddForm(false);
  };

  // Filtrar materiales por instructor (simulado)
  const instructorMaterials = materials.filter(mat => mat.instructorId === instructorId);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Repositorio de Materiales</h3>

      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className="mb-4 text-sm bg-[#073c26] text-white px-3 py-1 rounded-lg hover:bg-green-800 transition-colors"
      >
        {showAddForm ? 'Ocultar Formulario' : '+ Agregar Nuevo Material'}
      </button>

      {showAddForm && (
        <form onSubmit={handleAddMaterial} className="mb-6 p-4 border rounded-lg space-y-3">
          <div>
            <label className="block text-gray-700 mb-1 text-sm">Nombre del Material</label>
            <input type="text" name="name" value={newMaterial.name} onChange={handleInputChange} className="w-full p-2 border rounded" required />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 text-sm">Tipo</label>
            <select name="type" value={newMaterial.type} onChange={handleInputChange} className="w-full p-2 border rounded" required>
              <option value="PDF">PDF</option>
              <option value="Video">Video</option>
              <option value="Image">Imagen</option>
              <option value="Other">Otro</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-1 text-sm">URL o Enlace</label>
            <input type="text" name="url" value={newMaterial.url} onChange={handleInputChange} className="w-full p-2 border rounded" required />
          </div>
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
            Subir Material
          </button>
        </form>
      )}

      {instructorMaterials.length === 0 ? (
        <p className="text-gray-600">No has subido materiales aún.</p>
      ) : (
        <div className="space-y-3">
          {instructorMaterials.map(material => (
            <div key={material.id} className="p-3 border rounded-lg flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-800">{material.name}</p>
                <p className="text-sm text-gray-600">{material.type}</p>
              </div>
              <a href={material.url} target="_blank" rel="noopener noreferrer" className="text-[#073c26] hover:text-green-800 text-sm">
                Ver Material
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InstructorMaterialRepository;