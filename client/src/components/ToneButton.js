import React from "react";
import ToneButtonImg from "./ToneButtonImg";

export default function ToneButton({
    duotone,
    applyDuotone,
    canvasSize,
    imagePath,
}) {
    return (
        <button onClick={() => applyDuotone(duotone.name)}>
            <p>{duotone.name}</p>
            <ToneButtonImg
                className="duotonePreview"
                src={imagePath}
                highlight={duotone.highlight}
                shadow={duotone.shadow}
                size={canvasSize}
                alt={duotone.name}
            />
        </button>
    );
}
