import React, { useEffect, useState } from "react";
import axios from "axios";
import './Salario.css';

const Salario = ({ setView }) => {

  const urlEmpleados = 'http://localhost:3000/empleados'; // URL del servidor de la API para empleados
  const urlSalarios = 'http://localhost:3000/salarios'; // URL del servidor de la API para salarios

  const [salarios, setSalarios] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [empleadoId, setEmpleadoId] = useState('');
  const [salarioBase, setSalarioBase] = useState('');
  const [horasExtras, setHorasExtras] = useState('');
  const [trabajoDiaFestivo, setTrabajoDiaFestivo] = useState('');
  const [familiar, setFamiliar] = useState('');
  const [fecha, setFecha] = useState('');
  const [id, setId] = useState('');
  const [titulo, setTitulo] = useState('Añadir Salario');

  useEffect(() => {
    getEmpleados();
    getSalarios();
  }, []);

  const getEmpleados = async () => {
    try {
      const respuesta = await axios.get(urlEmpleados);
      setEmpleados(respuesta.data);
    } catch (error) {
      console.error("Error fetching empleados:", error);
    }
  };

  const getSalarios = async () => {
    try {
      const respuesta = await axios.get(urlSalarios);
      setSalarios(respuesta.data);
    } catch (error) {
      console.error("Error fetching salarios:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const salario = {
      empleado_id: empleadoId,
      salario_base: salarioBase,
      horas_extras: horasExtras,
      trabajo_dia_festivo: trabajoDiaFestivo,
      familiar: familiar,
      fecha: fecha
    };
    try {
      if (id) {
        // Editar salario existente
        await axios.put(`${urlSalarios}/${id}`, salario);
      } else {
        // Añadir nuevo salario
        const rest = await axios.post(urlSalarios, salario);
        console.log(rest);
      }
      getSalarios();
      clearForm();
    } catch (error) {
      console.error("Error saving salario:", error);
    }
  };

  const handleEdit = (salario) => {
    setId(salario.id);
    setEmpleadoId(salario.empleado_id);
    setSalarioBase(salario.salario_base);
    setHorasExtras(salario.horas_extras);
    setTrabajoDiaFestivo(salario.trabajo_dia_festivo);
    setFamiliar(salario.familiar);
    setFecha(salario.fecha);
    setTitulo('Editar Salario');
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${urlSalarios}/${id}`);
      getSalarios();
    } catch (error) {
      console.error("Error deleting salario:", error);
    }
  };

  const clearForm = () => {
    setId('');
    setEmpleadoId('');
    setSalarioBase('');
    setHorasExtras('');
    setTrabajoDiaFestivo('');
    setFamiliar('');
    setFecha('');
    setTitulo('Añadir Salario');
  };

  return (
    <div className="Salario">
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-md-4 offset-md-4">
            <div className="d-grid mx-auto">
              <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalSalario" onClick={clearForm}>
                <i className="fa-solid fa-circle-plus"></i> {titulo}
              </button>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-8 offset-md-2">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Empleado</th>
                  <th>Salario Base</th>
                  <th>Horas Extras</th>
                  <th>Trabajo en Día Festivo</th>
                  <th>Familiar</th>
                  <th>Fecha</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {salarios.map((salario) => (
                  <tr key={salario.id}>
                    <td>{`${salario.nombres} ${salario.apellidos}`}</td>
                    <td>{salario.salario_base}</td>
                    <td>{salario.horas_extras}</td>
                    <td>{salario.trabajo_dia_festivo}</td>
                    <td>{salario.familiar}</td>
                    <td>{salario.fecha}</td>
                    <td>
                      <button className="btn btn-warning" onClick={() => handleEdit(salario)}>Editar</button>
                      <button className="btn btn-danger" onClick={() => handleDelete(salario.id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-4 offset-md-4 text-center">
          <button className="btn btn-secondary" onClick={() => setView('menu')}>
            Volver al Menú
          </button>
        </div>
      </div>

      <div className="modal fade" id="modalSalario" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{titulo}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Empleado</label>
                  <select className="form-control" value={empleadoId} onChange={(e) => setEmpleadoId(e.target.value)} required>
                    <option value="">Selecciona un empleado</option>
                    {empleados.map((empleado) => (
                      <option key={empleado.id} value={empleado.id}>{`${empleado.nombres} ${empleado.apellidos}`}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Salario Base</label>
                  <input type="number" className="form-control" value={salarioBase} onChange={(e) => setSalarioBase(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Horas Extras</label>
                  <input type="number" className="form-control" value={horasExtras} onChange={(e) => setHorasExtras(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Trabajo en Día Festivo</label>
                  <input type="number" className="form-control" value={trabajoDiaFestivo} onChange={(e) => setTrabajoDiaFestivo(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Familiar</label>
                  <input type="number" className="form-control" value={familiar} onChange={(e) => setFamiliar(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Fecha</label>
                  <input type="date" className="form-control" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Guardar</button>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={clearForm}>Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Salario;
