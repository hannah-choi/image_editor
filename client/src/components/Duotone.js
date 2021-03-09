import React from "react";
import duotones from "./duotones.js";
import ToneButton from "./ToneButton.js";

export default function Duotone({ applyDuotone, canvasSize, imagePath }) {
    return duotones.map(duotone => (
        <ToneButton
            key={duotone.name}
            applyDuotone={applyDuotone}
            canvasSize={canvasSize}
            duotone={duotone}
            imagePath={imagePath}
        />
    ));
}
