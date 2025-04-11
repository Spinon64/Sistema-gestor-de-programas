import React from "react";

const TextArea = ({ className, placeholder }) => {
  return (
    <textarea
      className={`flex min-h-[80px] w-full rounded-md  bg-background px-3 py-2 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      placeholder={placeholder}
      style={{ outline: "none" }} // Elimina el anillo de enfoque
    />
  );
};

export default TextArea;
