import React, { useEffect, useState } from "react";
import EditButton from "../components/Buttons/EditButton";
import DeleteButton from "../components/Buttons/DeleteButton";
import { useFormik } from "formik";
import FilterButton from "../components/Buttons/FilterButton";
import AddButton from "../components/Buttons/AddButton";
import Pagination from "../Users/components/Pagination/Pagination";
import { getDeliveries } from "../../api/deliveries";
import AddDeliveryModal from "./components/AddDeliveryModal";
import EditDeliveryModal from "./components/EditDeliveryModal";
import DeleteDeliveryModal from "./components/DeleteDeliveryModal";

export default function Delivery() {
  const formik = useFormik({
    initialValues: {
      search: "",
    },
  });
  const [DeliveriesData, setDeliveriesData] = useState([]);

  useEffect(() => {
    getDeliveries()
      .then(async (dlvData) => {
        setDeliveriesData(dlvData);
      })
      .catch((error) => {
        // Handle the error here
        console.error(error);
      });
  }, []);

  // States for pagination
  const [currentPage, setCurrentPage] = useState(1);

  // States for sorting & pagination
  const itemsPerPage = 10;
  const [selectedDelivery, setSelectedDelivery] = useState();

  const [addModalVisibility, setAddModalVisibility] = useState(false);
  const [deleteModalVisibility, setDeleteModalVisibility] = useState(false);
  const [editModalVisibility, setEditModalVisibility] = useState(false);

  const handleSearchChange = (e) => {
    formik.handleChange(e);
    setCurrentPage(1); // Reset the current page to 1 when the search value changes
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="dashboardContainer" data-testid="users">
      <div className="dashboardHeader">
        <h1>Livraisons</h1>
      </div>
      <div className="searchBar">
        <div>
          <input
            className="searchInput"
            placeholder="Chercher par nom"
            value={formik.values.search}
            onChange={handleSearchChange}
            name="search"
          />
          <FilterButton />
        </div>
        <AddButton onClick={() => setAddModalVisibility(true)} />
      </div>
      <div className="separator" />
      <div className="tableContainer">
        <table className="table">
          <thead>
            <tr>
              <th>Adresse de récupération</th>
              <th>Adresse de depôt</th>
              <th>Statut</th>
              <th>Tour</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {DeliveriesData.map((user) => (
              <tr key={user._id}>
                <td>{user.pickupAddress}</td>
                <td>{user.depositAddress}</td>
                {/* /* if there is deliver return name else not assigned*/}
                <td>{user.status}</td>
                <td>{user.tour ? user.tour : "Pas assigné"}</td>
                <td className="buttonsActions">
                  <EditButton
                    onClick={() => {
                      setEditModalVisibility(true);
                      setSelectedDelivery(user);
                    }}
                  />
                  <DeleteButton
                    onClick={() => {
                      setDeleteModalVisibility(true);
                      setSelectedDelivery(user);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Add Pagination component */}
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(DeliveriesData.length / itemsPerPage)}
          onPageChange={handlePageChange}
        />
        <AddDeliveryModal
          showModal={addModalVisibility}
          handleClose={() => setAddModalVisibility(false)}
        />
        <EditDeliveryModal
          showModal={editModalVisibility}
          handleClose={() => setEditModalVisibility(false)}
          selectedDelivery={selectedDelivery}
        />
        <DeleteDeliveryModal
          showModal={deleteModalVisibility}
          handleClose={() => setDeleteModalVisibility(false)}
          selectedDelivery={selectedDelivery}
        />
      </div>
    </div>
  );
}
