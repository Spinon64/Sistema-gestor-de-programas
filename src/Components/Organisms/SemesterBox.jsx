import React, { useState, useEffect } from "react";
import Box from "../Atoms/Box";
import AsignatureBox from "./AsignatureBox";
import AddAsignature from "../Atoms/AddAsignature";

const SemesterBox = ({ title, isEditing }) => {
  const [asignatures, setAsignatures] = useState(() => {
    const savedAsignatures = localStorage.getItem("asignatures");
    return savedAsignatures ? JSON.parse(savedAsignatures) : [{ id: 0 }];
  });

  useEffect(() => {
    localStorage.setItem("asignatures", JSON.stringify(asignatures));
  }, [asignatures]);

  const handleAddAsignature = () => {
    if (!isEditing) return;
    setAsignatures((prev) => [...prev, { id: Date.now() }]);
  };

  const handleRemoveAsignature = (id) => {
    if (!isEditing) return;
    setAsignatures((prev) => prev.filter((asignature) => asignature.id !== id));
    localStorage.removeItem(`mails_${id}`);
    localStorage.removeItem(`asignature_${id}`);
  };

  return (
    <div className="flex flex-col mb-7">
      <h2 className="text-xl font-bold opacity-75 mb-3">{title}</h2>

      <Box width="" height="h-auto" className="flex flex-col w-full p-6">
        <form className="flex flex-col gap-4 w-full">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] gap-4 w-full">
            {asignatures.map((asignature) => (
              <AsignatureBox
                key={asignature.id}
                asignatureId={asignature.id}
                isEditing={isEditing}
                onRemove={() => handleRemoveAsignature(asignature.id)}
              />
            ))}
            {isEditing && (
              <div onClick={handleAddAsignature}>
                <AddAsignature />
              </div>
            )}
          </div>

          <footer className="w-full border-t-2 border-gray-300 pt-4 mt-4">
            <div className="flex flex-col md:flex-row justify-end gap-5"></div>
          </footer>
        </form>
      </Box>
    </div>
  );
};

export default SemesterBox;
