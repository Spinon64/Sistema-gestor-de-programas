// src/components/Semestre.js
import React from "react";
import Materia from "./Materia";

const Semestre = ({ semestre, onChangeSemestre, semestreKey }) => {
  const handleAddMateria = () => {
    const newMateria = { nombre: "", profesores: [""] };
    onChangeSemestre([...semestre, newMateria]);
  };

  const handleMateriaChange = (index, updatedMateria) => {
    const updatedSemestre = semestre.map((materia, i) =>
      i === index ? updatedMateria : materia
    );
    onChangeSemestre(updatedSemestre);
  };

  return (
    <div className="my-4">
      <h3 className="font-bold text-lg">Cuatrimestre {semestreKey}</h3>
      {semestre.map((materia, index) => (
        <Materia
          key={index}
          materia={materia}
          onChangeMateria={(updatedMateria) =>
            handleMateriaChange(index, updatedMateria)
          }
        />
      ))}
      <button
        className="mt-2 bg-blue-500 text-white p-2 rounded"
        onClick={handleAddMateria}
      >
        Agregar nueva asignatura
      </button>
    </div>
  );
};

export default Semestre;
