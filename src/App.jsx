import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Programs from "./Components/Pages/Programs";
import ProgramCreation from "./Components/Pages/ProgramCreation";
import Layout from "./Components/Pages/Layout";
import AsignaturesCreation from "./Components/Pages/AsignaturesCreation";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Programs />} />
          <Route path="/crear-programa" element={<ProgramCreation />} />
          <Route path="/crear-asignatura" element={<AsignaturesCreation />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
