import React, { useEffect, useState } from "react";
import Box from "../Atoms/Box";
import Title from "../Atoms/Title";
import MinusIcon from "../Atoms/MinusIcon";

const FinishedSemBox = () => {
  const [semesterData, setSemesterData] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("semesterData")) || [];
    setSemesterData(storedData);
    console.log("Datos recuperados en FinishedSemBox:", storedData);
  }, []);

  return (
    <div className="mt-3">
      <Box className="flex flex-col h-auto gap-2 p-4 w-full shadow-lg rounded-lg">
        <div className="flex flex-row justify-around border-b-2 pb-2">
          <Title level="h3">Asignaturas</Title>
          <Title level="h3">Profesores</Title>
        </div>
        {semesterData.length > 0 ? (
          semesterData.map((asignatura) => (
            <div
              key={asignatura.id}
              className="grid grid-cols-2 border-b py-2 gap-5"
            >
              <div className="flex flex-col">
                <span className="text-gray-800">
                  ● {asignatura.asignatureName}
                </span>
                {asignatura.mails.length > 0 && (
                  <span className="text-gray-500 flex underline text-sm cursor-pointer">
                    <MinusIcon />
                    Análisis
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                {asignatura.mails.length > 0 ? (
                  asignatura.mails.map((mail) => (
                    <span key={mail.id} className="text-gray-800 flex  ">
                      {mail.value}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500 italic">Sin profesores</span>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No hay asignaturas registradas</p>
        )}
      </Box>
    </div>
  );
};

export default FinishedSemBox;
