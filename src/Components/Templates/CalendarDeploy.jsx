import DeployPhase from "../Molecules/DeployPhase";
import Title from "../Atoms/Title";
import Box from "../Atoms/Box";
import DateFormat from "../Organisms/DateFormat";

function CalendarDeploy() {
  return (
    <Box
      width="w-full"
      height="h-auto"
      className="flex flex-col justify-start gap-6 p-6 mb-6"
    >
      <div className="flex flex-row rounded-2xl justify-between">
        <DeployPhase />
        <div className="flex flex-col">
          <DateFormat />
          <DateFormat />
        </div>
        <div className="flex flex-col">
          <Title level="h3" className="text-[#808080] pb-1">
            Hasta
          </Title>
          <Title level="h3" className="text-[#808080] pb-1">
            Hasta
          </Title>
        </div>
        <div className="flex flex-col">
          <DateFormat />
          <DateFormat />
        </div>
        <div className="flex flex-col pr-4 ">
          <Title level="h3" className="text-[#808080] pb-1">
            5 Días
          </Title>
          <Title level="h3" className="text-[#808080]">
            5 Días
          </Title>
        </div>
      </div>
    </Box>
  );
}

export default CalendarDeploy;
