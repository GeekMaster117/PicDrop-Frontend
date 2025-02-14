import BACKEND_URL from "../constants/backend-url";

async function logout(): Promise<void>
{
    window.location.href = `${BACKEND_URL}/logout`;
}

export default logout;