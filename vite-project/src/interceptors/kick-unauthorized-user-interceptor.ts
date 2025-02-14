import axios from "axios";
import BACKEND_URL from "../constants/backend-url";

axios.interceptors.response.use(
    response => response,
    error => {
        if(error.response.status === 401) {
            window.location.href = `${BACKEND_URL}/login`;
        }
        return Promise.reject(error);
    }
);