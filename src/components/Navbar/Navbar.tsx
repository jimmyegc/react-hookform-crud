import React from "react";
import ConnectionMeter from "../ConnectionMeter/ConnectionMeter";

const Navbar = () => {
  return (
    <nav style={{ display: "flex", justifyContent: "space-between", padding: "10px", backgroundColor: "#222" }}>
      <h1 style={{ color: "#fff" }}>Mi Aplicación</h1>
      <ConnectionMeter />
    </nav>
  );
};

export default Navbar;
