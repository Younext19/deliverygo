import React, { useEffect, useState } from "react";
import moment from "moment";

import "./Users.css";
import AddUserModal from "./components/Modals/AddUserModal";
import { deleteDeliver, getDelivers } from "../../api/deliver";
import DeleteUserModal from "./components/Modals/DeleteUserModal";
import DeleteButton from "./components/Buttons/DeleteButton";
import AddButton from "./components/Buttons/AddButton";
import EditButton from "./components/Buttons/EditButton";
import EditUserModal from "./components/Modals/EditUserModal";
import FilterButton from "./components/Buttons/FilterButton";
import IconedFilterButton from "./components/Buttons/IconedFilterButton";
import FilterUserModal from "./components/Modals/FilterUserModal";
import Pagination from "./components/Pagination/Pagination";
import sortUsersByDate from "./Utils/SortByDate";
import sortUsersByName from "./Utils/SortByName";
export default function Users() {
  const [addModalVisibility, setAddModalVisibility] = useState(false);
  const [deleteModalVisibility, setDeleteModalVisibility] = useState(false);
  const [editModalVisibility, setEditModalVisibility] = useState(false);
  const [filterModalVisibility, setFilterModalVisibility] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]); // State to store users
  const itemsPerPage = 5;
  const [sortOrderName, setSortOrderName] = useState("asc"); // State for name sort order
  const [sortDateOrder, setSortDateOrder] = useState("asc"); // State for sort order
  const [selectedDeliver, setSelectedDeliver] = useState({});
  const sortUsersByNameClick = () => {
    const newSortOrderName = sortUsersByName(users, setUsers, sortOrderName);
    setSortOrderName(newSortOrderName);
  };

  useEffect(() => {
    getDelivers()
      .then((data) => {
        // Handle the data here
        setUsers(data);
        console.log("🚀 ~ file: Users.js:31 ~ .then ~ data:", data);
      })
      .catch((error) => {
        // Handle the error here
        console.error(error);
      });
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const deleteUser = () => {
    deleteDeliver(selectedDeliver.id);
  };

  // Calculate the range of displayed users based on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedUsers = users.slice(startIndex, endIndex);

  function formattedDate(date) {
    const givenMoment = moment(date);
    return givenMoment.format("DD MMM YYYY");
  }
  const sortUsersByDateClick = () => {
    const newSortOrder = sortUsersByDate(users, setUsers, sortDateOrder);
    setSortDateOrder(newSortOrder);
  };
  return (
    <div className="dashboardContainer" data-testid="users">
      <div className="dashboardHeader">
        <h1>Livreurs</h1>
      </div>
      <div className="searchBar">
        <div>
          <IconedFilterButton onClick={() => setFilterModalVisibility(true)} />
          <input className="searchInput" placeholder="Chercher par nom" />
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
      />
    </div>
  );
}
