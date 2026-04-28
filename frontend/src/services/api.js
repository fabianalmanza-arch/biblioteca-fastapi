// Importamos axios para hacer peticiones HTTP
import axios from "axios";

// URL base del backend FastAPI
const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

// Exportamos para usar en todo el proyecto
export default API;