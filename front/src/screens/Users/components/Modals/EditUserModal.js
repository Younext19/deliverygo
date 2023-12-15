import React, { useEffect } from "react";
import "./AddUserModal.css"; // Import your custom CSS for styling
import CancelButton from "../Buttons/CancelButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import EditButton from "../Buttons/EditButton";

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
      fullName: "",
      carType: "",
      isAvailable: false,
    },
    validationSchema: editUserSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log("Form submitted:", values);
      // Add your login logic here

      // Assuming some asynchronous logic is being performed (e.g., API request)
      // await yourAsyncSubmitFunction(values);

      // Reset the form to its initial values
      // resetForm();
      // handleClose();
    },
  });
  if (!showModal) {
    return null; // Don't render anything if the modal is not visible
  }
  const editUser = () => {
    console.log("Form submitted:", formik.values);
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
              onChange={formik.handleChange}
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
