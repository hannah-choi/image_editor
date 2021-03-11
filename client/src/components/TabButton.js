import React from "react";

export default function TabButton({ name, tabClick, active }) {
    return (
        <button
            className={`tab ${active === name ? "active" : ""}`}
            onClick={e => tabClick(e.target.textContent)}
        >
            {name}
        </button>
    );
}
