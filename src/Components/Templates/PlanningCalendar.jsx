import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCalendarBin } from "../../services/jsonBinConfig";
import Coordinador from "../../assets/coordinador.svg";
import EAD from "../../assets/eda.svg";
import RED from "../../assets/red.svg";
import Facilitador from "../../assets/facilitadores.svg";
import Title from "../Atoms/Title";
import Capacitacion from "../../assets/capacitacion.svg";
import TablaDinamica from "../Organisms/TablaDinamica";

function TablaContenidos() {
  return (
    <div className=" mt-2 flex justify-center">
      <div className="lg:fixed xl:fixed bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-6">
          <h2 className="text-xl font-bold text-white text-center">
            Tabla de contenidos
          </h2>
        </div>

        <div className="m-3 bg-white p-3">
          {/* INVOLUCRADOS Section */}
          <div className="mb-6">
            <h3 className="text-lg font-bold border-b-2 border-slate-800 pb-2 mb-3">
              INVOLUCRADOS
            </h3>
            <ul>
              <li className="flex flex-row items-center gap-3">
                <img
                  src={Coordinador}
                  alt="Coordinador"
                  className="h-5 w-5 rounded-full"
                />
                <h4 className="ml-2 font-medium">COORDINADOR</h4>
              </li>
              <li className="flex flex-row items-center gap-3">
                <img src={RED} alt="R.E.D" className="h-5 w-5 rounded-full" />
                <h4 className="ml-2 font-medium">R.E.D</h4>
              </li>
              <li className="flex flex-row items-center gap-3">
                <img src={EAD} alt="E.A.D" className="h-5 w-5 rounded-full" />
                <h4 className="ml-2 font-medium">E.A.D</h4>
              </li>
              <li className="flex flex-row items-center gap-3">
                <img
                  src={Facilitador}
                  alt="Facilitadores"
                  className="h-5 w-5 rounded-full"
                />
                <h4 className="ml-2 font-medium">FACILITADORES</h4>
              </li>
            </ul>
          </div>

          {/* FASES A.D.D.I.E Section */}
          <div className="mb-6">
            <h3 className="text-lg font-bold border-b-2 border-slate-800 pb-2 mb-3">
              FASES A.D.D.I.E
            </h3>
            <ul>
              <li className="flex flex-row items-center gap-3">
                <div className="w-4 h-4 bg-[#A7C7E7] border rounded-full"></div>
                <h4 className="ml-2 font-medium">ANÁLISIS</h4>
              </li>
              <li className="flex flex-row items-center gap-3">
                <div className="w-4 h-4 bg-[#FFB085] border rounded-full"></div>
                <h4 className="ml-2 font-medium">DISEÑO</h4>
              </li>
              <li className="flex flex-row items-center gap-3">
                <div className="w-4 h-4 bg-[#B5EAD7] border rounded-full"></div>
                <h4 className="ml-2 font-medium">DESARROLLO</h4>
              </li>
              <li className="flex flex-row items-center gap-3">
                <div className="w-4 h-4 bg-[#FFF4B2] border rounded-full"></div>
                <h4 className="ml-2 font-medium">IMPLEMENTACIÓN</h4>
              </li>
              <li className="flex flex-row items-center gap-3">
                <div className="w-4 h-4 bg-[#D7BDE2] border rounded-full"></div>
                <h4 className="ml-2 font-medium">EVALUACIÓN</h4>
              </li>
            </ul>
          </div>

          {/* CAPACITACIÓN Section */}
          <div>
            <h3 className="text-lg font-bold border-b-2 border-slate-800 pb-2 mb-3">
              CAPACITACIÓN
            </h3>
            <div className="flex flex-row items-center gap-3 pl-1">
              <img
                src={Capacitacion}
                alt="Capacitación"
                className="h-5 w-5 rounded-full"
              />
              <h4 className="ml-2 font-medium">CAPACITACIÓN</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function PlanningCalendar() {
  const { programaId, periodoId } = useParams();
  const [periodoData, setPeriodoData] = useState(null);

  useEffect(() => {
    const fetchCalendario = async () => {
      try {
        const data = await getCalendarBin(); // 👈🏼 asegúrate que sea el bin correcto
        console.log("📥 Datos completos del bin calendario:", data);

        const calendario = data?.calendarios?.find(
          (c) =>
            Number(c.programaId) === Number(programaId) &&
            Number(c.periodoId) === Number(periodoId)
        );

        console.log("🔍 Calendario encontrado:", calendario);

        if (calendario?.calendario) {
          setPeriodoData(calendario.calendario);
        } else {
          console.warn(
            "⚠️ No se encontró calendario para ese programa y periodo."
          );
        }
      } catch (error) {
        console.error("❌ Error al cargar calendario:", error);
      }
    };

    fetchCalendario();
  }, [programaId, periodoId]);

  return (
    <div className="flex flex-col items-center lg:flex-row lg:items-start p-4 space-y-4 lg:space-y-0 lg:space-x-6">
      {/* Contenedor de la Tabla de Contenidos, completamente centrado */}
      <div className="w-full flex justify-center lg:w-1/5">
        <div className="w-full max-w-md flex justify-center">
          <TablaContenidos />
        </div>
      </div>

      {/* Contenedor del Calendario */}
      <div className="w-full lg:w-4/5 border rounded-lg shadow-md p-4">
        <div className="flex flex-col text-center">
          <Title level="h3" className="text-center mt-3">
            CALENDARIO
          </Title>
          {periodoData ? (
            <>
              <Title level="h4" className="text-center">
                {periodoData.periodo}
              </Title>
              <TablaDinamica periodoData={periodoData} />
            </>
          ) : (
            <p className="text-center mt-4">Cargando calendario...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PlanningCalendar;
