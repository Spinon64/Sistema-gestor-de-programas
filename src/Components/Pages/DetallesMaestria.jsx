import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import CalendarIcon from "../../assets/CalendarIcon.svg";
import Title from "../Atoms/Title";
import DotIcon from "../Atoms/DotIcon";
import Button from "../Atoms/Button";
import Trash from "../../assets/Trash.svg";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Edit from "../../assets/Edit.svg";
import { getBin } from "../../services/jsonBinConfig";
import { updateBin } from "../../services/jsonBinConfig";
import Eye from "../../assets/eye.svg";
import {
  getCalendarBin,
  updateCalendarBin,
} from "../../services/jsonBinConfig";

const DetallesMaestria = () => {
  const { id } = useParams();
  const [maestria, setMaestria] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const eliminarPrograma = async () => {
    const confirmacion = window.confirm(
      "¿Estás seguro de que deseas eliminar este programa?"
    );
    if (!confirmacion) return;

    try {
      const data = await getBin();

      const nuevosProgramas = data.programas.filter(
        (programa) => programa.id !== parseInt(id)
      );

      await updateBin({
        ...data,
        programas: nuevosProgramas,
      });

      // 🧹 También elimina los calendarios asociados
      await eliminarCalendariosDelPrograma(parseInt(id));

      alert("Programa y calendarios eliminados correctamente.");
      navigate("/");
    } catch (error) {
      console.error("❌ Error al eliminar el programa:", error);
      alert("Ocurrió un error al intentar eliminar el programa.");
    }
  };

  const eliminarCalendariosDelPrograma = async (programaId) => {
    try {
      const calendarioData = await getCalendarBin();

      if (!calendarioData || !Array.isArray(calendarioData.calendarios)) {
        console.warn("No se encontraron calendarios para procesar.");
        return;
      }

      // Filtrar todos los calendarios que NO pertenezcan al programa eliminado
      const nuevosCalendarios = calendarioData.calendarios.filter(
        (c) => Number(c.programaId) !== Number(programaId)
      );

      await updateCalendarBin({ calendarios: nuevosCalendarios });
      console.log("✅ Calendarios eliminados correctamente.");
    } catch (error) {
      console.error("❌ Error al eliminar calendarios del programa:", error);
    }
  };

  useEffect(() => {
    const cargarDatos = async () => {
      setLoading(true);
      try {
        const data = await getBin();
        if (!data || !data.programas) {
          console.error("No se encontraron datos o formato incorrecto");
          return;
        }

        const programa = data.programas.find((p) => p.id === parseInt(id));
        if (programa) {
          setMaestria(programa);
        } else {
          console.error("Programa no encontrado con ID:", id);
        }
      } catch (error) {
        console.error("Error al cargar datos:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, [id]);

  const handleEditarPrograma = (periodoId) => {
    navigate("/gestion-programa", {
      state: { programaId: parseInt(id), periodoId },
    });
  };

  if (loading) return <div>Cargando datos...</div>;
  if (!maestria) return <div>Programa no encontrado</div>;

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

      <div className="flex flex-col md:flex-row justify-between">
        <Title level="h1" className="text-2xl mt-5 font-semibold">
          {maestria.nombre}
        </Title>
        <Button
          text="Eliminar Programa"
          className="mt-5 w-[16rem] h-[2.5rem] text-sm bg-red-600"
          img={Trash}
          onClick={eliminarPrograma}
        />
      </div>

      <Title level="h2" className="mt-4">
        Periodos
      </Title>

      <div className="mt-6 mx-1 grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] items-stretch gap-8">
        {maestria.periodos.map((periodo, index) => (
          <div
            key={periodo.id}
            className="flex flex-col bg-white p-4 rounded-xl shadow-[0px_0px_6px_4px_rgba(0,_0,_0,_0.1)] justify-between"
          >
            <div>
              {/* Encabezado */}

              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                {maestria.tipoPeriodos === "Unico (Diplomado)"
                  ? "Periodo"
                  : maestria.tipoPeriodos === "Semestral"
                  ? `Semestre ${index + 1}`
                  : maestria.tipoPeriodos === "Cuatrimestral"
                  ? `Cuatrimestre ${index + 1}`
                  : "Periodo"}
                <Link
                  to={`/calendario/${maestria.id}/${periodo.id.toString()}`}
                >
                  <img src={CalendarIcon} alt="" className="size-5" />
                </Link>
                <Link to={`/calendar-preview/${maestria.id}/${periodo.id}`}>
                  <img src={Eye} alt="" className="size-5 cursor-pointer" />
                </Link>
              </h2>

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
            <div className="mt-auto ">
              <Button
                text="Editar semestre"
                className="w-full h-[2.5rem] p-2 "
                img={Edit}
                onClick={() => handleEditarPrograma(periodo.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetallesMaestria;
