import React from "react";

function ProgressBar({ currentPhase = 0 }) {
  // Definimos las fases
  const phases = ["A", "D", "D", "I", "E"];

  return (
    <div className="w-full max-w-3xl mx-auto py-4 px-2 overflow-x-auto">
      <div className="flex items-center justify-between min-w-[280px]">
        {phases.map((phase, index) => (
          <React.Fragment key={index}>
            {/* Círculo de fase */}
            <div
              className={`
                w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center 
                text-sm sm:text-base md:text-lg font-bold shrink-0
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
                  flex-grow h-1 mx-1 sm:mx-2
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
