import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InscripcionForm from './InscripcionForm'; // Importa el componente InscripcionForm

const InscripcionesList = () => {
  const [inscripciones, setInscripciones] = useState([]);
  const [selectedInscripcion, setSelectedInscripcion] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchInscripciones = async () => {
      try {
        const response = await axios.get('http://localhost:8000/inscripciones/');
        setInscripciones(response.data);
      } catch (error) {
        console.error('Error fetching inscripciones:', error);
      }
    };

    fetchInscripciones();
  }, []);

  const handleEdit = (id) => {
    const inscripcion = inscripciones.find(inscripcion => inscripcion.idInscripcion === id);
    setSelectedInscripcion(inscripcion);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/inscripciones/${id}`);
      setInscripciones(inscripciones.filter(inscripcion => inscripcion.idInscripcion !== id));
    } catch (error) {
      console.error('Error deleting inscripcion:', error);
    }
  };

  const handleImprimirContrato = (id) => {
    const inscripcion = inscripciones.find(inscripcion => inscripcion.idInscripcion === id);
    if (inscripcion) {
      const contratoWindow = window.open('', 'Contrato de Inscripción', 'height=600,width=800');
      if (contratoWindow) {
        contratoWindow.document.write(`<html><head><title>Contrato de Inscripción</title></head><body>`);
        contratoWindow.document.write(`<h2>Contrato de Inscripción</h2>`);
        contratoWindow.document.write(`<p><strong>ID:</strong> ${inscripcion.idInscripcion}</p>`);
        contratoWindow.document.write(`<p><strong>Encargado:</strong> ${inscripcion.encargado.nombre} ${inscripcion.encargado.apellido}</p>`);
        contratoWindow.document.write(`<p><strong>Alumno:</strong> ${inscripcion.alumno.nombre} ${inscripcion.alumno.apellido}</p>`);
        contratoWindow.document.write(`<p><strong>Curso:</strong> ${inscripcion.curso.curso}</p>`);
        contratoWindow.document.write(`<p><strong>Fecha de Inscripción:</strong> ${inscripcion.fechaInscripcion}</p>`);
        contratoWindow.document.write(`<p><strong>Estado:</strong> ${inscripcion.estado}</p>`);
        contratoWindow.document.write(`<p><strong>Número de Cuenta:</strong> ${inscripcion.numeroCuenta}</p>`);
        contratoWindow.document.write(`<p><strong>Fecha de Contrato:</strong> ${inscripcion.fechaContrato}</p>`);
        contratoWindow.document.write(`<p><strong>Matrícula:</strong> ${inscripcion.curso.curMatricula}</p>`);
        contratoWindow.document.write(`<p><strong>Cuota:</strong> ${inscripcion.curso.curCuota}</p>`);
        contratoWindow.document.write(`</body></html>`);
        contratoWindow.document.close();
        contratoWindow.print();
      } else {
        console.error('No se pudo abrir la ventana de impresión.');
      }
    } else {
      console.error('No se encontró la inscripción seleccionada para imprimir.');
    }
  };

  return (
    <div className="container mt-5">
      {isEditing ? (
        <InscripcionForm inscripcion={selectedInscripcion} setIsEditing={setIsEditing} />
      ) : (
        <div>
          <h2>Lista de Inscripciones</h2>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Encargado</th>
                <th>Alumno</th>
                <th>Curso</th>
                <th>Fecha de Inscripción</th>
                <th>Estado</th>
                <th>Número de Cuenta</th>
                <th>Fecha de Contrato</th>
                <th>Matrícula</th>
                <th>Cuota</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {inscripciones.map((inscripcion) => (
                <tr key={inscripcion.idInscripcion}>
                  <td>{inscripcion.idInscripcion}</td>
                  <td>{inscripcion.encargado.nombre} {inscripcion.encargado.apellido}</td>
                  <td>{inscripcion.alumno.nombre} {inscripcion.alumno.apellido}</td>
                  <td>{inscripcion.curso.curso}</td>
                  <td>{inscripcion.fechaInscripcion}</td>
                  <td>{inscripcion.estado}</td>
                  <td>{inscripcion.numeroCuenta}</td>
                  <td>{inscripcion.fechaContrato}</td>
                  <td>{inscripcion.curso.curMatricula}</td>
                  <td>{inscripcion.curso.curCuota}</td>
                  <td>
                    <button className="btn btn-primary" onClick={() => handleEdit(inscripcion.idInscripcion)}>Editar</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(inscripcion.idInscripcion)}>Eliminar</button>
                    <button className="btn btn-success" onClick={() => handleImprimirContrato(inscripcion.idInscripcion)}>Imprimir Contrato</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InscripcionesList;
