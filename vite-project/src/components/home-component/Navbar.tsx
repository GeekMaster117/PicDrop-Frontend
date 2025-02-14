import { useState } from "react";
import logout from "../../services/logout-service";
import uploadImage from "../../services/upload-image-service";

function handleUpload(event: React.FormEvent<HTMLFormElement>, image: File | null)
{
    event.preventDefault();
    event.currentTarget.reset();

    if(!image)
        return;

    uploadImage(image);
}

function Navbar(): JSX.Element
{
    const [image, setImage]: [File | null, React.Dispatch<React.SetStateAction<File | null>>] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setImage(event.target.files ? event.target.files[0] : null);
    };

    return <nav className="navbar navbar-dark bg-dark">
        <div className="container">
            <div className="mb-3">
                <label className="form-label text-light">Drop your picture here</label>
                <form className="d-flex align-items-center" onSubmit={event => handleUpload(event, image)}>
                    <input className="form-control form-control-sm bg-light text-dark me-3" 
                        type="file" 
                        id="formFile"
                        onChange={handleFileChange}
                    />
                    <button className="btn btn-sm btn-success" type="submit">Upload</button>
                </form>
            </div>
            <button className="btn btn-secondary ms-auto" onClick={() => logout()}>Logout</button>
        </div>
    </nav>
}

export default Navbar;
