import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Boleta.css';

const Boleta = ({ empleadoId, setView }) => {
  const [empleado, setEmpleado] = useState(null);
  const [descuentos, setDescuentos] = useState([]);
  const [aportaciones, setAportaciones] = useState([]);
  const [salario, setSalario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!empleadoId) {
        setLoading(false);
        return; // No hacer la solicitud si el ID del empleado no está definido
      }

      const urlEmpleados = `http://localhost:3000/empleados/${empleadoId}`;
      const urlDescuentos = `http://localhost:3000/descuentos/empleado/${empleadoId}`;
      const urlAportaciones = `http://localhost:3000/aportaciones/empleado/${empleadoId}`;
      const urlSalario = `http://localhost:3000/salarios/empleado/${empleadoId}`;

      try {
        const responseEmpleado = await axios.get(urlEmpleados);
        const responseDescuentos = await axios.get(urlDescuentos);
        const responseAportaciones = await axios.get(urlAportaciones);
        const responseSalario = await axios.get(urlSalario);

        setEmpleado(responseEmpleado.data);
        setDescuentos(responseDescuentos.data);
        setAportaciones(responseAportaciones.data);
        setSalario(responseSalario.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [empleadoId]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!empleado || !salario) {
    return <div>No se pudo cargar la boleta de pago.</div>;
  }

  // Calcular totales de descuentos y aportaciones
  const totalDescuentos = descuentos.reduce((total, descuento) => {
    return total + descuento.monto; // Ajustar según la estructura real de descuentos
  }, 0);

  const totalAportaciones = aportaciones.reduce((total, aportacion) => {
    return total + aportacion.monto; // Ajustar según la estructura real de aportaciones
  }, 0);

  // Calcular salario neto
  const salarioNeto = salario.salario_base - totalDescuentos + totalAportaciones;

  return (
    <div className="boleta-container">
      <h1>Boleta de Pago</h1>
      <div className="empleado-info">
        <h2>Información del Empleado</h2>
        <p><strong>Nombres:</strong> {empleado.nombres}</p>
        <p><strong>Apellidos:</strong> {empleado.apellidos}</p>
        <p><strong>DNI:</strong> {empleado.dni}</p>
        <p><strong>Cargo:</strong> {empleado.cargo}</p>
      </div>
      <div className="salario-info">
        <h2>Información Salarial</h2>
        <p><strong>Salario Base:</strong> S/ {salario.salario_base.toFixed(2)}</p>
        <p><strong>Total Descuentos:</strong> S/ {totalDescuentos.toFixed(2)}</p>
        <p><strong>Total Aportaciones:</strong> S/ {totalAportaciones.toFixed(2)}</p>
        <p><strong>Salario Neto:</strong> S/ {salarioNeto.toFixed(2)}</p>
      </div>
      <div className="row mt-3">
        <div className="text-center mt-3">
          <button className="btn btn-secondary" onClick={() => setView('menu')}>
            Volver al Menú
          </button>
        </div>
      </div>
    </div>
  );
};

export default Boleta;
