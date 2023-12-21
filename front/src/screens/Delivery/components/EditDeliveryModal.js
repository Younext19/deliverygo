import React, { useEffect, useState } from "react";
import "./EditDeliveryModal.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getTours } from "../../../api/tours";
import EditButton from "../../components/Buttons/EditButton";
import CancelButton from "../../components/Buttons/CancelButton";
import { updateDelivery } from "../../../api/deliveries";

const editUserSchema = Yup.object().shape({
  name: Yup.string().required("Full Name is required"),
  startDate: Yup.string(),
  endDate: Yup.boolean(),
  userAssigned: Yup.string(),
});
const EditDeliveryModal = ({ showModal, handleClose, selectedDelivery }) => {
  const [allUser, setAllUser] = useState([]);
  useEffect(() => {
    // Update formik values when selectedDelivery changes
    formik.setValues({
      pickupAddress: selectedDelivery?.pickupAddress || "",
      depositAddress: selectedDelivery?.depositAddress,
      status: selectedDelivery?.status,
      tourAssigned: "",
    });
    getTours()
      .then((data) => {
        setAllUser(data);
      })
      .catch((error) => {
        // Handle the error here
        console.error(error);
      });
  }, [selectedDelivery]);

  const formik = useFormik({
    initialValues: {
      pickupAddress: "",
      depositAddress: "",
      status: "",
      tourAssigned: "",
    },
    validationSchema: editUserSchema,
  });
  if (!showModal) {
    return null; // Don't render anything if the modal is not visible
  }
  const editUser = () => {
    const deliveryData = {
      pickupAddress: formik.values.pickupAddress,
      depositAddress: formik.values.depositAddress,
      status: formik.values.status,
      tourAssigned: formik.values.tourAssigned,
    };
    updateDelivery(selectedDelivery._id, deliveryData);
  };

  return (
    <div className={`modal ${showModal ? "show" : ""}`} onClick={handleClose}>
      <div className="modal-content" onClick={(res) => res.stopPropagation()}>
        <h2>Modifier un utilisateur</h2>
        <form>
          <label htmlFor="fullName">Addresse de récuperation:</label>
          <input
            name="pickupAddress"
            type="text"
            id="pickupAddress"
            value={formik.values.pickupAddress}
            onChange={formik.handleChange}
          />

          <label htmlFor="pseudo">Adresse de depôt:</label>
          <input
            name="depositAddress"
            type="text"
            id="depositAddress"
            value={formik.values.depositAddress}
            onChange={formik.handleChange}
          />
          <label htmlFor="carType">Statut :</label>
          <input
            name="status"
            type="text"
            id="status"
            required
            onChange={formik.handleChange}
            value={formik.values.status}
          />
          <label htmlFor="carType">Tour:</label>

          <select
            id="usrSelector"
            name="tourAssigned" // Use the correct field name here
            value={formik.values.tourAssigned}
            onChange={formik.handleChange}
          >
            <option value="" disabled>
              Assigner a :
            </option>
            {allUser.map((usr) => (
              <option key={usr._id} value={usr._id}>
                {usr.name}
              </option>
            ))}
          </select>

          <EditButton onClick={editUser} />
          <CancelButton onClick={handleClose} />
        </form>
      </div>
    </div>
  );
};

export default EditDeliveryModal;
