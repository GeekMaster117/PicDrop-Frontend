import axios from "axios";
import { CSRFResponse, DefaultResponse } from "../types/queryResponse";
import BACKEND_URL from "../constants/backend-url";

async function uploadImage(image: File): Promise<DefaultResponse>
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

    let formData: FormData = new FormData();
    formData.append("image", image);

    return await axios
    .post(`${BACKEND_URL}/image`, formData, {
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
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

export default uploadImage;