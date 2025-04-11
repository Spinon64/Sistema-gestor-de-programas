import React from "react";
import Book from "../../assets/book.svg";
import Title from "../Atoms/Title";
import File from "../../assets/File.svg";

const MaterialApoyo = () => {
  return (
    <div>
      {/* DIV MATERIAL DE APOYO */}
      <div className="rounded-xl shadow-[0px_0px_6px_4px_rgba(0,_0,_0,_0.1)] p-4 md:p-6">
        <div className="flex gap-3 items-center mb-4">
          <img src={Book} alt="Book" className="w-6 h-6" />
          <Title level="h3" className="text-base md:text-lg">
            Material de apoyo
          </Title>
        </div>
        <div className="flex flex-col gap-4 md:gap-6">
          <div className="flex items-center p-3 rounded-lg transition-all duration-300 hover:bg-gray-100 hover:shadow-md cursor-pointer transform hover:translate-x-1">
            <div className="flex-shrink-0">
              <img
                src={File}
                className="w-8 h-8 bg-red-200 rounded-2xl p-2 transition-all duration-300 hover:bg-red-300"
                alt="Video"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm md:text-base font-medium">Video</p>
              <p className="text-xs text-gray-600">Introduccion al curso</p>
            </div>
          </div>

          <div className="flex items-center p-3 rounded-lg transition-all duration-300 hover:bg-gray-100 hover:shadow-md cursor-pointer transform hover:translate-x-1">
            <div className="flex-shrink-0">
              <img
                src={File}
                className="w-8 h-8 bg-blue-200 rounded-2xl p-2 transition-all duration-300 hover:bg-blue-300"
                alt="Guía"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm md:text-base font-medium">
                Guia de estudio
              </p>
              <p className="text-xs text-gray-600">Material complementario</p>
            </div>
          </div>

          <div className="flex items-center p-3 rounded-lg transition-all duration-300 hover:bg-gray-100 hover:shadow-md cursor-pointer transform hover:translate-x-1">
            <div className="flex-shrink-0">
              <img
                src={File}
                className="w-8 h-8 bg-purple-300 rounded-2xl p-2 transition-all duration-300 hover:bg-purple-400"
                alt="Ejercicios"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm md:text-base font-medium">Ejercicios</p>
              <p className="text-xs text-gray-600">Practica recomendada</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialApoyo;
