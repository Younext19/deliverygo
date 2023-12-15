import React from "react";
import Reglage from "../../../../assets/reglage.png";

import "./IconedFilterButton.css";
export default function IconedFilterButton({ onClick }) {
  return (
    <button className="filterButton" onClick={onClick}>
      <img src={Reglage} alt="reglage" className="filterImage" />
    </button>
  );
}
