import React, { useState, useEffect } from "react";
import Box from "../Atoms/Box";
import Input from "../Molecules/Input";
import Button from "../Atoms/Button";
import DeleteIcon from "../Atoms/DeleteIcon";

const AsignatureBox = ({ onRemove, asignatureId, isEditing }) => {
  // Estado del nombre de la asignatura (persistente)
  const [asignatureName, setAsignatureName] = useState(() => {
    const savedName = localStorage.getItem(`asignature_${asignatureId}`);
    return savedName || "";
  });

  // Estado de los correos (persistente)
  const [mails, setMails] = useState(() => {
    const savedMails = localStorage.getItem(`mails_${asignatureId}`);
    return savedMails ? JSON.parse(savedMails) : [{ id: 0, value: "" }];
  });

  // Guardar asignatura en localStorage cuando cambia
  useEffect(() => {
    localStorage.setItem(`asignature_${asignatureId}`, asignatureName);
  }, [asignatureName, asignatureId]);

  // Guardar correos en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem(`mails_${asignatureId}`, JSON.stringify(mails));
  }, [mails, asignatureId]);

  const handleAddMail = () => {
    if (!isEditing) return;
    setMails((prev) => [...prev, { id: Date.now(), value: "" }]);
  };

  const handleMailChange = (id, newValue) => {
    if (!isEditing) return;
    setMails((prev) =>
      prev.map((mail) => (mail.id === id ? { ...mail, value: newValue } : mail))
    );
  };

  const handleRemoveMail = (id) => {
    if (!isEditing) return;
    setMails((prev) => prev.filter((mail) => mail.id !== id));
  };

  return (
    <Box width="" height="h-auto" className="relative flex flex-col p-4 gap-4">
      {isEditing && (
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 transition"
        >
          <DeleteIcon />
        </button>
      )}

      <div className="flex flex-col">
        <Input
          label="Asignatura:"
          placeHolder="Nombre asignatura"
          value={asignatureName}
          onChange={(e) => setAsignatureName(e.target.value)}
          disabled={!isEditing}
          className={`w-full h-[2.5rem] pl-2 mb-3 ${
            !isEditing ? "bg-gray-200 cursor-not-allowed" : ""
          }`}
        />
        <hr className="mb-2 mt-2" />
        <p className="text-sm font-medium text-gray-700">Correos:</p>
        {mails.map((mail) => (
          <div key={mail.id} className="flex items-center gap-2">
            <div className="flex-grow">
              <Input
                placeHolder="ejemplo@ucol.mx"
                value={mail.value}
                disabled={!isEditing}
                onChange={(e) => handleMailChange(mail.id, e.target.value)}
                className={`w-full h-[2.5rem] pl-2 ${
                  !isEditing ? "bg-gray-200 cursor-not-allowed" : ""
                }`}
              />
            </div>
            {isEditing && (
              <button
                onClick={() => handleRemoveMail(mail.id)}
                className="text-gray-500 hover:text-red-500 transition flex-shrink-0"
              >
                <DeleteIcon />
              </button>
            )}
          </div>
        ))}
      </div>

      {isEditing && (
        <div className="flex flex-col gap-3 sm:gap-5">
          <Button
            text="Agregar correo"
            onClick={handleAddMail}
            className="h-[2.5rem] w-full sm:w-auto"
          />
        </div>
      )}
    </Box>
  );
};

export default AsignatureBox;
