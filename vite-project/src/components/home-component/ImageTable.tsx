import { useEffect, useState } from "react";
import { Client } from '@stomp/stompjs';
import { ImageDecrypted } from "../../types/image";
import BACKEND_URL from "../../constants/backend-url";
import getImageById from "../../services/get-image-by-id-service";
import getImageInfo from "../../services/get-image-info-service";
import deleteImageById from "../../services/delete-image-by-id-service";

function updateImageTable(setTableData: React.Dispatch<React.SetStateAction<JSX.Element>>): void
{
    getImageInfo()
    .then(async (imagesInfo) => {
        let imagesDecrypted: ImageDecrypted[] = await Promise.all(imagesInfo.data.map(async info => {
            return getImageById(info.id)
            .then(response => {
                let blob: Blob = new Blob([response.data], { type: info.contentType });
                let url: string = URL.createObjectURL(blob);
                return {
                    id: info.id,
                    data: url
                }
            })
            .catch(error => error);
        }))

        let tableData: JSX.Element = <table className="table table-hover table-secondary table-bordered border-dark">
        <thead>
            <tr>
                <th className="text-center">Image</th>
                <th className="text-center">Action</th>
            </tr>
        </thead>
        <tbody>
        {imagesDecrypted.map(imageDecrypted => {
            return <tr key={imageDecrypted.id}>
                <td>
                    <img className="rounded mx-auto d-block" src={imageDecrypted.data} />
                </td>
                <td className="align-middle">
                    <button className="btn btn-danger mx-auto d-block" onClick={() => deleteImageById(imageDecrypted.id)}>DELETE</button>
                </td>
            </tr>
        })}
        </tbody>
        </table>;
        
        setTableData(tableData);
    })
    .catch(error => {
        if(error.status === 404)
            setTableData(
            <>
                <br />
                <p className="text-center fs-2 fw-normal text-dark">No Images Available</p>
            </>);
        else if(error.status === 401)
            setTableData(<>
                <br />
                <p className="text-center fs-2 fw-normal text-dark">Login to access the data</p>
            </>);
    });
}

function ImageTable(): JSX.Element
{
    let [tableData, setTableData]: [JSX.Element, React.Dispatch<React.SetStateAction<JSX.Element>>] = useState<JSX.Element>(
        <p>Loading...</p>
    );

    useEffect(() => {
        updateImageTable(setTableData);

        let stompClient: Client = new Client({
            webSocketFactory: () => new SockJS(`${BACKEND_URL}/ws`, { withCredentials: true }),
            debug: (str) => {
                console.log(str);
            },
            onConnect: (frame) => {
                console.log(frame);
                stompClient.subscribe('receive', () => {
                    updateImageTable(setTableData);
                })
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
            }
        });

        stompClient.activate();

        return () => {
            stompClient.deactivate();
        };
    }, []);

    return tableData;
}

export default ImageTable;