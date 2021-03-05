import React, { useRef, useState, useEffect } from "react";
import filters from "./filters.js";
import Button from "./Button";

export default function Canvas({ newImagePath }) {
    const canvasRef = useRef(null);
    const imageRef = useRef(null);
    const contextRef = useRef(null);
    const thumbnails = useRef(null);
    const [imagePath, setImagePath] = useState("./uploads/default.jpeg");
    const [canvasSize, setCanvasSize] = useState({});

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
    }, [newImagePath]);

    return (
        <div className="canvasWrapper">
            <img
                className="previewImage"
                ref={imageRef}
                crossOrigin="anonymous"
                alt="preview"
                onLoad={imageLoad}
            />
            <canvas
                ref={canvasRef}
                width={canvasSize.width}
                height={canvasSize.height}
            />
            <div ref={thumbnails} className="thumbnails">
                {filters.map(filter => (
                    <Button
                        key={filter.name}
                        cssFilter={cssFilter}
                        filter={filter}
                        imagePath={imagePath}
                    />
                ))}
            </div>
        </div>
    );
}
