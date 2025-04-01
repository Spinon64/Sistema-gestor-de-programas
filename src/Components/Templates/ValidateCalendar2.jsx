import Box from "../Atoms/Box";
import Title from "../Atoms/Title";
import Input from "../Molecules/Input";

function ValidateCalendar() {
  const responsables = ["Correos"];

  return (
    <Box
      width="w-full"
      height="h-auto"
      className="w-full max-w-4xl flex flex-col gap-4 mb-6 mx-auto"
    >
      {responsables.map((label, index) => (
        <div
          key={index}
          className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between w-full"
        >
          <div className="sm:w-1/4">
            <Title level="h2">{label}</Title>
          </div>
          <div className="sm:w-3/4">
            <Input
              placeHolder="ejemplo@ucol.mx"
              className="w-full h-[2.5rem] pl-2"
            />
          </div>
        </div>
      ))}
    </Box>
  );
}

export default ValidateCalendar;
