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
    <main>
      <div className="mb-5 mx-12">
        {/* Barra de búsqueda en la parte superior */}
        <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row justify-between mb-6">
          <Title level="h1" className="mt-5 text-center md:text-left">
            Programas Académicos
          </Title>
          <div className="flex flex-col items-start lg:flex-row gap-3 mt-6 w-max">
            <Link to="/crear-programa">
              <Button className="text-sm font-thin" text="+ Crear Programa" />
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
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-7"> */}
          <div className="mt-6 mx-2 grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-8">
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
          <div className="mt-6 mx-2 grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-8">
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
    </main>
  );
};

export default Programs;
