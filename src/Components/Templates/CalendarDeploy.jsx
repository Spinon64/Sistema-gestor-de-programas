import Title from "../Atoms/Title";
import Box from "../Atoms/Box";
import RangoFechas from "../Organisms/RangoFechas";

function CalendarDeploy() {
  const items = ["Implementación", "Evaluación"];

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
              <RangoFechas />
            </div>

            {/* Días */}
            <div className="lg:basis-1/4 text-right">
              <Title level="h3" className="text-[#808080]">
                5 Días
              </Title>
            </div>
            <hr />
          </div>
        ))}
      </div>

      <hr className="border-t border-gray-200 mt-4" />

      <div className="flex justify-end">
        <Title level="h3" className="text-[#808080]">
          Total = 15 días
        </Title>
      </div>
    </Box>
  );
}

export default CalendarDeploy;
