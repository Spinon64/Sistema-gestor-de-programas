import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CalendarIcon from "../Atoms/CalendarIcon";
import Title from "../Atoms/Title";
import DotIcon from "../Atoms/DotIcon";
import Button from "../Atoms/Button";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";

const DetallesMaestria = () => {
  const { id } = useParams();
  const [maestria, setMaestria] = useState(null);

  useEffect(() => {
    // Cargar los datos de la maestría desde localStorage
    const savedMaestria = localStorage.getItem("maestria");
    const maestriaData = savedMaestria ? JSON.parse(savedMaestria) : null;

    console.log(maestriaData);

    if (maestriaData && maestriaData.id === parseInt(id)) {
      setMaestria(maestriaData);
    } else {
      console.error("Maestría no encontrada.");
    }
  }, [id]);

  if (!maestria) return <div>Cargando...</div>;

  return (
    <div className="p-4 md:mx-10">
      {/* Breadcrumbs para facilitar navegacion */}
      <Breadcrumbs>
        <Link underline="hover" color="inherit" to="/">
          Programas
        </Link>
        <Typography sx={{ color: "text.primary" }}>
          {maestria.nombre}
        </Typography>
      </Breadcrumbs>

      <Title level="h1" className="text-2xl mt-5 font-semibold">
        {maestria.nombre}
      </Title>

      <Title level="h2" className="mt-4">
        Periodos
      </Title>

      {/* <div className="mt-6 mx-5 grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] max-w-[34rem] items-stretch gap-8"> */}
      <div className="mt-6 mx-5 grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] items-stretch gap-8">
        {maestria.periodos.map((periodo, index) => (
          <div
            key={periodo.id}
            className="flex flex-col bg-white p-4 rounded-xl shadow-[0px_0px_6px_4px_rgba(0,_0,_0,_0.1)] justify-between"
          >
            <div>
              {/* Encabezado */}
              <Link to={`/calendario/${maestria.id}/${periodo.id.toString()}`}>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  {maestria.tipoPeriodos === "Unico (Diplomado)"
                    ? "Periodo"
                    : maestria.tipoPeriodos === "Semestral"
                    ? `Semestre ${index + 1}`
                    : maestria.tipoPeriodos === "Cuatrimestral"
                    ? `Cuatrimestre ${index + 1}`
                    : "Periodo"}
                  <CalendarIcon />
                </h2>
              </Link>

              {/* Tabla */}
              <table className="w-full border-separate border-spacing-y-2 mb-6">
                <thead>
                  <tr>
                    <th className="text-left border-b pb-1">Asignaturas</th>
                    <th className="text-left border-b pb-1">Facilitador</th>
                  </tr>
                </thead>
                <tbody>
                  {periodo.materias &&
                    periodo.materias.map((materia, idx) => (
                      <React.Fragment key={materia.id}>
                        <tr className="align-top">
                          <td className="pr-2">
                            <div className="flex flex-col">
                              <span className="font-medium capitalize flex items-center gap-1">
                                <DotIcon className="shrink-0" />
                                {materia.nombre}
                              </span>
                            </div>
                          </td>
                          <td>
                            <ul className="list-disc pl-4">
                              {materia.profesores.map((profesor, i) => (
                                // <li key={i} className="capitalize"> No se ocupa capitalizar bro
                                <li key={i}>{profesor}</li>
                              ))}
                            </ul>
                          </td>
                        </tr>

                        {/* Separador después de cada materia, menos la última */}
                        {idx < periodo.materias.length - 1 && (
                          <tr>
                            <td colSpan="2">
                              <hr className="my-2 border-gray-300" />
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                </tbody>
              </table>
            </div>
            {/* Botón */}
            <Link to="/gestion-programa">
              <div className="mt-auto ">
                <Button
                  text="Editar semestre"
                  className="w-full h-[2.5rem] p-2 "
                />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetallesMaestria;
