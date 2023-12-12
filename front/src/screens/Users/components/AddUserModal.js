import React from "react";
import "./AddUserModal.css"; // Import your custom CSS for styling

const AddUserModal = ({ showModal, handleClose }) => {
  if (!showModal) {
    return null; // Don't render anything if the modal is not visible
  }

  return (
    <div className={`modal ${showModal ? "show" : ""}`} onClick={handleClose}>
      <div className="modal-content" onClick={(res) => res.stopPropagation()}>
        <h2>Ajouter un utilisateur</h2>
        <form>
          <label htmlFor="fullName">Nom & prénom:</label>
          <input
            name="fullName"
            type="text"
            id="fullName"
            placeholder="Nom et prénom"
            required
          />

          <label htmlFor="pseudo">Marque de voiture:</label>
          <input
            name="pseudo"
            type="text"
            id="pseudo"
            required
            placeholder="Toyota"
          />
          <div className="availability">
            <p>Disponibilité:</p>
            <input name="email" type="checkbox" id="email" required />
          </div>
          <button className="addUserButton">Ajouter</button>
          <button className="deleteUserButton" onClick={handleClose}>
            Fermer
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
