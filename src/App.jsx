import { Route, Routes } from "react-router-dom"; // Aquí usas Routes en lugar de BrowserRouter
import Layout from "./Components/Pages/Layout";
import Programs from "./Components/Pages/Programs";
import { lazy } from "react";
import FaseAnalisis from "./Components/Templates/FaseAnalisis";
import Revision from "./Components/Templates/Revision";

const CrearMaestria = lazy(() =>
  import("./Components/Templates/CrearMaestria")
);
const GestionMaestria = lazy(() =>
  import("./Components/Templates/GestionMaestria")
);
const DetallesMaestria = lazy(() =>
  import("./Components/Pages/DetallesMaestria")
);
const Process = lazy(() => import("./Components/Pages/Process"));

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
        <Route path="/calendario/:id/:periodoId" element={<Process />} />{" "}
        {/* AUN NO ES ACCESIBLE */}
        <Route path="/phase-analysis" element={<FaseAnalisis />} />{" "}
        {/* AUN NO ES ACCESIBLE */}
        <Route path="/revision" element={<Revision />} />{" "}
      </Route>
    </Routes>
  );
}
