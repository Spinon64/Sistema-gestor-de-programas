import NextRow from "../Atoms/NextRow";
import Title from "../Atoms/Title";
function ReviewValidation({ children }) {
  return (
    <div className="flex flex-col rounded-2xl pl-4">
      <Title level="h2">{children}</Title>
      <div className="flex flex-row">
        <NextRow />
        <Title level="h3" className="text-[#808080]">
          Revisión
        </Title>
      </div>
      <div className="flex flex-row">
        <NextRow />
        <Title level="h3" className="text-[#808080]">
          Validación
        </Title>
      </div>
    </div>
  );
}

export default ReviewValidation;
