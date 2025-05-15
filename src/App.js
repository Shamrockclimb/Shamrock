import React, { useState, useEffect } from 'react';
import ShamrockHeader from './components/common/ShamrockHeader';
import StudentRegistrationForm from './components/auth/StudentRegistrationForm';
import LoginForm from './components/auth/LoginForm';
import CalendarView from './components/calendar/CalendarView';
import StudentDashboard from './components/dashboard/student/StudentDashboard';
import AchievementTracker from './components/dashboard/student/AchievementTracker';
import NotificationsPanel from './components/common/NotificationsPanel';
import TechniqueCatalogView from './components/techniques/TechniqueCatalogView';
import InstructorDashboard from './components/dashboard/instructor/InstructorDashboard';
import DirectorDashboard from './components/dashboard/director/DirectorDashboard';

const App = () => {
  const [currentStudent, setCurrentStudent] = useState(null);
  const [activeTab, setActiveTab] = useState('login');
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentStudent(user);
      // Redirigir según el rol al cargar
      if (user.role === 'student') {
        setActiveTab('dashboard'); // Mantenemos el ID 'dashboard' para la lógica interna
      } else if (user.role === 'instructor') {
        setActiveTab('instructorDashboard');
      } else if (user.role === 'director') {
        setActiveTab('directorDashboard');
      }
    }
  }, []);

  const handleRegister = (studentData) => {
    setCurrentStudent(studentData);
    localStorage.setItem('currentUser', JSON.stringify(studentData));
    setActiveTab('dashboard');
  };

  const handleLogin = (user) => {
    setCurrentStudent(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    // Redirigir según el rol
    if (user.role === 'student') {
      setActiveTab('dashboard'); // Mantenemos el ID 'dashboard' para la lógica interna
    } else if (user.role === 'instructor') {
      setActiveTab('instructorDashboard');
    } else if (user.role === 'director') {
      setActiveTab('directorDashboard');
    }
  };

  const handleLogout = () => {
    setCurrentStudent(null);
    localStorage.removeItem('currentUser');
    setActiveTab('login');
  };

  const renderTabs = () => {
    if (!currentStudent) return null;

    const baseTabs = [
      { id: 'dashboard', label: 'Mi Perfil', roles: ['student'] }, // Cambiamos el label
      { id: 'calendar', label: 'Calendario', roles: ['student', 'instructor', 'director'] },
      { id: 'achievements', label: 'Mis Logros', roles: ['student'] },
      { id: 'techniques', label: 'Catálogo Técnico', roles: ['student'] },
      { id: 'instructorDashboard', label: 'Instructor', roles: ['instructor'] },
      { id: 'directorDashboard', label: 'Director', roles: ['director'] },
    ];

    const availableTabs = baseTabs.filter(tab => tab.roles.includes(currentStudent.role));

    return (
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {availableTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-[#073c26] text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    );
  };

  const renderContent = () => {
    if (!currentStudent) {
      return activeTab === 'login' ? (
        <LoginForm 
          onLogin={handleLogin} 
          onSwitchToRegister={() => setActiveTab('register')} 
        />
      ) : (
        <StudentRegistrationForm 
          onRegister={handleRegister} 
          onSwitchToLogin={() => setActiveTab('login')} 
        />
      );
    }

    switch (activeTab) {
      case 'dashboard': // Mantenemos el caso 'dashboard'
        return currentStudent.role === 'student' ? <StudentDashboard student={currentStudent} /> : null;
      case 'calendar':
        // Permitir acceso al calendario para student, instructor y director
        return ['student', 'instructor', 'director'].includes(currentStudent.role) ? <CalendarView userRole={currentStudent.role} /> : null;
      case 'achievements':
        return currentStudent.role === 'student' ? <AchievementTracker /> : null;
      case 'techniques':
        return currentStudent.role === 'student' ? <TechniqueCatalogView /> : null;
      case 'instructorDashboard':
        return currentStudent.role === 'instructor' ? <InstructorDashboard instructor={currentStudent} /> : null;
      case 'directorDashboard':
        return currentStudent.role === 'director' ? <DirectorDashboard director={currentStudent} /> : null;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ShamrockHeader />
      
      {currentStudent && (
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            {renderTabs()}
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-full bg-gray-200 hover:bg-gray-300"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-10">
                    {/* Aquí podrías agregar un enlace a "Mi Perfil" si fuera necesario */}
                    <NotificationsPanel />
                  </div>
                )}
              </button>
              
              <button
                onClick={handleLogout}
                className="p-2 text-gray-600 hover:text-gray-800"
                title="Cerrar sesión"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>

          {renderContent()}
        </div>
      )}

      {!currentStudent && (
        <div className="max-w-md mx-auto p-4">
          {renderContent()}
        </div>
      )}
    </div>
  );
};

export default App;

// DONE