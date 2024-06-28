import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Menu.css';
import redPandaImage from '../../assets/red-panda.png';

const Menu = ({ setView }) => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString();

  const handleLogout = () => {
    setView('login'); // Cambia la vista a 'login' al hacer clic en SALIR
  };

  const navigateToEmpleado = () => {
    setView('empleado'); // Cambia la vista a 'empleado' al hacer clic en Ingresar Empleado
  };

  return (
    <div className="menu-container">
      <div className='box-menu'>
        <h1>Menú</h1>
        <div className="options-container">
          <div className="options">
            <h2>OPCIONES</h2>
            <button onClick={() => setView('empleado')}>Ingresar Empleado</button>
            <button onClick={() => setView('salario')}>Salario</button>
            <button onClick={() => setView('descuentos')}>Ingresar Descuentos</button>
            <button onClick={() => setView('aportaciones')}>Aportaciones</button>
            <button onClick={() => setView('boleta')}>Mostrar Boleta</button>
          </div>
          <div className="details">
            <input type="text" value={formattedDate} readOnly />
            <img src={redPandaImage} alt="Red Panda" className="red-panda" />
          </div>
        </div>
        <button className="exit-button" onClick={handleLogout}>SALIR</button>
      </div>
    </div>
  );
};

export default Menu;
