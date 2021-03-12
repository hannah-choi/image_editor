import React from "react";

export default function Download({ downloadImage }) {
    return (
        <button
            id="download"
            className="button"
            onClick={() => downloadImage()}
        >
            DOWNLOAD
        </button>
    );
}
