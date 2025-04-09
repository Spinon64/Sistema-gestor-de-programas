import Title from "../Atoms/Title";
import Box from "../Atoms/Box";
import RangoFechas from "../Organisms/RangoFechas";
import { useCallback, useState, useEffect } from "react";
import SingleDatePicker from "../Organisms/SingleDatePicker";

/**
 * CalendarDeploy muestra fases específicas ("Implementación", "Capacitación Tecnológica", "Evaluación").
 * Guarda la suma total de días y los rangos seleccionados en localStorage.
 */
function CalendarDeploy({ disabledDates = [] }) {
  const items = ["Implementación", "Capacitacion Tecnologica", "Evaluación"];
  const [dias, setDias] = useState(Array(items.length).fill({ dias: 0 }));
  const [modalidadTec, setModalidadTec] = useState("Presencial");
  const [fechaTec, setFechaTec] = useState(null); // Nueva: fecha única

  const handleChangeDias = useCallback(
    (index) => (value) => {
      const nuevoValor = typeof value === "object" ? value : { dias: value };
      setDias((prevDias) => {
        const nuevosDias = [...prevDias];
        nuevosDias[index] = nuevoValor;
        return nuevosDias;
      });
    },
    []
  );

  const total = dias.reduce((acc, val) => acc + (val?.dias || 0), 0);

  useEffect(() => {
    // Guardar total
    const totalDiasDeploy = { totalDias: total };
    localStorage.setItem("diasEtapas_deploy", JSON.stringify(totalDiasDeploy));

    // Guardar rangos de fechas
    const fechasPorEtapa = dias.map((etapa) => etapa.range || []);
    localStorage.setItem("fechasEtapas_deploy", JSON.stringify(fechasPorEtapa));

    // ✅ Guardar modalidad de capacitación tecnológica
    localStorage.setItem(
      "modalidadEtapas_tecnologica",
      JSON.stringify(modalidadTec)
    );

    // Notificar actualización
    window.dispatchEvent(new Event("actualizarTotal"));
  }, [dias, total, modalidadTec]);

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
                <div className="flex  gap-3">
                  <select
                    className="border mt-1 border-gray-300 bg-gray-200 rounded-md px-4 focus:outline-none focus-ring-2 focus:ring-gray-400 w-[150px] h-[3rem]"
                    value={modalidadTec}
                    onChange={(e) => setModalidadTec(e.target.value)}
                  >
                    <option>Presencial</option>
                    <option>Virtual</option>
                  </select>
                  <SingleDatePicker
                    onChangeDays={(dias) =>
                      handleChangeDias(index)({
                        dias,
                        range: [fechaTec, fechaTec], // Guardamos como rango válido
                      })
                    }
                    onChangeFecha={(fecha) => {
                      setFechaTec(fecha); // Guardamos fecha seleccionada
                      if (fecha) {
                        handleChangeDias(index)({
                          dias: 1,
                          range: [fecha, fecha],
                        });
                      }
                    }}
                    className="!w-[160px] h-[3rem]"
                    label=""
                    disabledDates={disabledDates}
                  />
                </div>
              ) : (
                <RangoFechas
                  onChangeDays={(val) =>
                    handleChangeDias(index)({
                      dias: val.dias,
                      range: val.range,
                    })
                  }
                  disabledDates={disabledDates}
                  className="!w-[300px]"
                />
              )}
            </div>

            {/* Días */}
            <div className="lg:basis-1/4 text-right">
              <Title level="h3" className="text-[#808080]">
                {dias[index]?.dias || 0}{" "}
                {dias[index]?.dias === 1 ? "Día" : "Días"}
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
