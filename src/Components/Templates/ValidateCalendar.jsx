import Box from "../Atoms/Box";
import Title from "../Atoms/Title";
import Input from "../Molecules/Input";

function ValidateCalendar() {
  return (
    <Box
      width="w-full"
      height="h-auto"
      className="w-full max-w-2/5 flex flex-col justify-between mb-6"
    >
      <div className="flex flex-row items-center justify-between">
        <Title level="h2" className="mr-4">
          Coordinador
        </Title>
        <Input
          placeHolder="ejemplo@ucol.mx"
          className="w-full h-[2.5rem] pl-2"
        />
      </div>
      <div className="flex flex-row items-center justify-between">
        <Title level="h2" className="mr-4">
          R.E.D
        </Title>
        <Input
          placeHolder="ejemplo@ucol.mx"
          className="w-full h-[2.5rem] pl-2"
        />
      </div>
      <div className="flex flex-row items-center justify-between">
        <Title level="h2" className="mr-4">
          E.A.D
        </Title>
        <Input
          placeHolder="ejemplo@ucol.mx"
          className="w-full h-[2.5rem] pl-2"
        />
      </div>
    </Box>
  );
}

export default ValidateCalendar;
