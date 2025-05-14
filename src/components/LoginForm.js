import React, { useState } from 'react';
import { mockUsers } from '../mock/users';

const LoginForm = ({ onLogin, onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError('Por favor completa todos los campos');
      return;
    }

    // Usar mockUsers para simular login
    const user = mockUsers.find(u => u.email === formData.email && u.password === formData.password);

    if (user) {
      onLogin(user);
    } else {
      setError('Email o contraseña incorrectos');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Iniciar Sesión</h2>
      
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
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
        <div className="mb-6">
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
        <button
          type="submit"
          className="w-full bg-[#073c26] text-white py-2 rounded-lg hover:bg-green-800 transition-colors mb-4"
        >
          Ingresar
        </button>
      </form>

      <div className="text-center text-sm text-gray-600">
        ¿No tienes cuenta?{' '}
        <button
          onClick={onSwitchToRegister}
          className="text-[#073c26] hover:text-green-800 font-medium"
        >
          Regístrate aquí
        </button>
      </div>
    </div>
  );
};

export default LoginForm;