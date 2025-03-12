import React from "react";
import Title from "../Atoms/Title";
import Select from "../Molecules/Select";
import Button from "../Atoms/Button";
import Input from "../Molecules/Input";
import Ejemplo from "../../assets/ejemplo.jpg";
import data from "../../data/programs.json";
import { Link } from "react-router-dom";

const ProgramCreation = () => {
  return (
    <div className="mx-auto  mt-5  flex   w-full max-w-[110rem] flex-1 flex-col px-4 sm:px-6 lg:px-8 lg:mt-20 lg:items-center  ">
      <div className="mx-10 -full flex flex-col justify-center ">
        <Title level="h1" className="mt-5 mb-10 self-start">
          Crear programa
        </Title>

        <main className=" grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start gap-x-15  max-w-7xl ">
          {/* FORMULARIO (1 columna en móvil, 1 en md, 2 en lg) */}
          <div className="grid  grid-cols-1 lg:grid-cols-2 gap-x-15 gap-y-7 md:col-span-1 lg:col-span-2 max-w-[55rem] ">
            <Input
              label="Nombre del programa:"
              placeHolder="Escribe aquí..."
              className="pl-5 w-full"
            />
            <Select
              label="Maestría o Diplomado:"
              options={data.opciones.tipoPrograma}
            />
            <Select
              label="Número de periodos:"
              options={data.opciones.numeroPeriodos}
            />
            <Select label="Nivel:" options={data.opciones.nivel} />
            <Select
              label="Semestral o Cuatrimestral:"
              options={data.opciones.modelo}
            />
            <Select
              label="Facultad o Escuela:"
              options={data.opciones.facultades}
            />
            <Link to="/crear-asignatura">
              <Button
                text="Crear Programa"
                className="self-start bg-gray-800 text-white px-6 py-2 rounded-md h-12"
              />
            </Link>
          </div>

          {/* IMAGEN (Oculta en móvil, visible en md y lg) */}
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
