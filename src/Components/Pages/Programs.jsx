import React, { useState, useEffect } from "react";
import Card from "../Molecules/Card.jsx";
import SearchInput from "../Atoms/SearchInput.jsx";
import Button from "../Atoms/Button.jsx";
import Title from "../Atoms/Title.jsx";
import { Link } from "react-router-dom";
import { getBin } from "../../services/jsonBinConfig.js";

const Programs = () => {
  const [maestrias, setMaestrias] = useState([]);
  const [diplomados, setDiplomados] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [datos, setDatos] = useState(null);

  // Obtener datos de programas ya creados
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBin(import.meta.env.VITE_PROGRAM_DATA);
        setDatos(data);
      } catch (error) {
        console.error("Error al obtener datos de JSONBin:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!datos) return;

    const programas = datos.programas || [];

    const maestriasFiltradas = programas.filter(
      (p) => p.tipoProgramas.toLowerCase() === "maestría"
    );

    const diplomadosFiltrados = programas.filter(
      (p) => p.tipoProgramas.toLowerCase() === "diplomado"
    );

    setMaestrias(maestriasFiltradas);
    setDiplomados(diplomadosFiltrados);
  }, [datos]);
  const filteredPrograms = (programs) =>
    programs.filter((program) =>
      program.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <main className="px-4 md:px-12">
      <div className="mb-5">
        {/* Encabezado y barra de búsqueda */}
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <Title level="h1" className="mt-5  md:text-left">
            Programas Académicos
          </Title>
          <div className="flex flex-col items-start md:flex-row gap-3 mt-6">
            <Link to="/crear-programa">
              <Button
                className="!text-xs md:text-sm h-[2.5rem] font-thin w-[16rem]"
                text="Crear Programa"
              />
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
          <div className="mt-9 gap-y-8 md:mx-5 grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] items-stretch ">
            {filteredPrograms(maestrias).length > 0 ? (
              filteredPrograms(maestrias).map((program) => (
                <Card
                  key={program.id}
                  title={program.nombre}
                  faculty={program.tipoDependencia}
                  model={program.tipoPeriodos}
                  to={`/detalles-programa/${program.id}`}
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
          <div className="mt-9 gap-y-8 md:mx-5 grid grid-cols-[repeat(auto-fill,minmax(24rem,1fr))] items-stretch ">
            {filteredPrograms(diplomados).length > 0 ? (
              filteredPrograms(diplomados).map((program) => (
                <Card
                  key={program.id}
                  title={program.nombre}
                  faculty={program.tipoDependencia}
                  model={program.tipoPeriodos}
                  to={`/detalles-programa/${program.id}`}
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
