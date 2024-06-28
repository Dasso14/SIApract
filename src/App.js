import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './views/Login/Login';
import Register from './views/Register/Register';
import Menu from './views/Menu/Menu';
import Empleado from './components/Empleado'
import Salario from './components/Salario';
import Descuentos from './components/Descuentos';
import Aportaciones from './components/Aportaciones';
import Boleta from './components/Boleta';

function App() {

  const [view, setView] = useState('login'); // Estado para controlar la vista actual

  const handleLogout = () => {
    setView('login'); // Cambia la vista a 'login' al hacer clic en SALIR
  };


  const handleLogin = (email, password) => {
    const predefinedEmail = 'ad@1';
    const predefinedPassword = '123';

    if (email === predefinedEmail && password === predefinedPassword) {

      setView('menu'); // Cambia la vista a 'menu' después de iniciar sesión correctamente

    } else {
      alert('Invalid email or password');
    }
  };


  const handleRegister = (email, password) => {
    console.log('Register Email:', email);
    console.log('Register Password:', password);
    setView('menu'); // Cambia la vista a 'menu' después de registrarse correctamente
  };

  const handleSwitchToLogin = () => {
    setView('login'); // Cambia la vista a 'login' para mostrar el formulario de inicio de sesión
  };

  return (
    <div className="App">
      {view === 'login' && <Login onLogin={handleLogin} switchToRegister={() => setView('register')} />}
      {view === 'register' && <Register onRegister={handleRegister} switchToLogin={handleSwitchToLogin} />}
      {view === 'menu' && <Menu setView={setView} />} 
      {view === 'empleado' && <Empleado setView={setView}/>}
      {view === 'salario' && <Salario setView={setView}/>}
      {view === 'descuentos' && <Descuentos setView={setView}/>}
      {view === 'aportaciones' && <Aportaciones setView={setView}/>}
      {view === 'boleta' && <Boleta setView={setView}/>}
    </div>

  );
}

export default App;
