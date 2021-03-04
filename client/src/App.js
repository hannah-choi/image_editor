import { useState, useEffect } from "react";
import fileUpload from "express-fileupload";
import "./App.css";
import Upload from "./components/Upload";
import Canvas from "./components/Canvas";

function App() {
    const [objectURL, setObjectURL] = useState("");

    const fileUploadClick = e => {
        const [file] = e.target.files;
        const src = URL.createObjectURL(file);
        //setImgSrc(src);
        URL.revokeObjectURL(objectURL);
        setObjectURL(src);
    };

    return (
        <div className="App">
            <h1>Image editor</h1>
            <div className="preview"></div>
            <Upload />
            <Canvas />
        </div>
    );
}

export default App;
