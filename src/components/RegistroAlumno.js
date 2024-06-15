import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const RegistroAlumno = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    numeroContactoUno: '',
    numeroContactoDos: '',
    fechaNacimiento: '',
    estado: '',
    nombreContactoDos: '',
    cedula: '',
    email: '',
    direccion: '',
  });

  const [alumnos, setAlumnos] = useState([]);
  const [filteredAlumnos, setFilteredAlumnos] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        const response = await axios.get('http://localhost:8000/alumnos/');
        setAlumnos(response.data);
        setFilteredAlumnos(response.data);
      } catch (error) {
        console.error('Error fetching alumnos:', error);
      }
    };

    fetchAlumnos();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nombre, apellido, cedula } = formData;
    if (nombre === '' || apellido === '' || cedula === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, completa todos los campos obligatorios.',
      });
      return;
    }

    try {
      if (editingId) {
        await axios.put(`http://localhost:8000/alumnos/${editingId}`, formData);
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: '¡Alumno editado correctamente!',
        });
      } else {
        await axios.post('http://localhost:8000/alumnos/', formData);
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: '¡Alumno agregado correctamente!',
        });
      }

      const response = await axios.get('http://localhost:8000/alumnos/');
      setAlumnos(response.data);
      setFilteredAlumnos(response.data);

      setFormData({
        nombre: '',
        apellido: '',
        numeroContactoUno: '',
        numeroContactoDos: '',
        fechaNacimiento: '',
        estado: '',
        nombreContactoDos: '',
        cedula: '',
        email: '',
        direccion: '',
      });
      setEditingId(null);
    } catch (error) {
      console.error('Error registrando/editando al alumno', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hubo un error al registrar/editar al alumno.',
      });
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:8000/alumnos/${id}`);
          Swal.fire('¡Eliminado!', 'El alumno ha sido eliminado.', 'success');

          const response = await axios.get('http://localhost:8000/alumnos/');
          setAlumnos(response.data);
          setFilteredAlumnos(response.data);
        } catch (error) {
          console.error('Error eliminando al alumno', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hubo un error al eliminar al alumno.',
          });
        }
      }
    });
  };

  const handleEdit = (alumno) => {
    setFormData(alumno);
    setEditingId(alumno.idAlumno);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = alumnos.filter((alumno) =>
      alumno.nombre.toLowerCase().includes(searchTerm) || alumno.apellido.toLowerCase().includes(searchTerm)
    );
    setFilteredAlumnos(filtered);
  };

  const handleCancel = () => {
    setFormData({
      nombre: '',
      apellido: '',
      numeroContactoUno: '',
      numeroContactoDos: '',
      fechaNacimiento: '',
      estado: '',
      nombreContactoDos: '',
      cedula: '',
      email: '',
      direccion: '',
    });
    setEditingId(null);
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="apellido">Apellido:</label>
          <input
            type="text"
            className="form-control"
            id="apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cedula">Cédula:</label>
          <input
            type="text"
            className="form-control"
            id="cedula"
            name="cedula"
            value={formData.cedula}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="numeroContactoUno">Número de Contacto Uno:</label>
          <input
            type="text"
            className="form-control"
            id="numeroContactoUno"
            name="numeroContactoUno"
            value={formData.numeroContactoUno}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="numeroContactoDos">Número de Contacto Dos:</label>
          <input
            type="text"
            className="form-control"
            id="numeroContactoDos"
            name="numeroContactoDos"
            value={formData.numeroContactoDos}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
          <input
            type="date"
            className="form-control"
            id="fechaNacimiento"
            name="fechaNacimiento"
            value={formData.fechaNacimiento}
            onChange={handleChange}
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
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="nombreContactoDos">Nombre de Contacto Dos:</label>
          <input
            type="text"
            className="form-control"
            id="nombreContactoDos"
            name="nombreContactoDos"
            value={formData.nombreContactoDos}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="direccion">Dirección:</label>
          <input
            type="text"
            className="form-control"
            id="direccion"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
          />
        </div>
        <div className="btn-group mr-2">
          <button type="submit" className="btn btn-primary">
            {editingId ? 'Editar Alumno' : 'Registrar Alumno'}
          </button>
          {editingId && (
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
              Cancelar
            </button>
          )}
        </div>
      </form>
      <div className="row mt-5">
        <div className="col">
          <h2>Lista de Alumnos</h2>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Buscar por nombre o apellido"
            onChange={handleSearch}
          />
          <table className="table mt-3">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Cédula</th>
                <th>Número de Contacto Dos</th>
                <th>Fecha de Nacimiento</th>
                <th>Estado</th>
                <th>Numero de Contacto Uno</th>
                <th>Nombre de Contacto Dos</th>
                <th>Email</th>
                <th>Dirección</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredAlumnos.map((alumno, index) => (
                <tr key={index}>
                  <td>{alumno.nombre}</td>
                  <td>{alumno.apellido}</td>
                  <td>{alumno.cedula}</td>
                  <td>{alumno.numeroContactoUno}</td>
                  <td>{alumno.numeroContactoDos}</td>
                  <td>{alumno.fechaNacimiento}</td>
                  <td>{alumno.estado}</td>
                  <td>{alumno.nombreContactoDos}</td>
                  <td>{alumno.email}</td>
                  <td>{alumno.direccion}</td>
                  <td>
                    <button
                      className="btn btn-danger mr-2"
                      onClick={() => handleDelete(alumno.idAlumno)}
                    >
                      Eliminar
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEdit(alumno)}
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RegistroAlumno;

