import React from "react";
import { PlusIcon } from "@heroicons/react/24/outline";

const AddAsignature = () => {
  return (
    <div className="border-dashed border-2 border-gray-300 flex flex-col items-center justify-center  w-auto  lg:max-w-[22rem] min-h-[10rem] h-auto rounded-lg cursor-pointer">
      <PlusIcon className="w-10 h-10 text-gray-500" />
      <p className="text-gray-500">Agregar nueva asignatura</p>
    </div>
  );
};

export default AddAsignature;

// import React from "react";
// import { PlusIcon } from "@heroicons/react/24/outline";

// const AddAsignature = () => {
//   return (
//     <div className="border-dashed border-2 border-gray-300 flex flex-col flex-grow items-center justify-center md:w-[20rem] min-h-[10rem] h-auto  rounded-lg cursor-pointer">
//       <PlusIcon className="w-10 h-10 text-gray-500" />
//       <p className="text-gray-500">Agregar nueva asignatura</p>
//     </div>
//   );
// };

// export default AddAsignature;
