import axios from "axios";

export function getDeliveries() {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://localhost:8080/livraisons",
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

export function addDelivery(delivery) {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://localhost:8080/livraisons",
    headers: {
      "Content-Type": "application/json",
    },
    data: delivery,
  };

  return axios
    .request(config)
    .then((response) => console.log(response.data)) // Extracting data from the response
    .catch((error) => {
      throw error; // Rethrow the error to handle it in the component
    });
}

export function deleteDelivery(deliveryId) {
  const config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: `http://localhost:8080/livraisons/${deliveryId}`,
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

export function updateDelivery(deliveryId, delivery) {
  const config = {
    method: "put",
    maxBodyLength: Infinity,
    url: `http://localhost:8080/livraisons/${deliveryId}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: delivery,
  };

  return axios
    .request(config)
    .then((response) => console.log(response.data)) // Extracting data from the response
    .catch((error) => {
      throw error; // Rethrow the error to handle it in the component
    });
}
