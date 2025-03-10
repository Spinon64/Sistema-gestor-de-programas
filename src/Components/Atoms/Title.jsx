import React from "react";
import PropTypes from "prop-types";

const Title = ({ level = "h1", children, className = "" }) => {
  // Definir los estilos base según el nivel del título
  const baseStyles = {
    h1: "text-3xl font-bold",
    h2: "text-2xl font-semibold",
    h3: "text-xl font-medium",
    h4: "text-lg font-normal",
    h5: "text-base font-light",
    h6: "text-sm font-light",
  };

  // Obtener el tipo de etiqueta (h1, h2, etc.)
  const Component = level;

  return (
    <Component className={`${baseStyles[level]} ${className}`}>
      {children}
    </Component>
  );
};

// Definir los tipos de datos esperados (Type Checking)
Title.propTypes = {
  level: PropTypes.oneOf(["h1", "h2", "h3", "h4", "h5", "h6"]),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Title;
