import axios from "axios";

export function getDelivers() {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://localhost:8080/deliver",
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

export function addDeliver(deliver) {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://localhost:8080/deliver",
    headers: {
      "Content-Type": "application/json",
    },
    data: deliver,
  };

  return axios
    .request(config)
    .then((response) => console.log(response.data)) // Extracting data from the response
    .catch((error) => {
      throw error; // Rethrow the error to handle it in the component
    });
}
export function deleteDeliver(deliverId) {
  const config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: `http://localhost:8080/deliver/${deliverId}`,
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
