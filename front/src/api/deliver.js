import axios from "axios";
let config = {
  method: "get",
  maxBodyLength: Infinity,
  url: "http://localhost:8080/deliver",
  headers: {
    "Content-Type": "application/json",
  },
};
export function getDelivers() {
  return axios
    .request(config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}
