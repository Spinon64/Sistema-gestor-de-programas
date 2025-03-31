import Button from "../Atoms/Button";
import Title from "../Atoms/Title";
import Input from "../Molecules/Input";

function FaseAnalisis() {
  return (
    <div className="p-4 max-w-9xl mx-10">
      <div className="mb-6">
        <Title level="h1" className="mt-5 mb-6 self-start">
          Maestría en ciencia de datos
        </Title>
        <Title level="h2" className="mt-5 mb-6 self-start">
          Fase de Análisis
        </Title>
        <Title level="h2" className="mt-5 mb-6 self-start">
          Análisis de Datos
        </Title>
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-indigo-600 underline hover:text-indigo-800 hover:underline-offset-4 transition-all cursor-pointer"
        >
          Consultar documento curricular
        </a>
      </div>

      <div>
        <Title className="mb-3">Programa sintético de la asignatura</Title>
        <Input disabled className="px-29"></Input>
        <Button className="mt-3" text="Crear Google Doc" />
      </div>
      <div className="mt-10">
        <Button className="mt-3" text="Enviar a revisión" />
      </div>
    </div>
  );
}

export default FaseAnalisis;
