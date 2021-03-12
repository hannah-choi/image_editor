const filters = [
    {
        name: "original",
        filter: [
            { property: "brightness", value: 100 },
            { property: "contrast", value: 100 },
            { property: "saturate", value: 100 },
            { property: "hue-rotate", value: 0 },
            { property: "sepia", value: 0 },
        ],
        overlays: [],
    },
    {
        name: "aden",
        filter: [
            { property: "brightness", value: 120 },
            { property: "contrast", value: 90 },
            { property: "saturate", value: 85 },
            { property: "hue-rotate", value: 340 },
            { property: "sepia", value: 20 },
        ],
        overlays: [
            {
                backgroundColor: "rgba(66, 10, 14, 0.2)",
                mixBlendMode: "darken",
            },
        ],
    },
    {
        name: "clarendon",
        filter: [
            { property: "brightness", value: 100 },
            { property: "contrast", value: 120 },
            { property: "saturate", value: 135 },
            { property: "hue-rotate", value: 0 },
            { property: "sepia", value: 0 },
        ],
        overlays: [
            {
                backgroundColor: "rgba(127, 187, 227, 0.2)",
                mixBlendMode: "overlay",
            },
        ],
    },
    {
        name: "1977",
        filter: [
            { property: "brightness", value: 110 },
            { property: "contrast", value: 110 },
            { property: "saturate", value: 130 },
            { property: "hue-rotate", value: 0 },
            { property: "sepia", value: 0 },
        ],
        overlays: [
            {
                backgroundColor: "rgba(243, 106, 188, 0.3)",
                mixBlendMode: "screen",
            },
        ],
    },
    {
        name: "nashville",
        filter: [
            { property: "brightness", value: 105 },
            { property: "contrast", value: 120 },
            { property: "saturate", value: 120 },
            { property: "hue-rotate", value: 0 },
            { property: "sepia", value: 20 },
        ],
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
        filter: [
            { property: "brightness", value: 95 },
            { property: "contrast", value: 95 },
            { property: "saturate", value: 150 },
            { property: "hue-rotate", value: 0 },
            { property: "sepia", value: 25 },
        ],
        overlays: [
            {
                backgroundColor: "rgba(3, 230, 26, 0.2)",
                mixBlendMode: "hue",
            },
        ],
    },
    {
        name: "gingham",
        filter: [
            { property: "brightness", value: 105 },
            { property: "contrast", value: 100 },
            { property: "saturate", value: 100 },
            { property: "hue-rotate", value: 350 },
            { property: "sepia", value: 0 },
        ],
        overlays: [
            {
                backgroundColor: "rgba(230, 230, 250, 1)",
                mixBlendMode: "soft-light",
            },
        ],
    },
    {
        name: "valencia",
        filter: [
            { property: "brightness", value: 108 },
            { property: "contrast", value: 108 },
            { property: "saturate", value: 100 },
            { property: "hue-rotate", value: 0 },
            { property: "sepia", value: 8 },
        ],
        overlays: [
            {
                backgroundColor: "rgba(58, 3, 57, 0.5)",
                mixBlendMode: "exclusion",
            },
        ],
    },
    {
        name: "hudson",
        filter: [
            { property: "brightness", value: 110 },
            { property: "contrast", value: 100 },
            { property: "saturate", value: 150 },
            { property: "hue-rotate", value: -10 },
            { property: "sepia", value: 30 },
        ],
        overlays: [
            {
                backgroundColor: "rgba(0, 68, 204, 0.3)",
                mixBlendMode: "screen",
            },
        ],
    },
];

export default filters;
