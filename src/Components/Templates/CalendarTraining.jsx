import { DatePicker } from "@mui/x-date-pickers";
import Box from "../Atoms/Box";
import Title from "../Atoms/Title";
import RangoFechas from "../Organisms/RangoFechas";
import SingleDatePicker from "../Organisms/SingleDatePicker";

function CalendarTraining() {
  return (
    <Box
      width="w-full"
      height="h-auto"
      className="flex flex-col p-4 gap-4 mb-6 max-w-3xl mx-auto"
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
          {/* Etapa */}
          <div className="lg:basis-1/4 shrink-0 mb-2">
            <Title level="h3" className="font-semibold">
              Capacitación Pedagógica
            </Title>
          </div>

          <div className="lg:basis-1/4 mr-3">
            <select className="border border-gray-300 bg-gray-200 rounded-md px-4 focus:outline-none focus-ring-2 focus:ring-gray-400 w-full h-14">
              <option>Presencial</option>
              <option>Virtual</option>
            </select>
          </div>

          {/* Fecha */}
          <div className="lg:basis-1/4 mb-5">
            <SingleDatePicker
              label="Escoger fecha"
              onChange={(date) => console.log("Fecha seleccionada:", date)}
            />
          </div>

          {/* Días */}
          <div className="lg:basis-1/4 text-right">
            <Title level="h3" className="text-[#808080]">
              1 Día
            </Title>
          </div>
          <hr />
        </div>
        {/* ############################################ */}
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
          {/* Etapa */}
          <div className="lg:basis-1/4 shrink-0 mb-2">
            <Title level="h3" className="font-semibold">
              Capacitación Tecnológica
            </Title>
          </div>

          <div className="lg:basis-1/4 mr-3">
            <select className="border border-gray-300 bg-gray-200 rounded-md px-4 focus:outline-none focus-ring-2 focus:ring-gray-400 w-full h-14">
              <option>Presencial</option>
              <option>Virtual</option>
            </select>
          </div>

          {/* Fecha */}
          <div className="lg:basis-1/4 mb-5">
            <SingleDatePicker
              label="Escoger fecha"
              onChange={(date) => console.log("Fecha seleccionada:", date)}
            />
          </div>

          {/* Días */}
          <div className="lg:basis-1/4 text-right">
            <Title level="h3" className="text-[#808080]">
              1 Día
            </Title>
          </div>
          <hr />
        </div>
      </div>

      <hr className="border-t border-gray-200 mt-4" />

      <div className="flex justify-end">
        <Title level="h3" className="text-[#808080]">
          Total = 2 días
        </Title>
      </div>
    </Box>
  );
}

export default CalendarTraining;
