import axios from "axios";

const API_BASE_URL = "https://api.jsonbin.io/v3/b";
const MASTER_KEY = import.meta.env.VITE_SECRET_KEY;

export const getBin = async (binID) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${binID}/latest`, {
      headers: {
        "X-Master-Key": MASTER_KEY,
      },
    });
    return response.data.record; // <-- Esto es importante
  } catch (error) {
    console.log("Error fetching bin:", error);
    return null;
  }
};
