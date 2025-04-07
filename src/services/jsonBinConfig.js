import axios from "axios";

const API_BASE_URL = "https://api.jsonbin.io/v3/b";

// Manejo especial para la Master Key con $
let MASTER_KEY = import.meta.env.VITE_SECRET_KEY;
// Si la clave está truncada (termina en $), intenta reconstruirla

const BIN_ID = import.meta.env.VITE_PROGRAM_DATA || "67f03f2f8a456b7966829f9c";
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
        `   Estado: ${error.response.status}, Mensaje: ${JSON.stringify(
          error.response.data
        )}`
      );
    }
    return null;
  }
};

export const updateBin = async (data) => {
  try {
    console.log(`📤 Enviando datos a: ${API_BASE_URL}/${BIN_ID}`);
    const response = await axios.put(`${API_BASE_URL}/${BIN_ID}`, data, {
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": MASTER_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error al actualizar JSONBin:", error);
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
