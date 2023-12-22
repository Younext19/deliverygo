import React from "react";
import "./AddUserModal.css"; // Import your custom CSS for styling
import AddButton from "../../../components/Buttons/AddButton";
import CancelButton from "../../../components/Buttons/CancelButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addDeliver } from "../../../../api/deliver";

const addUserSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  carType: Yup.string(),
  isAvailable: Yup.boolean(),
});
const AddUserModal = ({ showModal, handleClose }) => {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      carType: "",
      isAvailable: false,
    },
    validationSchema: addUserSchema,
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
  const addUser = () => {
    console.log("Form submitted:", formik.values);
    const deliver = {
      name: formik.values.fullName,
      carType: formik.values.carType,
      isAvailable: formik.values.isAvailable,
    };
    addDeliver(deliver).then((res) => {
      console.log(res);
    });
    console.log("addUser");
  };

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
            onChange={formik.handleChange}
            value={formik.values.fullName}
          />

          <label htmlFor="carType">Marque de voiture:</label>
          <input
            name="carType"
            type="text"
            id="carType"
            required
            placeholder="Toyota"
            onChange={formik.handleChange}
            value={formik.values.carType}
          />
          <div className="availability">
            <p>Disponibilité:</p>
            <input
              type="checkbox"
              id="isAvailable"
              onChange={formik.handleChange}
              value={formik.values.isAvailable}
              name="isAvailable"
            />
          </div>
          <AddButton onClick={addUser} />
          <CancelButton onClick={handleClose} />
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
