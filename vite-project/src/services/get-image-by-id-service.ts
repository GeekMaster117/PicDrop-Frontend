import axios from 'axios';
import { ImageResponse } from '../types/queryResponse';
import BACKEND_URL from '../constants/backend-url';

async function getImageById(id: number): Promise<ImageResponse>
{
    return await axios
    .get(`${BACKEND_URL}/image?id=${id}`, {
        withCredentials: true,
        responseType: 'arraybuffer'
    })
    .then(response => {
        return {
            status: response.status,
            data: response.data
        }
    })
    .catch(error => Promise.reject(error));
}

export default getImageById;