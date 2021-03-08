import React from "react";

export default function TabButton({ name, tabClick }) {
    return (
        <button className="tab" onClick={e => tabClick(e.target.textContent)}>
            {name}
        </button>
    );
}
