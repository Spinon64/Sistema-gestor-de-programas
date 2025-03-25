import Title from "../Atoms/Title";
import Box from "../Atoms/Box";
import RangoFechas from "../Organisms/RangoFechas";

function CalendarProcess({ etapas = ["Etapa", "Revisión", "Validación"] }) {
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
              {/* Etapa */}
              <div className="lg:basis-1/4 shrink-0 mr-[3rem]">
                <Title
                  level="h3"
                  className={`${index === 0 ? "font-bold" : "text-[#808080]"}`}
                >
                  {index === 0 ? etapa : `↳${etapa}`}
                </Title>
              </div>

              {/* Fecha */}
              <div className="lg:basis-1/2">
                <RangoFechas />
              </div>

              {/* Días */}
              <div className="lg:basis-1/4 text-right">
                <Title level="h3" className="text-[#808080]">
                  5 Días
                </Title>
              </div>
              {/* Línea separadora por cada fila */}
              <hr />
            </div>
          </div>
        ))}
      </div>

      {/* Línea y total */}
      <hr className="border-t border-gray-200 mt-4" />
      <div className="flex justify-end">
        <Title level="h3" className="text-[#808080]">
          Total = 15 días
        </Title>
      </div>
    </Box>
  );
}

export default CalendarProcess;
