import axios from "axios";
import BACKEND_URL from "../constants/backend-url";
import { ImageInfoResponse } from "../types/queryResponse";

async function getImageInfo(): Promise<ImageInfoResponse>
{
    return await axios
    .get(`${BACKEND_URL}/image/info`, {
        withCredentials: true
    })
    .then(response => {
        return {
            status: response.status,
            data: response.data
        }
    })
    .catch(error => Promise.reject(error));
}

export default getImageInfo;