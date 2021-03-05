import React from "react";

export default function Button({ filter, cssFilter, imagePath }) {
    const overlays = filter.overlays.forEach((overlay, index) => {
        <div
            style={{
                backgroundColor: `${overlay.backgroundColor}`,
                mixBlendMode: `${overlay.mixBlendMode}`,
                zIndex: index + 1,
            }}
        />;
    });

    return (
        <button onClick={() => cssFilter(filter.name)}>
            <p>{filter.name}</p>
            <figure style={{ filter: `${filter.filter}` }}>
                <img src={imagePath} alt={filter.name} />
                {overlays}
            </figure>
        </button>
    );
}
