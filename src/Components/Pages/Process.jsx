import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Title from "../Atoms/Title";
import CalendarProcess from "../Templates/CalendarProcess";
import ValidateCalendar from "../Templates/ValidateCalendar";
import Button from "../Atoms/Button";
import CalendarDeploy from "../Templates/CalendarDeploy";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import CalendarTraining from "../Templates/CalendarTraining";

function Process() {
  const [totalGeneral, setTotalGeneral] = useState(0);
  const { id, periodoId } = useParams();
  const [maestria, setMaestria] = useState(null);
  const [periodoActual, setPeriodoActual] = useState(null);

  const calcularTotal = () => {
    const ids = ["analisis", "diseno", "desarrollo", "deploy"];
    const total = ids.reduce((acc, id) => {
      const item = JSON.parse(localStorage.getItem(`diasEtapas_${id}`));
      return acc + (item?.totalDias || 0);
    }, 0);
    setTotalGeneral(total);
  };

  useEffect(() => {
    calcularTotal();

    const handleActualizar = () => {
      calcularTotal();
    };

    window.addEventListener("actualizarTotal", handleActualizar);

    return () => {
      window.removeEventListener("actualizarTotal", handleActualizar);
    };
  }, []);

  useEffect(() => {
    // Recuperar datos de localStorage
    const savedMaestria = localStorage.getItem("maestria");

    if (!savedMaestria) {
      return;
    }

    const maestriaData = JSON.parse(savedMaestria);

    // Convertir IDs a números para comparación
    const maestriaIdNumber = Number(maestriaData.id);
    const idNumber = Number(id);
    const periodoIdNumber = Number(periodoId);

    if (maestriaIdNumber === idNumber) {
      setMaestria(maestriaData);

      // Buscar periodo usando comparación estricta de ID
      const periodo = maestriaData.periodos.find((p) => {
        return Number(p.id) === periodoIdNumber;
      });

      if (periodo) {
        setPeriodoActual(periodo);
      } else {
        console.error("Periodo no encontrado");
      }
    } else {
      console.error("Maestría no coincide");
    }
  }, [id, periodoId]);

  if (!maestria || !periodoActual) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-12 mt-10 flex flex-col gap-6 items-center">
      {/* Breadcrumbs actualizados */}
      <Breadcrumbs className="self-start">
        <Link underline="hover" color="inherit" to="/">
          Programas
        </Link>
        <Link underline="hover" color="inherit" to={`/detalles-programa/${id}`}>
          {maestria.nombre}
        </Link>
        <Typography sx={{ color: "text.primary" }}>
          {maestria.tipoPeriodos === "Unico (Diplomado)"
            ? "Periodo"
            : maestria.tipoPeriodos === "Semestral"
            ? `Semestre ${
                maestria.periodos.findIndex(
                  (p) => Number(p.id) === Number(periodoActual.id)
                ) + 1
              }`
            : maestria.tipoPeriodos === "Cuatrimestral"
            ? `Cuatrimestre ${
                maestria.periodos.findIndex(
                  (p) => Number(p.id) === Number(periodoActual.id)
                ) + 1
              }`
            : "Periodo"}
        </Typography>
      </Breadcrumbs>

      <Title level="h1" className="text-start mb-6 w-full max-w-4xl">
        Programa de procesos -{" "}
        {maestria.tipoPeriodos === "Unico (Diplomado)"
          ? "Periodo"
          : maestria.tipoPeriodos === "Semestral"
          ? `Semestre ${
              maestria.periodos.findIndex(
                (p) => Number(p.id) === Number(periodoActual.id)
              ) + 1
            }`
          : maestria.tipoPeriodos === "Cuatrimestral"
          ? `Cuatrimestre ${
              maestria.periodos.findIndex(
                (p) => Number(p.id) === Number(periodoActual.id)
              ) + 1
            }`
          : "Periodo"}
      </Title>

      {/* Etapas */}
      <div className="w-full max-w-4xl">
        <CalendarProcess
          id="analisis"
          etapas={["Análisis", "Revisión", "Validación"]}
          periodoId={periodoId} // Pasamos el ID del periodo
        />
        <CalendarProcess
          id="diseno"
          etapas={["Diseño", "Revisión", "Validación"]}
          periodoId={periodoId} // Pasamos el ID del periodo
        />
        <CalendarProcess
          id="desarrollo"
          etapas={["Desarrollo", "Revisión", "Validación"]}
          periodoId={periodoId} // Pasamos el ID del periodo
        />
        <CalendarDeploy periodoId={periodoId} /> <CalendarTraining />
        {/* Pasamos el ID del periodo */}
        {/*  Total de dias sumados */}
        <div className="flex justify-end">
          <Title level="h2" className="text-[#808080] mb-4 md:mr-[4rem]">
            Total = {totalGeneral + 2} días
          </Title>
        </div>
      </div>

      {/* Validacion del calendario */}
      <div className="w-full max-w-3xl">
        <Title level="h1" className="text-start mb-4">
          Validar calendario
        </Title>
        <ValidateCalendar periodoId={periodoId} />{" "}
        {/* Pasamos el ID del periodo */}
        <Button
          text="Guardar"
          className="h-[2.5rem] w-full sm:w-1/2 lg:w-[20rem] mb-8 "
        />
      </div>
    </div>
  );
}

export default Process;
