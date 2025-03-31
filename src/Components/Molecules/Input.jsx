import React from "react";
import Title from "../Atoms/Title";

const Input = ({
  label,
  placeHolder,
  className,
  value,
  onChange,
  name,
  disabled,
}) => {
  return (
    <div>
      <Title level="h4" className="mb-2 ">
        {label}
      </Title>
      <input
        type="text"
        placeholder={placeHolder}
        className={` border-1 border-gray-400  rounded-md h-12 ${className}`}
        value={value}
        onChange={onChange}
        name={name}
        disabled={disabled}
        required
      />
    </div>
  );
};

export default Input;
