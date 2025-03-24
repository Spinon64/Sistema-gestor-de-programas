// src/components/CrearMaestria.js
import React, { useState } from "react";
import { useNavigate } from "react-router"; // Cambiado a useNavigate
import Title from "../Atoms/Title";
import Button from "../Atoms/Button";
import Ejemplo from "../../assets/ejemplo.jpg";
import FileUploadButton from "../Atoms/FileUploadButton";
import Input from "../Molecules/Input";
import Select from "../Molecules/Select";
import data from "../../data/programs.json";

const CrearMaestria = () => {
  const [nombre, setNombre] = useState("");
  const [numPeriodos, setNumPeriodos] = useState(1);
  const [tipoPeriodos, setTipoPeriodos] = useState("semestral");
  const [tipoProgramas, setTipoProgramas] = useState("maestria");
  const [tipoNivel, setTipoNivel] = useState("superior");
  const [tipoDependencia, setTipoDependencia] = useState("teleamatica");
  const [selectedFile, setSelectedFile] = useState(null);

  const navigate = useNavigate(); // Usar useNavigate para la navegación

  // Manejar el cambio de tipo de periodos
  const handleTipoPeriodosChange = (e) => {
    const value = e.target.value;
    setTipoPeriodos(value);
    if (value === "Unico (Diplomado)") {
      setNumPeriodos(1); // Forzamos a 1 período
    }
  };

  // Manejar la carga de archivos
  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleSubmit = () => {
    const maestriaData = {
      id: Date.now(), // Usamos el timestamp actual como ID único
      nombre,
      numPeriodos: parseInt(numPeriodos),
      tipoPeriodos,
      periodos: Array(parseInt(numPeriodos)).fill([]), // Inicializa los semestres con un array vacío
      tipoProgramas,
      tipoNivel,
      tipoDependencia,
    };

    localStorage.setItem("maestria", JSON.stringify(maestriaData));
    if (selectedFile) {
      localStorage.setItem("uploadedFile", selectedFile.name);
    }
    navigate("/gestion-programa"); // Usar navigate para redirigir
  };

  return (
    <div className="mx-auto mt-5 flex w-full max-w-[110rem] flex-1 flex-col px-4 sm:px-6 lg:px-8 lg:mt-20 lg:items-center">
      <div className="mx-10 flex flex-col justify-center">
        <Title level="h1" className="mt-5 mb-10 self-start">
          Crear nueva Maestría
        </Title>
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start max-w-7xl">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 lg:grid-cols-2 gap-x-15 gap-y-7 md:col-span-1 lg:col-span-2 max-w-[55rem]"
          >
            {/* Div para Nombre del Programa */}
            <Input
              label="Nombre del programa:"
              placeHolder="Escribe aquí..."
              className="pl-5 w-full"
              onChange={(e) => setNombre(e.target.value)}
              value={nombre}
              type="text"
            />
            {/* Div para Numero de Periodos */}
            <div className="mb-4">
              <Title level="h4" className="mb-2">
                Número de Periodos
              </Title>
              <select
                value={numPeriodos}
                onChange={(e) => setNumPeriodos(e.target.value)}
                disabled={tipoPeriodos === "Unico (Diplomado)"}
                className="border border-gray-300 bg-gray-200 rounded-md px-4 py-2 focus:outline-none focus-ring-2 focus:ring-gray-400 w-full h-12"
              >
                {tipoPeriodos === "Unico (Diplomado)" ? (
                  <option value={1}>1</option>
                ) : (
                  [1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))
                )}
              </select>
            </div>
            {/* Div para Tipo Periodos */}
            <Select
              label="Tipo de Periodo"
              options={data.opciones.modelo}
              value={tipoPeriodos}
              onChange={handleTipoPeriodosChange}
            />
            {/* Select Para Tipo Programa */}
            <Select
              label="Tipo de Programa"
              options={data.opciones.tipoPrograma}
              value={tipoProgramas}
              onChange={(e) => setTipoProgramas(e.target.value)}
            />
            {/* Select Para Nivel */}
            <Select
              label="Nivel"
              options={data.opciones.nivel}
              value={tipoNivel}
              onChange={(e) => setTipoNivel(e.target.value)}
            />
            {/* Div para Facultad o Dependencia */}
            <Select
              label="Facultad o Dependencia"
              options={data.opciones.facultades}
              value={tipoDependencia}
              onChange={(e) => setTipoDependencia(e.target.value)}
            />
            <FileUploadButton
              label="Documento Curricular"
              onFileSelect={handleFileSelect}
            />
            <Button
              text="Crear Programa"
              type="submit"
              className="h-[2.5rem] w-full"
            >
              Crear Maestría
            </Button>
          </form>
          <div className="hidden md:flex justify-center h-[800px] lg:h-[500px] w-auto">
            <img
              src={Ejemplo}
              alt="Ejemplo de Facultad"
              className="w-full h-full object-cover rounded-md shadow-md"
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default CrearMaestria;
