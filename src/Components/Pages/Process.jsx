import { useState, useEffect } from "react";
import Title from "../Atoms/Title";
import CalendarProcess from "../Templates/CalendarProcess";
import ValidateCalendar from "../Templates/ValidateCalendar";
import Button from "../Atoms/Button";
import CalendarDeploy from "../Templates/CalendarDeploy";

function Process() {
  const [totalGeneral, setTotalGeneral] = useState(0);

  const calcularTotal = () => {
    const ids = ["analisis", "diseno", "desarrollo", "deploy"];
    const total = ids.reduce((acc, id) => {
      const item = JSON.parse(localStorage.getItem(`diasEtapas_${id}`));
      return acc + (item?.totalDias || 0);
    }, 0);
    setTotalGeneral(total);
  };

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

  console.log("totalGeneral", totalGeneral);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-12 mt-10 flex flex-col gap-6 items-center">
      <Title level="h1" className="text-start mb-6 w-full max-w-4xl">
        Programa de procesos
      </Title>

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

        <div className="flex justify-end">
          <Title level="h2" className="text-[#808080] mb-4 md:mr-[4rem]">
            Total = {totalGeneral} días
          </Title>
        </div>
      </div>

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
