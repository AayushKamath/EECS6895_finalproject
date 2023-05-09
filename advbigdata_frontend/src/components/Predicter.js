import React, { useEffect, useState } from "react";
// import * as tf from '@tensorflow/tfjs';
// // import { loadLayersModel } from "@tensorflow/tfjs-layers";
// import { MinMax } from "scikit-learn";
// import pandas from "pandas-js";
// // import plt from 'nodeplotlib';


export function Predicter({ }) {
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);

    useEffect(() => {
        // prediction_helper()
    }, [])

    const handleSubmit = event => {
        event.preventDefault();

        // Create a new FormData object
        const formData = new FormData();

        // Append the CSV file to the FormData object
        formData.append('csv_file', file);

        fetch(`http://127.0.0.1:8000/api/predict`, {
            mode: 'cors',
            method: 'POST',
            body: formData,

        })
            .then((response) => response.json())
            .then((data) => {
                // Decode the base64-encoded image data
                const decodedImageData = atob(data.image.split(',')[1]);

                // Create a Uint8Array from the decoded image data
                const uint8Array = new Uint8Array(decodedImageData.length);
                for (let i = 0; i < decodedImageData.length; i++) {
                    uint8Array[i] = decodedImageData.charCodeAt(i);
                }

                // Create a Blob from the Uint8Array and set it as the image
                const blob = new Blob([uint8Array], { type: 'image/png' });
                setImage(URL.createObjectURL(blob));
            })

        // return formData;
    };

    const handleFileChange = event => {
        // Set the selected file as state
        setFile(event.target.files[0]);
    };


    // async function prediction_helper(formData) {
    //     await fetch(`http://127.0.0.1:8000/api/predict`, {
    //         mode: 'cors',
    //         method: 'POST',

    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             // Decode the base64-encoded image data
    //             const decodedImageData = atob(data.image.split(',')[1]);

    //             // Create a Uint8Array from the decoded image data
    //             const uint8Array = new Uint8Array(decodedImageData.length);
    //             for (let i = 0; i < decodedImageData.length; i++) {
    //                 uint8Array[i] = decodedImageData.charCodeAt(i);
    //             }

    //             // Create a Blob from the Uint8Array and set it as the image
    //             const blob = new Blob([uint8Array], { type: 'image/png' });
    //             setImage(URL.createObjectURL(blob));
    //         })




    // }

    return <div>
        <form onSubmit={handleSubmit} style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "2rem",
            alignContent: "center",
        }}>
            <input type="file" name="csv_file" onChange={handleFileChange} />
            <button type="submit">Submit</button>
        </form>

        {image && <div className="row">
            <img src={image} style={{ width: '100%', margin: '8px' }} alt="Inverse transform graph" />
        </div>}

    </div>;
}
