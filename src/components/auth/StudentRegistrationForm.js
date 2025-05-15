import React, { useState } from 'react';
import { mockUsers } from '../../mock/users';

const StudentRegistrationForm = ({ onRegister, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    level: 'beginner',
    role: 'student' // Añadimos el campo de rol
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password || !formData.age || !formData.role) {
      setError('Por favor completa todos los campos');
      return;
    }

    // Verificar si el usuario ya existe en mockUsers
    if (mockUsers.some(u => u.email === formData.email)) {
      setError('Este email ya está registrado');
      return;
    }

    // Simular registro (no persistente en mockUsers)
    const newUser = {
      id: Date.now(),
      ...formData
    };
    
    // En un caso real, aquí se agregaría a la base de datos
    // Para esta simulación, simplemente llamamos onRegister
    onRegister(newUser);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Registro de Usuario</h2>
      
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Nombre</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Edad</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Nivel (Solo para Alumnos)</label>
          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            disabled={formData.role !== 'student'} // Deshabilitar si no es estudiante
          >
            <option value="beginner">Principiante</option>
            <option value="intermediate">Intermedio</option>
            <option value="advanced">Avanzado</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Rol</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="student">Alumno</option>
            <option value="instructor">Instructor/a</option>
            <option value="director">Director/a</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-[#073c26] text-white py-2 rounded-lg hover:bg-green-800 transition-colors mb-4"
        >
          Registrar
        </button>
      </form>

      <div className="text-center text-sm text-gray-600">
        ¿Ya tienes cuenta?{' '}
        <button
          onClick={onSwitchToLogin}
          className="text-[#073c26] hover:text-green-800 font-medium"
        >
          Inicia sesión aquí
        </button>
      </div>
    </div>
  );
};

export default StudentRegistrationForm;