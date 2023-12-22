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

export function getSpecificDeliver(id) {
  console.log("🚀 ~ file: deliver.js:58 ~ getSpecificDeliver ~ id:", id);
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `http://localhost:8080/deliver/${id}`,
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

export function updateDeliver(deliver) {
  const config = {
    method: "patch",
    maxBodyLength: Infinity,
    url: `http://localhost:8080/deliver/${deliver.id}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: deliver,
  };

  return axios
    .request(config)
    .then((response) => response.data) // Extracting data from the response
    .catch((error) => {
      throw error; // Rethrow the error to handle it in the component
    });
}

//filter request
export function filterDeliveries(startDate, endDate, isAvailable) {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `http://localhost:8080/deliver/`,
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      startDate: startDate,
      endDate: endDate,
      isAvailable: isAvailable,
    },
  };

  return axios
    .request(config)
    .then((response) => response.data) // Extracting data from the response
    .catch((error) => {
      throw error; // Rethrow the error to handle it in the component
    });
}
//filter request before date
export function filterDeliveriesBefore(date) {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `http://localhost:8080/deliver/`,
    headers: {
      "Content-Type": "application/json",
    },
    params: { date: date.toISOString() },
  };

  return axios
    .request(config)
    .then((response) => response.data) // Extracting data from the response
    .catch((error) => {
      throw error; // Rethrow the error to handle it in the component
    });
}

//filter request after date
export function filterDeliveriesAfter(date) {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `http://localhost:8080/deliver/`,
    headers: {
      "Content-Type": "application/json",
    },
    params: { date: date.toISOString() },
  };

  return axios
    .request(config)
    .then((response) => response.data) // Extracting data from the response
    .catch((error) => {
      throw error; // Rethrow the error to handle it in the component
    });
}
