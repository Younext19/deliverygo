import React from "react";
import "./AddDeliveryModal.css"; // Import your custom CSS for styling
import { useFormik } from "formik";
import * as Yup from "yup";
import AddButton from "../../components/Buttons/AddButton";
import CancelButton from "../../components/Buttons/CancelButton";
import { addDelivery } from "../../../api/deliveries";

const addUserSchema = Yup.object().shape({
  name: Yup.string().required("Tour name is required"),
  startDate: Yup.date().required("Start date is required"),
  endDate: Yup.date().required("End date is required"),
});
const AddDeliveryModal = ({ showModal, handleClose }) => {
  const formik = useFormik({
    initialValues: {
      depositAddress: "",
      pickupAddress: "",
      statut: "",
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
  const addLivraisonFunc = () => {
    console.log("Form submitted:", formik.values);
    const delivery = {
      depositAddress: formik.values.depositAddress,
      pickupAddress: formik.values.pickupAddress,
      status: formik.values.statut,
    };
    // addTour(tour).then((res) => {
    //   console.log(res);
    // });
    addDelivery(delivery);
  };

  return (
    <div className={`modal ${showModal ? "show" : ""}`} onClick={handleClose}>
      <div className="modal-content" onClick={(res) => res.stopPropagation()}>
        <h2>Ajouter un utilisateur</h2>
        <form>
          <label htmlFor="fullName">Adresse de récupération :</label>
          <input
            name="depositAddress"
            type="text"
            id="depositAddress"
            placeholder="Adresse de depôt"
            required
            onChange={formik.handleChange}
            value={formik.values.depositAddress}
          />

          <label htmlFor="carType">Adresse de depôt:</label>
          <input
            name="pickupAddress"
            type="text"
            id="pickupAddress"
            required
            onChange={formik.handleChange}
            value={formik.values.pickupAddress}
            placeholder="Adresse de récupération"
          />

          <label htmlFor="carType">Statut:</label>
          <input
            name="statut"
            type="text"
            id="statut"
            required
            onChange={formik.handleChange}
            value={formik.values.statut}
            placeholder="Statut"
          />

          <AddButton onClick={addLivraisonFunc} />
          <CancelButton onClick={handleClose} />
        </form>
      </div>
    </div>
  );
};

export default AddDeliveryModal;
