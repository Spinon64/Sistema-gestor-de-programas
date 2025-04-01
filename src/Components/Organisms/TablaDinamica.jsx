"use client";

import { useState, useEffect } from "react";
import EAD from "../../assets/eda.svg";
import RED from "../../assets/red.svg";
import Facilitador from "../../assets/facilitadores.svg";
import Title from "../Atoms/Title";
import Capacitacion from "../../assets/capacitacion.svg";

// Mapeo de etapas a colores con variables Tailwind
const coloresPorEtapa = {
  Análisis: "bg-blue-100 text-blue-800",
  Diseño: "bg-orange-100 text-orange-800",
  Desarrollo: "bg-green-100 text-green-800",
  Implementación: "bg-yellow-100 text-yellow-800",
  Evaluación: "bg-purple-100 text-purple-800",
  Capacitación: "bg-pink-100 text-pink-800",
};

// Mapeo de roles a iconos según el tipo de actividad
const determinarInvolucrado = (nombreActividad, etapa) => {
  if (nombreActividad.includes("Capacitación") || etapa === "Capacitación") {
    return "capacitacion";
  } else if (nombreActividad.includes("Revisión")) {
    return "EAD";
  } else if (nombreActividad.includes("Validación")) {
    return "RED";
  } else {
    return "facilitador";
  }
};

const TablaDinamica = ({ periodoData }) => {
  const [calendarios, setCalendarios] = useState([]);

  // Función para obtener todos los meses únicos del período
  const obtenerMesesDelPeriodo = (periodoData) => {
    const meses = new Set();

    if (!periodoData || !periodoData.etapas) return [];

    periodoData.etapas.forEach((etapa) => {
      etapa.actividades.forEach((actividad) => {
        const fechaInicio = new Date(actividad.fechaInicio);
        const fechaFin = new Date(actividad.fechaFin);

        // Añadir el mes de inicio
        meses.add(`${fechaInicio.getFullYear()}-${fechaInicio.getMonth() + 1}`);

        // Si el evento abarca más de un mes, añadir todos los meses intermedios
        const mesActual = new Date(fechaInicio);
        while (mesActual <= fechaFin) {
          meses.add(`${mesActual.getFullYear()}-${mesActual.getMonth() + 1}`);
          // Avanzar al siguiente mes
          mesActual.setMonth(mesActual.getMonth() + 1);
        }
      });
    });

    return Array.from(meses).sort();
  };

  // Función para generar los datos del calendario para un mes específico
  const generarDatosDelMes = (año, mes, periodoData) => {
    // Calcular el primer y último día del mes
    const primerDia = new Date(año, mes - 1, 1);
    const ultimoDia = new Date(año, mes, 0);
    const diasEnMes = ultimoDia.getDate();
    const diaSemanaInicio = primerDia.getDay(); // 0 = Domingo

    // Crear matriz para el calendario (5-6 semanas x 7 días)
    const datos = [];
    let semana = Array(7)
      .fill(null)
      .map(() => ({ dia: "", evento: "", color: "", involucrados: "" }));

    // Espacios en blanco para días antes del primer día del mes
    for (let i = 0; i < diaSemanaInicio; i++) {
      semana[i] = { dia: "", evento: "", color: "", involucrados: "" };
    }

    // Llenar los días del mes
    let diaActual = 1;
    let diaSemana = diaSemanaInicio;

    while (diaActual <= diasEnMes) {
      // Si llegamos al final de la semana, añadir la semana actual y comenzar una nueva
      if (diaSemana === 7) {
        datos.push([...semana]);
        semana = Array(7)
          .fill(null)
          .map(() => ({ dia: "", evento: "", color: "", involucrados: "" }));
        diaSemana = 0;
      }

      // Añadir el día actual a la semana
      semana[diaSemana] = {
        dia: String(diaActual),
        evento: "",
        color: "",
        involucrados: "",
      };

      diaActual++;
      diaSemana++;
    }

    // Añadir la última semana si quedó incompleta
    if (diaSemana > 0) {
      datos.push([...semana]);
    }

    // Ahora asignar los eventos a los días correspondientes
    if (periodoData && periodoData.etapas) {
      periodoData.etapas.forEach((etapa) => {
        etapa.actividades.forEach((actividad) => {
          const fechaInicio = new Date(actividad.fechaInicio);
          const fechaFin = new Date(actividad.fechaFin);

          // Verificar si la actividad ocurre en este mes
          if (
            !(
              fechaFin.getFullYear() < año ||
              (fechaFin.getFullYear() === año &&
                fechaFin.getMonth() + 1 < mes) ||
              fechaInicio.getFullYear() > año ||
              (fechaInicio.getFullYear() === año &&
                fechaInicio.getMonth() + 1 > mes)
            )
          ) {
            // Días de inicio y fin para este mes
            let diaInicio = 1;
            if (
              fechaInicio.getFullYear() === año &&
              fechaInicio.getMonth() + 1 === mes
            ) {
              diaInicio = fechaInicio.getDate();
            }

            let diaFin = diasEnMes;
            if (
              fechaFin.getFullYear() === año &&
              fechaFin.getMonth() + 1 === mes
            ) {
              diaFin = fechaFin.getDate();
            }

            // Asignar la actividad a cada día del rango
            for (let i = 0; i < datos.length; i++) {
              for (let j = 0; j < 7; j++) {
                const dia = datos[i][j].dia;
                if (
                  dia !== "" &&
                  Number.parseInt(dia) >= diaInicio &&
                  Number.parseInt(dia) <= diaFin
                ) {
                  datos[i][j] = {
                    dia,
                    evento: actividad.nombre,
                    color: coloresPorEtapa[etapa.nombre] || "",
                    involucrados: determinarInvolucrado(
                      actividad.nombre,
                      etapa.nombre
                    ),
                  };
                }
              }
            }
          }
        });
      });
    }

    return {
      año,
      mes,
      datos,
    };
  };

  useEffect(() => {
    if (periodoData) {
      const mesesUnicos = obtenerMesesDelPeriodo(periodoData);
      const calendariosMeses = [];

      mesesUnicos.forEach((mesAño) => {
        const [año, mes] = mesAño.split("-").map(Number);
        calendariosMeses.push(generarDatosDelMes(año, mes, periodoData));
      });

      setCalendarios(calendariosMeses);
    }
  }, [periodoData]);

  // Función para obtener el nombre del mes en español
  const obtenerNombreMes = (numeroMes) => {
    const meses = [
      "ENERO",
      "FEBRERO",
      "MARZO",
      "ABRIL",
      "MAYO",
      "JUNIO",
      "JULIO",
      "AGOSTO",
      "SEPTIEMBRE",
      "OCTUBRE",
      "NOVIEMBRE",
      "DICIEMBRE",
    ];
    return meses[numeroMes - 1];
  };

  // Renderiza un calendario para cada mes encontrado
  return (
    <div className="space-y-8 p-4">
      {calendarios.map((calendario, index) => (
        <div
          key={index}
          className="rounded-lg border shadow-md overflow-hidden"
        >
          <div className="bg-[#6D7488] p-4 text-white flex items-center justify-center gap-2">
            <span>📅</span>
            <h3 className="text-xl font-semibold text-center">
              {obtenerNombreMes(calendario.mes)} {calendario.año}
            </h3>
          </div>

          {/* Contenedor responsivo para hacer scroll en pantallas pequeñas */}
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse min-w-[600px]">
              <thead>
                <tr>
                  {[
                    "Domingo",
                    "Lunes",
                    "Martes",
                    "Miércoles",
                    "Jueves",
                    "Viernes",
                    "Sábado",
                  ].map((dia, i) => (
                    <th
                      key={i}
                      className="border p-2 bg-gray-100 font-medium text-center text-sm md:text-base"
                    >
                      {dia}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {calendario.datos.map((fila, i) => (
                  <tr key={i}>
                    {fila.map((celda, j) => (
                      <td
                        key={j}
                        className={`border p-2 min-w-[100px] h-24 align-top ${celda.color}`}
                      >
                        {celda.dia && (
                          <div className="flex flex-col h-full">
                            <span className="font-medium text-sm">
                              {celda.dia}
                            </span>
                            {celda.evento && (
                              <div className="mt-1 flex-grow">
                                <span
                                  className={`inline-block px-2 py-1 rounded-full text-xs ${celda.color}`}
                                >
                                  {celda.evento}
                                </span>
                              </div>
                            )}
                            {celda.involucrados && (
                              <div className="flex justify-end mt-auto">
                                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                                  {celda.involucrados === "facilitador" && (
                                    <img
                                      src={Facilitador}
                                      alt=""
                                      className="size-5"
                                    />
                                  )}
                                  {celda.involucrados === "EAD" && (
                                    <img src={EAD} alt="" className="size-5" />
                                  )}
                                  {celda.involucrados === "RED" && (
                                    <img src={RED} alt="" className="size-5" />
                                  )}
                                  {celda.involucrados === "capacitacion" && (
                                    <img
                                      src={Capacitacion}
                                      alt=""
                                      className="size-5"
                                    />
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TablaDinamica;
