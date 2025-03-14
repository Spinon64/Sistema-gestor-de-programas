import React from "react";
import { PlusIcon } from "@heroicons/react/24/outline";

const AddAsignature = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="border-dashed border-2 border-gray-300 flex flex-col items-center justify-center p-4 gap-5 h-full   w-[18rem] md:w-[20rem]  lg:max-w-[20rem] rounded-lg cursor-pointer"
    >
      <PlusIcon className="w-10 h-10 text-gray-500" />
      <p className="text-gray-500">Agregar nueva asignatura</p>
    </div>
  );
};

export default AddAsignature;
