import React, { useState } from "react";
import Message from "./Message";
import axios from "axios";

export default function Upload({ getFilePath }) {
    const [file, setFile] = useState("");
    const [filename, setFilename] = useState("Choose File");
    const [uploadedFile, setUploadedFile] = useState({});
    const [message, setMessage] = useState("");

    const onChange = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    };

    async function onSubmitEvent(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await axios.post("/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            const { fileName, filePath } = res.data;
            setUploadedFile({ fileName, filePath });
            getFilePath(filePath);
            setMessage("File uploaded");
        } catch (err) {
            if (err.response.status === 500) {
                setMessage("There was a problem with the server");
            } else {
                setMessage(err.response.data.msg);
            }
        }
    }

    return (
        <div>
            {message ? <Message msg={message} /> : null}
            <form onSubmit={e => onSubmitEvent(e)}>
                <input
                    type="file"
                    name="imageUpload"
                    id="imageUpload"
                    onChange={onChange}
                />
                <label htmlFor="imageUpload">{filename}</label>
                <input type="submit" value="upload" />
            </form>
            {/* {uploadedFile ? (
                <div className="row">
                </div>
            ) : null} */}
        </div>
    );
}
