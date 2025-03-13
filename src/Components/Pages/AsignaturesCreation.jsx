import React, { useEffect, useState } from "react";
import Title from "../Atoms/Title";
import SemesterBox from "../Organisms/SemesterBox";

const AsignaturesCreation = () => {
  const [programData, setProgramData] = useState(null);
  const [semesters, setSemesters] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("programData"));
    console.log("Datos recuperados de localStorage:", storedData);

    if (storedData && storedData.numeroPeriodos && storedData.modelo) {
      setProgramData(storedData);

      // Convertir numeroPeriodos en un número
      const periodos = parseInt(storedData.numeroPeriodos, 10) || 0;

      // Crear un array con los nombres adecuados (Semestre 1, Semestre 2, etc.)
      const semestresArray = Array.from({ length: periodos }, (_, index) => {
        return {
          id: index + 1,
          label:
            storedData.modelo === "Semestral"
              ? `Semestre ${index + 1}`
              : `Cuatrimestre ${index + 1}`,
        };
      });

      setSemesters(semestresArray);
    }
  }, []);

  return (
    <div className=" flex flex-col items-center  max-w-full px-6  mt-10 md:mt-10 lg:px-8 md:mx-10 lg:mt-10">
      {/* Título del programa */}
      <Title level="h1" className="mb-5 self-start md:text-start  md:mx-3 ">
        {programData ? programData.nombrePrograma : "Cargando..."}
      </Title>

      {/* Renderiza SemesterBox según el número de periodos */}
      {semesters.length > 0 ? (
        semesters.map((semestre) => (
          <div key={semestre.id} className="w-full">
            <Title level="h2" className="opacity-75 mb-3  md:ml-[2rem]">
              {semestre.label}
            </Title>
            <SemesterBox />
          </div>
        ))
      ) : (
        <p className="text-gray-500">Cargando periodos...</p>
      )}
    </div>
  );
};

export default AsignaturesCreation;
