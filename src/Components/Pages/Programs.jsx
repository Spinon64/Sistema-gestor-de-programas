import React, { useEffect, useState } from "react";
import Card from "../Molecules/Card.jsx";
import SearchInput from "../Atoms/SearchInput.jsx";
import { fetchPrograms } from "../../../public/api/fakeAPI.js";
import Button from "../Atoms/Button.jsx";
import Title from "../Atoms/Title.jsx";
import { Link } from "react-router-dom";

const Programs = () => {
  const [maestrias, setMaestrias] = useState([]);
  const [diplomados, setDiplomados] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Una sola búsqueda para todo

  useEffect(() => {
    const loadPrograms = async () => {
      const data = await fetchPrograms();
      setMaestrias(data.maestrias);
      setDiplomados(data.diplomados);
    };

    loadPrograms();
  }, []);

  // 🔍 Filtrar tanto maestrías como diplomados con un solo input
  const filteredPrograms = (programs) =>
    programs.filter((program) =>
      program.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="px-8 mx-10 mb-5">
      {/* Barra de búsqueda en la parte superior */}
      <div className="flex md:justify-between flex-col lg:flex-row items-start lg:items-center mb-6">
        <Title level="h1" className="mt-5">
          Programas Académicos
        </Title>
        <div className="flex flex-col items-start lg:flex-row   gap-4 mt-6 ">
          <Link to="/crear-programa">
            <Button text="+ Crear Programa" className="text-sm font-thin" />
          </Link>

          <SearchInput
            value={searchTerm}
            placeholder="Buscar..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Sección de Maestrías */}
      <div className="mb-8">
        <Title level="h2" className="mb-4 underline underline-offset-4">
          Maestrías
        </Title>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7">
          {filteredPrograms(maestrias).length > 0 ? (
            filteredPrograms(maestrias).map((program) => (
              <Card
                key={program.id}
                title={program.title}
                faculty={program.faculty}
                model={program.model}
              />
            ))
          ) : (
            <p className="text-gray-500">No se encontraron maestrías.</p>
          )}
        </div>
      </div>

      {/* Sección de Diplomados */}
      <div>
        <Title level="h2" className="mb-4 underline underline-offset-4">
          Diplomados
        </Title>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
          {filteredPrograms(diplomados).length > 0 ? (
            filteredPrograms(diplomados).map((program) => (
              <Card
                key={program.id}
                title={program.title}
                faculty={program.faculty}
                model={program.model}
              />
            ))
          ) : (
            <p className="text-gray-500">No se encontraron diplomados.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Programs;
