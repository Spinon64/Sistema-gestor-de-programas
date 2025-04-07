import { useEffect, useState } from "react";
import Box from "../Atoms/Box";
import Title from "../Atoms/Title";
import SingleDatePicker from "../Organisms/SingleDatePicker";

function CapacitacionPedagogica({ disabledDates = [] }) {
  const [fecha, setFecha] = useState(null);
  const [modalidad, setModalidad] = useState("Presencial");

  // ✅ Cargar fecha y modalidad guardadas
  useEffect(() => {
    const fechasGuardadas =
      JSON.parse(localStorage.getItem("fechasEtapas_pedagogica")) || [];
    const modalidadGuardada =
      JSON.parse(localStorage.getItem("modalidadEtapas_pedagogica")) ||
      "Presencial";

    if (fechasGuardadas[0]) {
      setFecha(fechasGuardadas[0]);
    }
    setModalidad(modalidadGuardada);
  }, []);

  // ✅ Guardar cambios al seleccionar fecha o modalidad
  useEffect(() => {
    if (fecha) {
      const duracion = 1;
      localStorage.setItem(
        "fechasEtapas_pedagogica",
        JSON.stringify([fecha, fecha])
      );
      localStorage.setItem(
        "diasEtapas_pedagogica",
        JSON.stringify({ totalDias: duracion })
      );
      localStorage.setItem(
        "modalidadEtapas_pedagogica",
        JSON.stringify(modalidad)
      );
      window.dispatchEvent(new Event("actualizarTotal"));
    }
  }, [fecha, modalidad]);

  return (
    <Box
      width="w-full"
      height="h-auto"
      className="flex flex-col p-4 gap-4 mb-6 max-w-3xl mx-auto"
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
          {/* Nombre de la etapa */}
          <div className="lg:basis-1/4 shrink-0 mb-2">
            <Title level="h3" className="font-semibold">
              Capacitación Pedagógica
            </Title>
          </div>

          {/* Modalidad */}
          <div className="lg:basis-1/4 w-[250px] lg:w-full mr-3">
            <select
              className="border border-gray-300 bg-gray-200 rounded-md px-4 focus:outline-none focus:ring-2 focus:ring-gray-400 w-full h-14"
              value={modalidad}
              onChange={(e) => setModalidad(e.target.value)}
            >
              <option>Presencial</option>
              <option>Virtual</option>
            </select>
          </div>

          {/* Selector de fecha */}
          <div className="lg:basis-1/4 mb-1 w-[250px] lg:w-full">
            <SingleDatePicker
              label=""
              onChangeFecha={(date) => setFecha(date)}
              disabledDates={disabledDates}
            />
          </div>

          {/* Visualización de días */}
          <div className="lg:basis-1/4 text-right">
            <Title level="h3" className="text-[#808080]">
              {fecha ? "1 Día" : "0 Días"}
            </Title>
          </div>
        </div>
      </div>
    </Box>
  );
}

export default CapacitacionPedagogica;
