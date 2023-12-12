import React, { useEffect, useState } from "react";
import "./Users.css";
import Reglage from "../../assets/reglage.png";
import AddUserModal from "./components/AddUserModal";
import { getDelivers } from "../../api/deliver";
export default function Users() {
  const [modalVisibility, setModalVisibility] = useState(false);
  useEffect(() => {
    getDelivers()
      .then((data) => {
        // Handle the data here
        console.log("🚀 ~ file: Users.js:13 ~ useEffect ~ data:", data.data);
      })
      .catch((error) => {
        // Handle the error here
        console.error(error);
      });
  }, []);
  return (
    <div className="dashboardContainer">
      <div className="dashboardHeader">
        <h1>Users</h1>
      </div>
      <div className="searchBar">
        <div>
          <button className="filterButton">
            <img src={Reglage} alt="reglage" className="filterImage" />
          </button>
          <input className="searchInput" placeholder="Enter your search" />
          <button className="searchButton">Chercher</button>
        </div>
        <div>
          <button
            className="addButton"
            onClick={() => setModalVisibility(true)}
          >
            Ajouter
          </button>
        </div>
      </div>
      <div className="separator" />
      <div className="tableContainer">
        <table className="table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Voiture</th>
              <th>Date de création</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John</td>
              <td>mercededs</td>
              <td>23/10/2023</td>
              <td>
                <button className="actionsButton">Modifier</button>
                <button className="deleteButton">Supprimer</button>
              </td>
            </tr>
            <tr>
              <td>Doe</td>
              <td>Ferrari</td>
              <td>23/12/2023</td>
              <td>
                <button className="actionsButton">Modifier</button>
                <button className="deleteButton">Supprimer</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <AddUserModal
        showModal={modalVisibility}
        handleClose={() => setModalVisibility(false)}
      />
    </div>
  );
}
