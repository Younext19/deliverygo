import React from "react";
import "./CancelButton.css"; // Import your custom CSS for styling
export default function CancelButton({ onClick }) {
  return (
    <button className="cancelUserButton" onClick={onClick}>
      Annuler
    </button>
  );
}
