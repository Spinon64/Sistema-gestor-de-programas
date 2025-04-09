import React, { useState, useRef, useEffect } from "react";
import Title from "../Atoms/Title";

const CustomSelect = ({
  label,
  options,
  name,
  value,
  onChange,
  disabled,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionClick = (option) => {
    const syntheticEvent = {
      target: { value: option },
    };
    onChange(syntheticEvent);
    setIsOpen(false);
  };

  return (
    <div className="mb-4">
      <Title level="h4" className="mb-2">
        {label}
      </Title>
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          className={`border border-gray-300 bg-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 w-full h-12 text-left ${className}`}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
        >
          {value || "Seleccione una opción"}
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
            <ul className="py-1">
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleOptionClick("")}
              >
                Seleccione una opción
              </li>
              {options.map((option, index) => (
                <li
                  key={index}
                  className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                    option === value ? "bg-blue-100" : ""
                  }`}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* Hidden real select for form submission */}
        <select
          name={name}
          value={value}
          onChange={() => {}}
          className="sr-only"
          required={true}
        >
          <option value="">Seleccione una opción</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CustomSelect;
