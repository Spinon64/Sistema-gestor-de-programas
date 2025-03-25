import { useState, useCallback, useEffect } from "react";
import Title from "../Atoms/Title";
import Box from "../Atoms/Box";
import RangoFechas from "../Organisms/RangoFechas";

function CalendarProcess({
  id = "proceso", // <- identificador único para el grupo de etapas
  etapas = ["Etapa", "Revisión", "Validación"],
}) {
  const [dias, setDias] = useState(Array(etapas.length).fill(0));

  const handleChangeDias = useCallback(
    (index) => (value) => {
      setDias((prevDias) => {
        const nuevosDias = [...prevDias];
        nuevosDias[index] = value;
        return nuevosDias;
      });
    },
    []
  );

  const total = dias.reduce((acc, val) => acc + val, 0);

  useEffect(() => {
    const totalDiasEtapas = {
      id,
      totalDias: total,
    };
    localStorage.setItem(`diasEtapas_${id}`, JSON.stringify(totalDiasEtapas));

    // 🔔 Notifica a Process que debe recalcular
    window.dispatchEvent(new Event("actualizarTotal"));
  }, [total, id]);

  return (
    <Box
      width="w-full"
      height="h-auto"
      className="flex flex-col gap-4 p-4 mb-6 max-w-3xl mx-auto"
    >
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

              <div className="lg:basis-1/2">
                <RangoFechas onChangeDays={handleChangeDias(index)} />
              </div>

              <div className="lg:basis-1/4 text-right">
                <Title level="h3" className="text-[#808080]">
                  {dias[index]} {dias[index] === 1 ? "Día" : "Días"}
                </Title>
              </div>
            </div>
            <hr className="border-t border-gray-400 mt-1" />
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <Title level="h3" className="text-[#808080]">
          Total = {total} {total === 1 ? "día" : "días"}
        </Title>
      </div>
    </Box>
  );
}

export default CalendarProcess;
