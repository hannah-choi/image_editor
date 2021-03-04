import React, { useRef, useState, useEffect } from "react";
import filters from "./filters.js";

export default function Canvas({ props }) {
    const canvas = useRef(null);
    const thumbnails = useRef(null);
    const [image, setImage] = useState(null);
    const [imagePath, setImagePath] = useState("./uploads/default.jpeg");
    const [canvasSize, setCanvasSize] = useState({});
    const [context, setContext] = useState(null);

    //when the image is loaded
    useEffect(() => {
        const previewImg = new Image();
        previewImg.src = imagePath;
        previewImg.onload = () => setImage(previewImg);
    }, []);

    useEffect(() => {
        if (image && canvas) {
            const ctx = canvas.current.getContext("2d");
            const { naturalWidth, naturalHeight } = image;
            setCanvasSize({
                width: naturalWidth,
                height: naturalHeight,
            });
            ctx.drawImage(image, 0, 0, naturalWidth, naturalHeight);

            const cssFilter = name => {
                const selectedfilter = filters.find(
                    filter => filter.name === name
                );
                const { width, height } = canvasSize;
                ctx.clearRect(0, 0, width, height);
                ctx.filter = selectedfilter.filter;
                ctx.globalCompositeOperation = "source-over";
                ctx.drawImage(image, 0, 0, width, height);
                selectedfilter.overlays.forEach(overlay => {
                    ctx.globalCompositeOperation = overlay.mixBlendMode;
                    ctx.fillStyle = overlay.backgroundColor;
                    ctx.fillRect(0, 0, width, height);
                });
            };

            filters.forEach(filter => {
                const button = document.createElement("button");
                button.addEventListener("click", () => cssFilter(filter.name));

                const title = document.createElement("p");
                title.innerText = filter.name;
                button.appendChild(title);

                const figure = document.createElement("figure");
                figure.style.filter = filter.filter;
                button.appendChild(figure);

                const img = document.createElement("img");
                img.src = imagePath;
                figure.appendChild(img);

                filter.overlays.forEach((overlay, index) => {
                    const div = document.createElement("div");
                    div.style.backgroundColor = overlay.backgroundColor;
                    div.style.mixBlendMode = overlay.mixBlendMode;
                    div.style.zIndex = index + 1;
                    figure.appendChild(div);
                });

                thumbnails.current.appendChild(button);
            });
        }
    }, [image, canvas]);

    return (
        <div className="canvasWrapper">
            {imagePath && <img className="previewImg" src={imagePath} />}
            <canvas
                ref={canvas}
                width={canvasSize.width}
                height={canvasSize.height}
            />
            <div ref={thumbnails} className="thumbnails"></div>
        </div>
    );
}
