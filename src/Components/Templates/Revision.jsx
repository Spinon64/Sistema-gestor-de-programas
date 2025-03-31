import Button from "../Atoms/Button";
import Title from "../Atoms/Title";

function Revision() {
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
          Ver programa sintético
        </a>
      </div>

      <div className="flex flex-col">
        <Title className="mb-3">Retroalimentación</Title>
        <textarea
          className="w-1/3 resize-none border rounded-xl p-2    "
          rows={7}
          placeholder="Escribe aqui..."
        />
      </div>
      <div className="mt-10 flex flex-row w-1/3 justify-between">
        <Button className="" text="Aceptar" />
        <Button className="" text="Rechazar" />
      </div>
    </div>
  );
}

export default Revision;
