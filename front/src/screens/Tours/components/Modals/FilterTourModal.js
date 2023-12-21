import React, { useState } from "react";
import "./FilterUserModal.css"; // Import your custom CSS for styling
import AddButton from "../../../components/Buttons/AddButton";
import CancelButton from "../../../components/Buttons/CancelButton";

const FilterTourModal = ({ showModal, handleClose }) => {
  const [availability, setAvailability] = useState(false);
  const [afterDate, setAfterDate] = useState("");
  const [beforeDate, setBeforeDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  if (!showModal) {
    return null; // Don't render anything if the modal is not visible
  }
  const addUser = () => {
    console.log("addUser");
  };

  const handleSearch = () => {
    // Combine filter criteria and pass them to the parent component
    const filters = {
      availability,
      afterDate,
      beforeDate,
      startDate,
      endDate,
    };

    // applyFilters(filters);

    // Close the modal after applying filters
    handleClose();
  };

  return (
    <div className={`modal ${showModal ? "show" : ""}`} onClick={handleClose}>
      <div className="modal-content" onClick={(res) => res.stopPropagation()}>
        <h2>Filter les livreurs par :</h2>
        <form>
          <label>
            <input
              type="checkbox"
              checked={availability}
              onChange={() => setAvailability(!availability)}
            />
            Disponible
          </label>
          <label>
            After Date:
            <input
              type="date"
              value={afterDate}
              onChange={(e) => setAfterDate(e.target.value)}
            />
          </label>
          <label>
            Before Date:
            <input
              type="date"
              value={beforeDate}
              onChange={(e) => setBeforeDate(e.target.value)}
            />
          </label>
          <label>
            Start Date:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>
          <label>
            End Date:
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </label>
          <AddButton onClick={addUser} />
          <CancelButton onClick={handleClose} />
        </form>
      </div>
    </div>
  );
};

export default FilterTourModal;
