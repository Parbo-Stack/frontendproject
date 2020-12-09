import axios from "axios";
import AuthHeader from "./Services/Auth-header"

const instance = axios.create({
    baseURL: "http://localhost:8081/api",
    headers: AuthHeader(),
});

export default instance;