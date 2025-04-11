import React from "react";
import Title from "../Atoms/Title";
import Airplane from "../../assets/airplane.svg";
import Plus from "../../assets/plus.svg";
import Button from "../Atoms/Button";
import File from "../../assets/File.svg";

const GenerarDoc = () => {
  return (
    <div>
      {" "}
      <div className="rounded-xl shadow-[0px_0px_6px_4px_rgba(0,_0,_0,_0.1)] p-4 md:p-6">
        <div className="flex gap-2 mb-4 items-center">
          <img src={File} alt="File icon" className="w-6 h-6" />
          <Title level="h3" className="font-bold text-lg">
            Programa sintetico de la asignatura
          </Title>
        </div>
        <div className="border border-dashed border-slate-300 rounded-md p-4 bg-slate-50 mb-4">
          <p className="text-sm md:text-base">
            Haga clic en "Crear Google Doc" para generar un nuevo documento
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            img={Plus}
            text="Crear Google Doc"
            className="text-sm h-10 w-full sm:w-auto"
          />
          <Button
            img={Airplane}
            text="Enviar a revision"
            className="text-sm bg-white !text-black border border-gray-400 font-bold h-10 w-full sm:w-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default GenerarDoc;
