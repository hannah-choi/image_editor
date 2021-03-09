import React, { useState } from "react";
import duotones from "./duotones.js";
import ToneButton from "./ToneButton.js";
import { BlockPicker } from "react-color";

export default function Duotone({
    applyDuotone,
    canvasSize,
    imagePath,
    duoColors,
    duotoneColorChange,
}) {
    const [highlightPicker, setHighlightPicker] = useState(false);
    const [shadowPicker, setShadowPicker] = useState(false);

    const clickHandle = name => {
        name === "highlight"
            ? setHighlightPicker(!highlightPicker)
            : setShadowPicker(!shadowPicker);
    };

    return (
        <>
            <div className="colorButtons">
                <button onClick={() => clickHandle("highlight")}>
                    Highlight Color
                </button>
                <button onClick={() => clickHandle("shadow")}>
                    Shadow Color
                </button>
            </div>
            <BlockPicker
                className={`colorpicker highlight ${
                    !highlightPicker ? "hidden" : ""
                }`}
                color={
                    duoColors.highlight === null ? "#fff" : duoColors.highlight
                }
                colors={duotones
                    .map(duotone => duotone.highlight)
                    .filter(item => item !== null)}
                width={106}
                onChangeComplete={e => duotoneColorChange("highlight", e.hex)}
            />
            <BlockPicker
                className={`colorpicker shadow ${
                    !shadowPicker ? "hidden" : ""
                }`}
                color={duoColors.highlight === null ? "#fff" : duoColors.shadow}
                colors={duotones
                    .map(duotone => duotone.shadow)
                    .filter(item => item !== null)}
                width={106}
                onChangeComplete={e => duotoneColorChange("shadow", e.hex)}
            />
            <div className="thumbnails">
                {duotones.map(duotone => (
                    <ToneButton
                        key={duotone.name}
                        applyDuotone={applyDuotone}
                        canvasSize={canvasSize}
                        duotone={duotone}
                        imagePath={imagePath}
                    />
                ))}
            </div>
        </>
    );
}
