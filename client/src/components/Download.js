import React from "react";

export default function Download({ downloadImage }) {
    return (
        <button id="upload" onClick={() => downloadImage()}>
            Download
        </button>
    );
}
