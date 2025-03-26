import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Title from "../Atoms/Title";
import CalendarProcess from "../Templates/CalendarProcess";
import ValidateCalendar from "../Templates/ValidateCalendar";
import Button from "../Atoms/Button";
import CalendarDeploy from "../Templates/CalendarDeploy";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";

/**
 * Componente principal que agrupa todos los calendarios de etapas.
 * Escucha eventos globales para recalcular el total general de días.
 */
function Process() {
  const [totalGeneral, setTotalGeneral] = useState(0);
  const { id } = useParams(); // Aquí obtienes el parámetro id de la URL
  console.log(id);
  const [maestria, setMaestria] = useState(null);

  // Funcion para calcular el total general sumando todos los valores del localstorage
  const calcularTotal = () => {
    const ids = ["analisis", "diseno", "desarrollo", "deploy"]; // Array con identificadores que guardan datos en localstorage
    // Reduce para sumar los valores de totalDias para cada uno de los is en el arreglo ids
    const total = ids.reduce((acc, id) => {
      // Obtiene valor del localstorage bajo la clave diasEtapas_{id} como las de ids
      const item = JSON.parse(localStorage.getItem(`diasEtapas_${id}`));
      // Si item es un valor valido se obtiene el valor de totalDias y en cada iteracion sumamos el valor
      return acc + (item?.totalDias || 0);
    }, 0);
    setTotalGeneral(total);
  };

  // Escuchamos el evento 'actualizarTotal' para recalcular el total global
  useEffect(() => {
    calcularTotal(); // Cálculo inicial

    const handleActualizar = () => {
      calcularTotal(); // Recalcula cuando se dispara el evento
    };

    window.addEventListener("actualizarTotal", handleActualizar);

    return () => {
      window.removeEventListener("actualizarTotal", handleActualizar);
    };
  }, []);

  useEffect(() => {
    // Cargar los datos de la maestría desde localStorage
    const savedMaestria = localStorage.getItem("maestria");
    const maestriaData = savedMaestria ? JSON.parse(savedMaestria) : null;

    if (maestriaData && maestriaData.id === parseInt(id)) {
      setMaestria(maestriaData);
    } else {
      console.error("Maestría no encontrada.");
    }
  }, [id]);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-12 mt-10 flex flex-col gap-6 items-center">
      <Breadcrumbs>
        <Link underline="hover" color="inherit" to="/">
          Programas
        </Link>
        <Link underline="hover" color="inherit" to="/detalles-programa/:id">
          {maestria?.nombre}
        </Link>
      </Breadcrumbs>

      <Title level="h1" className="text-start mb-6 w-full max-w-4xl">
        Programa de procesos
      </Title>

      {/* Etapas */}
      <div className="w-full max-w-4xl">
        <CalendarProcess
          id="analisis"
          etapas={["Análisis", "Revisión", "Validación"]}
        />
        <CalendarProcess
          id="diseno"
          etapas={["Diseño", "Revisión", "Validación"]}
        />
        <CalendarProcess
          id="desarrollo"
          etapas={["Desarrollo", "Revisión", "Validación"]}
        />

        <CalendarDeploy />

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

        <ValidateCalendar />

        <Button
          text="Guardar"
          className="h-[2.5rem] w-full sm:w-1/2 lg:w-[20rem] mb-8 "
        />
      </div>
    </div>
  );
}

export default Process;
