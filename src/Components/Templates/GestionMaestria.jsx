// src/components/GestionMaestria.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import Title from "../Atoms/Title";
import Button from "../Atoms/Button";
import Input from "../Molecules/Input";
import DeleteIcon from "../Atoms/DeleteIcon";

const GestionMaestria = () => {
  const [maestria, setMaestria] = useState(null);
  const [isEditing, setIsEditing] = useState(true);

  // UseEffect para obtener los datos de localStorage
  useEffect(() => {
    const savedMaestria = localStorage.getItem("maestria");
    if (savedMaestria) {
      setMaestria(JSON.parse(savedMaestria));
    }
  }, []);

  // Handle para establecer si esta editando o no
  const hanldeIsEditing = (e) => {
    e.preventDefault();
    setIsEditing((prev) => !prev);
  };

  // Handle para agregar una materia
  // Recibe el indice del semestre para saber a cual agregar la materia
  const handleAddMateria = (semestreIndex) => {
    const newMateria = { nombre: "", profesores: [""] };
    const updatedMaestria = { ...maestria };
    updatedMaestria.periodos[semestreIndex].push(newMateria);
    localStorage.setItem("maestria", JSON.stringify(updatedMaestria));
    setMaestria(updatedMaestria);
  };

  // Handle para remover un profesor
  // Recibe el indice del semestre y materia para saber cual remover
  const handleRemoveProfesor = (semestreIndex, materiaIndex, profesorIndex) => {
    const updateMaestria = { ...maestria };
    updateMaestria.periodos[semestreIndex][materiaIndex].profesores.splice(
      profesorIndex,
      1
    );
    localStorage.setItem("maestria", JSON.stringify(updateMaestria));
    setMaestria(updateMaestria);
  };

  // Handle para remover una materia
  // Recibe el indice del semestre y materia para saber cual remover
  const handleRemoveMateria = (semestreIndex, materiaIndex) => {
    const updatedMaestria = { ...maestria };
    updatedMaestria.periodos[semestreIndex].splice(materiaIndex, 1);
    localStorage.setItem("maestria", JSON.stringify(updatedMaestria));
    setMaestria(updatedMaestria);
  };

  // Handle para agregar un profesor
  // Recibe el indice del semestre y materia para saber a cual agregar un profesor
  const handleAddProfesor = (semestreIndex, materiaIndex) => {
    const updatedMaestria = { ...maestria };
    // Agregamos un nuevo profesor vacío al array de profesores
    updatedMaestria.periodos[semestreIndex][materiaIndex].profesores.push("");
    localStorage.setItem("maestria", JSON.stringify(updatedMaestria));
    setMaestria(updatedMaestria);
  };

  // Handle para manejar los cambios de materia
  // Recibe el indice del semestre y materia, el campo a cambiar y el valor
  const handleChangeMateria = (semestreIndex, materiaIndex, field, value) => {
    const updatedMaestria = { ...maestria };
    updatedMaestria.periodos[semestreIndex][materiaIndex][field] = value;
    localStorage.setItem("maestria", JSON.stringify(updatedMaestria));
    setMaestria(updatedMaestria);
  };

  if (!maestria) return <div>Cargando...</div>;

  return (
    <div className="p-4 max-w-9xl mx-10">
      <div className="flex justify-between">
        <Title level="h1" className="text-2xl font-semibold">
          {maestria.nombre}
        </Title>
        {/* Aquí usamos Link para navegar a la página de detalles pasando el id */}
        {/* Boton para guardar */}
        <div className="flex gap-5">
          <Button
            // Aquí usamos el id de la maestría
            className="mt-6 bg-[#474c5b] text-white min-w-[10rem] h-[2.5rem] content-center rounded-lg w-auto  text-center"
            onClick={hanldeIsEditing}
            text={isEditing ? "Guardar" : "Editar"}
          ></Button>
          {!isEditing && (
            <Link to={`/detalles-programa/${maestria.id}`}>
              <Button
                text="Continuar"
                className="font-normal w-[14rem] h-[2.5rem] text-sm mt-6"
              />
            </Link>
          )}
        </div>
      </div>

      <Title level="h2" className="mt-4 mb-4">
        Periodos
      </Title>

      {maestria.periodos.map((semestre, semestreIndex) => (
        <div key={semestreIndex} className="mb-6 mx-5">
          <Title level="h3" className="font-bold">
            {maestria.tipoPeriodos === "Semestral"
              ? `Semestre ${semestreIndex + 1}`
              : maestria.tipoPeriodos === "Cuatrimestral"
              ? `Cuatrimestre ${semestreIndex + 1}`
              : maestria.tipoPeriodos === "Unico (Diplomado)"
              ? `Periodo Unico (Diplomado)`
              : "Desconocido"}
          </Title>

          {/* Contenedor para las asignaturas */}
          <div className="  shadow-[0px_0px_6px_4px_rgba(0,_0,_0,_0.1)] p-5 flex flex-row flex-wrap gap-4 mt-4 ">
            {semestre.map((materia, materiaIndex) => (
              <div
                key={materiaIndex}
                className="relative bg-white p-4 rounded-lg shadow-[0px_0px_6px_4px_rgba(0,_0,_0,_0.1)] w-[300px]"
              >
                {isEditing && (
                  <button
                    onClick={() =>
                      handleRemoveMateria(semestreIndex, materiaIndex)
                    }
                    className="absolute top-2 right-2 text-gray-500  hover:text-red-500 transition"
                  >
                    <DeleteIcon />
                  </button>
                )}
                <Input
                  type="text"
                  label="Nombre de la materia:"
                  value={materia.nombre}
                  onChange={(e) =>
                    handleChangeMateria(
                      semestreIndex,
                      materiaIndex,
                      "nombre",
                      e.target.value
                    )
                  }
                  className={`p-2 border border-gray-300 rounded w-full ${
                    !isEditing ? "bg-gray-200 cursor-not-allowed" : ""
                  }`}
                  placeHolder="Nombre de la materia"
                />
                <hr className="my-4" />
                <Title level="h4">Correo del profesor:</Title>
                {materia.profesores.map((profesor, profesorIndex) => (
                  <div
                    key={profesorIndex}
                    className="mb-2 flex justify-between"
                  >
                    <div className="flex-grow">
                      <Input
                        type="text"
                        value={profesor}
                        onChange={(e) =>
                          handleChangeMateria(
                            semestreIndex,
                            materiaIndex,
                            "profesores",
                            [
                              ...materia.profesores.slice(0, profesorIndex),
                              e.target.value,
                              ...materia.profesores.slice(profesorIndex + 1),
                            ]
                          )
                        }
                        className={`p-2 border border-gray-300 rounded w-full ${
                          !isEditing ? "bg-gray-200 cursor-not-allowed" : ""
                        }`}
                        placeHolder="Correo del profesor"
                      />
                    </div>

                    {isEditing && (
                      <button
                        onClick={() =>
                          handleRemoveProfesor(semestreIndex, materiaIndex)
                        }
                        className="text-gray-500 hover:text-red-500 transition pl-2 "
                      >
                        <DeleteIcon />
                      </button>
                    )}
                  </div>
                ))}
                {isEditing && (
                  <Button
                    text="Agregar profesor"
                    onClick={() =>
                      handleAddProfesor(semestreIndex, materiaIndex)
                    }
                    className="h-[2.5rem] w-full mt-4"
                  />
                )}
              </div>
            ))}

            {/* Tarjeta/botón para agregar nueva asignatura, 
          colocado en la misma fila que las demás */}
            {isEditing && (
              <div
                onClick={() => handleAddMateria(semestreIndex)}
                className="flex flex-col items-center justify-center bg-white border-dashed border-2 border-gray-300text-gray-500 p-4 rounded w-[250px]cursor-pointer hover:bg-gray-50"
              >
                <span className="text-xl font-semibold">+</span>
                <span>Agregar nueva asignatura</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GestionMaestria;
