import React from 'react';

const Contrato = ({ formData }) => {
  return (
    <div className="contrato">
      <h2>Contrato de Inscripción</h2>
      <p><strong>Encargado:</strong> {formData.idEncargado}</p>
      <p><strong>Alumno:</strong> {formData.idAlumno}</p>
      <p><strong>Fecha de Inscripción:</strong> {formData.fechaInscripcion}</p>
      <p><strong>Estado:</strong> {formData.estado}</p>
      <p><strong>Número de Cuenta:</strong> {formData.numeroCuenta}</p>
      <p><strong>Fecha de Contrato:</strong> {formData.fechaContrato}</p>
      <p><strong>Curso:</strong> {formData.idCurso}</p>
    </div>
  );
};

export default Contrato;
