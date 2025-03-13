import React from "react";
import Title from "../Atoms/Title";

const Select = ({ label, options, name, value, onChange }) => {
  return (
    <div className="mb-4">
      <Title level="h4" className="mb-2">
        {label}
      </Title>
      <select
        className="border border-gray-300 bg-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 w-full h-12"
        name={name} // Asegura que el atributo name esté presente
        value={value} // Asigna el valor correctamente
        onChange={onChange} // Llama a la función `handleChange` en `ProgramCreation.js`
      >
        <option value="">Seleccione una opción</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
