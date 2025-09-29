import axios from "axios";

const url = "http://localhost:8080/api/v1";
const apiUrl = axios.create({
  baseURL: url,
});

const token = localStorage.getItem("token");
 const headers = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: token ? `Bearer ${token}` : "",
  };
};


export { apiUrl ,headers,token};


