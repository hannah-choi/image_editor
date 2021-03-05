import React from "react";

export default function Button({ filter, cssFilter, imagePath }) {
    return (
        <button onClick={() => cssFilter(filter.name)}>
            <p>{filter.name}</p>
            <figure style={{ filter: `${filter.filter}` }}>
                <img src={imagePath} alt={filter.name} />
                {filter.overlays.map((overlay, index) => (
                    <div
                        key={index}
                        style={{
                            backgroundColor: `${overlay.backgroundColor}`,
                            mixBlendMode: `${overlay.mixBlendMode}`,
                            zIndex: index + 1,
                        }}
                    />
                ))}
            </figure>
        </button>
    );
}
