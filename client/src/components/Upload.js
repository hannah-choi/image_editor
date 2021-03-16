import React, { useState, useRef } from "react";
import Message from "./Message";
import axios from "axios";

export default function Upload({ getFilePath }) {
    const [file, setFile] = useState("");
    const [filename, setFilename] = useState("");
    const [uploadedFile, setUploadedFile] = useState({});
    const [message, setMessage] = useState("");
    const fileRef = useRef(null);

    const onChange = e => {
        if (!e.target || e.target.files.length === 0) {
            return;
        }
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    };

    async function onSubmitEvent(e) {
        e.preventDefault();

        if (!file || !filename) {
            setMessage("No file uploaded");
        } else {
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
                getFilePath(filePath);
                setMessage("File uploaded");
            } catch (err) {
                if (err.response.status === 500) {
                    setMessage("Error occured in the server");
                }
                setMessage(err.response.data.msg);
            }
        }
    }

    const getFileName = () => {
        const ext = filename.split(".").pop();
        const name =
            ext === "jpeg" ? filename.slice(0, -3) : filename.slice(0, -2);
        return name.length < 12 ? filename : name.slice(0, 12) + "..." + ext;
    };

    return (
        <div className="form">
            <Message msg={file && message ? message : null} />
            <form onSubmit={e => onSubmitEvent(e)} method="POST">
                <label ref={fileRef} className="inputLabel">
                    <input
                        type="file"
                        name="image"
                        id="imageUpload"
                        accept="image/*"
                        onChange={onChange}
                        formEncType="multipart/form-data"
                    />
                    <span
                        onMouseOver={e => {
                            if (file && filename) {
                                e.target.textContent = "Change file";
                            }
                        }}
                        onMouseOut={e => {
                            if (file && filename) {
                                e.target.textContent = getFileName();
                            }
                        }}
                    >
                        {filename ? getFileName() : "Choose File"}
                    </span>
                </label>
                <input type="submit" value="UPLOAD" />
            </form>
        </div>
    );
}
