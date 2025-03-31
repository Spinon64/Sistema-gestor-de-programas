function ProgressBar({ currentPhase }) {
  // Definimos las fases
  const phases = ["A", "D", "D", "I", "E"];

  return (
    <div className="w-full py-4 px-2">
      <div className="flex items-center justify-between">
        {phases.map((phase, index) => (
          <React.Fragment key={index}>
            {/* Círculo de fase */}
            <div
              className={`
                w-12 h-12 rounded-full flex items-center justify-center font-bold
                ${
                  index <= currentPhase
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 text-gray-600"
                }
              `}
            >
              {phase}
            </div>

            {/* Línea de conexión (excepto después del último elemento) */}
            {index < phases.length - 1 && (
              <div
                className={`
                  flex-grow h-1 mx-2
                  ${index < currentPhase ? "bg-green-500" : "bg-gray-300"}
                `}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProgressBar;
