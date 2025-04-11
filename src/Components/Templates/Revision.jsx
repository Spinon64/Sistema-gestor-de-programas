import Title from "../Atoms/Title";
import { Link } from "react-router-dom";
import ProgressBar from "../Molecules/ProgressBar";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import PrevPrograma from "../Organisms/PrevPrograma";
import Retroalimentacion from "../Organisms/Retroalimentacion";

function Revision() {
  return (
    <div className="w-full">
      <div className="border-b border-gray-200 shadow-md">
        <ProgressBar currentPhase={0} />
      </div>

      <div className="px-4 md:px-6 lg:px-10 py-4">
        {/* Breadcrumbs */}
        <div className="mb-4 overflow-x-auto">
          <Breadcrumbs>
            <Link underline="hover" color="inherit" to="/">
              Programas
            </Link>
            <Link underline="hover" color="inherit" to="/detalles-programa/:id">
              Detalles de Maestria actual
            </Link>
            <Typography sx={{ color: "text.primary" }}>
              Revision de la fase de analisis
            </Typography>
          </Breadcrumbs>
        </div>

        {/* Contenedor centrado */}
        <div className="flex justify-center">
          <div className="w-full max-w-5xl px-4">
            {" "}
            {/* Ajusté el max-w-7xl a max-w-5xl */}
            {/* Título de la página */}
            <div className="mb-6 mt-4">
              <p className="bg-orange-100 w-fit px-3 py-1 font-bold border border-orange-300 text-orange-600 text-xs rounded-xl">
                Revision de la fase de analisis
              </p>
              <Title level="h1" className="mt-3 text-2xl md:text-3xl">
                Maestría en ciencia de datos
              </Title>
              <Title level="h2" className="mt-2 text-xl opacity-80 mb-6">
                Matematicas 2
              </Title>
            </div>
            {/* Columna izquierda */}
            <div className="flex flex-col gap-6 w-full ">
              {/* Programa sintético */}
              <PrevPrograma />

              {/* Programa sintético - consultar */}
              <Retroalimentacion />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Revision;
