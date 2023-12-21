import React from "react";
import "./FilterButton.css"; // Import your custom CSS for styling
export default function FilterButton({ onClick }) {
  return (
    <button className="searchButton" onClick={onClick} type="button">
      Chercher
    </button>
  );
}
