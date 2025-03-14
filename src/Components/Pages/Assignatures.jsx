import React, { useState, useEffect } from "react";
import Title from "../Atoms/Title";
import FinishedSemBox from "../Organisms/FinishedSemBox";
import Button from "../Atoms/Button";

const Assignatures = () => {
  const [semesters, setSemesters] = useState([]); // Estado con el numero de semestres
  const [programData, setProgramData] = useState(null); // Estado con los datos recuperados del programa

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
    <div className="flex flex-col  items-center  w-auto  mt-10 mb-10 mx-5 md:mt-10 lg:px-8 md:items-center md:mx-10 lg:mt-10">
      <Title level="h1" className="  mb-5 self-center lg:self-start  md:mx-3 ">
        {programData ? programData.nombrePrograma : "Cargando..."}
      </Title>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] gap-8 w-full">
        {semesters.length > 0 ? (
          semesters.map((semestre) => (
            <div key={semestre.id} className="w-auto">
              <div className="flex flex-row gap-4 items-center">
                <Title level="h2" className="opacity-75   md:ml-[2rem]">
                  {semestre.label}
                </Title>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                  />
                </svg>
              </div>

              <FinishedSemBox />
              <Button
                text="Editar Semestre"
                className="w-full mt-4 h-[2.5rem]"
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500">Cargando periodos...</p>
        )}
      </div>
    </div>
  );
};

export default Assignatures;
