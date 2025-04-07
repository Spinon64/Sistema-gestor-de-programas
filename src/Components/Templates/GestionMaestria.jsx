// src/components/GestionMaestria.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Title from "../Atoms/Title";
import Button from "../Atoms/Button";
import Input from "../Molecules/Input";
import DeleteIcon from "../Atoms/DeleteIcon";
import { getBin } from "../../services/jsonBinConfig";
import { useLocation } from "react-router-dom"; // para recibir ID desde navegación

const GestionMaestria = () => {
  const [maestria, setMaestria] = useState(null);
  const [isEditing, setIsEditing] = useState(true);
  const location = useLocation();
  const programaId = location.state?.programaId;

  useEffect(() => {
    const cargarDatos = async () => {
      const data = await getBin();
      const encontrados = data?.programas || [];

      const programa = encontrados.find((p) => p.id === programaId);
      if (programa) {
        setMaestria(programa);
      } else {
        console.error("Programa no encontrado.");
      }
    };

    if (programaId) {
      cargarDatos();
    }
  }, [programaId]);

  // Handle para establecer si se está editando o no
  const hanldeIsEditing = (e) => {
    const esEmailValido = (email) => {
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regexEmail.test(email);
    };
    e.preventDefault();

    if (isEditing) {
      const camposInvalidos = maestria.periodos.some((periodo) =>
        (periodo.materias || []).some((materia) => {
          const nombreVacio = !materia.nombre.trim();
          const profesoresInvalidos = materia.profesores.some(
            (prof) => !prof.trim() || !esEmailValido(prof.trim())
          );
          return nombreVacio || profesoresInvalidos;
        })
      );

      if (camposInvalidos) {
        alert(
          "Completa todos los campos correctamente antes de guardar. Verifica los nombres y que los correos sean válidos."
        );
        return;
      }
    }

    setIsEditing((prev) => !prev);
  };

  // Handle para agregar una asignatura
  // Recibe el ID del periodo para saber a cual agregar la materia
  const handleAddAsignatura = (periodoId) => {
    const newMateria = {
      id: Date.now(), // Agregamos un ID único a la materia
      nombre: "",
      profesores: [""],
    };
    const updatedMaestria = { ...maestria };

    // Encuentra el índice del periodo con el ID correspondiente
    const periodoIndex = updatedMaestria.periodos.findIndex(
      (periodo) => periodo.id === periodoId
    );

    if (periodoIndex !== -1) {
      // Agrega la nueva materia al periodo encontrado
      if (!updatedMaestria.periodos[periodoIndex].materias) {
        updatedMaestria.periodos[periodoIndex].materias = [];
      }
      updatedMaestria.periodos[periodoIndex].materias.push(newMateria);

      localStorage.setItem("maestria", JSON.stringify(updatedMaestria));
      setMaestria(updatedMaestria);
    }
  };

  // Handle para remover un profesor
  const handleRemoveProfesor = (periodoId, materiaId, profesorIndex) => {
    const updateMaestria = { ...maestria };
    const periodoIndex = updateMaestria.periodos.findIndex(
      (periodo) => periodo.id === periodoId
    );

    if (periodoIndex !== -1) {
      const materiaIndex = updateMaestria.periodos[
        periodoIndex
      ].materias.findIndex((materia) => materia.id === materiaId);

      if (materiaIndex !== -1) {
        updateMaestria.periodos[periodoIndex].materias[
          materiaIndex
        ].profesores.splice(profesorIndex, 1);

        localStorage.setItem("maestria", JSON.stringify(updateMaestria));
        setMaestria(updateMaestria);
      }
    }
  };

  // Handle para remover una materia
  const handleRemoveMateria = (periodoId, materiaId) => {
    const updatedMaestria = { ...maestria };
    const periodoIndex = updatedMaestria.periodos.findIndex(
      (periodo) => periodo.id === periodoId
    );

    if (periodoIndex !== -1) {
      updatedMaestria.periodos[periodoIndex].materias =
        updatedMaestria.periodos[periodoIndex].materias.filter(
          (materia) => materia.id !== materiaId
        );

      localStorage.setItem("maestria", JSON.stringify(updatedMaestria));
      setMaestria(updatedMaestria);
    }
  };
  // Handle para agregar un profesor
  const handleAddProfesor = (periodoId, materiaId) => {
    const updatedMaestria = { ...maestria };
    const periodoIndex = updatedMaestria.periodos.findIndex(
      (periodo) => periodo.id === periodoId
    );

    if (periodoIndex !== -1) {
      const materiaIndex = updatedMaestria.periodos[
        periodoIndex
      ].materias.findIndex((materia) => materia.id === materiaId);

      if (materiaIndex !== -1) {
        updatedMaestria.periodos[periodoIndex].materias[
          materiaIndex
        ].profesores.push("");

        localStorage.setItem("maestria", JSON.stringify(updatedMaestria));
        setMaestria(updatedMaestria);
      }
    }
  };

  // Handle para manejar los cambios de materia
  const handleChangeMateria = (periodoId, materiaId, field, value) => {
    const updatedMaestria = { ...maestria };
    const periodoIndex = updatedMaestria.periodos.findIndex(
      (periodo) => periodo.id === periodoId
    );

    if (periodoIndex !== -1) {
      const materiaIndex = updatedMaestria.periodos[
        periodoIndex
      ].materias.findIndex((materia) => materia.id === materiaId);

      if (materiaIndex !== -1) {
        updatedMaestria.periodos[periodoIndex].materias[materiaIndex][field] =
          value;

        localStorage.setItem("maestria", JSON.stringify(updatedMaestria));
        setMaestria(updatedMaestria);
      }
    }
  };

  if (!maestria) return <div>Cargando...</div>;

  return (
    <form id="form-asignaturas" className="p-4 max-w-9xl mx-10">
      <div className="flex justify-between">
        <Title level="h1" className="text-2xl font-semibold">
          {maestria.nombre}
        </Title>
        <div className="flex gap-5">
          <Button
            className="mt-6 bg-[#474c5b] text-white min-w-[10rem] h-[2.5rem] content-center rounded-lg w-auto text-center"
            onClick={hanldeIsEditing}
            text={isEditing ? "Guardar" : "Editar"}
            form="form-asignaturas"
          ></Button>
          {!isEditing && (
            <Link to={`/detalles-programa/${maestria.id}`}>
              <Button
                text="Continuar"
                className="font-normal w-[14rem] h-[2.5rem] text-sm mt-6"
                type="button"
              />
            </Link>
          )}
        </div>
      </div>

      <Title level="h2" className="mt-4 mb-4">
        Periodos
      </Title>

      {maestria.periodos.map((periodo) => (
        <div key={periodo.id} className="mb-6 mx-5">
          <Title level="h3" className="font-bold">
            {maestria.tipoPeriodos === "Semestral"
              ? `Semestre ${maestria.periodos.indexOf(periodo) + 1}`
              : maestria.tipoPeriodos === "Cuatrimestral"
              ? `Cuatrimestre ${maestria.periodos.indexOf(periodo) + 1}`
              : maestria.tipoPeriodos === "Unico (Diplomado)"
              ? `Periodo Unico (Diplomado)`
              : "Desconocido"}
          </Title>

          <div className="shadow-[0px_0px_6px_4px_rgba(0,_0,_0,_0.1)] p-5 flex flex-row flex-wrap gap-4 mt-4">
            {periodo.materias &&
              periodo.materias.map((materia) => (
                <div
                  key={materia.id}
                  className="relative bg-white p-4 rounded-lg shadow-[0px_0px_6px_4px_rgba(0,_0,_0,_0.1)] w-[300px]"
                >
                  {isEditing && periodo.materias.length >= 2 ? (
                    <button
                      onClick={() =>
                        handleRemoveMateria(periodo.id, materia.id)
                      }
                      className="absolute top-2 right-2 text-gray-500 hover:text-red-500 transition"
                      type="button"
                    >
                      <DeleteIcon />
                    </button>
                  ) : (
                    ""
                  )}
                  <Input
                    type="text"
                    label="Nombre de la asignatura:"
                    value={materia.nombre}
                    onChange={(e) =>
                      handleChangeMateria(
                        periodo.id,
                        materia.id,
                        "nombre",
                        e.target.value
                      )
                    }
                    className={`p-2 border border-gray-300 rounded w-full ${
                      !isEditing ? "bg-gray-200 cursor-not-allowed" : ""
                    }`}
                    placeHolder="Nombre de la asingatura"
                  />
                  <hr className="my-4" />
                  <Title level="h4">Correo del facilitador:</Title>
                  {materia.profesores.map((profesor, profesorIndex) => (
                    <div
                      key={profesorIndex}
                      className="mb-2 flex justify-between"
                    >
                      <div className="flex-grow">
                        <Input
                          type="email"
                          value={profesor}
                          onChange={(e) =>
                            handleChangeMateria(
                              periodo.id,
                              materia.id,
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
                          placeHolder="Correo del facilitador"
                        />
                      </div>

                      {/* Si el array de profesores es mayor o igual a 2 se muestra el boton de eliminar facilitador */}
                      {isEditing && materia.profesores.length >= 2 ? (
                        <button
                          onClick={() =>
                            handleRemoveProfesor(
                              periodo.id,
                              materia.id,
                              profesorIndex
                            )
                          }
                          type="button"
                          className="text-gray-500 hover:text-red-500 transition pl-2"
                        >
                          <DeleteIcon />
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                  ))}
                  {isEditing && (
                    <Button
                      text="Agregar profesor"
                      type="button"
                      onClick={() => handleAddProfesor(periodo.id, materia.id)}
                      className="h-[2.5rem] w-full mt-4"
                    />
                  )}
                </div>
              ))}
            {/* Si el array de materias es mayor a 4 ya no se mostrara la opcion para agregar otra */}
            {isEditing && periodo.materias.length <= 3 ? (
              <div
                onClick={() => handleAddAsignatura(periodo.id)}
                className="flex flex-col items-center justify-center bg-white border-dashed border-2 border-gray-300 text-gray-500 p-4 rounded w-[250px] cursor-pointer hover:bg-gray-50"
              >
                <span className="text-xl font-semibold">+</span>
                <span>Agregar nueva asignatura</span>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      ))}
    </form>
  );
};

export default GestionMaestria;
