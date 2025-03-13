import React, { useState } from "react";
import Title from "../Atoms/Title";
import Select from "../Molecules/Select";
import Button from "../Atoms/Button";
import Input from "../Molecules/Input";
import Ejemplo from "../../assets/ejemplo.jpg";
import data from "../../data/programs.json";
import { useNavigate } from "react-router";

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

  // Manejar cambios en los inputs y selects
  const handleChange = (e) => {
    console.log("lo que sea");
    const { name, value } = e.target;
    console.log(e.target);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Redirigir sin volver a guardar datos vacíos
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos guardados:", formData); // Verificar en consola

    // Guardar en localStorage cada vez que se le de click al boton de guardar
    localStorage.setItem("programData", JSON.stringify(formData));

    navigate("/crear-asignatura");
  };

  return (
    <div className="mx-auto mt-5 flex w-full max-w-[110rem] flex-1 flex-col px-4 sm:px-6 lg:px-8 lg:mt-20 lg:items-center">
      <div className="mx-10 flex flex-col justify-center">
        <Title level="h1" className="mt-5 mb-10 self-start">
          Crear programa
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
              label="Maestría o Diplomado:"
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
            />
            <Select
              label="Nivel:"
              options={data.opciones.nivel}
              name="nivel"
              value={formData.nivel}
              onChange={handleChange}
            />
            <Select
              label="Semestral o Cuatrimestral:"
              options={data.opciones.modelo}
              name="modelo"
              value={formData.modelo}
              onChange={handleChange}
            />
            <Select
              label="Facultad o Escuela:"
              options={data.opciones.facultades}
              name="facultad"
              value={formData.facultad}
              onChange={handleChange}
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
