import Button from "../Atoms/Button";
import Title from "../Atoms/Title";

function Revision() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="border-l-4 border-indigo-600 pl-4">
            <Title level="h1" className="text-2xl font-bold text-gray-900">
              Fase de Analisis
            </Title>
            <Title
              level="h2"
              className="text-xl font-semibold text-gray-700 mt-2"
            >
              Maestría en ciencia de datos
            </Title>
            <Title
              level="h3"
              className="text-lg font-medium text-gray-600 mt-1"
            >
              Análisis de Datos
            </Title>
          </div>

          <div className="mt-4 flex justify-end">
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center font-medium text-indigo-600 hover:text-indigo-800 transition-all cursor-pointer"
            >
              <span>Ver programa sintético</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Feedback Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <Title className="text-xl font-semibold text-gray-800 mb-4 ">
            Retroalimentación
          </Title>

          <div className="relative">
            <textarea
              className="w-full resize-none border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              rows={7}
              placeholder="Escribe aquí tu retroalimentación..."
            />
            <div className="absolute bottom-3 right-3 text-xs text-gray-400">
              Retroalimentación
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-end">
            <Button
              text="Rechazar"
              className="px-6  border border-gray-300 rounded-lg !text-gray-700 bg-white hover:bg-gray-50 transition-all"
            />
            <Button
              text="Aceptar"
              className="px-6  bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Revision;
