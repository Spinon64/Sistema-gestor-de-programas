import { Route, Routes } from "react-router-dom"; // Aquí usas Routes en lugar de BrowserRouter
import Programs from "./Components/Pages/Programs";
import Layout from "./Components/Pages/Layout";
import CrearMaestria from "./Components/Templates/CrearMaestria";
import GestionMaestria from "./Components/Templates/GestionMaestria";
import DetallesMaestria from "./Components/Pages/DetallesMaestria";
import Process from "./Components/Pages/Process";

export default function App() {
  return (
    // No necesitas otro BrowserRouter aquí, solo las rutas
    <Routes>
      {/* Definir el layout para todas las rutas dentro de él */}
      <Route element={<Layout />}>
        <Route path="/" element={<Programs />} />
        <Route path="/crear-programa" element={<CrearMaestria />} />
        <Route path="/gestion-programa" element={<GestionMaestria />} />
        <Route path="/detalles-programa/:id" element={<DetallesMaestria />} />
        <Route path="/calendario" element={<Process />} />
      </Route>
    </Routes>
  );
}
