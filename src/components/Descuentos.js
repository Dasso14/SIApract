import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Descuentos.css";

const Descuentos = ({ setView }) => {
  const urlEmpleados = "http://localhost:3000/empleados";
  const urlDescuentos = "http://localhost:3000/descuentos";

  const [empleados, setEmpleados] = useState([]);
  const [descuentos, setDescuentos] = useState([]);
  const [empleadoId, setEmpleadoId] = useState("");
  const [diasCochera, setDiasCochera] = useState("");
  const [diasComida, setDiasComida] = useState("");
  const [cantidadCongresos, setCantidadCongresos] = useState("");
  const [titulo, setTitulo] = useState("Añadir Descuento");

  useEffect(() => {
    getEmpleados();
    getDescuentos();
  }, []);

  const getEmpleados = async () => {
    try {
      const response = await axios.get(urlEmpleados);
      setEmpleados(response.data);
    } catch (error) {
      console.error("Error fetching empleados:", error);
    }
  };

  const getDescuentos = async () => {
    try {
      const response = await axios.get(urlDescuentos);
      setDescuentos(response.data);
    } catch (error) {
      console.error("Error fetching descuentos:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const montoCochera = parseFloat(diasCochera) * 5;
    const montoComida = parseFloat(diasComida) * 10;
    const montoCongresos = parseFloat(cantidadCongresos) * 30;

    const descuento = {
      empleado_id: empleadoId,
      descripcion: `Descuentos para empleado ${empleadoId}`,
      monto: montoCochera + montoComida + montoCongresos,
      fecha: new Date().toISOString().split("T")[0] // Fecha actual en formato YYYY-MM-DD
    };

    try {
      const res = await axios.post(urlDescuentos, descuento);
      console.log(res);
      getDescuentos();
      clearForm();
      setView('menu');
    } catch (error) {
      console.error("Error saving descuento:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${urlDescuentos}/${id}`);
      getDescuentos();
    } catch (error) {
      console.error("Error deleting descuento:", error);
    }
  };

  const clearForm = () => {
    setEmpleadoId("");
    setDiasCochera("");
    setDiasComida("");
    setCantidadCongresos("");
    setTitulo("Añadir Descuento");
  };

  return (
    <div className="Descuentos">
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-md-4 offset-md-4">
            <div className="d-grid mx-auto">
              <button
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#modalDescuento"
                onClick={clearForm}
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
                {descuentos.map((descuento) => (
                  <tr key={descuento.id}>
                    <td>{descuento.empleado_id}</td>
                    <td>{descuento.descripcion}</td>
                    <td>{descuento.monto}</td>
                    <td>{descuento.fecha}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(descuento.id)}
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

      <div className="modal fade" id="modalDescuento" tabIndex="-1">
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
                    onChange={(e) => setEmpleadoId(e.target.value)}
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
                  <label>Días de Cochera</label>
                  <input
                    type="number"
                    className="form-control"
                    value={diasCochera}
                    onChange={(e) => setDiasCochera(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Días de Comida</label>
                  <input
                    type="number"
                    className="form-control"
                    value={diasComida}
                    onChange={(e) => setDiasComida(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Cantidad de Congresos</label>
                  <input
                    type="number"
                    className="form-control"
                    value={cantidadCongresos}
                    onChange={(e) => setCantidadCongresos(e.target.value)}
                    required
                  />
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

      {/* Botón para regresar al menú */}
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

export default Descuentos;
