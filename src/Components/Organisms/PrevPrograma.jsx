import React from "react";
import Title from "../Atoms/Title";
import File from "../../assets/File.svg";

const PrevPrograma = () => {
  return (
    <div>
      <div className="rounded-xl shadow-[0px_0px_6px_4px_rgba(0,_0,_0,_0.1)] p-4 md:p-6">
        <div className="flex gap-2 mb-4 items-center">
          <img src={File} alt="File icon" className="w-6 h-6" />
          <Title level="h3" className="font-bold text-lg">
            Programa sintetico
          </Title>
        </div>
        <div className="border  border-slate-300 text-gray-600 rounded-md p-4 bg-slate-50 mb-4">
          <p className="text-sm mb-3 md:text-base">
            El programa sintetico de Matematicas 2 incluye los siguientes temas
            principales
          </p>
          <div className="flex flex-col gap-2">
            <li>Algebra lineal avanzada</li>
            <li>Calculo multivariable</li>
            <li>Ecuaciones diferenciales</li>
            <li>Probabilidad y estadistica</li>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <a href="#" className="text-green-600 text-sm md:text-base">
            Ver programa sintetico completo
          </a>
        </div>
      </div>
    </div>
  );
};

export default PrevPrograma;
