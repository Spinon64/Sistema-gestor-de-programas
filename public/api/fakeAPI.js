import axios from "axios";

export const fetchPrograms = async () => {
  try {
    const response = await axios.get("../../src/data/programs.json"); // Simula la API local
    return response.data || { maestrias: [], diplomados: [] };
  } catch (error) {
    console.error("Error al cargar los programas:", error);
    return { maestrias: [], diplomados: [] }; // Evita que sean undefined
  }
};
