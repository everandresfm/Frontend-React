import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const RegistroEncargado = () => {
  const initialState = {
    nombre: '',
    apellido: '',
    cedula: '',
    direccion: '',
    email: '',
    relacion: '',
    numeroContactoUno: '',
    numeroContactoDos: '',
    nombreContactoDos: '',
  };

  const [formData, setFormData] = useState(initialState);
  const [encargados, setEncargados] = useState([]);
  const [filteredEncargados, setFilteredEncargados] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchEncargados = async () => {
      try {
        const response = await axios.get('http://192.168.7.175:8000/encargados/');
        setEncargados(response.data);
        setFilteredEncargados(response.data);
      } catch (error) {
        console.error('Error fetching encargados:', error);
      }
    };

    fetchEncargados();
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
        await axios.put(`http://192.168.7.175:8000/encargados/${editingId}`, formData);
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: '¡Encargado editado correctamente!',
        });
      } else {
        await axios.post('http://192.168.7.175:8000/encargados/', formData);
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: '¡Encargado agregado correctamente!',
        });
      }

      const response = await axios.get('http://192.168.7.175:8000/encargados/');
      setEncargados(response.data);
      setFilteredEncargados(response.data);

      setFormData(initialState);
      setEditingId(null);
    } catch (error) {
      console.error('Error registrando/editando al encargado', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hubo un error al registrar/editar al encargado.',
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
          await axios.delete(`http://192.168.7.175:8000/encargados/${id}`);
          Swal.fire('¡Eliminado!', 'El encargado ha sido eliminado.', 'success');

          const response = await axios.get('http://192.168.7.175:8000/encargados/');
          setEncargados(response.data);
          setFilteredEncargados(response.data);
        } catch (error) {
          console.error('Error eliminando al encargado', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hubo un error al eliminar al encargado.',
          });
        }
      }
    });
  };

  const handleEdit = (encargado) => {
    setFormData(encargado);
    setEditingId(encargado.idEncargado);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = encargados.filter((encargado) =>
      encargado.nombre.toLowerCase().includes(searchTerm) || encargado.apellido.toLowerCase().includes(searchTerm)
    );
    setFilteredEncargados(filtered);
  };

  const handleCancel = () => {
    setFormData(initialState);
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
          <label htmlFor="relacion">Relación:</label>
          <input
            type="text"
            className="form-control"
            id="relacion"
            name="relacion"
            value={formData.relacion}
            onChange={handleChange}
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
        <div className="d-grid gap-2 mt-3">
          <button type="submit" className="btn btn-primary">
            {editingId ? 'Editar Encargado' : 'Registrar Encargado'}
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
          <h2>Lista de Encargados</h2>
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
                <th>Dirección</th>
                <th>Email</th>
                <th>Relación</th>
                <th>Número de Contacto Uno</th>
                <th>Número de Contacto Dos</th>
                <th>Nombre de Contacto Dos</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredEncargados.map((encargado, index) => (
                <tr key={index}>
                  <td>{encargado.nombre}</td>
                  <td>{encargado.apellido}</td>
                  <td>{encargado.cedula}</td>
                  <td>{encargado.direccion}</td>
                  <td>{encargado.email}</td>
                  <td>{encargado.relacion}</td>
                  <td>{encargado.numeroContactoUno}</td>
                  <td>{encargado.numeroContactoDos}</td>
                  <td>{encargado.nombreContactoDos}</td>
                  <td>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(encargado)}>
                      Editar
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(encargado.idEncargado)}>
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
  );
};

export default RegistroEncargado;
