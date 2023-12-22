import React, { useEffect, useState } from "react";
import moment from "moment";
import { useFormik } from "formik";

import "./Users.css";
import AddUserModal from "./components/Modals/AddUserModal";
import { getDelivers } from "../../api/deliver";
import DeleteUserModal from "./components/Modals/DeleteUserModal";
import DeleteButton from "../components/Buttons/DeleteButton";
import AddButton from "../components/Buttons/AddButton";
import EditButton from "../components/Buttons/EditButton";
import EditUserModal from "./components/Modals/EditUserModal";
import FilterButton from "../components/Buttons/FilterButton";
import IconedFilterButton from "../components/Buttons/IconedFilterButton";
import FilterUserModal from "./components/Modals/FilterUserModal";
import Pagination from "./components/Pagination/Pagination";
import sortUsersByDate from "./Utils/SortByDate";
import sortUsersByName from "./Utils/SortByName";
export default function Users() {
  const formik = useFormik({
    initialValues: {
      search: "", // Ajoutez le champ de recherche
    },
    onSubmit: (values) => {
      // Vous pouvez déclencher la recherche ici si nécessaire
    },
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getDelivers()
      .then((data) => {
        // Handle the data here
        setUsers(data);
      })
      .catch((error) => {
        // Handle the error here
        console.error(error);
      });
  }, []);

  // States for modal visibility
  const [addModalVisibility, setAddModalVisibility] = useState(false);
  const [deleteModalVisibility, setDeleteModalVisibility] = useState(false);
  const [editModalVisibility, setEditModalVisibility] = useState(false);
  const [filterModalVisibility, setFilterModalVisibility] = useState(false);

  // States for pagination
  const [currentPage, setCurrentPage] = useState(1);

  // States for sorting & pagination
  const itemsPerPage = 5;
  const [sortOrderName, setSortOrderName] = useState("asc");
  const [sortDateOrder, setSortDateOrder] = useState("asc");
  const [selectedDeliver, setSelectedDeliver] = useState({});
  const sortUsersByNameClick = () => {
    const newSortOrderName = sortUsersByName(users, setUsers, sortOrderName);
    setSortOrderName(newSortOrderName);
  };
  const sortUsersByDateClick = () => {
    const newSortOrder = sortUsersByDate(users, setUsers, sortDateOrder);
    setSortDateOrder(newSortOrder);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  let displayedUsers = users.slice(startIndex, endIndex);
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(formik.values.search.toLowerCase())
  );
  displayedUsers = filteredUsers.slice(startIndex, endIndex);
  function formattedDate(date) {
    const givenMoment = moment(date);
    return givenMoment.format("DD MMM YYYY");
  }
  const handleSearchChange = (e) => {
    formik.handleChange(e);
    setCurrentPage(1);
  };

  return (
    <div className="dashboardContainer" data-testid="users">
      <div className="dashboardHeader">
        <h1>Livreurs</h1>
      </div>
      <div className="searchBar">
        <div>
          <IconedFilterButton onClick={() => setFilterModalVisibility(true)} />
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
              <th>
                Nom et prénom
                <button
                  className="sortButton"
                  onClick={() => sortUsersByNameClick()}
                >
                  ⬇
                </button>
              </th>
              <th>Voiture</th>
              <th>Disponible</th>
              <th>
                Date de création
                <button
                  className="sortButton"
                  onClick={() => sortUsersByDateClick()}
                >
                  ⬇
                </button>
              </th>

              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.carType}</td>
                <td>{user.isAvailable ? "Oui" : "Non"}</td>
                <td>{formattedDate(user.date)}</td>
                <td className="buttonsActions">
                  <EditButton
                    onClick={() => {
                      setSelectedDeliver(user);
                      setEditModalVisibility(true);
                    }}
                  />
                  <DeleteButton
                    onClick={() => {
                      setSelectedDeliver(user);
                      setDeleteModalVisibility(true);
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
          totalPages={Math.ceil(users.length / itemsPerPage)}
          onPageChange={handlePageChange}
        />
      </div>
      <AddUserModal
        showModal={addModalVisibility}
        handleClose={() => setAddModalVisibility(false)}
      />
      <DeleteUserModal
        showModal={deleteModalVisibility}
        handleClose={() => setDeleteModalVisibility(true)}
        selectedUser={selectedDeliver}
      />
      <EditUserModal
        showModal={editModalVisibility}
        handleClose={() => setEditModalVisibility(false)}
        selectedUser={selectedDeliver}
      />
      <FilterUserModal
        showModal={filterModalVisibility}
        handleClose={() => setFilterModalVisibility(false)}
        setUserFiltered={setUsers}
      />
    </div>
  );
}
