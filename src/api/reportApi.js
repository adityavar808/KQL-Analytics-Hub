import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export async function executeReport() {
    const response = await axios.get(`${apiUrl}/products`);
    return response.data;
  }
  