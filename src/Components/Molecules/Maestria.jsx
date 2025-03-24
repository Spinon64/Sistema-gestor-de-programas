// src/components/Maestria.js
import React, { useState, useEffect } from "react";
import Semestre from "./Semestre";

const Maestria = () => {
  const [maestriaData, setMaestriaData] = useState({
    cuatrimestre1: [],
    cuatrimestre2: [],
  });

  const handleChangeSemestre = (semestre, semestreKey) => {
    setMaestriaData({
      ...maestriaData,
      [semestreKey]: semestre,
    });
  };

  useEffect(() => {
    const savedData = localStorage.getItem("maestriaData");
    if (savedData) {
      setMaestriaData(JSON.parse(savedData));
    }
  }, []);

  const handleSaveData = () => {
    localStorage.setItem("maestriaData", JSON.stringify(maestriaData));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">Maestría en useUse</h1>
      <div className="mt-6">
        <h2 className="text-xl font-bold">Cuatrimestre 1</h2>
        <Semestre
          semestre={maestriaData.cuatrimestre1}
          onChangeSemestre={(semestre) =>
            handleChangeSemestre(semestre, "cuatrimestre1")
          }
          semestreKey="1"
        />
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-bold">Cuatrimestre 2</h2>
        <Semestre
          semestre={maestriaData.cuatrimestre2}
          onChangeSemestre={(semestre) =>
            handleChangeSemestre(semestre, "cuatrimestre2")
          }
          semestreKey="2"
        />
      </div>
      <button
        className="mt-6 bg-green-500 text-white p-2 rounded"
        onClick={handleSaveData}
      >
        Guardar
      </button>
    </div>
  );
};

export default Maestria;
