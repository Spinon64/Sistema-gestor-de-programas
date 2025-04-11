import React from "react";
import Title from "../Atoms/Title";
import Button from "../Atoms/Button";
import TextArea from "../Atoms/TextArea";
import Check from "../../assets/Check.svg";
import Xmark from "../../assets/X-mark.svg";

const Retroalimentacion = () => {
  return (
    <div className="rounded-xl shadow-[0px_0px_6px_4px_rgba(0,_0,_0,_0.1)] p-4 md:p-6">
      <div className="flex gap-2 mb-4 items-center">
        <Title level="h3" className="font-bold text-lg">
          Retroalimentacion
        </Title>
      </div>
      <div className="border border-slate-300 text-gray-600 rounded-md  bg-slate-50 mb-4">
        <TextArea
          placeholder="Escriba aquí sus comentarios o sugerencias sobre el programa sintético..."
          className="min-h-[150px] resize-none w-full"
        />
      </div>
      <div className="flex flex-col md:flex-row gap-3 justify-between">
        <Button
          img={Check}
          className="!bg-green-500 w-full h-[2.5rem]"
          text="Aceptar"
        />
        <Button
          img={Xmark}
          className="!bg-red-500 w-full h-[2.5rem]"
          text="Rechazar"
        />
      </div>
    </div>
  );
};

export default Retroalimentacion;
