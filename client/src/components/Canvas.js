import React, { useRef, useState, useEffect } from "react";
import filters from "./filters.js";
import duotones from "./duotones.js";
import Button from "./Button";
import ToneButton from "./ToneButton";
import Download from "./Download";
import Slidebar from "./Slidebar";
import TabButton from "./TabButton.js";

export default function Canvas({ newImagePath }) {
    const canvasRef = useRef(null);
    const imageRef = useRef(null);
    const contextRef = useRef(null);
    const thumbnails = useRef(null);
    const [imagePath, setImagePath] = useState("./uploads/default.jpeg");
    const [canvasSize, setCanvasSize] = useState({});
    const [active, setActive] = useState("Adjustment");

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

    const instaFilter = name => {
        const selectedFilter = filters.find(filter => filter.name === name);
        const { width, height } = canvasSize;
        contextRef.current.clearRect(0, 0, width, height);

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
        contextRef.current.globalCompositeOperation = "source-over";
        contextRef.current.drawImage(imageRef.current, 0, 0, width, height);
        selectedFilter.overlays.forEach(overlay => {
            contextRef.current.globalCompositeOperation = overlay.mixBlendMode;
            contextRef.current.fillStyle = overlay.backgroundColor;
            contextRef.current.fillRect(0, 0, width, height);
        });
    };

    const applyDuotone = name => {
        const { width, height } = canvasSize;
        contextRef.current.clearRect(0, 0, width, height);
        const selectedTone = duotones.find(duotone => duotone.name === name);
        if (selectedTone.name === "Original") {
            let imageData = contextRef.current.getImageData(
                0,
                0,
                width,
                height
            );
            contextRef.current.putImageData(imageData, 0, 0);
        } else {
            duotoneImageLoad();
            let imageData = contextRef.current.getImageData(
                0,
                0,
                width,
                height
            );
            contextRef.current.putImageData(imageData, 0, 0);
            contextRef.current.globalCompositeOperation = "multiply";
            contextRef.current.fillStyle = selectedTone.highlight;
            contextRef.current.fillRect(0, 0, width, height);
            contextRef.current.globalCompositeOperation = "lighten";
            contextRef.current.fillStyle = selectedTone.shadow;
            contextRef.current.fillRect(0, 0, width, height);
        }
    };

    const duotoneImageLoad = () => {
        const { naturalWidth, naturalHeight } = imageRef.current;
        setCanvasSize({
            width: naturalWidth,
            height: naturalHeight,
        });
        contextRef.current.filter = "grayscale(1)";
        contextRef.current.drawImage(
            imageRef.current,
            0,
            0,
            naturalWidth,
            naturalHeight
        );
        contextRef.current.filter = "grayscale(0)";
    };

    const imageLoad = () => {
        const { naturalWidth, naturalHeight } = imageRef.current;
        setCanvasSize({
            width: naturalWidth,
            height: naturalHeight,
        });
        contextRef.current.drawImage(
            imageRef.current,
            0,
            0,
            naturalWidth,
            naturalHeight
        );
    };

    const buttons = ["Adjustment", "Duotone", "Insta-filter"];

    const adjustmentRender = adjustment.map((option, i) => (
        <Slidebar key={i} option={option} optionChange={optionChange} />
    ));

    const duotoneRender = duotones.map(duotone => (
        <ToneButton
            key={duotone.name}
            applyDuotone={applyDuotone}
            canvasSize={canvasSize}
            duotone={duotone}
            imagePath={imagePath}
        />
    ));

    const filterRender = filters.map(filter => (
        <Button
            key={filter.name}
            cssFilter={instaFilter}
            filter={filter}
            imagePath={imagePath}
        />
    ));

    const tabClick = textContent => {
        setActive(textContent);
    };

    useEffect(() => {
        setImagePath(newImagePath ? newImagePath : imagePath);
        imageRef.current.src = newImagePath ? newImagePath : imagePath;
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        contextRef.current = context;
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
                <div ref={thumbnails} className="thumbnails">
                    {active === "Adjustment"
                        ? adjustmentRender
                        : active === "Insta-filter"
                        ? filterRender
                        : duotoneRender}
                </div>
            </div>
        </div>
    );
}
