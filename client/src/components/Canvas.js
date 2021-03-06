import React, { useRef, useState, useEffect } from "react";
import filters from "./filters.js";
import duotones from "./duotones.js";
import Button from "./Button";
import ToneButton from "./ToneButton";
import Download from "./Download";

export default function Canvas({ newImagePath }) {
    const canvasRef = useRef(null);
    const imageRef = useRef(null);
    const contextRef = useRef(null);
    const thumbnails = useRef(null);
    const [imagePath, setImagePath] = useState("./uploads/default.jpeg");
    const [canvasSize, setCanvasSize] = useState({});

    const downloadImage = () => {
        const link = document.createElement("a");
        link.download = "image.png";
        link.href = canvasRef.current.toDataURL("");
        link.click();
    };

    const cssFilter = name => {
        const selectedfilter = filters.find(filter => filter.name === name);
        const { width, height } = canvasSize;
        contextRef.current.clearRect(0, 0, width, height);
        contextRef.current.filter = selectedfilter.filter;
        contextRef.current.globalCompositeOperation = "source-over";
        contextRef.current.drawImage(imageRef.current, 0, 0, width, height);
        selectedfilter.overlays.forEach(overlay => {
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

    useEffect(() => {
        setImagePath(newImagePath ? newImagePath : imagePath);
        imageRef.current.src = newImagePath ? newImagePath : imagePath;
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        contextRef.current = context;
    }, [imagePath, newImagePath, contextRef.current]);

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
                Brightness <input type="range" />
                <br />
                Contrast <input type="range" />
                <br />
                Grayscale <input type="range" />
                <br />
                <h3>Presets</h3>
                <button>Insta filters</button>
                <button>Duotone presets</button>
                <div ref={thumbnails} className="thumbnails">
                    {duotones.map(duotone => (
                        <ToneButton
                            key={duotone.name}
                            applyDuotone={applyDuotone}
                            canvasSize={canvasSize}
                            duotone={duotone}
                            imagePath={imagePath}
                        />
                    ))}
                    {/* {filters.map(filter => (
                        <Button
                            key={filter.name}
                            cssFilter={cssFilter}
                            filter={filter}
                            imagePath={imagePath}
                        />
                    ))} */}
                </div>
            </div>
        </div>
    );
}
