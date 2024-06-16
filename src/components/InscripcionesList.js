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
        contratoWindow.document.write(`<h2>CONTRATO DE INSCRIPCIÓN</h2>`);
        contratoWindow.document.write(`<p>Entre:</p>`);
        contratoWindow.document.write(`<p><strong>Centro Educativo Paraguay-Brasil (CEPB)</strong>, con domicilio en San Lorenzo, representado por Guillermo Osorio, en adelante "el Colegio".</p>`);
        contratoWindow.document.write(`<p>Y:</p>`);
        contratoWindow.document.write(`<p><strong>${inscripcion.encargado.nombre} ${inscripcion.encargado.apellido}</strong>, con domicilio en ${inscripcion.encargado.direccion}, portador del documento de identidad número ${inscripcion.encargado.cedula ? inscripcion.encargado.cedula : 'N/A'}, en adelante "el Tutor".</p>`);
        contratoWindow.document.write(`<hr>`);
        contratoWindow.document.write(`<p><strong>ACUERDAN:</strong></p>`);
        contratoWindow.document.write(`<p><strong>1. Objeto del Contrato</strong></p>`);
        contratoWindow.document.write(`<p>El presente contrato tiene por objeto establecer los términos y condiciones bajo los cuales el Centro Educativo Paraguay-Brasil (CEPB) acepta la inscripción del estudiante ${inscripcion.alumno.nombre} ${inscripcion.alumno.apellido}, en adelante "el Estudiante", para el año lectivo ${inscripcion.curso.curAño}.</p>`);
        contratoWindow.document.write(`<p><strong>2. Información del Estudiante</strong></p>`);
        contratoWindow.document.write(`<ul>`);
        contratoWindow.document.write(`<li>Nombre completo: ${inscripcion.alumno.nombre} ${inscripcion.alumno.apellido}</li>`);
        contratoWindow.document.write(`<li>Fecha de nacimiento: ${inscripcion.alumno.fechaNacimiento}</li>`);
        contratoWindow.document.write(`<li>Dirección: ${inscripcion.alumno.direccion}</li>`);
        contratoWindow.document.write(`<li>Número de identidad: ${inscripcion.alumno.cedula}</li>`); // Asumo que `numeroContactoUno` es el número de identidad del alumno, cambiar si es incorrecto
        contratoWindow.document.write(`</ul>`);
        contratoWindow.document.write(`<p><strong>3. Servicios Educativos</strong></p>`);
        contratoWindow.document.write(`<p>El Colegio se compromete a proporcionar al Estudiante una educación de calidad conforme al plan de estudios aprobado por las autoridades educativas competentes.</p>`);
        contratoWindow.document.write(`<p><strong>4. Duración del Contrato</strong></p>`);
        contratoWindow.document.write(`<p>El presente contrato tendrá una duración de un año lectivo, comenzando el ${inscripcion.fechaInscripcion} y finalizando el ${inscripcion.fechaContrato}.</p>`); // Cambiar fechas si son incorrectas
        contratoWindow.document.write(`<p><strong>5. Cuotas y Pagos</strong></p>`);
        contratoWindow.document.write(`<ul>`);
        contratoWindow.document.write(`<li>El Tutor se compromete a pagar al Colegio la suma de ${inscripcion.curso.curMatricula} por concepto de matrícula y ${inscripcion.curso.curCuota} por concepto de mensualidades.</li>`);
        contratoWindow.document.write(`<li>Los pagos se realizarán de la siguiente manera: [Especificar modalidad y fechas de pago].</li>`); // Aquí deberías especificar la modalidad y fechas de pago según tus políticas.
        contratoWindow.document.write(`</ul>`);
        contratoWindow.document.write(`<p>El Colegio proporcionará un número de cuenta para la realización de los pagos.</p>`);
        contratoWindow.document.write(`<p><strong>6. Obligaciones del Tutor</strong></p>`);
        contratoWindow.document.write(`<ul>`);
        contratoWindow.document.write(`<li>El Tutor se compromete a cumplir con todas las obligaciones económicas estipuladas en el presente contrato.</li>`);
        contratoWindow.document.write(`<li>El Tutor deberá asegurar la asistencia del Estudiante a las clases y actividades programadas por el Colegio.</li>`);
        contratoWindow.document.write(`<li>El Tutor se compromete a respetar el reglamento interno del Colegio y a fomentar el cumplimiento del mismo por parte del Estudiante.</li>`);
        contratoWindow.document.write(`</ul>`);
        contratoWindow.document.write(`<p><strong>7. Obligaciones del Colegio</strong></p>`);
        contratoWindow.document.write(`<ul>`);
        contratoWindow.document.write(`<li>El Colegio se compromete a proporcionar al Estudiante una educación integral de acuerdo con los planes y programas establecidos.</li>`);
        contratoWindow.document.write(`<li>El Colegio se compromete a mantener informado al Tutor sobre el desempeño académico y comportamental del Estudiante.</li>`);
        contratoWindow.document.write(`</ul>`);
        contratoWindow.document.write(`<p><strong>8. Rescisión del Contrato</strong></p>`);
        contratoWindow.document.write(`<ul>`);
        contratoWindow.document.write(`<li>El contrato podrá ser rescindido por mutuo acuerdo entre las partes.</li>`);
        contratoWindow.document.write(`<li>El Colegio podrá rescindir el contrato en caso de incumplimiento de las obligaciones económicas por parte del Tutor o en caso de comportamiento grave que afecte el ambiente educativo.</li>`);
        contratoWindow.document.write(`<li>El Tutor podrá rescindir el contrato notificando por escrito al Colegio con ${inscripcion.curso.curEspeci} días de antelación.</li>`); // Cambiar días de rescisión si es necesario
        contratoWindow.document.write(`</ul>`);
        contratoWindow.document.write(`<p><strong>9. Cláusulas Adicionales</strong></p>`);
        contratoWindow.document.write(`<ul>`);
        contratoWindow.document.write(`<li>Cualquier modificación al presente contrato deberá ser realizada por escrito y firmada por ambas partes.</li>`);
        contratoWindow.document.write(`<li>En caso de controversia, las partes se someten a la jurisdicción de los tribunales de [Ciudad].</li>`); // Cambiar ciudad si es necesario
        contratoWindow.document.write(`</ul>`);
        contratoWindow.document.write(`<p><strong>10. Firmas</strong></p>`);
        contratoWindow.document.write(`<p>En señal de conformidad, las partes firman el presente contrato en [Ciudad], a los [Día] días del mes de [Mes] del año [Año].</p>`); // Cambiar ciudad y fecha si es necesario
        contratoWindow.document.write(`<br/><br/>`);
        contratoWindow.document.write(`<div style="text-align: center;">`);
        contratoWindow.document.write(`______________________________<br/>`);
        contratoWindow.document.write(`Firma del Representante del Colegio<br/>`);
        contratoWindow.document.write(`${inscripcion.representanteColegio}<br/><br/>`);
        contratoWindow.document.write(`______________________________<br/>`);
        contratoWindow.document.write(`Firma del Tutor<br/>`);
        contratoWindow.document.write(`${inscripcion.encargado.nombre} ${inscripcion.encargado.apellido}<br/>`);
        contratoWindow.document.write(`</div>`);
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

