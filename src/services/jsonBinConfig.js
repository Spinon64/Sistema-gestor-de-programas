import axios from "axios";

const API_BASE_URL = "https://api.jsonbin.io/v3/b";
const MASTER_KEY = import.meta.env.VITE_SECRET_KEY;
const BIN_ID = import.meta.env.VITE_PROGRAM_DATA;
const CALENDAR_BIN_ID = import.meta.env.VITE_CALENDAR_BIN_ID;

// Obtener todo el bin (función existente)
export const getBin = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${BIN_ID}/latest`, {
      headers: {
        "X-Master-Key": MASTER_KEY,
      },
    });

    return response.data.record;
  } catch (error) {
    if (error.response) {
      console.error(
        `❌ Error al obtener datos JSONBin: ${
          error.response.status
        } - ${JSON.stringify(error.response.data)}`
      );
    }
    return null;
  }
};

// Actualizar todo el bin con los programas
export const updateBin = async (newData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${BIN_ID}`, newData, {
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": MASTER_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error al actualizar el bin completo:", error);
    if (error.response) {
      console.error(
        `   Estado: ${error.response.status}, Mensaje: ${JSON.stringify(
          error.response.data
        )}`
      );
    }
    throw error;
  }
};

export const updateCalendarBin = async (dataCalendar) => {
  try {
    console.log(`📤 Enviando calendario al bin: ${CALENDAR_BIN_ID}`);
    const response = await axios.put(
      `${API_BASE_URL}/${CALENDAR_BIN_ID}`,
      dataCalendar,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": MASTER_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("❌ Error al actualizar bin de calendario:", error);
    if (error.response) {
      console.error(
        `   Estado: ${error.response.status}, Mensaje: ${JSON.stringify(
          error.response.data
        )}`
      );
    }
    throw error;
  }
};

// 🆕 NUEVA FUNCIÓN para actualizar solo el calendario de un periodo específico
export const updateBinWithCalendar = async (
  programaId,
  periodoId,
  nuevoCalendario
) => {
  try {
    // Paso 1: Obtener datos actuales del bin de calendarios
    const response = await axios.get(
      `${API_BASE_URL}/${CALENDAR_BIN_ID}/latest`,
      {
        headers: {
          "X-Master-Key": MASTER_KEY,
        },
      }
    );

    let dataActual = response.data.record || { calendarios: [] };

    // Paso 2: Verificar si ya existe el calendario de ese periodo
    const index = dataActual.calendarios.findIndex(
      (c) => c.programaId === programaId && c.periodoId === periodoId
    );

    if (index !== -1) {
      dataActual.calendarios[index] = {
        ...dataActual.calendarios[index],
        ...nuevoCalendario,
      };
    } else {
      dataActual.calendarios.push({
        programaId,
        periodoId,
        ...nuevoCalendario,
      });
    }

    // Paso 3: Guardar en JSONBin (solo en el bin de calendarios)
    const putRes = await axios.put(
      `${API_BASE_URL}/${CALENDAR_BIN_ID}`,
      dataActual,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": MASTER_KEY,
        },
      }
    );

    return putRes.data;
  } catch (error) {
    console.error("❌ Error al actualizar el calendario en JSONBin:", error);
    if (error.response) {
      console.error(
        `   Estado: ${error.response.status}, Mensaje: ${JSON.stringify(
          error.response.data
        )}`
      );
    }
    throw error;
  }
};
