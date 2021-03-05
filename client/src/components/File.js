import fileUpload from "express-fileupload";
import React from "react";

export default function File({ fileUpload }) {
    return (
        <div>
            <button id="upload">Upload</button>
            <input
                type="file"
                accept="image/*"
                id="upload"
                onChange={e => fileUpload(e)}
            />
        </div>
    );
}
