import React from "react";

export default function Slidebar({ option, optionChange }) {
    return (
        <div className="slidebar">
            <span className="name">{option.property}</span>
            <input
                className="input"
                type="range"
                name={option.property}
                min={0}
                max={
                    option.property === "sepia"
                        ? 100
                        : option.property === "hue-rotate"
                        ? 360
                        : 150
                }
                defaultValue={option.value}
                onInput={e => {
                    optionChange(e.target.name, e.target.value);
                }}
            />
            <span className="number">{option.value}</span>
        </div>
    );
}
