import axios from "axios";

export default axios.create({
    baseURL: "http://10.0.30.223:3000/api",
    timeout: 5000,
});