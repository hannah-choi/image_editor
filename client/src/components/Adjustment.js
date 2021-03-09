import React from "react";
import Slidebar from "./Slidebar";

export default function Adjustment({ adjustment, optionChange }) {
    return adjustment.map((option, i) => (
        <Slidebar key={i} option={option} optionChange={optionChange} />
    ));
}
