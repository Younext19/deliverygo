import React, { useEffect, useState } from "react";
import "./EditTourModal.css";
import CancelButton from "../../../components/Buttons/CancelButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import EditButton from "../../../components/Buttons/EditButton";
import { getDelivers } from "../../../../api/deliver";
import { updateTour } from "../../../../api/tours";

const editUserSchema = Yup.object().shape({
  name: Yup.string().required("Full Name is required"),
  startDate: Yup.string(),
  endDate: Yup.boolean(),
  userAssigned: Yup.string(),
});
const EditTourModal = ({ showModal, handleClose, selectedUser }) => {
  const formatDate = (dateString) => {
    // Format the date for display in the input field
    return new Date(dateString).toISOString().split("T")[0];
  };
  const [allUser, setAllUser] = useState([]);
  const [assignedUser, setAssignedUser] = useState({});

  useEffect(() => {
    // Update formik values when selectedUser changes
    formik.setValues({
      name: selectedUser?.name || "",
      startDate: selectedUser?.startDate
        ? formatDate(selectedUser.startDate)
        : "",
      endDate: selectedUser?.endDate ? formatDate(selectedUser.endDate) : "",
      userAssigned: "",
    });
    getDelivers()
      .then((data) => {
        // Handle the data here
        // set only who habve isAvailable true
        const availableDeliver = data.filter((usr) => usr.isAvailable === true);

        setAllUser(availableDeliver);
      })
      .catch((error) => {
        // Handle the error here
        console.error(error);
      });
  }, [selectedUser]);

  const formik = useFormik({
    initialValues: {
      name: "",
      startDate: new Date().toISOString().split("T")[0], // Format today's date for display
      endDate: new Date().toISOString().split("T")[0], // Format today's date for display
      userAssigned: "",
    },
    validationSchema: editUserSchema,
  });
  if (!showModal) {
    return null; // Don't render anything if the modal is not visible
  }
  const editUser = () => {
    const tourData = {
      deliver: formik.values.userAssigned,
      name: formik.values.name,
      startDate: formik.values.startDate,
      endDate: formik.values.endDate,
    };

    updateTour(selectedUser._id, tourData);
  };

  return (
    <div className={`modal ${showModal ? "show" : ""}`} onClick={handleClose}>
      <div className="modal-content" onClick={(res) => res.stopPropagation()}>
        <h2>Modifier un utilisateur</h2>
        <form>
          <label htmlFor="fullName">Nom:</label>
          <input
            name="name"
            type="text"
            id="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />

          <label htmlFor="pseudo">Date de début:</label>
          <input
            name="startDate"
            type="date"
            id="startDate"
            value={formik.values.startDate}
            onChange={formik.handleChange}
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
          <label htmlFor="carType">Assign to:</label>

          <select
            id="usrSelector"
            name="userAssigned" // Use the correct field name here
            value={formik.values.userAssigned}
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

export default EditTourModal;
