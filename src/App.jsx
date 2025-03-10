import React from "react";
import "./index.css";
import NavBar from "./Components/Organisms/NavBar";
// import ProgramCreation from "./Pages/ProgramCreation";
import Programs from "./Components/Pages/Programs";

export default function App() {
  return (
    <div>
      <NavBar />
      <Programs />
      {/* <ProgramCreation /> */}
    </div>
  );
}
