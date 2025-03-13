import Title from "../Atoms/Title";
import CalendarProcess from "../Templates/CalendarProcess";
import ValidateCalendar from "../Templates/ValidateCalendar";
import Button from "../Atoms/Button";
import CalendarDeploy from "../Templates/CalendarDeploy";

function Process() {
  return (
    <div className="w-full max-w-3/4 px-6 mt-10 flex flex-col md:mt-10 lg:px-8 md:mx-10 lg:mt-10">
      <Title level="h1" className="mb-5 md:mx-3 text-start">
        Programa de procesos
      </Title>
      <CalendarProcess>Análisis</CalendarProcess>
      <CalendarProcess>Diseño</CalendarProcess>
      <CalendarProcess>Desarrollo</CalendarProcess>
      <CalendarDeploy />
      <Title level="h2" className="mb-5 md:mx-3 text-end text-[#808080]">
        Total = 50 días
      </Title>
      <Title level="h1" className="mb-5 md:mx-3 text-start">
        Validar calendario
      </Title>
      <ValidateCalendar />
      <Button
        text="Guardar"
        className="h-[2.5rem] w-full md:w-full lg:w-[20rem] mb-8"
      />
    </div>
  );
}

export default Process;
