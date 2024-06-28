import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Aportaciones.css";

const Aportaciones = ({ setView }) => {
  const urlEmpleados = "http://localhost:3000/empleados";
  const urlSalarios = "http://localhost:3000/salarios";
  const urlAportaciones = "http://localhost:3000/aportaciones";

  const [empleados, setEmpleados] = useState([]);
  const [salarios, setSalarios] = useState([]);
  const [aportaciones, setAportaciones] = useState([]);
  const [empleadoId, setEmpleadoId] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [afp, setAfp] = useState(false);
  const [onp, setOnp] = useState(false);
  const [seguroSocial, setSeguroSocial] = useState(false);
  const [titulo, setTitulo] = useState("Registrar Aportaciones");
  const [salarioEmpleado, setSalarioEmpleado] = useState(0);

  useEffect(() => {
    getEmpleados();
    getAportaciones();
  }, []);

  const getEmpleados = async () => {
    try {
      const respuesta = await axios.get(urlEmpleados);
      setEmpleados(respuesta.data);
    } catch (error) {
      console.error("Error fetching empleados:", error);
    }
  };

  const getSalarios = async (empleadoId) => {
    try {
      const respuesta = await axios.get(`${urlSalarios}/${empleadoId}`);
      const salario = respuesta.data.salario || 0;
      setSalarios(respuesta.data);
      setSalarioEmpleado(salario);
      setAfp(false);
      setOnp(false);
      setSeguroSocial(false);
    } catch (error) {
      console.error("Error fetching salarios:", error);
    }
  };

  const getAportaciones = async () => {
    try {
      const respuesta = await axios.get(urlAportaciones);
      setAportaciones(respuesta.data);
    } catch (error) {
      console.error("Error fetching aportaciones:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const afpMonto = afp ? salarioEmpleado * 0.10 : 0;
    const onpMonto = onp ? salarioEmpleado * 0.13 : 0;
    const seguroSocialMonto = seguroSocial ? salarioEmpleado * 0.09 : 0;
    const monto = afpMonto + onpMonto + seguroSocialMonto;

    const aportacion = {
      empleado_id: empleadoId,
      descripcion: descripcion, // Aseguramos que la descripción se envíe al servidor
      monto: monto,
      fecha: new Date().toISOString().split('T')[0]
    };

    try {
      const res = await axios.post(urlAportaciones, aportacion);
      console.log(res);
      getAportaciones();
      clearForm();
    } catch (error) {
      console.error("Error saving aportacion:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${urlAportaciones}/${id}`);
      getAportaciones();
    } catch (error) {
      console.error("Error deleting aportacion:", error);
    }
  };

  const clearForm = () => {
    setEmpleadoId("");
    setDescripcion("");
    setAfp(false);
    setOnp(false);
    setSeguroSocial(false);
    setSalarioEmpleado(0);
    setTitulo("Registrar Aportaciones");
  };

  return (
    <div className="Aportaciones">
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-md-4 offset-md-4">
            <div className="d-grid mx-auto">
              <button
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#modalAportaciones"
                onClick={() => setTitulo("Registrar Aportaciones")}
              >
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
                  <th>Descripción</th>
                  <th>Monto</th>
                  <th>Fecha</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {aportaciones.map((aportacion) => (
                  <tr key={aportacion.id}>
                    <td>{aportacion.empleado_id}</td>
                    <td>{aportacion.descripcion}</td> {/* Mostramos la descripción */}
                    <td>{aportacion.monto}</td>
                    <td>{aportacion.fecha}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(aportacion.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="modal fade" id="modalAportaciones" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{titulo}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={clearForm}
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Empleado</label>
                  <select
                    className="form-control"
                    value={empleadoId}
                    onChange={(e) => {
                      setEmpleadoId(e.target.value);
                      getSalarios(e.target.value);
                    }}
                    required
                  >
                    <option value="">Selecciona un empleado</option>
                    {empleados.map((empleado) => (
                      <option key={empleado.id} value={empleado.id}>
                        {`${empleado.nombres} ${empleado.apellidos}`}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Descripción</label>
                  <input
                    type="text"
                    className="form-control"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={afp}
                      onChange={(e) => setAfp(e.target.checked)}
                    />
                    AFP (10% del salario)
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={onp}
                      onChange={(e) => setOnp(e.target.checked)}
                    />
                    ONP (13% del salario)
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={seguroSocial}
                      onChange={(e) => setSeguroSocial(e.target.checked)}
                    />
                    Seguro Social (9% del salario)
                  </label>
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                  Guardar
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={clearForm}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="text-center mt-3">
          <button className="btn btn-secondary" onClick={() => setView("menu")}>
            Volver al Menú
          </button>
        </div>
      </div>
    </div>
  );
};

export default Aportaciones;
