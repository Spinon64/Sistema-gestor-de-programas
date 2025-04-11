import React from "react";
import Book from "../../assets/book.svg";
import Title from "../Atoms/Title";

const ConsultarDoc = () => {
  return (
    <div>
      {" "}
      <div className="rounded-xl shadow-[0px_0px_6px_4px_rgba(0,_0,_0,_0.1)] p-4 md:p-6">
        <div className="flex gap-3 items-center">
          <img src={Book} alt="Book" className="w-6 h-6" />
          <Title level="h3" className="mb-2">
            Programa sintético de la asignatura
          </Title>
        </div>
        <a href="#" className="text-green-600 text-sm md:text-base">
          Consular documento curricular
        </a>
      </div>
    </div>
  );
};

export default ConsultarDoc;
