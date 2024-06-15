import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const InscripcionForm = ({ inscripcion, setIsEditing }) => {
  const [formData, setFormData] = useState({
    idEncargado: '',
    idAlumno: '',
    fechaInscripcion: '',
    estado: 'PENDIENTE DE PAGO',
    numeroCuenta: '',
    fechaContrato: '',
    idCurso: '',  
    cedulaEncargado: '', 
    cedulaAlumno: ''     
  });

  const [encargados, setEncargados] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const encargadosResponse = await axios.get('http://localhost:8000/encargados/');
        setEncargados(encargadosResponse.data);

        const alumnosResponse = await axios.get('http://localhost:8000/alumnos/');
        setAlumnos(alumnosResponse.data);

        const cursosResponse = await axios.get('http://localhost:8000/cursos/');
        setCursos(cursosResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (inscripcion) {
      setFormData({
        idEncargado: inscripcion.idEncargado,
        idAlumno: inscripcion.idAlumno,
        fechaInscripcion: inscripcion.fechaInscripcion,
        estado: inscripcion.estado,
        numeroCuenta: inscripcion.numeroCuenta,
        fechaContrato: inscripcion.fechaContrato,
        idCurso: inscripcion.idCurso,
        cedulaEncargado: '',
        cedulaAlumno: ''
      });
    }
  }, [inscripcion]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prevState => ({
      ...prevState,
      [name]: name === 'idEncargado' || name === 'idAlumno' || name === 'idCurso' ? parseInt(value, 10) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      idEncargado: formData.idEncargado ? parseInt(formData.idEncargado, 10) : null,
      idAlumno: formData.idAlumno ? parseInt(formData.idAlumno, 10) : null,
      idCurso: formData.idCurso ? parseInt(formData.idCurso, 10) : null
    };

    try {
      if (inscripcion) {
        await axios.put(`http://localhost:8000/inscripciones/${inscripcion.idInscripcion}`, payload);
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: '¡Inscripción actualizada correctamente!',
        });
      } else {
        await axios.post('http://localhost:8000/inscripciones/', payload);
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: '¡Inscripción realizada correctamente!',
        });
      }

      setIsEditing(false);
    } catch (error) {
      console.error('Error registrando la inscripción:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hubo un error al registrar la inscripción.',
      });
    }
  };

  const buscarEncargadosPorCedula = async () => {
    // Implementación de búsqueda por cédula de encargado
  };

  const buscarAlumnosPorCedula = async () => {
    // Implementación de búsqueda por cédula de alumno
  };

  const handleBuscarEncargado = async () => {
    await buscarEncargadosPorCedula();
  };

  const handleBuscarAlumno = async () => {
    await buscarAlumnosPorCedula();
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="container mt-5">
      <h2>Formulario de Inscripción</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="idEncargado">Encargado:</label>
          <select
            className="form-control"
            id="idEncargado"
            name="idEncargado"
            value={formData.idEncargado}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un encargado</option>
            {encargados.map(encargado => (
              <option key={encargado.idEncargado} value={encargado.idEncargado}>
                {encargado.nombre} {encargado.apellido}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="cedulaEncargado">Buscar Encargado por Cédula:</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="cedulaEncargado"
              name="cedulaEncargado"
              value={formData.cedulaEncargado}
              onChange={handleChange}
            />
            <div className="input-group-append">
              <button className="btn btn-primary" type="button" onClick={handleBuscarEncargado}>Buscar</button>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="idAlumno">Alumno:</label>
          <select
            className="form-control"
            id="idAlumno"
            name="idAlumno"
            value={formData.idAlumno}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un alumno</option>
            {alumnos.map(alumno => (
              <option key={alumno.idAlumno} value={alumno.idAlumno}>
                {alumno.nombre} {alumno.apellido}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="cedulaAlumno">Buscar Alumno por Cédula:</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="cedulaAlumno"
              name="cedulaAlumno"
              value={formData.cedulaAlumno}
              onChange={handleChange}
            />
            <div className="input-group-append">
              <button className="btn btn-primary" type="button" onClick={handleBuscarAlumno}>Buscar</button>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="fechaInscripcion">Fecha de Inscripción:</label>
          <input
            type="date"
            className="form-control"
            id="fechaInscripcion"
            name="fechaInscripcion"
            value={formData.fechaInscripcion}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="estado">Estado:</label>
          <input
            type="text"
            className="form-control"
            id="estado"
            name="estado"
            value={formData.estado}
            readOnly
          />
        </div>

        <div className="form-group">
          <label htmlFor="numeroCuenta">Número de Cuenta:</label>
          <input
            type="text"
            className="form-control"
            id="numeroCuenta"
            name="numeroCuenta"
            value={formData.numeroCuenta}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="fechaContrato">Fecha de Contrato:</label>
          <input
            type="date"
            className="form-control"
            id="fechaContrato"
            name="fechaContrato"
            value={formData.fechaContrato}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="idCurso">Curso:</label>
          <select
            className="form-control"
            id="idCurso"
            name="idCurso"
            value={formData.idCurso}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un curso</option>
            {cursos.map(curso => (
              <option key={curso.idCur} value={curso.idCur}>
                {curso.curso}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-primary mr-2">{inscripcion ? 'Guardar Cambios' : 'Enviar'}</button>
          {inscripcion && (
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default InscripcionForm;
