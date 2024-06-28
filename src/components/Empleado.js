import React, { useEffect, useState } from "react";
import axios from "axios";
import './Empleado.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Empleado = ({ setView }) => {
  const url = 'http://localhost:3000/empleados';

  const [empleados, setEmpleados] = useState([]);
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [fechaIngreso, setFechaIngreso] = useState('');
  const [dni, setDni] = useState('');
  const [id, setId] = useState('');
  const [titulo, setTitulo] = useState('Añadir Empleado');

  useEffect(() => {
    getEmpleados();
  }, []);

  const getEmpleados = async () => {
    try {
      const response = await axios.get(url);
      setEmpleados(response.data);
    } catch (error) {
      console.error("Error fetching empleados:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const empleado = {
      nombres,
      apellidos,
      correo,
      telefono,
      direccion,
      fechaNacimiento,
      fechaIngreso,
      dni
    };
    try {
      if (id) {
        await axios.put(`${url}/${id}`, empleado);
      } else {
        const res = await axios.post(url, empleado);
        console.log(res);
      }
      getEmpleados();
      clearForm();
    } catch (error) {
      console.error("Error saving empleado:", error);
    }
  };

  const handleEdit = (empleado) => {
    setId(empleado.id);
    setNombres(empleado.nombres);
    setApellidos(empleado.apellidos);
    setCorreo(empleado.correo);
    setTelefono(empleado.telefono);
    setDireccion(empleado.direccion);
    setFechaNacimiento(empleado.fechaNacimiento);
    setFechaIngreso(empleado.fechaIngreso);
    setDni(empleado.dni);
    setTitulo('Editar Empleado');
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url}/${id}`);
      getEmpleados();
    } catch (error) {
      console.error("Error deleting empleado:", error);
    }
  };

  const clearForm = () => {
    setId('');
    setNombres('');
    setApellidos('');
    setCorreo('');
    setTelefono('');
    setDireccion('');
    setFechaNacimiento('');
    setFechaIngreso('');
    setDni('');
    setTitulo('Añadir Empleado');
  };

  const handleReturnToMenu = () => {
    setView('menu');
  };

  return (
    <div className="Empleado">
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-md-4 offset-md-4">
            <div className="d-grid mx-auto">
              <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalEmpleado">
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
                  <th>DNI</th>
                  <th>Nombres</th>
                  <th>Apellidos</th>
                  <th>Correo</th>
                  <th>Teléfono</th>
                  <th>Dirección</th>
                  <th>Fecha de Nacimiento</th>
                  <th>Fecha de Ingreso</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {empleados.map((empleado) => (
                  <tr key={empleado.id}>
                    <td>{empleado.dni}</td>
                    <td>{empleado.nombres}</td>
                    <td>{empleado.apellidos}</td>
                    <td>{empleado.correo}</td>
                    <td>{empleado.telefono}</td>
                    <td>{empleado.direccion}</td>
                    <td>{empleado.fechaNacimiento}</td>
                    <td>{empleado.fechaIngreso}</td>
                    <td>
                      <button className="btn btn-warning" onClick={() => handleEdit(empleado)}>Editar</button>
                      <button className="btn btn-danger" onClick={() => handleDelete(empleado.id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="modal fade" id="modalEmpleado" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{titulo}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Nombres</label>
                  <input type="text" className="form-control" value={nombres} onChange={(e) => setNombres(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Apellidos</label>
                  <input type="text" className="form-control" value={apellidos} onChange={(e) => setApellidos(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Correo</label>
                  <input type="email" className="form-control" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Teléfono</label>
                  <input type="tel" className="form-control" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Dirección</label>
                  <input type="text" className="form-control" value={direccion} onChange={(e) => setDireccion(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Fecha de Nacimiento</label>
                  <input type="date" className="form-control" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Fecha de Ingreso</label>
                  <input type="date" className="form-control" value={fechaIngreso} onChange={(e) => setFechaIngreso(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>DNI</label>
                  <input type="text" className="form-control" value={dni} onChange={(e) => setDni(e.target.value)} required />
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

      <div className="text-center mt-3">
        <button className="btn btn-secondary" onClick={handleReturnToMenu}>Volver al Menú</button>
      </div>
    </div>
  );
};

export default Empleado;
