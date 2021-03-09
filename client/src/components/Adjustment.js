import React from "react";
import Slidebar from "./Slidebar";

export default function Adjustment({ adjustment, optionChange }) {
    return (
        <div className="thumbnails">
            {adjustment.map((option, i) => (
                <Slidebar key={i} option={option} optionChange={optionChange} />
            ))}
        </div>
    );
}
