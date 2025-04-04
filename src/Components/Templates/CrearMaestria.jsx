// src/components/CrearMaestria.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Cambiado a useNavigate
import Title from "../Atoms/Title";
import Button from "../Atoms/Button";
import Ejemplo from "../../assets/ejemplo.jpg";
import FileUploadButton from "../Atoms/FileUploadButton";
import Input from "../Molecules/Input";
import Select from "../Molecules/Select";

const CrearMaestria = () => {
  const [nombre, setNombre] = useState("");
  const [numPeriodos, setNumPeriodos] = useState(1);
  const [tipoPeriodos, setTipoPeriodos] = useState("semestral");
  const [tipoProgramas, setTipoProgramas] = useState("maestria");
  const [tipoNivel, setTipoNivel] = useState("superior");
  const [tipoDependencia, setTipoDependencia] = useState("teleamatica");
  const [selectedFile, setSelectedFile] = useState(null);

  const navigate = useNavigate(); // Usar useNavigate para la navegación

  // Manejar el cambio del tipo de programa
  const handleTipoPrograma = (e) => {
    const value = e.target.value;
    setTipoProgramas(value);
    if (value === "Diplomado") {
      setNumPeriodos(1);
      setTipoPeriodos("Unico (Diplomado)");
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
      // Crear periodos con IDs únicos
      periodos: Array(parseInt(numPeriodos))
        .fill()
        .map(() => ({
          id: Date.now() + Math.random(), // Genera un ID único para cada periodo
          materias: [
            {
              id: Date.now() + Math.random(), // Agregamos un ID único a la materia
              nombre: "",
              profesores: [],
            },
          ], // Cambiado de array vacío a objeto con materias
        })),
      tipoProgramas,
      tipoNivel,
      tipoDependencia,
      selectedFile,
    };

    localStorage.setItem("maestria", JSON.stringify(maestriaData));

    navigate("/gestion-programa");
  };

  return (
    <div className="mx-auto flex w-full max-w-[110rem] mb-3 flex-1 flex-col px-4 sm:px-6 lg:px-8 lg:items-center">
      <div className="mx-10 flex flex-col justify-center">
        <Title level="h1" className="mt-5 mb-10 self-start">
          Crear nuevo programa
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

            {/* Select Para Tipo Programa */}
            <Select
              label="Tipo de Programa"
              options={["Maestría", "Diplomado"]}
              value={tipoProgramas}
              onChange={handleTipoPrograma}
            />

            {/* Div para Tipo Periodos */}
            <Select
              label="Tipo de Periodo"
              options={["Semestral", "Cuatrimestral", "Unico (Diplomado)"]}
              value={tipoPeriodos}
              disabled={tipoProgramas === "Diplomado"}
              onChange={(e) => setTipoPeriodos(e.target.value)}
              className={tipoProgramas === "Diplomado" ? "opacity-50" : ""}
            />

            {/* Div para Numero de Periodos */}
            <div className="mb-4">
              <Title level="h4" className="mb-2">
                Número de Periodos
              </Title>

              <input
                type="number"
                required
                value={numPeriodos}
                onChange={(e) => setNumPeriodos(e.target.value)}
                disabled={tipoProgramas === "Diplomado"}
                className={`${
                  tipoProgramas === "Diplomado" ? "opacity-50" : ""
                } border border-gray-300 bg-gray-200 rounded-md px-4 py-2 focus:outline-none focus-ring-2 focus:ring-gray-400 w-full h-12`}
              ></input>
            </div>

            {/* Select Para Nivel */}
            <Select
              label="Nivel"
              options={[
                "Media superior",
                "Superior",
                "Posgrado",
                "Educación continua",
                "Extensión universitaria previsión asistencial",
              ]}
              value={tipoNivel}
              onChange={(e) => setTipoNivel(e.target.value)}
            />
            {/* Div para Facultad o Dependencia */}
            <Select
              label="Facultad o Dependencia"
              options={[
                "Facultad Telemática",
                "Facultad de Medicina",
                "Facultad de Ciencias",
              ]}
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
              className="h-12 lg:mt-9 w-full"
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
