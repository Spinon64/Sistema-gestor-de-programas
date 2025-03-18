import React, { useEffect, useState } from "react";
import Title from "../Atoms/Title";
import SemesterBox from "../Organisms/SemesterBox";
import Button from "../Atoms/Button";
import { Link } from "react-router";

const AsignaturesCreation = () => {
  const [programData, setProgramData] = useState(null);
  const [semesters, setSemesters] = useState([]);
  const [isEditing, setIsEditing] = useState(true);

  // Cargar datos de localStorage
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("programData"));
    console.log("Datos recuperados de localStorage:", storedData);

    if (storedData && storedData.numeroPeriodos && storedData.modelo) {
      setProgramData(storedData);

      // Determinar número de periodos
      const periodos =
        storedData.numeroPeriodos === "Unico (Diplomado)"
          ? 1
          : parseInt(storedData.numeroPeriodos, 10) || 0;

      // Crear array de semestres
      const semestresArray = Array.from({ length: periodos }, (_, index) => ({
        id: index + 1,
        label:
          storedData.modelo === "Semestral"
            ? `Semestre ${index + 1}`
            : storedData.modelo === "Cuatrimestral"
            ? `Cuatrimestre ${index + 1}`
            : `Periodo`,
      }));

      setSemesters(semestresArray);
    }
  }, []);

  return (
    <form className="flex flex-col items-center max-w-full px-6 mt-10 md:mt-10 lg:px-8 md:mx-10 lg:mt-10">
      <div className="flex flex-col md:flex-row w-full justify-between">
        <Title level="h1" className="mb-5 self-start md:text-start md:mx-3">
          {programData ? programData.nombrePrograma : "Cargando..."}
        </Title>
        <div className="flex flex-row items-center gap-5">
          <Button
            type="button"
            text={isEditing ? "Guardar" : "Editar"}
            onClick={() => setIsEditing((prev) => !prev)}
            className={`h-[2.5rem] md:w-[12rem] lg:w-[15rem] mt-3 ${
              isEditing
                ? "bg-gray-700 text-white"
                : "border border-black text-white"
            }`}
          />
          {!isEditing && (
            <Link to="/asignaturas">
              <Button
                text="Continuar"
                className="font-normal w-[14rem] h-[2.5rem] text-sm mt-3"
              />
            </Link>
          )}
        </div>
      </div>

      {semesters.map((semestre) => (
        <div key={semestre.id} className="w-full">
          <Title level="h2" className="opacity-75 mb-3 md:ml-[2rem]">
            {semestre.label}
          </Title>
          <SemesterBox semesterId={semestre.id} isEditing={isEditing} />
        </div>
      ))}
    </form>
  );
};

export default AsignaturesCreation;
