import { useState, useCallback, useEffect } from "react";
import Title from "../Atoms/Title";
import Box from "../Atoms/Box";
import RangoFechas from "../Organisms/RangoFechas";

// CalendarProcess permite seleccionar rangos de fechas por etapas
// Guarda el total de dias de cada grupo en localtorage y notifica cambios al componente padre
function CalendarProcess({
  id = "proceso", // ID unico para identificar este conjunto de etapas en el localstorage
  etapas = ["Etapa", "Revisión", "Validación"], // Etapas mostradas por este calendario
}) {
  // Estado que guarda los dias calculador por etapa
  const [dias, setDias] = useState(Array(etapas.length).fill(0));

  // Funcion para actualizar los dias cuando cambian las fechas
  const handleChangeDias = useCallback(
    // Funcion index recibe index y devuelve segunda funcon value  y se usara para actualizar el estado de dias
    (index) => (value) => {
      setDias((prevDias) => {
        const nuevosDias = [...prevDias]; // Copia del estado actual
        nuevosDias[index] = value; // Actualiza el valor en el indice especifico
        return nuevosDias; // Devuelve el nuevo array con el valor actualizado
      });
    },
    []
  );

  // Calculamos el total de dias sumando todos los dias por etapa
  const total = dias.reduce((acc, val) => acc + val, 0);

  // Guardamos el total de dias en localstorage cada vez que cambia
  useEffect(() => {
    const totalDiasEtapas = {
      id,
      totalDias: total,
    };
    localStorage.setItem(`diasEtapas_${id}`, JSON.stringify(totalDiasEtapas));

    // 🔔 Notifica a Process que debe recalcular el total general
    window.dispatchEvent(new Event("actualizarTotal"));
  }, [total, id]);

  return (
    <Box
      width="w-full"
      height="h-auto"
      className="flex flex-col gap-4 p-4 mb-6 max-w-3xl mx-auto"
    >
      {/* Nombre de la etapa */}
      <div className="flex flex-col gap-6 w-full">
        {etapas.map((etapa, index) => (
          <div key={index} className="flex flex-col gap-2">
            <div className="flex flex-col gap-1 lg:flex-row lg:items-center lg:justify-between w-full">
              <div className="lg:basis-1/4 shrink-0 mr-[3rem]">
                <Title
                  level="h3"
                  className={index === 0 ? "font-bold" : "text-[#808080]"}
                >
                  {index === 0 ? etapa : `↳${etapa}`}
                </Title>
              </div>

              {/* Seleccion de fechas */}
              <div className="lg:basis-1/2">
                <RangoFechas onChangeDays={handleChangeDias(index)} />
              </div>

              {/* Visualizacion de dias */}
              <div className="lg:basis-1/4 text-right">
                <Title level="h3" className="text-[#808080]">
                  {dias[index]} {dias[index] === 1 ? "Día" : "Días"}
                </Title>
              </div>
              <hr className="border-t border-gray-400 mt-1" />
            </div>
          </div>
        ))}
      </div>
      <hr className="border-t border-gray-200 mt-4" />

      {/* Total por conjunto de etapas */}
      <div className="flex justify-end">
        <Title level="h3" className="text-[#808080]">
          Total = {total} {total === 1 ? "día" : "días"}
        </Title>
      </div>
    </Box>
  );
}

export default CalendarProcess;
