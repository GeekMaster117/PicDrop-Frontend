import axios from "axios";
import BACKEND_URL from "../constants/backend-url";
import { CSRFResponse, DefaultResponse } from "../types/queryResponse";

async function deleteImageById(id: number): Promise<DefaultResponse>
{
    let csrfResponse: CSRFResponse = await axios
    .get(`${BACKEND_URL}/csrf`, {
        withCredentials: true
    })
    .then(response => {
        return {
            status: response.status,
            data: response.data
        }
    })
    .catch(error => Promise.reject(error));

    let token: string = csrfResponse.data.token;

    return await axios
    .delete(`${BACKEND_URL}/image?id=${id}`, {
        withCredentials: true,
        headers: {
            "X-CSRF-TOKEN": token
        }
    })
    .then(response => {
        return {
            status: response.status,
            data: response.data
        }
    })
    .catch(error => Promise.reject(error))
}

export default deleteImageById;