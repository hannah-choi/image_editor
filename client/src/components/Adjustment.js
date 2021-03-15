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
            <div className="effects">
                {adjustment.map((option, i) => (
                    <Slidebar
                        key={i}
                        option={option}
                        applyChange={applyChange}
                    />
                ))}
                <div className="hr"></div>
            </div>
            <InstaFilter
                applyInstaFilter={applyInstaFilter}
                imagePath={imagePath}
            />
        </div>
    );
}
