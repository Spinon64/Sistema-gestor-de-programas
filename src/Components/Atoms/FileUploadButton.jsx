import React, { useState } from "react";
import Uploader from "../../assets/uploader.svg";

const FileUploadButton = ({ label, onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  // Manejar el cambio de archivo
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // Usar FileReader para convertir el archivo a Base64
    const reader = new FileReader();

    reader.onloadend = () => {
      // Una vez que el archivo se haya leído, guardamos el archivo con su nombre, tipo y contenido en Base64
      const fileData = {
        name: file.name,
        type: file.type,
        data: reader.result, // Archivo en formato Base64
      };

      setSelectedFile(fileData); // Guardar el archivo convertido en Base64 en el estado

      if (onFileSelect) {
        onFileSelect(fileData); // Llamar al callback, si existe
      }
    };

    reader.readAsDataURL(file); // Convertir el archivo a Base64
  };

  return (
    <div className="flex flex-col">
      <label className="text-lg font-normal">{label}:</label>
      <div className="relative w-full mt-2">
        <input
          type="file"
          id="fileInput"
          accept=".pdf"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          required
        />
        <div className="bg-[#E5E7EB] text-black flex items-center justify-between px-4 py-2 rounded-lg">
          <label
            htmlFor="fileInput"
            className="cursor-pointer border border-black px-3 py-1 rounded-lg flex flex-row items-center"
          >
            {/* Esta es la menera correcta de importar un icono, para que tenga menos carga y mejor performance */}
            <img src={Uploader} alt="" className="size-5 mr-2" />
            Subir documento
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
