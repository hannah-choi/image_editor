import React, { useRef, useState, useEffect } from "react";
import filters from "./filters.js";
import Duotone from "./Duotone";
import duotones from "./duotones.js";
import Adjustment from "./Adjustment";
import Download from "./Download";
import TabButton from "./TabButton.js";
import InstaFilter from "./InstaFilter.js";

export default function Canvas({ newImagePath }) {
    const canvasRef = useRef(null);
    const imageRef = useRef(null);
    const contextRef = useRef(null);
    const thumbnails = useRef(null);
    const [imagePath, setImagePath] = useState("./uploads/default.jpeg");
    const [canvasSize, setCanvasSize] = useState({});
    const [active, setActive] = useState("Duotone");
    const [selectedColors, setSelectedColors] = useState({
        highlight: "#fff",
        shadow: "#000",
    });
    const [duoColors, setDuoColors] = useState({
        highlight: null,
        shadow: null,
    });

    const [adjustment, setAdjustment] = useState([
        {
            property: "brightness",
            value: 100,
        },
        {
            property: "contrast",
            value: 100,
        },
        {
            property: "saturate",
            value: 100,
        },
        {
            property: "hue-rotate",
            value: 0,
        },
        {
            property: "sepia",
            value: 0,
        },
    ]);

    const getFilterString = array => {
        return array
            .map(
                item =>
                    `${item.property}(${parseInt(item.value)}${
                        item.property !== "hue-rotate" ? "%" : "deg"
                    })`
            )
            .join(" ");
    };

    const optionChange = (name, newValue) => {
        setAdjustment(
            adjustment.map(item =>
                item.property === name
                    ? { ...item, value: parseInt(newValue) }
                    : item
            )
        );
        contextRef.current.drawImage(imageRef.current, 0, 0);
        contextRef.current.filter = getFilterString(adjustment);
    };

    const downloadImage = () => {
        const link = document.createElement("a");
        link.download = "image.png";
        link.href = canvasRef.current.toDataURL("");
        link.click();
    };

    const applyInstaFilter = name => {
        const selectedFilter = filters.find(filter => filter.name === name);
        setCanvas();
        contextRef.current.clearRect(0, 0, canvasSize.width, canvasSize.height);

        if (selectedFilter.name === "original") {
            contextRef.current.filter = "none";
        } else {
            contextRef.current.filter = getFilterString(selectedFilter.filter);
            setAdjustment(
                selectedFilter.filter.map(item =>
                    item.property === name
                        ? { ...item, value: item.value }
                        : item
                )
            );
        }
        imageLoad();
        selectedFilter.overlays.forEach(overlay => {
            contextRef.current.globalCompositeOperation = overlay.mixBlendMode;
            contextRef.current.fillStyle = overlay.backgroundColor;
            contextRef.current.fillRect(
                0,
                0,
                canvasSize.width,
                canvasSize.height
            );
        });
    };

    const applyDuotone = name => {
        const { width, height } = canvasSize;
        contextRef.current.clearRect(0, 0, width, height);
        const selectedTone = duotones.find(duotone => duotone.name === name);
        if (selectedTone.name === "Original") {
            imageLoad();
        } else {
            duotoneImageLoad();
            contextRef.current.globalCompositeOperation = "multiply";
            contextRef.current.fillStyle = selectedTone.highlight;
            contextRef.current.fillRect(0, 0, width, height);
            contextRef.current.globalCompositeOperation = "lighten";
            contextRef.current.fillStyle = selectedTone.shadow;
            contextRef.current.fillRect(0, 0, width, height);
            setSelectedColors({
                highlight: selectedTone.highlight,
                shadow: selectedTone.shadow,
            });
        }
    };

    // const applyCustomDuotone = name => {
    //     const { width, height } = canvasSize;
    //     contextRef.current.clearRect(0, 0, width, height);
    //     duotoneImageLoad();
    //     contextRef.current.globalCompositeOperation = "multiply";
    //     contextRef.current.fillStyle = selectedColors.highlight;
    //     contextRef.current.fillRect(0, 0, width, height);
    //     contextRef.current.globalCompositeOperation = "lighten";
    //     contextRef.current.fillStyle = selectedColors.shadow;
    //     contextRef.current.fillRect(0, 0, width, height);
    // };

    const setCanvas = () => {
        setCanvasSize({
            width: imageRef.current.naturalWidth,
            height: imageRef.current.naturalHeight,
        });
    };

    const duotoneImageLoad = () => {
        setCanvas();
        contextRef.current.filter = "grayscale(1)";
        contextRef.current.drawImage(
            imageRef.current,
            0,
            0,
            canvasSize.width,
            canvasSize.height
        );
        contextRef.current.filter = "grayscale(0)";
    };

    const imageLoad = () => {
        setCanvas();
        contextRef.current.drawImage(
            imageRef.current,
            0,
            0,
            canvasSize.width,
            canvasSize.height
        );
    };

    const buttons = ["Adjustment", "Duotone", "Insta-filter"];

    const duotoneColorChange = (name, e) => {
        if (name === "highlight") {
            setDuoColors({ ...duoColors, highlight: e.hex });
            applyDuotone("highlight");
        } else {
            setDuoColors({ ...duoColors, shadow: e.hex });
            applyDuotone("shadow");
        }
    };

    const tabClick = textContent => {
        setActive(textContent);
    };

    useEffect(() => {
        setImagePath(newImagePath ? newImagePath : imagePath);
        imageRef.current.src = newImagePath ? newImagePath : imagePath;
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        contextRef.current = context;
        setCanvas();
    }, [imagePath, newImagePath]);

    return (
        <div className="wrapper">
            <div className="canvasWrapper">
                <Download downloadImage={downloadImage} />
                <img
                    className="previewImage"
                    ref={imageRef}
                    crossOrigin=""
                    alt="preview"
                    onLoad={() => imageLoad()}
                />
                <canvas
                    ref={canvasRef}
                    width={canvasSize.width}
                    height={canvasSize.height}
                />
            </div>
            <div className="effectWrapper">
                <h3>Adjust</h3>
                <h3>Presets</h3>
                {buttons.map(item => (
                    <TabButton key={item} name={item} tabClick={tabClick} />
                ))}
                <div ref={thumbnails} className="features">
                    {active === "Adjustment" ? (
                        <Adjustment
                            adjustment={adjustment}
                            optionChange={optionChange}
                        />
                    ) : active === "Insta-filter" ? (
                        <InstaFilter
                            imagePath={imagePath}
                            applyInstaFilter={applyInstaFilter}
                        />
                    ) : (
                        <Duotone
                            imagePath={imagePath}
                            canvasSize={canvasSize}
                            duoColors={duoColors}
                            applyDuotone={applyDuotone}
                            duotoneColorChange={duotoneColorChange}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
