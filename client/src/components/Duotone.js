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
    const [highlightColor, setHighLightColor] = useState(null);
    const [shadowColor, setShadowColor] = useState(null);
    // const [selectedColors, setSelectedColors] = useState({
    //     highlight: null,
    //     shadow: null,
    // });

    const clickHandle = name => {
        name === "highlight"
            ? setHighlightPicker(!highlightPicker)
            : setShadowPicker(!shadowPicker);
    };

    return (
        <>
            <div className="colorButtons">
                highlight{" "}
                <div
                    className="highlightSwatch swatch"
                    style={{ backgroundColor: `${duotoneColors.highlight}` }}
                    onClick={() => clickHandle("highlight")}
                ></div>
                shadow{" "}
                <div
                    className="shadowSwatch swatch"
                    style={{ backgroundColor: `${duotoneColors.shadow}` }}
                    onClick={() => clickHandle("shadow")}
                ></div>
            </div>
            <BlockPicker
                className={`colorpicker highlight ${
                    !highlightPicker ? "hidden" : ""
                }`}
                color={duotoneColors.highlight}
                colors={duotones
                    .map(duotone => duotone.highlight)
                    .filter(item => item !== null)}
                width={106}
                onChange={e => {
                    setHighLightColor(e.hex);
                    duotoneColorChange("highlight", e.hex);
                }}
            />
            <BlockPicker
                className={`colorpicker shadow ${
                    !shadowPicker ? "hidden" : ""
                }`}
                // color={duoColors.shadow}
                color={duotoneColors.shadow}
                colors={duotones
                    .map(duotone => duotone.shadow)
                    .filter(item => item !== null)}
                width={106}
                onChange={e => {
                    setHighLightColor(e.hex);
                    duotoneColorChange("shadow", e.hex);
                }}
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
