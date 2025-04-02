import { useState, useEffect } from "react";
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
  // Datos de ejemplo basados en tu estructura JSON, normalmente vendrían de una API
  // const [periodoData, setPeriodoData] = useState({
  //   id: 1,
  //   periodo: "Semestre 1",
  //   duracionTotal: 56,
  //   etapas: [
  //     {
  //       id: 1,
  //       nombre: "Análisis",
  //       duracionTotal: 14,
  //       actividades: [
  //         {
  //           id: 1,
  //           nombre: "Análisis",
  //           fechaInicio: "2025-04-02",
  //           fechaFin: "2025-04-05",
  //           duracion: 4,
  //         },
  //         {
  //           id: 2,
  //           nombre: "Revisión",
  //           fechaInicio: "2025-04-07",
  //           fechaFin: "2025-04-11",
  //           duracion: 5,
  //         },
  //         {
  //           id: 3,
  //           nombre: "Validación",
  //           fechaInicio: "2025-04-14",
  //           fechaFin: "2025-04-18",
  //           duracion: 5,
  //         },
  //       ],
  //     },
  //     {
  //       id: 2,
  //       nombre: "Diseño",
  //       duracionTotal: 15,
  //       actividades: [
  //         {
  //           id: 4,
  //           nombre: "Diseño",
  //           fechaInicio: "2025-04-21",
  //           fechaFin: "2025-04-25",
  //           duracion: 5,
  //         },
  //         {
  //           id: 5,
  //           nombre: "Revisión",
  //           fechaInicio: "2025-04-28",
  //           fechaFin: "2025-05-02",
  //           duracion: 5,
  //         },
  //         {
  //           id: 6,
  //           nombre: "Validación",
  //           fechaInicio: "2025-05-05",
  //           fechaFin: "2025-05-09",
  //           duracion: 5,
  //         },
  //       ],
  //     },
  //     {
  //       id: 3,
  //       nombre: "Desarrollo",
  //       duracionTotal: 15,
  //       actividades: [
  //         {
  //           id: 7,
  //           nombre: "Desarrollo",
  //           fechaInicio: "2025-05-12",
  //           fechaFin: "2025-05-16",
  //           duracion: 5,
  //         },
  //         {
  //           id: 8,
  //           nombre: "Revisión",
  //           fechaInicio: "2025-05-19",
  //           fechaFin: "2025-05-23",
  //           duracion: 5,
  //         },
  //         {
  //           id: 9,
  //           nombre: "Validación",
  //           fechaInicio: "2025-05-26",
  //           fechaFin: "2025-05-30",
  //           duracion: 5,
  //         },
  //       ],
  //     },
  //     {
  //       id: 4,
  //       nombre: "Implementación",
  //       duracionTotal: 5,
  //       actividades: [
  //         {
  //           id: 10,
  //           nombre: "Implementación",
  //           fechaInicio: "2025-06-02",
  //           fechaFin: "2025-06-06",
  //           duracion: 5,
  //         },
  //       ],
  //     },
  //     {
  //       id: 5,
  //       nombre: "Evaluación",
  //       duracionTotal: 5,
  //       actividades: [
  //         {
  //           id: 11,
  //           nombre: "Evaluación",
  //           fechaInicio: "2025-06-09",
  //           fechaFin: "2025-06-13",
  //           duracion: 5,
  //         },
  //       ],
  //     },
  //     {
  //       id: 6,
  //       nombre: "Capacitación",
  //       duracionTotal: 2,
  //       actividades: [
  //         {
  //           id: 12,
  //           nombre: "Capacitación Pedagógica",
  //           fechaInicio: "2025-06-20",
  //           fechaFin: "2025-06-20",
  //           duracion: 1,
  //           modalidad: "Virtual",
  //         },
  //         {
  //           id: 13,
  //           nombre: "Capacitación Tecnológica",
  //           fechaInicio: "2025-06-24",
  //           fechaFin: "2025-06-24",
  //           duracion: 1,
  //           modalidad: "Presencial",
  //         },
  //       ],
  //     },
  //   ],
  // });

  // Efecto para cargar datos de la API (simulado aquí)
  useEffect(() => {
    // Aquí podrías hacer la llamada a tu API para obtener los datos reales
    // fetch('/api/periodos/1')
    //   .then(response => response.json())
    //   .then(data => setPeriodoData(data));
  }, []);

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
          <Title level="h4" className="text-center">
            Maestría en Ciencia de Datos - {periodoData.periodo}
          </Title>
        </div>

        {/* Tabla Responsiva */}
        <div className="w-full overflow-x-auto my-3">
          <TablaDinamica periodoData={periodoData} />
        </div>
      </div>
    </div>
  );
}

export default PlanningCalendar;
