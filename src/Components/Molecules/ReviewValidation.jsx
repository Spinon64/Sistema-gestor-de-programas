import Title from "../Atoms/Title";

function ReviewValidation({ lines }) {
  return (
    <div className="flex flex-col gap-3 md:gap-y-9 pl-2 md:pl-4">
      {lines.map((line, idx) => (
        <Title
          key={idx}
          level="h3"
          className={idx === 0 ? "font-bold" : "text-[#808080]"}
        >
          {idx === 0 ? line : `↳${line}`}
        </Title>
      ))}
    </div>
  );
}

export default ReviewValidation;
