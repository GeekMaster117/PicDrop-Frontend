import axios from "axios";
import { CSRFResponse } from "../types/queryResponse";
import BACKEND_URL from "../constants/backend-url";

async function getCSRF(): Promise<CSRFResponse>
{
    return await axios
    .get(`${BACKEND_URL}/csrf`)
    .then(response => {
        return {
            status: response.status,
            data: response.data
        }
    })
    .catch(error => Promise.reject(error));
}

export default getCSRF;