import React, { useState } from "react";
import Message from "./Message";
import axios from "axios";

export default function Upload({ getFilePath }) {
    const [file, setFile] = useState("");
    const [filename, setFilename] = useState("Choose File");
    const [uploadedFile, setUploadedFile] = useState({});
    const [message, setMessage] = useState("");

    const onChange = e => {
        if (e.target === "undefined") {
            return;
        }
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    };

    async function onSubmitEvent(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", file);

        try {
            const res = await axios.post("/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            const { fileName, filePath } = res.data;
            setUploadedFile({ fileName, filePath });
            console.log({ filePath });
            getFilePath(filePath);
            setMessage("File uploaded");
        } catch (err) {
            if (err.response.status === 500) {
                setMessage("Error occured in the server");
            }
            setMessage(err.response.data.msg);
        }
    }

    return (
        <div className="form">
            {file && message ? <Message msg={message} /> : null}
            <form onSubmit={e => onSubmitEvent(e)} method="POST">
                <label className="inputLabel">
                    <input
                        type="file"
                        name="image"
                        id="imageUpload"
                        accept="image/*"
                        onChange={onChange}
                        formEncType="multipart/form-data"
                    />
                    <span>SELECT FILE</span>
                </label>
                <input type="submit" value="UPLOAD" />
            </form>
        </div>
    );
}
