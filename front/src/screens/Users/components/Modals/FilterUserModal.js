import React, { useState } from "react";
import "./FilterUserModal.css"; // Import your custom CSS for styling
import { useFormik } from "formik";
import {
  filterDeliveries,
  filterDeliveriesAfter,
  filterDeliveriesBefore,
} from "../../../../api/deliver";
import FilterButton from "../../../components/Buttons/FilterButton";

const FilterUserModal = ({ showModal, handleClose, setUserFiltered }) => {
  const formik = useFormik({
    initialValues: {
      beforeDate: Date.now(),
      afterDate: Date.now(),
      availability: false,
    },
  });

  const [filterType, setFilterType] = useState(null);

  if (!showModal) {
    return null;
  }

  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value);
  };

  function onSubmit() {
    handleClose();
    const data = {
      beforeDate: new Date(formik.values.beforeDate),
      afterDate: new Date(formik.values.afterDate),
      availability: formik.values.availability,
    };
    console.log("🚀 ~ file: FilterUserModal.js:39 ~ onSubmit ~ data:", data);
    console.log(filterType);
    if (filterType === "allFilter") {
      filterDeliveries(data)
        .then((res) => {
          setUserFiltered(res);
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (filterType === "beforeDate") {
      filterDeliveriesBefore(data.beforeDate)
        .then((res) => {
          setUserFiltered(res);
        })
        .catch((error) => {
          console.error(error);
          console.log("Error response:", error.response); // Log the full error response
        });
    } else if (filterType === "afterDate") {
      filterDeliveriesAfter(data.afterDate)
        .then((res) => {
          setUserFiltered(res);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  return (
    <div className={`modal ${showModal ? "show" : ""}`} onClick={handleClose}>
      <div className="modal-content" onClick={(res) => res.stopPropagation()}>
        <h2>Filter les livreurs par :</h2>
        <form>
          {/* Select one of 3 checkbox type of filter */}
          <div>
            <label>
              <input
                type="radio"
                name="allFilter"
                value="allFilter"
                checked={filterType === "allFilter"}
                onChange={handleFilterTypeChange}
              />
              Tout les filtres
            </label>
            <label>
              <input
                type="radio"
                name="beforeDate"
                value="beforeDate"
                checked={filterType === "beforeDate"}
                onChange={handleFilterTypeChange}
              />
              Avant une date
            </label>
            <label>
              <input
                type="radio"
                name="afterDate"
                value="afterDate"
                checked={filterType === "afterDate"}
                onChange={handleFilterTypeChange}
              />
              Après une date
            </label>

            {/* If beforeDate is selected */}
            {filterType === "beforeDate" && (
              <label>
                Avant la Date:
                <input
                  type="date"
                  value={formik.values.beforeDate}
                  onChange={(e) =>
                    formik.setFieldValue("beforeDate", e.target.value)
                  }
                />
              </label>
            )}
            {/* If afterDate is selected */}
            {filterType === "afterDate" && (
              <label>
                Après la Date:
                <input
                  type="date"
                  value={formik.values.afterDate}
                  onChange={(e) =>
                    formik.setFieldValue("afterDate", e.target.value)
                  }
                />
              </label>
            )}
            {/* If allFilter is selected */}
            {filterType === "allFilter" && (
              <div>
                <label>
                  Avant la Date:
                  <input
                    type="date"
                    value={formik.values.beforeDate}
                    onChange={(e) =>
                      formik.setFieldValue("beforeDate", e.target.value)
                    }
                  />
                </label>
                <label>
                  Après la Date:
                  <input
                    type="date"
                    value={formik.values.afterDate}
                    onChange={(e) =>
                      formik.setFieldValue("afterDate", e.target.value)
                    }
                  />
                </label>
                <label>
                  Disponibilité:
                  <input
                    type="checkbox"
                    value={formik.values.availability}
                    onChange={formik.handleChange}
                  />
                </label>
              </div>
            )}
          </div>
          <FilterButton onClick={onSubmit} />
        </form>
      </div>
    </div>
  );
};

export default FilterUserModal;
