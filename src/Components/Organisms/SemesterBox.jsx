import React from "react";
import Box from "../Atoms/Box";
import AsignatureBox from "./AsignatureBox";
import Title from "../Atoms/Title";
import AddAsignature from "../Atoms/AddAsignature";
import Button from "../Atoms/Button";

const SemesterBox = () => {
  return (
    <div className="mb-7 mx-0 lg:mx-10">
      <Title level="h2" className="opacity-75 mb-3">
        Número de semestre
      </Title>

      {/* Contenedor Principal de Semestre */}
      <Box
        width="w-full"
        height="h-auto"
        className="flex flex-col justify-start gap-6 p-6"
      >
        <form className="flex flex-col gap-4 items-start w-full">
          {/* Grid para asignaturas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full ">
            <AsignatureBox />
            <AsignatureBox />
            <AsignatureBox />
            <AsignatureBox />

            <AddAsignature />
          </div>

          {/* Footer Adaptable con border y botones */}
          <footer className="flex flex-col w-full border-t-2 border-gray-300 pt-4 mt-4 flex-grow">
            <div className="flex flex-col sm:flex-row justify-between lg:justify-end gap-5 w-full">
              <Button
                text="Editar"
                className="h-[2.5rem] w-full md:w-full lg:w-[20rem] border border-black bg-white !text-black"
              />
              <Button
                text="Guardar"
                className="h-[2.5rem] w-full md:w-full lg:w-[20rem]"
              />
            </div>
          </footer>
        </form>
      </Box>
    </div>
  );
};

export default SemesterBox;

// import React from "react";
// import Box from "../Atoms/Box";
// import AsignatureBox from "./AsignatureBox";
// import Title from "../Atoms/Title";
// import AddAsignature from "../Atoms/AddAsignature";
// import Button from "../Atoms/Button";

// const SemesterBox = () => {
//   return (
//     <div className="mb-7 mx-0 lg:mx-10">
//       <Title level="h2" className="opacity-75 mb-3">
//         Número de semestre
//       </Title>

//       {/* Contenedor Principal de Semestre */}
//       <Box
//         width="w-full"
//         height="h-auto"
//         className="flex flex-col flex-wrap lg:flex-nowrap lg justify-start gap-6 p-6"
//       >
//         <form className="flex flex-col gap-4 items-start w-full">
//           <div className="flex flex-wrap gap-8 w-full">
//             <AsignatureBox />
//             <AsignatureBox />
//             <AsignatureBox />

//             <AddAsignature />
//           </div>

//           {/* Footer Adaptable con border y botones */}
//           <footer className="flex flex-col w-full border-t-2 border-gray-300 pt-4 mt-4 flex-grow">
//             <div className="flex flex-col sm:flex-row justify-between lg:justify-end gap-5 w-full">
//               <Button
//                 text="Editar"
//                 className="h-[2.5rem] w-full md:w-full lg:w-[20rem] border border-black bg-white !text-black"
//               />
//               <Button
//                 text="Guardar"
//                 className="h-[2.5rem] w-full  md:w-full lg:w-[20rem] "
//               />
//             </div>
//           </footer>
//         </form>
//       </Box>
//     </div>
//   );
// };

// export default SemesterBox;
