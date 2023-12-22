import React, { useEffect, useState } from "react";
import moment from "moment";
import { useFormik } from "formik";

import "./Tours.css";
import DeleteButton from "../components/Buttons/DeleteButton";
import EditButton from "../components/Buttons/EditButton";
import FilterButton from "../components/Buttons/FilterButton";
import IconedFilterButton from "../components/Buttons/IconedFilterButton";
import { getTours } from "../../api/tours";
import AddButton from "../components/Buttons/AddButton";
import AddTourModal from "./components/Modals/AddTourModal";
import Pagination from "../Users/components/Pagination/Pagination";
import DeleteTourModal from "./components/Modals/DeleteTourModal";
import EditTourModal from "./components/Modals/EditTourModal";
import { getSpecificDeliver } from "../../api/deliver";
export default function Tours() {
  const formik = useFormik({
    initialValues: {
      search: "", // Ajoutez le champ de recherche
    },
    onSubmit: (values) => {
      // Vous pouvez déclencher la recherche ici si nécessaire
    },
  });
  const [tours, setTours] = useState([]);
  useEffect(() => {
    getTours()
      .then(async (toursData) => {
        // Set the updated tours state after all async operations are done
        setTours(toursData);
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
  const [sortOrderName, setSortOrderName] = useState("asc");
  const [sortDateOrder, setSortDateOrder] = useState("asc");
  const [selectedTour, setSelectedTour] = useState();

  const [addModalVisibility, setAddModalVisibility] = useState(false);
  const [deleteModalVisibility, setDeleteModalVisibility] = useState(false);
  const [editModalVisibility, setEditModalVisibility] = useState(false);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  let displayedUsers = tours.slice(startIndex, endIndex);
  const filteredUsers = tours.filter((user) =>
    user.name.toLowerCase().includes(formik.values.search.toLowerCase())
  );
  displayedUsers = filteredUsers.slice(startIndex, endIndex);

  function formattedDate(date) {
    const givenMoment = moment(date);
    return givenMoment.format("DD MMM YYYY");
  }
  const handleSearchChange = (e) => {
    formik.handleChange(e);
    setCurrentPage(1); // Reset the current page to 1 when the search value changes
  };

  return (
    <div className="dashboardContainer" data-testid="users">
      <div className="dashboardHeader">
        <h1>Tournées</h1>
      </div>
      <div className="searchBar">
        <div>
          <IconedFilterButton onClick={() => console.log("hi")} />
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
              <th>Nom</th>
              <th>Date de début</th>
              <th>Date de fin</th>
              <th>Livreur</th>
              <th>Nombre de livraison</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{formattedDate(user.startDate)}</td>
                <td>{formattedDate(user.endDate)}</td>
                {/* /* if there is deliver return name else not assigned*/}
                <td>{user.deliver ? user.deliver : "Pas assigné"}</td>
                <td>{user?.deliveries?.length}</td>
                <td className="buttonsActions">
                  <EditButton
                    onClick={() => {
                      if (user.deliver) {
                        alert(
                          "Vous ne pouvez pas modifier une tournée assigné"
                        );
                        return;
                      }
                      console.log(user);
                      setEditModalVisibility(true);
                      setSelectedTour(user);
                    }}
                  />
                  <DeleteButton
                    onClick={() => {
                      setDeleteModalVisibility(true);
                      setSelectedTour(user);
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
          totalPages={Math.ceil(tours.length / itemsPerPage)}
          onPageChange={handlePageChange}
        />
      </div>

      <EditTourModal
        showModal={editModalVisibility}
        handleClose={() => setEditModalVisibility(false)}
        selectedUser={selectedTour}
      />
      <AddTourModal
        showModal={addModalVisibility}
        handleClose={() => setAddModalVisibility(false)}
      />
      <DeleteTourModal
        showModal={deleteModalVisibility}
        handleClose={() => setDeleteModalVisibility(false)}
        selectedUser={selectedTour}
      />
    </div>
  );
}
