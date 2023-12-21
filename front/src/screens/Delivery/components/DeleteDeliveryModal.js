import React from "react";
import DeleteButton from "../../components/Buttons/DeleteButton";
import CancelButton from "../../components/Buttons/CancelButton";
import { deleteDelivery } from "../../../api/deliveries";

const DeleteDeliveryModal = ({ showModal, handleClose, selectedDelivery }) => {
  if (!showModal) {
    return null; // Don't render anything if the modal is not visible
  }

  const deleteUser = () => {
    deleteDelivery(selectedDelivery._id);
  };
  return (
    <div className={`modal ${showModal ? "show" : ""}`} onClick={handleClose}>
      <div className="modal-content" onClick={(res) => res.stopPropagation()}>
        <h2>Supprimer une livraison</h2>
        <form>
          <DeleteButton onClick={deleteUser} />
          <CancelButton onClick={handleClose} />
        </form>
      </div>
    </div>
  );
};

export default DeleteDeliveryModal;
