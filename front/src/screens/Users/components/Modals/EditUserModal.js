import React, { useEffect } from "react";
import "./AddUserModal.css"; // Import your custom CSS for styling
import CancelButton from "../../../components/Buttons/CancelButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import EditButton from "../../../components/Buttons/EditButton";
import { updateDeliver } from "../../../../api/deliver";

const editUserSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  carType: Yup.string(),
  isAvailable: Yup.boolean(),
});
const EditUserModal = ({ showModal, handleClose, selectedUser }) => {
  console.log(
    "🚀 ~ file: EditUserModal.js:14 ~ EditUserModal ~ selectedUser:",
    selectedUser
  );
  useEffect(() => {
    // Update formik values when selectedUser changes
    formik.setValues({
      fullName: selectedUser.name || "",
      carType: selectedUser.carType || "",
      isAvailable: selectedUser.isAvailable || false,
    });
  }, [selectedUser]);
  const formik = useFormik({
    initialValues: {
      fullName: selectedUser.name,
      carType: selectedUser.carType,
      isAvailable: selectedUser.isAvailable,
    },
    validationSchema: editUserSchema,
  });
  if (!showModal) {
    return null; // Don't render anything if the modal is not visible
  }
  const editUser = () => {
    const updateDeliverData = {
      id: selectedUser._id,
      name: formik.values.fullName,
      carType: formik.values.carType,
      isAvailable: formik.values.isAvailable,
    };
    updateDeliver(updateDeliverData);
  };

  return (
    <div className={`modal ${showModal ? "show" : ""}`} onClick={handleClose}>
      <div className="modal-content" onClick={(res) => res.stopPropagation()}>
        <h2>Modifier un utilisateur</h2>
        <form>
          <label htmlFor="fullName">Nom & prénom:</label>
          <input
            name="fullName"
            type="text"
            id="fullName"
            placeholder="Nom et prénom"
            value={formik.values.fullName}
            onChange={formik.handleChange}
          />

          <label htmlFor="pseudo">Marque de voiture:</label>
          <input
            name="carType"
            type="text"
            id="carType"
            placeholder="Toyota"
            value={formik.values.carType}
            onChange={formik.handleChange}
          />
          <div className="availability">
            <p>Disponibilité:</p>
            <input
              name="isAvailable"
              type="checkbox"
              id="isAvailable"
              value={formik.values.isAvailable}
              checked={formik.values.isAvailable}
              onChange={(e) => {
                formik.handleChange(e);
                formik.setFieldValue("isAvailable", e.target.checked);
              }}
            />
          </div>
          <EditButton onClick={editUser} />
          <CancelButton onClick={handleClose} />
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
