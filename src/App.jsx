import { Routes, Route } from "react-router"; // ✅ Cambiar "react-router" a "react-router-dom"
import Programs from "./Components/Pages/Programs";
import ProgramCreation from "./Components/Pages/ProgramCreation";
import Layout from "./Components/Pages/Layout";
import AsignaturesCreation from "./Components/Pages/AsignaturesCreation";
import Process from "./Components/Pages/Process";
import Assignatures from "./Components/Pages/Assignatures";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Programs />} />
        <Route path="/crear-programa" element={<ProgramCreation />} />
        <Route path="/crear-asignatura" element={<AsignaturesCreation />} />
        <Route path="/calendario-procesos" element={<Process />} />
        <Route path="/asignaturas" element={<Assignatures />} />
      </Route>
    </Routes>
  );
}
