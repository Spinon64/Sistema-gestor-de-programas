import React, { useEffect, useState } from "react";
import Title from "../Atoms/Title";
import SemesterBox from "../Organisms/SemesterBox";
import Button from "../Atoms/Button";
import { Link } from "react-router";

const AsignaturesCreation = () => {
  const [programData, setProgramData] = useState(null);
  const [semesters, setSemesters] = useState([]);
  const [isEditing, setIsEditing] = useState(true); // Estado de edición

  const handleContinue = () => {
    const storedAsignatures =
      JSON.parse(localStorage.getItem("asignatures")) || [];

    // Recorremos cada asignatura para obtener su nombre y correos
    const semesterData = storedAsignatures.map((asignature) => {
      const asignatureName =
        localStorage.getItem(`asignature_${asignature.id}`) || "";
      const mails =
        JSON.parse(localStorage.getItem(`mails_${asignature.id}`)) || [];

      return {
        id: asignature.id,
        asignatureName,
        mails, // [{id: xx, value: "correo"}]
      };
    });

    // Guardamos toda la información en localStorage con la clave "semesterData"
    localStorage.setItem("semesterData", JSON.stringify(semesterData));

    console.log("Datos guardados en localStorage:", semesterData);
  };

  const toggleEditMode = (e) => {
    e.preventDefault(); // 🚨 Evita que el botón recargue la página
    setIsEditing((prev) => !prev); // ✅ Asegurar que cambia el estado correctamente
  };

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
    <form className=" flex flex-col items-center  max-w-full px-6  mt-10 md:mt-10 lg:px-8 md:mx-10 lg:mt-10">
      {/* Título del programa */}
      <div className="flex flex-col md:flex-row w-full justify-between">
        <Title level="h1" className="  mb-5 self-start md:text-start  md:mx-3 ">
          {programData ? programData.nombrePrograma : "Cargando..."}
        </Title>
        <div className="flex flex-row items-center gap-5">
          <Button
            type="button" // ✅ Esto evita que el botón recargue la página
            text={isEditing ? "Guardar" : "Editar"}
            onClick={toggleEditMode}
            className={`h-[2.5rem] md:w-[12rem] lg:w-[15rem] mt-3  ${
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
                onClick={handleContinue}
              />
            </Link>
          )}
        </div>
      </div>

      {/* Renderiza SemesterBox según el número de periodos */}
      {semesters.length > 0 ? (
        semesters.map((semestre) => (
          <div key={semestre.id} className="w-full">
            <Title level="h2" className="opacity-75 mb-3  md:ml-[2rem]">
              {semestre.label}
            </Title>
            <SemesterBox isEditing={isEditing} setIsEditing={setIsEditing} />
          </div>
        ))
      ) : (
        <p className="text-gray-500">Cargando periodos...</p>
      )}
    </form>
  );
};

export default AsignaturesCreation;
