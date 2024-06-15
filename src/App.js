import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MenuPrincipal from './components/MenuPrincipal';
import Inscripcion from './components/InscripcionForm';
import Administracion from './components/Administracion';
import RegistroAlumno from './components/RegistroAlumno';
import RegistroEncargado from './components/RegistroEncargado';
import RegistroCurso from './components/RegistroCurso';
import InscripcionesList from './components/InscripcionesList'; // Importar el nuevo componente
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Menu Principal</Link>
            </li>
            <li>
              <Link to="/inscripcion">Inscripción</Link>
            </li>
            <li>
              <Link to="/administracion">Administración</Link>
            </li>
            <li>
              <Link to="/registro-alumno">Registro de Alumnos</Link>
            </li>
            <li>
              <Link to="/registro-encargado">Registro de Encargados</Link>
            </li>
            <li>
              <Link to="/registro-curso">Registro de Cursos</Link>
            </li>
            <li>
              <Link to="/inscripciones">Lista de Inscripciones</Link> {/* Añadir enlace */}
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<MenuPrincipal />} />
          <Route path="/inscripcion" element={<Inscripcion />} />
          <Route path="/administracion" element={<Administracion />} />
          <Route path="/registro-alumno" element={<RegistroAlumno />} />
          <Route path="/registro-encargado" element={<RegistroEncargado />} />
          <Route path="/registro-curso" element={<RegistroCurso />} />
          <Route path="/inscripciones" element={<InscripcionesList />} /> {/* Añadir ruta */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
