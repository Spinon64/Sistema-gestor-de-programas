import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Title from "../Atoms/Title";
import CalendarProcess from "../Templates/CalendarProcess";
import ValidateCalendar from "../Templates/ValidateCalendar";
import Button from "../Atoms/Button";
import CalendarDeploy from "../Templates/CalendarDeploy";
import Typography from "@mui/material/Typography";
import Save from "../../assets/Save.svg";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import CapacitacionPedagogica from "../Templates/CapacitacionPedagogica";
import { updateCalendarBin, getBin } from "../../services/jsonBinConfig";

function Process() {
  const { id, periodoId } = useParams();
  const [maestria, setMaestria] = useState(null);
  const [periodoActual, setPeriodoActual] = useState(null);
  const [totalGeneral, setTotalGeneral] = useState(0);
  const navigate = useNavigate();

  const guardarDataCalendar = async () => {
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

    const actividadesCap = [];
    let totalCap = 0;

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

    if (fechasDeploy[1]?.[0]) {
      const start = fechasDeploy[1][0];
      const end = fechasDeploy[1][1] || fechasDeploy[1][0];
      const duracion =
        (new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24) + 1;
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

    const duracionTotal = etapas.reduce(
      (acc, etapa) => acc + etapa.duracionTotal,
      0
    );

    const dataCalendar = {
      programaId: Number(id),
      periodoId: periodId,
      calendario: {
        id: periodId,
        periodo: periodName,
        duracionTotal,
        etapas,
      },
    };

    try {
      await updateCalendarBin(dataCalendar);
      console.log("✅ Calendario guardado correctamente en JSONBin");

      ["analisis", "diseno", "desarrollo", "deploy", "pedagogica"].forEach(
        (key) => {
          localStorage.removeItem(`fechasEtapas_${key}`);
          localStorage.removeItem(`modalidadEtapas_${key}`);
          localStorage.removeItem(`diasEtapas_${key}`);
        }
      );

      // Redirección automática
      navigate(`/detalles-programa/${id}`);
    } catch (error) {
      alert("Error al guardar el calendario. Intenta de nuevo.");
      console.error(error);
    }
  };

  const calcularTotal = () => {
    let total = 0;

    // Procesos principales
    const etapasProceso = ["analisis", "diseno", "desarrollo"];
    etapasProceso.forEach((key) => {
      const fechas =
        JSON.parse(localStorage.getItem(`fechasEtapas_${key}`)) || [];
      fechas.forEach(([start, end]) => {
        if (start && end) {
          const duracion =
            (new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24) + 1;
          total += duracion;
        }
      });
    });

    // Implementación
    const fechasDeploy =
      JSON.parse(localStorage.getItem("fechasEtapas_deploy")) || [];
    if (fechasDeploy[0]?.[0] && fechasDeploy[0]?.[1]) {
      const duracion =
        (new Date(fechasDeploy[0][1]) - new Date(fechasDeploy[0][0])) /
          (1000 * 60 * 60 * 24) +
        1;
      total += duracion;
    }

    // Capacitación tecnológica
    if (fechasDeploy[1]?.[0] && fechasDeploy[1]?.[1]) {
      const duracion =
        (new Date(fechasDeploy[1][1]) - new Date(fechasDeploy[1][0])) /
          (1000 * 60 * 60 * 24) +
        1;
      total += duracion;
    }

    // Evaluación
    if (fechasDeploy[2]?.[0] && fechasDeploy[2]?.[1]) {
      const duracion =
        (new Date(fechasDeploy[2][1]) - new Date(fechasDeploy[2][0])) /
          (1000 * 60 * 60 * 24) +
        1;
      total += duracion;
    }

    // Capacitación pedagógica
    const fechasPedagogica =
      JSON.parse(localStorage.getItem("fechasEtapas_pedagogica")) || [];
    if (fechasPedagogica?.[0]) {
      const start = new Date(fechasPedagogica[0]);
      const end = new Date(fechasPedagogica[1] || fechasPedagogica[0]);
      const duracion = (end - start) / (1000 * 60 * 60 * 24) + 1;
      total += duracion;
    }

    setTotalGeneral(total);
  };

  useEffect(() => {
    const fetchData = async () => {
      const bin = await getBin();
      const programa = bin?.programas.find((p) => Number(p.id) === Number(id));
      if (!programa) return;
      const periodo = programa.periodos.find(
        (p) => Number(p.id) === Number(periodoId)
      );
      if (!periodo) return;
      setMaestria(programa);
      setPeriodoActual(periodo);
    };
    fetchData();
    calcularTotal();
  }, [id, periodoId]);

  useEffect(() => {
    const actualizarTotal = () => calcularTotal();
    window.addEventListener("actualizarTotal", actualizarTotal);
    return () => window.removeEventListener("actualizarTotal", actualizarTotal);
  }, []);

  const fechasOcupadas = (() => {
    const ids = ["analisis", "diseno", "desarrollo", "deploy"];
    const fechas = [];
    ids.forEach((id) => {
      const raw = localStorage.getItem(`fechasEtapas_${id}`);
      if (raw) {
        const etapas = JSON.parse(raw);
        etapas.forEach(([start, end]) => {
          if (start && end) {
            let current = new Date(start);
            const endDate = new Date(end);
            while (current <= endDate) {
              fechas.push(new Date(current));
              current.setDate(current.getDate() + 1);
            }
          }
        });
      }
    });
    return fechas;
  })();

  if (!maestria || !periodoActual) return <div>Cargando...</div>;

  return (
    <div className="w-full px-4 sm:px-6 lg:px-12 mt-10 flex flex-col gap-6 items-center">
      <Breadcrumbs className="self-start">
        <Link underline="hover" color="inherit" to="/">
          Programas
        </Link>
        <Link underline="hover" color="inherit" to={`/detalles-programa/${id}`}>
          {maestria.nombre}
        </Link>
        <Typography sx={{ color: "text.primary" }}>
          {periodoActual.nombre || periodoActual.periodo || "Periodo"}
        </Typography>
      </Breadcrumbs>

      <Title level="h1" className="text-start mb-6 w-full max-w-4xl">
        Programa de procesos - {periodoActual.nombre || "Periodo"}
      </Title>

      <div className="w-full max-w-4xl">
        <CalendarProcess
          id="analisis"
          etapas={["Análisis", "Revisión", "Validación"]}
          periodoId={periodoId}
        />
        <CapacitacionPedagogica disabledDates={fechasOcupadas} />
        <CalendarProcess
          id="diseno"
          etapas={["Diseño", "Revisión", "Validación"]}
          periodoId={periodoId}
        />
        <CalendarProcess
          id="desarrollo"
          etapas={["Desarrollo", "Revisión", "Validación"]}
          periodoId={periodoId}
        />
        <CalendarDeploy disabledDates={fechasOcupadas} />

        <div className="flex justify-end">
          <Title
            level="h2"
            className="text-[#808080] mb-4 md:mr-[4rem]"
            data-total-global
          >
            Total = {totalGeneral} días
          </Title>
        </div>
      </div>

      <div className="w-full max-w-3xl">
        <Title level="h1" className="text-start mb-4">
          Validar calendario
        </Title>
        <ValidateCalendar periodoId={periodoId} />
        <Button
          text="Guardar"
          img={Save}
          className="h-[2.5rem] w-full sm:w-1/2 lg:w-[20rem] mb-8"
          onClick={guardarDataCalendar}
        />
      </div>
    </div>
  );
}

export default Process;
