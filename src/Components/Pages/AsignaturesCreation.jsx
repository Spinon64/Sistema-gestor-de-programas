import React from "react";
import Title from "../Atoms/Title";
import SemesterBox from "../Organisms/SemesterBox";

const AsignaturesCreation = () => {
  return (
    <div className="max-w-full px-6 mt-10 flex flex-col md:mt-10 lg:px-8 md:mx-10 lg:mt-10">
      {/* Título Principal */}
      <Title level="h1" className="mb-5  md:mx-3 text-start">
        Titulo obtenido de Program Creation
      </Title>

      {/* Número de Semestre */}
      <SemesterBox />
    </div>
  );
};

export default AsignaturesCreation;
