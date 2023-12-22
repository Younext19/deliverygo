import React from "react";
import "./AddTourModal.css"; // Import your custom CSS for styling
import AddButton from "../../../components/Buttons/AddButton";
import CancelButton from "../../../components/Buttons/CancelButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addTour } from "../../../../api/tours";

const addUserSchema = Yup.object().shape({
  name: Yup.string().required("Tour name is required"),
  startDate: Yup.date().required("Start date is required"),
  endDate: Yup.date().required("End date is required"),
});
const AddTourModal = ({ showModal, handleClose }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      startDate: Date.now(),
      endDate: Date.now(),
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
  const addTourFunc = () => {
    console.log("Form submitted:", formik.values);
    const tour = {
      name: formik.values.name,
      startDate: formik.values.startDate,
      endDate: formik.values.endDate,
    };
    addTour(tour).then((res) => {
      console.log(res);
    });
  };

  return (
    <div className={`modal ${showModal ? "show" : ""}`} onClick={handleClose}>
      <div className="modal-content" onClick={(res) => res.stopPropagation()}>
        <h2>Ajouter un utilisateur</h2>
        <form>
          <label htmlFor="fullName">Nom :</label>
          <input
            name="name"
            type="text"
            id="name"
            placeholder="Nom et prénom"
            required
            onChange={formik.handleChange}
            value={formik.values.name}
          />

          <label htmlFor="carType">Date de début:</label>
          <input
            name="startDate"
            type="date"
            id="startDate"
            required
            onChange={formik.handleChange}
            value={formik.values.startDate}
          />

          <label htmlFor="carType">Date de fin:</label>
          <input
            name="endDate"
            type="date"
            id="endDate"
            required
            onChange={formik.handleChange}
            value={formik.values.endDate}
          />

          <AddButton onClick={addTourFunc} />
          <CancelButton onClick={handleClose} />
        </form>
      </div>
    </div>
  );
};

export default AddTourModal;
