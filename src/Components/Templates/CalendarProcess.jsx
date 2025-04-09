// CalendarProcess.jsx
import { useState, useCallback, useEffect } from "react";
import Title from "../Atoms/Title";
import Box from "../Atoms/Box";
import RangoFechas from "../Organisms/RangoFechas";
import { addDays } from "date-fns";

function CalendarProcess({
  id = "proceso",
  etapas = ["Etapa", "Revisión", "Validación"],
}) {
  const [dias, setDias] = useState(etapas.map(() => ({ dias: 0, range: [] })));

  const handleChangeDias = useCallback(
    (index) =>
      ({ dias, range }) => {
        setDias((prevDias) => {
          const nuevosDias = [...prevDias];
          nuevosDias[index] = { dias, range };

          // Autocompletar las siguientes etapas si es la primera
          if (index === 0 && dias > 0 && range.length === 2) {
            let lastEnd = new Date(range[1]);
            for (let i = 1; i < etapas.length; i++) {
              const nextStart = addDays(lastEnd, 1);
              const nextEnd = addDays(nextStart, dias - 1);
              nuevosDias[i] = {
                dias,
                range: [nextStart, nextEnd],
              };
              lastEnd = nextEnd;
            }
          }

          return nuevosDias;
        });
      },
    [etapas.length]
  );

  const total = dias.reduce((acc, val) => acc + (val?.dias || 0), 0);

  useEffect(() => {
    const fechasPorEtapa = etapas.map((_, index) => dias[index]?.range || []);
    localStorage.setItem(`fechasEtapas_${id}`, JSON.stringify(fechasPorEtapa));

    const totalDiasEtapas = {
      id,
      totalDias: total,
    };

    localStorage.setItem(`diasEtapas_${id}`, JSON.stringify(totalDiasEtapas));
    window.dispatchEvent(new Event("actualizarTotal"));

    console.log(totalDiasEtapas);
    console.log(fechasPorEtapa);
  }, [total, id, dias, etapas]);

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
              <div className="lg:basis-1/4 shrink-0 mr-[3rem] mb-2">
                <Title
                  level="h3"
                  className={index === 0 ? "font-bold" : "text-[#808080]"}
                >
                  {index === 0 ? etapa : `↳ ${etapa}`}
                </Title>
              </div>

              <div className="lg:basis-1/2">
                <RangoFechas
                  onChangeDays={handleChangeDias(index)}
                  initialRange={dias[index]?.range || []}
                />
              </div>

              <div className="lg:basis-1/4 text-right">
                <Title level="h3" className="text-[#808080]">
                  {dias[index]?.dias || 0}{" "}
                  {dias[index]?.dias === 1 ? "Día" : "Días"}
                </Title>
              </div>
            </div>
            <hr className="border-t border-gray-400 mt-2" />
          </div>
        ))}
      </div>

      <hr className="border-t border-gray-200 mt-4" />
      <div className="flex justify-end">
        <Title level="h3" className="text-[#808080]">
          Total = {total} {total === 1 ? "día" : "días"}
        </Title>
      </div>
    </Box>
  );
}

export default CalendarProcess;
