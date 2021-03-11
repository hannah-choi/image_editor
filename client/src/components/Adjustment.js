import React from "react";
import Slidebar from "./Slidebar";
import InstaFilter from "./InstaFilter.js";

export default function Adjustment({
    adjustment,
    applyChange,
    imagePath,
    applyInstaFilter,
}) {
    return (
        <div className="thumbnails">
            {adjustment.map((option, i) => (
                <Slidebar key={i} option={option} applyChange={applyChange} />
            ))}
            <InstaFilter
                applyInstaFilter={applyInstaFilter}
                imagePath={imagePath}
            />
        </div>
    );
}
