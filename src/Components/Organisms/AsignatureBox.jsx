import React from "react";
import Box from "../Atoms/Box";
import Input from "../Molecules/Input";
import Button from "../Atoms/Button";

//sm:w-[18rem] md:w-[20rem] lg:max-w-[20rem]

const AsignatureBox = () => {
  return (
    <Box width="" height="h-auto" className="flex flex-col p-4 gap-4">
      <Input
        label="Asignatura:"
        placeHolder="Nombre asignatura"
        className="w-full h-[2.5rem] pl-2"
      />
      <Input
        label="Correos:"
        placeHolder="ejemplo@ucol.mx"
        className="w-full h-[2.5rem] pl-2"
      />
      <Input placeHolder="ejemplo@ucol.mx" className="w-full h-[2.5rem] pl-2" />
      <Input placeHolder="ejemplo@ucol.mx" className="w-full h-[2.5rem] pl-2" />

      <div className="flex flex-col gap-3 sm:gap-5">
        <Input
          placeHolder="Nuevo correo"
          className="w-full h-[2.5rem] pl-2 bg-gray-300"
        />
        <Button text="Agregar correo" className="h-[2.5rem] w-full sm:w-auto" />
      </div>
    </Box>
  );
};

export default AsignatureBox;
