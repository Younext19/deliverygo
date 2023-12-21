import axios from "axios";

export function getTours() {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://localhost:8080/tours",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios
    .request(config)
    .then((response) => response.data) // Extracting data from the response
    .catch((error) => {
      throw error; // Rethrow the error to handle it in the component
    });
}
export function addTour(tour) {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://localhost:8080/tours",
    headers: {
      "Content-Type": "application/json",
    },
    data: tour,
  };

  return axios
    .request(config)
    .then((response) => console.log(response.data)) // Extracting data from the response
    .catch((error) => {
      throw error; // Rethrow the error to handle it in the component
    });
}

export function updateTour(tourId, tour) {
  console.log("🚀 ~ file: tours.js:40 ~ updateTour ~ tour:", tour);
  const config = {
    method: "patch",
    maxBodyLength: Infinity,
    url: `http://localhost:8080/tours/${tourId}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: tour,
    params: { id: tourId },
  };
  // get Deliver on data and asign it to deliver on tour
  return axios
    .request(config)
    .then((response) => console.log(response.data)) // Extracting data from the response
    .catch((error) => {
      console.log("🚀 ~ file: tours.js:54 ~ updateTour ~ error:", error);
      throw error; // Rethrow the error to handle it in the component
    });
}

export function deleteTour(tourId) {
  const config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: `http://localhost:8080/tours/${tourId}`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios
    .request(config)
    .then((response) => response.data) // Extracting data from the response
    .catch((error) => {
      throw error; // Rethrow the error to handle it in the component
    });
}
