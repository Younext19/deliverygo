import React from "react";
import "./Sidebar.css";
import logo from "../../..//assets/logo.png";
export default function Sidebar() {
  return (
    <div className="sideBarContainer" data-testid="sidebar">
      <div className="sideBarHeader">
        <img src={logo} alt="logo" className="imgLogo" />
      </div>
      <div className="sideBarMenuItem">
        <a href="/users" className="barItem">
          Gestion des livreurs
        </a>
      </div>
      <div className="sideBarMenuItem">
        <a href="/tournees" className="barItem">
          Gestion des tournées
        </a>
      </div>
      <div className="sideBarMenuItem">
        <a href="/courses" className="barItem">
          Gestion des courses
        </a>
      </div>{" "}
    </div>
  );
}
