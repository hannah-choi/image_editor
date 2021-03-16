import React, { useRef, useState, useEffect } from "react";
import filters from "./filters.js";
import Duotone from "./Duotone";
import duotones from "./duotones.js";
import Adjustment from "./Adjustment";
import Download from "./Download";
import TabButton from "./TabButton.js";

export default function Canvas({ newImagePath }) {
    const canvasRef = useRef(null);
    const imageRef = useRef(null);
    const contextRef = useRef(null);
    const thumbnails = useRef(null);
    const [imagePath, setImagePath] = useState("./uploads/default.jpeg");
    const [canvasSize, setCanvasSize] = useState({});
    const [active, setActive] = useState("Adjustment");
    const [duotoneColors, setDuotoneColors] = useState({
        highlight: "#fff",
        shadow: "#fff",
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

    //When effect input is changed
    const applyChange = (name, newValue) => {
        setAdjustment(
            adjustment.map(item =>
                item.property === name
                    ? { ...item, value: parseInt(newValue) }
                    : item
            )
        );
        contextRef.current.drawImage(imageRef.current, 0, 0);
        contextRef.current.filter = getFilterString(adjustment);
        contextRef.current.globalCompositeOperation = "source-over";
        // canvasFill();
        imageLoad();
    };

    //apply instagram filter
    const applyInstaFilter = name => {
        const selectedFilter = filters.find(filter => filter.name === name);
        setCanvas();
        clearCanvas();
        contextRef.current.filter = getFilterString(selectedFilter.filter);
        imageLoad();
        setAdjustment(
            selectedFilter.filter.map(item =>
                item.property === name ? { ...item, value: item.value } : item
            )
        );
        selectedFilter.overlays.forEach(overlay => {
            contextRef.current.globalCompositeOperation = overlay.mixBlendMode;
            contextRef.current.fillStyle = overlay.backgroundColor;
            canvasFill();
        });
    };

    //apply duotone effect
    const applyDuotone = name => {
        clearCanvas();
        const selectedTone = duotones.find(duotone => duotone.name === name);
        if (selectedTone.name === "Original") {
            imageLoad();
        } else {
            duotoneImageLoad();
            duotoneFilter(selectedTone.highlight, selectedTone.shadow);
            setDuotoneColors({
                highlight: selectedTone.highlight,
                shadow: selectedTone.shadow,
            });
        }
    };

    // duotone effect function
    const duotoneFilter = (highlight, shadow) => {
        contextRef.current.globalCompositeOperation = "multiply";
        contextRef.current.fillStyle = highlight;
        canvasFill();
        contextRef.current.globalCompositeOperation = "lighten";
        contextRef.current.fillStyle = shadow;
        canvasFill();
    };

    const setCanvas = () => {
        setCanvasSize({
            width: imageRef.current.naturalWidth,
            height: imageRef.current.naturalHeight,
        });
    };

    const canvasFill = () => {
        contextRef.current.fillRect(0, 0, canvasSize.width, canvasSize.height);
    };

    const clearCanvas = () => {
        contextRef.current.clearRect(0, 0, canvasSize.width, canvasSize.height);
    };

    //initial image load when duotone is selected
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

    //initial image load
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

    const buttons = ["Adjustment", "Duotone"];

    //duotone custom color change
    const duotoneColorChange = (name, color) => {
        duotoneImageLoad();
        if (name === "highlight") {
            duotoneFilter(color, duotoneColors.shadow);
            setDuotoneColors({ ...duotoneColors, highlight: color });
        } else {
            duotoneFilter(duotoneColors.highlight, color);
            setDuotoneColors({ ...duotoneColors, shadow: color });
        }
    };

    const tabClick = textContent => {
        setActive(textContent);
    };

    const downloadImage = () => {
        const link = document.createElement("a");
        link.download = "image.png";
        link.href = canvasRef.current.toDataURL("");
        link.click();
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
        <div className="container">
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
                {imagePath === "./uploads/default.jpeg" ? (
                    <small className="credit">
                        Photo credit: https://unsplash.com/@kabofoods
                    </small>
                ) : (
                    ""
                )}
            </div>
            <div className="effectWrapper">
                {buttons.map(item => (
                    <TabButton
                        key={item}
                        name={item}
                        tabClick={tabClick}
                        active={active}
                    />
                ))}
                <div ref={thumbnails} className="features">
                    {active === "Adjustment" ? (
                        <Adjustment
                            imagePath={imagePath}
                            adjustment={adjustment}
                            applyChange={applyChange}
                            applyInstaFilter={applyInstaFilter}
                            getFilterString={getFilterString}
                        />
                    ) : (
                        <Duotone
                            imagePath={imagePath}
                            canvasSize={canvasSize}
                            applyDuotone={applyDuotone}
                            duotoneColors={duotoneColors}
                            duotoneColorChange={duotoneColorChange}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
