import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const RegistroCurso = () => {
  const [formData, setFormData] = useState({
    curNivel: '',
    curCiclo: '',
    curso: '',
    curTurno: '',
    curMatricula: '',
    curAño: '',
    curCuota: '',
    curEspeci: '',
  });

  const [cursos, setCursos] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await axios.get('http://192.168.7.175:8000/cursos/');
        console.log(response.data); // Verificar datos
        setCursos(response.data);
      } catch (error) {
        console.error('Error fetching cursos:', error);
      }
    };

    fetchCursos();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { curso, curTurno, curMatricula } = formData;
    if (curso === '' || curTurno === '' || curMatricula === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, completa todos los campos obligatorios.',
      });
      return;
    }

    try {
      if (editingId) {
        await axios.put(`http://192.168.7.175:8000/cursos/${editingId}`, formData);
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: '¡Curso editado correctamente!',
        });
      } else {
        await axios.post('http://192.168.7.175:8000/cursos/', formData);
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: '¡Curso agregado correctamente!',
        });
      }

      const response = await axios.get('http://192.168.7.175:8000/cursos/');
      setCursos(response.data);

      setFormData({
        curNivel: '',
        curCiclo: '',
        curso: '',
        curTurno: '',
        curMatricula: '',
        curAño: '',
        curCuota: '',
        curEspeci: '',
      });
      setEditingId(null);
    } catch (error) {
      console.error('Error registrando/editando el curso', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hubo un error al registrar/editar el curso.',
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
          await axios.delete(`http://192.168.7.175:8000/cursos/${id}`);
          Swal.fire('¡Eliminado!', 'El curso ha sido eliminado.', 'success');

          const response = await axios.get('http://192.168.7.175:8000/cursos/');
          setCursos(response.data);
        } catch (error) {
          console.error('Error eliminando el curso', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hubo un error al eliminar el curso.',
          });
        }
      }
    });
  };

  const handleEdit = (curso) => {
    console.log('Editando curso:', curso); // Verifica los datos del curso que se están editando
    setFormData({
      curNivel: curso.curNivel || '',
      curCiclo: curso.curCiclo || '',
      curso: curso.curso || '',
      curTurno: curso.curTurno || '',
      curMatricula: curso.curMatricula || '',
      curAño: curso.curAño || '',
      curCuota: curso.curCuota || '',
      curEspeci: curso.curEspeci || '',
    });
    setEditingId(curso.idCur);
  };

  const handleCancel = () => {
    setFormData({
      curNivel: '',
      curCiclo: '',
      curso: '',
      curTurno: '',
      curMatricula: '',
      curAño: '',
      curCuota: '',
      curEspeci: '',
    });
    setEditingId(null);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = cursos.filter((curso) =>
      curso.curso.toLowerCase().includes(searchTerm) || curso.curNivel.toLowerCase().includes(searchTerm)
    );
    setCursos(filtered);
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="curNivel">Nivel:</label>
          <input
            type="text"
            className="form-control"
            id="curNivel"
            name="curNivel"
            value={formData.curNivel}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="curCiclo">Ciclo:</label>
          <input
            type="text"
            className="form-control"
            id="curCiclo"
            name="curCiclo"
            value={formData.curCiclo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="curso">Curso:</label>
          <input
            type="text"
            className="form-control"
            id="curso"
            name="curso"
            value={formData.curso}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="curTurno">Turno:</label>
          <input
            type="text"
            className="form-control"
            id="curTurno"
            name="curTurno"
            value={formData.curTurno}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="curMatricula">Matrícula:</label>
          <input
            type="number"
            className="form-control"
            id="curMatricula"
            name="curMatricula"
            value={formData.curMatricula}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="curAño">Año:</label>
          <input
            type="number"
            className="form-control"
            id="curAño"
            name="curAño"
            value={formData.curAño}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="curCuota">Cuota:</label>
          <input
            type="number"
            className="form-control"
            id="curCuota"
            name="curCuota"
            value={formData.curCuota}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="curEspeci">Especialidades:</label>
          <input
            type="text"
            className="form-control"
            id="curEspeci"
            name="curEspeci"
            value={formData.curEspeci}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          {editingId ? 'Actualizar' : 'Registrar'}
        </button>
        {editingId && (
          <button type="button" className="btn btn-secondary mt-3 ml-3" onClick={handleCancel}>
            Cancelar
          </button>
        )}
      </form>
      <div className="row mt-5">
        <div className="col">
          <h2>Lista de Cursos</h2>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Buscar por nivel o curso"
            onChange={handleSearch}
          />
          <table className="table mt-3">
            <thead>
              <tr>
                <th>Nivel</th>
                <th>Ciclo</th>
                <th>Curso</th>
                <th>Turno</th>
                <th>Matrícula</th>
                <th>Año</th>
                <th>Cuota</th>
                <th>Especialidades</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cursos.map((curso) => (
                <tr key={curso.idCur}>
                  <td>{curso.curNivel}</td>
                  <td>{curso.curCiclo}</td>
                  <td>{curso.curso}</td>
                  <td>{curso.curTurno}</td>
                  <td>{curso.curMatricula}</td>
                  <td>{curso.curAño}</td>
                  <td>{curso.curCuota}</td>
                  <td>{curso.curEspeci}</td>
                  <td>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(curso)}>
                      Editar
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(curso.idCur)}>
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

export default RegistroCurso;
