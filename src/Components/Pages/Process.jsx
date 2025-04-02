import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Title from "../Atoms/Title";
import CalendarProcess from "../Templates/CalendarProcess";
import ValidateCalendar from "../Templates/ValidateCalendar";
import Button from "../Atoms/Button";
import CalendarDeploy from "../Templates/CalendarDeploy";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import CapacitacionPedagogica from "../Templates/CapacitacionPedagogica";

function Process() {
  const [totalGeneral, setTotalGeneral] = useState(0);
  const { id, periodoId } = useParams();
  const [maestria, setMaestria] = useState(null);
  const [periodoActual, setPeriodoActual] = useState(null);

  //////////////////////

  const guardarDataCalendar = () => {
    const periodId = Number(periodoActual.id);
    const periodName =
      maestria.tipoPeriodos === "Unico (Diplomado)"
        ? "Periodo"
        : maestria.tipoPeriodos === "Semestral"
        ? `Semestre ${
            maestria.periodos.findIndex((p) => Number(p.id) === periodId) + 1
          }`
        : maestria.tipoPeriodos === "Cuatrimestral"
        ? `Cuatrimestre ${
            maestria.periodos.findIndex((p) => Number(p.id) === periodId) + 1
          }`
        : "Periodo";

    const etapas = [];

    // === ETAPAS NORMALES (análisis, diseño, desarrollo) ===
    const etapasProceso = [
      {
        id: 1,
        key: "analisis",
        nombre: "Análisis",
        actividades: ["Análisis", "Revisión", "Validación"],
      },
      {
        id: 2,
        key: "diseno",
        nombre: "Diseño",
        actividades: ["Diseño", "Revisión", "Validación"],
      },
      {
        id: 3,
        key: "desarrollo",
        nombre: "Desarrollo",
        actividades: ["Desarrollo", "Revisión", "Validación"],
      },
    ];

    etapasProceso.forEach(({ id, key, nombre, actividades }) => {
      const fechas =
        JSON.parse(localStorage.getItem(`fechasEtapas_${key}`)) || [];
      const actividadesFinales = fechas.map(([start, end], index) => {
        const duracion =
          start && end
            ? (new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24) + 1
            : 0;
        return {
          id: index + 1,
          nombre: actividades[index],
          fechaInicio: start,
          fechaFin: end,
          duracion,
        };
      });

      const duracionTotal = actividadesFinales.reduce(
        (acc, a) => acc + a.duracion,
        0
      );
      etapas.push({
        id,
        nombre,
        duracionTotal,
        actividades: actividadesFinales,
      });
    });

    // === IMPLEMENTACIÓN ===
    const fechasDeploy =
      JSON.parse(localStorage.getItem("fechasEtapas_deploy")) || [];
    if (fechasDeploy[0]?.[0] && fechasDeploy[0]?.[1]) {
      const start = fechasDeploy[0][0];
      const end = fechasDeploy[0][1];
      const duracion =
        (new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24) + 1;

      etapas.push({
        id: 4,
        nombre: "Implementación",
        duracionTotal: duracion,
        actividades: [
          {
            id: 10,
            nombre: "Implementación",
            fechaInicio: start,
            fechaFin: end,
            duracion,
          },
        ],
      });
    }

    // === EVALUACIÓN ===
    if (fechasDeploy[2]?.[0] && fechasDeploy[2]?.[1]) {
      const start = fechasDeploy[2][0];
      const end = fechasDeploy[2][1];
      const duracion =
        (new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24) + 1;

      etapas.push({
        id: 5,
        nombre: "Evaluación",
        duracionTotal: duracion,
        actividades: [
          {
            id: 11,
            nombre: "Evaluación",
            fechaInicio: start,
            fechaFin: end,
            duracion,
          },
        ],
      });
    }

    // === CAPACITACIÓN (pedagógica y tecnológica) ===
    const actividadesCap = [];
    let totalCap = 0;

    // Pedagógica
    const fechasPedagogica =
      JSON.parse(localStorage.getItem("fechasEtapas_pedagogica")) || [];
    const modalidadPedagogica =
      JSON.parse(localStorage.getItem("modalidadEtapas_pedagogica")) ||
      "Virtual";
    if (fechasPedagogica?.[0]) {
      actividadesCap.push({
        id: 12,
        nombre: "Capacitación Pedagógica",
        fechaInicio: fechasPedagogica[0],
        fechaFin: fechasPedagogica[1] || fechasPedagogica[0],
        duracion: 1,
        modalidad: modalidadPedagogica,
      });
      totalCap += 1;
    }

    // Tecnológica (deploy[1])
    if (fechasDeploy[1]?.[0]) {
      const start = fechasDeploy[1][0];
      const end = fechasDeploy[1][1] || fechasDeploy[1][0];
      const duracion =
        start && end
          ? (new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24) + 1
          : 1;

      const modalidadTecnologica =
        JSON.parse(localStorage.getItem("modalidadEtapas_tecnologica")) ||
        "Presencial";

      actividadesCap.push({
        id: 13,
        nombre: "Capacitación Tecnológica",
        fechaInicio: start,
        fechaFin: end,
        duracion,
        modalidad: modalidadTecnologica,
      });

      totalCap += duracion;
    }

    if (actividadesCap.length > 0) {
      etapas.push({
        id: 6,
        nombre: "Capacitación",
        duracionTotal: totalCap,
        actividades: actividadesCap,
      });
    }

    // === TOTAL FINAL ===
    const duracionTotal = etapas.reduce(
      (acc, etapa) => acc + etapa.duracionTotal,
      0
    );

    const dataCalendar = {
      id: periodId,
      periodo: periodName,
      duracionTotal,
      etapas,
    };

    localStorage.setItem("dataCalendar", JSON.stringify(dataCalendar));
    console.log("✅ dataCalendar actualizado correctamente:", dataCalendar);
  };
  /////////////////////

  const getFechasOcupadas = () => {
    const ids = ["analisis", "diseno", "desarrollo", "deploy"];
    const fechas = [];

    ids.forEach((id) => {
      const raw = localStorage.getItem(`fechasEtapas_${id}`);
      if (raw) {
        const etapas = JSON.parse(raw);
        etapas.forEach(([start, end]) => {
          if (start && end) {
            const startDate = new Date(start);
            const endDate = new Date(end);
            let current = new Date(startDate);
            while (current <= endDate) {
              fechas.push(new Date(current));
              current.setDate(current.getDate() + 1);
            }
          }
        });
      }
    });

    return fechas;
  };

  const fechasOcupadas = getFechasOcupadas();

  const calcularTotal = () => {
    const ids = ["analisis", "diseno", "desarrollo", "deploy", "pedagogica"];
    let total = ids.reduce((acc, id) => {
      const item = JSON.parse(localStorage.getItem(`diasEtapas_${id}`));
      return acc + (item?.totalDias || 0);
    }, 0);

    // 🧠 Extra: sumar duración si existe en `fechasEtapas_deploy[1]`
    const fechasTec = JSON.parse(
      localStorage.getItem("fechasEtapas_deploy")
    )?.[1];
    if (fechasTec?.[0]) {
      total;
    }

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
        <CapacitacionPedagogica disabledDates={fechasOcupadas} />
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

        {/* Pasamos el ID del periodo */}
        {/* <CalendarDeploy periodoId={periodoId} /> */}
        <CalendarDeploy disabledDates={fechasOcupadas} />

        {/*  Total de dias sumados */}
        <div className="flex justify-end">
          <Title level="h2" className="text-[#808080] mb-4 md:mr-[4rem]">
            Total = {totalGeneral} días
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
          onClick={guardarDataCalendar}
        />
      </div>
    </div>
  );
}

export default Process;
