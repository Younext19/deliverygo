import React from "react";
import "./EditButton.css"; // Import your custom CSS for styling
export default function EditButton({ onClick }) {
  return (
    <button className="editUserButton" onClick={onClick}>
      Modifier
    </button>
  );
}
