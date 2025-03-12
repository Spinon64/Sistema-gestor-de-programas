import React from "react";
import Title from "../Atoms/Title";

const Input = ({ label, placeHolder, className }) => {
  return (
    <div>
      <Title level="h4" className="mb-2 ">
        {label}
      </Title>
      <input
        type="text"
        placeholder={placeHolder}
        className={`${className} border-1 border-gray-400  rounded-md h-12`}
      />
    </div>
  );
};

export default Input;
