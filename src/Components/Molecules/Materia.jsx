// src/components/Materia.js
import React, { useState } from "react";

const Materia = ({ materia, onChangeMateria }) => {
  const [materiaData, setMateriaData] = useState(materia);

  const handleMateriaChange = (e) => {
    setMateriaData({
      ...materiaData,
      [e.target.name]: e.target.value,
    });
    onChangeMateria(materiaData);
  };

  const handleAddProfesor = () => {
    setMateriaData({
      ...materiaData,
      profesores: [...materiaData.profesores, ""],
    });
  };

  const handleProfesorChange = (index, value) => {
    const newProfesores = [...materiaData.profesores];
    newProfesores[index] = value;
    setMateriaData({
      ...materiaData,
      profesores: newProfesores,
    });
  };

  return (
    <div className="flex flex-col space-y-2 p-4 bg-white rounded-lg shadow-md">
      <input
        className="p-2 border border-gray-300 rounded"
        type="text"
        name="nombre"
        value={materiaData.nombre}
        onChange={handleMateriaChange}
        placeholder="Nombre de la materia"
      />
      <div>
        {materiaData.profesores.map((profesor, index) => (
          <input
            key={index}
            className="p-2 border border-gray-300 rounded mt-2"
            type="text"
            value={profesor}
            onChange={(e) => handleProfesorChange(index, e.target.value)}
            placeholder="Nombre del profesor"
          />
        ))}
        <button
          className="mt-2 text-sm text-blue-600"
          onClick={handleAddProfesor}
        >
          Agregar profesor
        </button>
      </div>
    </div>
  );
};

export default Materia;
