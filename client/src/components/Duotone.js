import React, { useState } from "react";
import duotones from "./duotones.js";
import ToneButton from "./ToneButton.js";
import { BlockPicker } from "react-color";

export default function Duotone({
    applyDuotone,
    canvasSize,
    imagePath,
    duotoneColors,
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
            <h3>Custom</h3>
            <div className="colorButtons">
                <div className="colorDiv">
                    highlight
                    <div
                        className="highlightSwatch swatch"
                        style={{
                            backgroundColor: `${duotoneColors.highlight}`,
                        }}
                        onClick={() => clickHandle("highlight")}
                    ></div>
                </div>
                <div className="colorDiv">
                    shadow
                    <div
                        className="shadowSwatch swatch"
                        style={{ backgroundColor: `${duotoneColors.shadow}` }}
                        onClick={() => clickHandle("shadow")}
                    ></div>
                </div>
            </div>
            <BlockPicker
                className={`colorpicker highlight ${
                    !highlightPicker ? "hidden" : ""
                }`}
                color={duotoneColors.highlight}
                colors={duotones
                    .map(duotone => duotone.highlight)
                    .filter(item => item !== null)}
                width={170}
                onChange={e => {
                    duotoneColorChange("highlight", e.hex);
                }}
            />
            <BlockPicker
                className={`colorpicker shadow ${
                    !shadowPicker ? "hidden" : ""
                }`}
                color={duotoneColors.shadow}
                colors={duotones
                    .map(duotone => duotone.shadow)
                    .filter(item => item !== null)}
                width={170}
                onChange={e => {
                    duotoneColorChange("shadow", e.hex);
                }}
            />
        </>
    );
}
