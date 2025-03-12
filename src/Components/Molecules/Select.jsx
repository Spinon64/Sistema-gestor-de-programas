import React, { useState } from "react";
import Title from "../Atoms/Title";

const Select = ({ label, options }) => {
  const [selected, setSelected] = useState("");

  return (
    <div className="mb-4">
      <Title level="h4" className="mb-2">
        {label}
      </Title>
      <select
        className="border  border-gray-300 bg-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 w-full h-12"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
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
