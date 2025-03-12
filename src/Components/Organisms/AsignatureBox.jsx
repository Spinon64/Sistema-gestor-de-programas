import React from "react";
import Box from "../Atoms/Box";
import Input from "../Molecules/Input";
import Button from "../Atoms/Button";

const AsignatureBox = () => {
  return (
    <Box
      width="w-full max-w-[22rem] "
      height="h-auto"
      className="flex flex-col p-4 gap-5 flex-grow "
    >
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

      <div className="flex flex-col gap-5">
        <Input
          placeHolder="Nuevo correo"
          className="w-full h-[2.5rem] pl-2 bg-gray-300"
        />
        <Button text="Agregar correo" className="h-[2.5rem]" />
      </div>
    </Box>
  );
};

export default AsignatureBox;

// import React from "react";
// import Box from "../Atoms/Box";
// import Input from "../Molecules/Input";
// import Button from "../Atoms/Button";

// const AsignatureBox = () => {
//   return (
//     <Box
//       width="w-full md:w-[20rem] lg:w-[20rem]"
//       height="h-auto"
//       className="flex flex-col p-4 gap-5 flex-grow"
//     >
//       <Input
//         label="Asignatura:"
//         placeHolder="Nombre asignatura"
//         className="w-full h-[2.5rem] pl-2"
//       />
//       <Input
//         label="Correos:"
//         placeHolder="ejemplo@ucol.mx"
//         className="w-full h-[2.5rem] pl-2"
//       />
//       <Input placeHolder="ejemplo@ucol.mx" className="w-full h-[2.5rem] pl-2" />
//       <Input placeHolder="ejemplo@ucol.mx" className="w-full h-[2.5rem] pl-2" />

//       <div className="flex flex-col gap-5">
//         <Input
//           placeHolder="Nuevo correo"
//           className="w-full h-[2.5rem] pl-2 bg-gray-300"
//         />
//         <Button text="Agregar correo" className="h-[2.5rem]" />
//       </div>
//     </Box>
//   );
// };

// export default AsignatureBox;
