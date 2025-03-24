import React, { useState } from "react";

const FileUploadButton = ({ label, onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  // Manejar el cambio de archivo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (onFileSelect) {
      onFileSelect(file); // Llamar al callback cuando se selecciona un archivo
    }
  };

  return (
    <div className="flex flex-col">
      <label className="text-lg font-normal">{label}:</label>
      <div className="relative w-full mt-2">
        <input
          type="file"
          id="fileInput"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="bg-[#E5E7EB] text-black flex items-center justify-between px-4 py-2 rounded-lg">
          <label
            htmlFor="fileInput"
            className="cursor-pointer border border-black px-3 py-1 rounded-lg"
          >
            Elige archivo
          </label>
          <span className="ml-3">
            {selectedFile ? selectedFile.name : "Archivo sin elegir"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FileUploadButton;
