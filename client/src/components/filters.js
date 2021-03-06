const filters = [
    { name: "original", filter: "none", overlays: [] },
    {
        name: "aden",
        filter:
            "hue-rotate(-20deg) contrast(0.9) saturate(0.85) brightness(1.2)",
        overlays: [
            {
                backgroundColor: "rgba(66, 10, 14, 0.2)",
                mixBlendMode: "darken",
            },
        ],
    },
    {
        name: "clarendon",
        filter: "contrast(1.2) saturate(1.35)",
        overlays: [
            {
                backgroundColor: "rgba(127, 187, 227, 0.2)",
                mixBlendMode: "overlay",
            },
        ],
    },
    {
        name: "1977",
        filter: "contrast(1.1) brightness(1.1) saturate(1.3)",
        overlays: [
            {
                background: "rgba(243, 106, 188, 0.3)",
                mixBlendMode: "screen",
            },
        ],
    },
    {
        name: "nashville",
        filter: "sepia(0.2) contrast(1.2) brightness(1.05) saturate(1.2)",
        overlays: [
            {
                backgroundColor: "rgba(0, 70, 150, 0.4)",
                mixBlendMode: "lighten",
            },
            {
                backgroundColor: "rgba(247, 176, 153, 0.56)",
                mixBlendMode: "darken",
            },
        ],
    },
    {
        name: "maven",
        filter: "sepia(0.25) brightness(0.95) contrast(0.95) saturate(1.5)",
        overlays: [
            {
                backgroundColor: "rgba(3, 230, 26, 0.2)",
                mixBlendMode: "hue",
            },
        ],
    },
    {
        name: "gingham",
        filter: "brightness(1.05) hue-rotate(-10deg)",
        overlays: [
            {
                backgroundColor: "#e6e6fa",
                mixBlendMode: "soft-light",
            },
        ],
    },
    {
        name: "valencia",
        filter: "contrast(1.08) brightness(1.08) sepia(0.08)",
        overlays: [
            {
                backgroundColor: "rgba(58, 3, 57, 0.5)",
                mixBlendMode: "exclusion",
            },
        ],
    },
    {
        name: "hudson",
        filter: "brightness(1.1) hue-rotate(-10deg) sepia(0.3) saturate(1.6)",
        overlays: [
            {
                backgroundColor: "rgba(0, 68, 204, 0.3)",
                mixBlendMode: "screen",
            },
        ],
    },
];

export default filters;
