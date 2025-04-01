import Title from "../Atoms/Title";
import Box from "../Atoms/Box";
import RangoFechas from "../Organisms/RangoFechas";
import { useCallback, useState, useEffect } from "react";
import SingleDatePicker from "../Organisms/SingleDatePicker";

/**
 * CalendarDeploy muestra fases específicas ("Implementación" y "Evaluación").
 * Calcula y guarda la suma total de días en localStorage y notifica cambios a Process.
 */
function CalendarDeploy() {
  const items = ["Implementación", "Capacitacion Tecnologica", "Evaluación"];
  const [dias, setDias] = useState(Array(items.length).fill(0));

  // Manejador para cambiar los dias por cada etapa
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

  // Reduce para sumar los dias del arreglo dias iniciando en 0
  const total = dias.reduce((acc, val) => acc + val, 0);

  useEffect(() => {
    const totalDiasDeploy = {
      totalDias: total,
    };
    localStorage.setItem("diasEtapas_deploy", JSON.stringify(totalDiasDeploy));

    // 🔔 Notifica a Process que debe recalcular
    window.dispatchEvent(new Event("actualizarTotal"));
  }, [total]);

  return (
    <Box
      width="w-full"
      height="h-auto"
      className="flex flex-col p-4 gap-4 mb-6 max-w-3xl mx-auto"
    >
      <div className="flex flex-col gap-6">
        {items.map((etapa, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between"
          >
            {/* Etapa */}
            <div className="lg:basis-1/4 shrink-0 mr-[3rem] mb-2">
              <Title level="h3" className="font-semibold">
                {etapa}
              </Title>
            </div>

            {/* Fecha */}
            <div className="lg:basis-1/2">
              {etapa === "Capacitacion Tecnologica" ? (
                <div className="flex flex-col gap-3">
                  <select className="border mt-1 border-gray-300 bg-gray-200 rounded-md px-4 focus:outline-none focus-ring-2 focus:ring-gray-400 w-[250px] h-[3rem]">
                    <option>Presencial</option>
                    <option>Virtual</option>
                  </select>
                  <SingleDatePicker
                    onChangeDays={handleChangeDias(index)}
                    className="!w-[250px] h-[3rem]"
                    label=""
                  />
                </div>
              ) : (
                <RangoFechas onChangeDays={handleChangeDias(index)} />
              )}
            </div>

            {/* Días */}
            <div className="lg:basis-1/4 text-right">
              <Title level="h3" className="text-[#808080]">
                {dias[index]} {dias[index] === 1 ? "Día" : "Días"}
              </Title>
            </div>
            <hr />
          </div>
        ))}
      </div>

      <hr className="border-t border-gray-200 mt-4" />

      <div className="flex justify-end">
        <Title level="h3" className="text-[#808080]">
          Total = {total} días
        </Title>
      </div>
    </Box>
  );
}

export default CalendarDeploy;
