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
        name: "kelvin",
        filter: "contrast(0.1)",
        overlays: [
            {
                backgroundColor: "#b77d21",
                mixBlendMode: "overlay",
            },
            {
                backgroundColor: "#382c34",
                mixBlendMode: "color-dodge",
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
        name: "lark",
        filter: "contrast(0.9)",
        overlays: [
            {
                backgroundColor: "#22253f",
                mixBlendMode: "color-dodge",
            },
            {
                backgroundColor: "rgba(242, 242, 242, 0.8)",
                mixBlendMode: "darken",
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
