import React from "react";
import DeleteButton from "../../../components/Buttons/DeleteButton";
import CancelButton from "../../../components/Buttons/CancelButton";
import { deleteTour } from "../../../../api/tours";

const DeleteTourModal = ({ showModal, handleClose, selectedUser }) => {
  console.log(
    "🚀 ~ file: DeleteUserModal.js:8 ~ DeleteUserModal ~ selectedUser:",
    selectedUser
  );
  if (!showModal) {
    return null; // Don't render anything if the modal is not visible
  }

  const deleteUser = () => {
    // Request ...
    console.log("deleteUser");
    deleteTour(selectedUser._id).then((res) => {
      console.log(res);
    });
  };
  return (
    <div className={`modal ${showModal ? "show" : ""}`} onClick={handleClose}>
      <div className="modal-content" onClick={(res) => res.stopPropagation()}>
        <h2>Supprimer une tournée</h2>
        <form>
          <DeleteButton onClick={deleteUser} />
          <CancelButton onClick={handleClose} />
        </form>
      </div>
    </div>
  );
};

export default DeleteTourModal;
