import React from "react";
import "./AddButton.css"; // Import your custom CSS for styling
export default function AddButton({ onClick }) {
  return (
    <button className="addUserButton" onClick={onClick}>
      Ajouter
    </button>
  );
}
