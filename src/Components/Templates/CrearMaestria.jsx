import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Cambiado a useNavigate
import Title from "../Atoms/Title";
import Button from "../Atoms/Button";
import Ejemplo from "../../assets/ejemplo.jpg";
import FileUploadButton from "../Atoms/FileUploadButton";
import Input from "../Molecules/Input";
import Select from "../Molecules/Select";
import { updateBin, getBin } from "../../services/jsonBinConfig"; // Asegúrate de importar

const CrearMaestria = () => {
  const [nombre, setNombre] = useState("");
  const [numPeriodos, setNumPeriodos] = useState(1);
  const [tipoPeriodos, setTipoPeriodos] = useState("semestral");
  const [tipoProgramas, setTipoProgramas] = useState("maestria");
  const [tipoNivel, setTipoNivel] = useState("superior");
  const [tipoDependencia, setTipoDependencia] = useState("teleamatica");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Added missing state
  const [error, setError] = useState(null); // Added missing state

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Crear un objeto simple y seguro para JSON
      const nuevoPrograma = {
        id: Date.now(),
        nombre: nombre || "Programa sin nombre",
        numPeriodos: parseInt(numPeriodos) || 1,
        tipoPeriodos,
        periodos: Array(parseInt(numPeriodos) || 1)
          .fill()
          .map((_, index) => ({
            id: Date.now() + index + 1,
            materias: [
              {
                id: Date.now() + 1000 + index,
                nombre: "",
                profesores: [],
              },
            ],
          })),
        tipoProgramas,
        tipoNivel,
        tipoDependencia,
        // No guardar el objeto File, solo metadata
        archivoNombre: selectedFile ? selectedFile.name : null,
      };

      // Verificar que el objeto puede ser convertido a JSON sin problemas
      try {
        JSON.stringify(nuevoPrograma);
      } catch (jsonError) {
        throw new Error(
          "El objeto del programa contiene datos que no pueden ser guardados en formato JSON. Error: " +
            jsonError.message
        );
      }

      console.log("🔍 Obteniendo datos actuales...");
      const bin = await getBin();

      if (bin === null) {
        console.log(
          "⚠️ No se obtuvieron datos del bin, creando una nueva estructura"
        );
        // Si getBin devuelve null, crea una estructura inicial
        await updateBin({ programas: [nuevoPrograma] });
      } else {
        const programasActuales = bin?.programas || [];
        console.log(`📋 Programas existentes: ${programasActuales.length}`);

        const nuevosProgramas = [...programasActuales, nuevoPrograma];
        await updateBin({ programas: nuevosProgramas });
      }

      console.log("✅ Programa guardado con éxito");
      alert("Programa creado correctamente");

      navigate("/gestion-programa", {
        state: { programaId: nuevoPrograma.id },
      });
    } catch (error) {
      console.error("❌ Error al guardar programa:", error);
      setError(`Error: ${error.message || "Problema al guardar el programa"}`);
      alert(`Error: ${error.message || "No se pudo guardar el programa"}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-[110rem] mb-3 flex-1 flex-col px-4 sm:px-6 lg:px-8 lg:items-center">
      <div className="mx-10 flex flex-col justify-center">
        <Title level="h1" className="mt-5 mb-10 self-start">
          Crear nuevo programa
        </Title>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
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
              disabled={isLoading}
            >
              {isLoading ? "Guardando..." : "Crear Maestría"}
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
