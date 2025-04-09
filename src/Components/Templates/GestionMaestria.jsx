import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Title from "../Atoms/Title";
import Button from "../Atoms/Button";
import Input from "../Molecules/Input";
import DeleteIcon from "../Atoms/DeleteIcon";
import { getBin, updateBin } from "../../services/jsonBinConfig";
import { useLocation } from "react-router-dom";

const GestionMaestria = () => {
  const [maestria, setMaestria] = useState(null);
  const [isEditing, setIsEditing] = useState(true);
  const [allData, setAllData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const location = useLocation();
  // const navigate = useNavigate();
  const programaId = location.state?.programaId;

  useEffect(() => {
    const cargarDatos = async () => {
      setLoading(true);
      try {
        const data = await getBin();
        setAllData(data);
        const encontrados = data?.programas || [];

        const programa = encontrados.find((p) => p.id === programaId);
        if (programa) {
          setMaestria(programa);
        } else {
          console.error("Programa no encontrado.");
        }
      } catch (error) {
        console.error("Error al cargar datos:", error);
      } finally {
        setLoading(false);
      }
    };

    if (programaId) {
      cargarDatos();
    }
  }, [programaId]);

  // Handle para establecer si se está editando o no
  const hanldeIsEditing = async (e) => {
    e.preventDefault();

    const esEmailValido = (email) => {
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regexEmail.test(email);
    };

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

      // Guardar en JSONBin
      try {
        setSaving(true);
        // Actualizar el programa en el array de programas
        const updatedProgramas = allData.programas.map((p) =>
          p.id === maestria.id ? maestria : p
        );

        const updatedData = {
          ...allData,
          programas: updatedProgramas,
        };

        await updateBin(updatedData);
        alert("Datos guardados correctamente");
        setAllData(updatedData);
      } catch (error) {
        console.error("Error al guardar datos:", error);
        alert("Error al guardar los datos. Inténtalo de nuevo.");
        return;
      } finally {
        setSaving(false);
      }
    }

    setIsEditing((prev) => !prev);
  };

  // Handle para agregar una asignatura
  const handleAddAsignatura = (periodoId) => {
    const newMateria = {
      id: Date.now(),
      nombre: "",
      profesores: [" "],
    };
    const updatedMaestria = { ...maestria };

    const periodoIndex = updatedMaestria.periodos.findIndex(
      (periodo) => periodo.id === periodoId
    );

    if (periodoIndex !== -1) {
      if (!updatedMaestria.periodos[periodoIndex].materias) {
        updatedMaestria.periodos[periodoIndex].materias = [];
      }
      updatedMaestria.periodos[periodoIndex].materias.push(newMateria);
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

        setMaestria(updatedMaestria);
      }
    }
  };

  if (loading) return <div>Cargando datos...</div>;
  if (!maestria) return <div>Programa no encontrado</div>;

  return (
    <form id="form-asignaturas" className="mx-4 mt-5 max-w-9xl md:mx-10">
      <div className="flex flex-col mb-7 lg:flex-row justify-between">
        <Title level="h1" className="text-2xl font-semibold">
          {maestria.nombre}
        </Title>
        <div className="flex flex-col md:flex-row gap-5">
          <Button
            className="mt-6 bg-[#474c5b] text-white w-[14rem] h-[2.5rem] content-center rounded-lg text-center"
            onClick={hanldeIsEditing}
            text={isEditing ? (saving ? "Guardando..." : "Guardar") : "Editar"}
            form="form-asignaturas"
            disabled={saving}
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
                    disabled={!isEditing}
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
                          disabled={!isEditing}
                          placeHolder="Correo del facilitador"
                        />
                      </div>

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
                      className="h-[2.5rem] w-full mt-4 text-sm"
                    />
                  )}
                </div>
              ))}
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
