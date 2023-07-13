import axios from "axios";

const client = axios.create({ baseURL: "http://192.168.0.14:3000/api" });

export default client;
