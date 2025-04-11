import React from "react";
import Title from "../Atoms/Title";
import File from "../../assets/File.svg";

const PrevDocCurricular = () => {
  return (
    <div>
      {" "}
      <div className="rounded-xl shadow-[0px_0px_6px_4px_rgba(0,_0,_0,_0.1)] p-4 md:p-6">
        <div className="flex gap-3 items-center mb-4">
          <img src={File} className="w-6 h-6" alt="File" />
          <Title level="h3" className="text-base md:text-lg">
            Previsualizacion de documento curricular
          </Title>
        </div>
        <div className="border rounded-lg p-4 bg-white h-96 md:h-120 lg:h-144 flex items-center justify-center text-slate-400 text-xs md:text-sm">
          <p>Vista previa del documento curricular</p>
        </div>
      </div>
    </div>
  );
};

export default PrevDocCurricular;
