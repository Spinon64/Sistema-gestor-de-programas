import React, { useState } from "react";
import Title from "../Atoms/Title";
import Select from "../Molecules/Select";
import Button from "../Atoms/Button";
import Input from "../Molecules/Input";
import Ejemplo from "../../assets/ejemplo.jpg";
import data from "../../data/programs.json";
import { useNavigate } from "react-router";
import FileUploadButton from "../Atoms/FileUploadButton";

const ProgramCreation = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombrePrograma: "",
    tipoPrograma: "",
    numeroPeriodos: "",
    nivel: "",
    modelo: "",
    facultad: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);

  // Manejar cambios en los inputs y selects
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      let newFormData = { ...prevData, [name]: value };

      if (name === "tipoPrograma" && value === "Diplomado") {
        newFormData.numeroPeriodos = "Unico (Diplomado)";
      }

      return newFormData;
    });
  };

  // Manejar la carga de archivos
  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  // Guardar en localStorage y redirigir
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos guardados:", formData);
    localStorage.setItem("programData", JSON.stringify(formData));
    if (selectedFile) {
      localStorage.setItem("uploadedFile", selectedFile.name);
    }
    navigate("/crear-asignatura");
  };

  return (
    <div className="mx-auto mt-5 flex w-full max-w-[110rem] flex-1 flex-col px-4 sm:px-6 lg:px-8 lg:mt-20 lg:items-center">
      <div className="mx-10 flex flex-col justify-center">
        <Title level="h1" className="mt-5 mb-10 self-start">
          Creación de Programa
        </Title>

        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start max-w-7xl">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 lg:grid-cols-2 gap-x-15 gap-y-7 md:col-span-1 lg:col-span-2 max-w-[55rem]"
          >
            <Input
              label="Nombre del programa:"
              placeHolder="Escribe aquí..."
              className="pl-5 w-full"
              name="nombrePrograma"
              value={formData.nombrePrograma}
              onChange={handleChange}
            />
            <Select
              label="Tipo de programa:"
              options={data.opciones.tipoPrograma}
              name="tipoPrograma"
              value={formData.tipoPrograma}
              onChange={handleChange}
            />
            <Select
              label="Número de periodos:"
              options={data.opciones.numeroPeriodos}
              name="numeroPeriodos"
              value={formData.numeroPeriodos}
              onChange={handleChange}
              disabled={formData.tipoPrograma === "Diplomado"}
            />
            <Select
              label="Nivel:"
              options={data.opciones.nivel}
              name="nivel"
              value={formData.nivel}
              onChange={handleChange}
            />
            <Select
              label="Tipo de Periodo:"
              options={data.opciones.modelo}
              name="modelo"
              value={formData.modelo}
              onChange={handleChange}
            />
            <Select
              label="Facultad o Dependencia:"
              options={data.opciones.facultades}
              name="facultad"
              value={formData.facultad}
              onChange={handleChange}
            />

            {/* Usamos el componente FileUploadButton */}
            <FileUploadButton
              label="Documento curricular"
              onFileSelect={handleFileSelect}
            />

            <Button
              text="Crear Programa"
              type="submit"
              className="self-start bg-gray-800 text-white px-6 py-2 rounded-md h-12"
            />
          </form>

          <div className="hidden md:flex justify-center h-[800px] lg:h-[500px] w-auto">
            <img
              src={Ejemplo}
              alt="Ejemplo de facultad"
              className="w-full h-full object-cover rounded-md shadow-md"
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProgramCreation;
