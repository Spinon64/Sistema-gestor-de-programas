import Title from "../Atoms/Title";
import CalendarProcess from "../Templates/CalendarProcess";
import ValidateCalendar from "../Templates/ValidateCalendar";
import Button from "../Atoms/Button";
import CalendarDeploy from "../Templates/CalendarDeploy";

function Process() {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-12 mt-10 flex flex-col gap-6 items-center">
      <Title level="h1" className="text-start mb-6 w-full max-w-4xl">
        Programa de procesos
      </Title>

      {/* Contenedor central de procesos */}
      <div className="w-full max-w-4xl">
        <CalendarProcess etapas={["Análisis", "Revisión", "Validación"]} />
        <CalendarProcess etapas={["Diseño", "Revisión", "Validación"]} />
        <CalendarProcess etapas={["Desarrollo", "Revisión", "Validación"]} />

        <CalendarDeploy />

        <div className="flex justify-end">
          <Title level="h2" className="text-[#808080] mb-4 md:mr-[4rem]">
            Total = 50 días
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
