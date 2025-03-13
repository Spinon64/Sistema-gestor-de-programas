import React from "react";
import Box from "../Atoms/Box";
import AsignatureBox from "./AsignatureBox";
import AddAsignature from "../Atoms/AddAsignature";
import Button from "../Atoms/Button";

const SemesterBox = ({ title }) => {
  return (
    <div className="flex flex-col mb-7">
      <h2 className="text-xl font-bold opacity-75 mb-3">{title}</h2>

      <Box width="" height="h-auto" className="flex flex-col w-full p-6">
        <form className="flex flex-col gap-4 w-full">
          {/* Contenedor de asignaturas usando grid en lugar de flex */}
          {/* grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] gap-4 w-full">
            <AsignatureBox />
            <AsignatureBox />
            <AsignatureBox />
            <AsignatureBox />
            <AddAsignature />
          </div>

          <footer className="w-full border-t-2 border-gray-300 pt-4 mt-4">
            <div className="flex flex-col md:flex-row justify-end gap-5">
              <Button
                text="Editar"
                className="h-[2.5rem] md:w-[12rem] lg:w-[15rem] border border-black bg-white !text-black"
              />
              <Button
                text="Guardar"
                className="h-[2.5rem] md:w-[12rem] lg:w-[15rem]"
              />
            </div>
          </footer>
        </form>
      </Box>
    </div>
  );
};

export default SemesterBox;
