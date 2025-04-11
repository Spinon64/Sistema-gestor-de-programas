import Title from "../Atoms/Title";
import { Link } from "react-router-dom";
import ProgressBar from "../Molecules/ProgressBar";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import MaterialApoyo from "../Molecules/MaterialApoyo";
import PrevDocCurricular from "../Molecules/PrevDocCurricular";
import ConsultarDoc from "../Molecules/ConsultarDoc";
import GenerarDoc from "../Organisms/GenerarDoc";
// import { getBin } from "../../services/jsonBinConfig";

function FaseAnalisis() {
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
              Fase de Analisis
            </Typography>
          </Breadcrumbs>
        </div>

        {/* Título de la página */}
        <div className="mb-6 mt-4">
          <p className="bg-green-100 w-fit px-3 py-1 font-bold border border-green-300 text-green-600 text-xs rounded-xl">
            Fase de Analisis
          </p>
          <Title level="h1" className="mt-3 text-2xl md:text-3xl">
            Maestría en ciencia de datos
          </Title>
          <Title level="h2" className="mt-2 text-xl opacity-80 mb-6">
            Matematicas 2
          </Title>
        </div>

        {/* Contenido principal con layout responsivo */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Columna izquierda */}
          <div className="flex flex-col gap-6 w-full lg:w-3/5">
            {/* Programa sintético */}
            <GenerarDoc />

            {/* Programa sintético - consultar */}
            <ConsultarDoc />
          </div>

          {/* COLUMNA DERECHA */}
          <div className="flex flex-col gap-6 w-full lg:w-2/5">
            {/* COMPONENTE MATERIAL DE APOYO */}
            <MaterialApoyo />
            {/* COMPONENTE DOCUMENTO CURRICULAR*/}
            <PrevDocCurricular />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FaseAnalisis;
