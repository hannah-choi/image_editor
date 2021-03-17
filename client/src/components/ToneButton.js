import React from "react";
import duotones from "./duotones";
import ToneButtonImg from "./ToneButtonImg";

export default function ToneButton({
    duotone,
    applyDuotone,
    canvasSize,
    imagePath,
}) {
    const render = (
        <ToneButtonImg
            className="duotonePreview"
            src={imagePath}
            highlight={duotone.highlight}
            shadow={duotone.shadow}
            size={canvasSize}
            alt={duotone.name}
        />
    );

    const original = <img src={imagePath} alt="Original" />;

    return (
        <button onClick={() => applyDuotone(duotone.name)}>
            <p>{duotone.name}</p>
            {duotone.name === "Original" ? original : render}
        </button>
    );
}
