import React from "react";
import "./DeleteButton.css"; // Import your custom CSS for styling
export default function DeleteButton({ onClick }) {
  return (
    <button className="deleteUserButton" onClick={onClick}>
      Supprimer
    </button>
  );
}
