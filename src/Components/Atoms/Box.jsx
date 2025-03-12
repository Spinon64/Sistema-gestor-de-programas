import React from "react";

const Box = ({ width = "w-64", height = "h-48", children, className = "" }) => {
  return (
    <div
      className={`bg-white rounded-lg p-4 flex
      shadow-[0px_0px_6px_4px_rgba(0,_0,_0,_0.1)]
      ${width} ${height} ${className}`}
    >
      {children}
    </div>
  );
};

export default Box;
