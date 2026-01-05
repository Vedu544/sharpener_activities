import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

export const addCricketer = (data) =>
  API.post("/cricketers", data);

export const searchCricketers = (query) =>
  API.get(`/cricketers?search=${query}`);

export const getCricketerById = (id) =>
  API.get(`/cricketers/${id}`);
