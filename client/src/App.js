import { useState, useEffect } from "react";
import "./App.css";
import File from "./components/File";
import Canvas from "./components/Canvas";

function App() {
    const [objectURL, setObjectURL] = useState("");

    const fileUpload = e => {
        const [file] = e.target.files;
        const src = URL.createObjectURL(file);
        setObjectURL(src);
        URL.revokeObjectURL(objectURL);
    };

    return (
        <div className="App">
            <h1>Image editor</h1>
            <File fileUpload={fileUpload} />
            <Canvas newImagePath={objectURL} />
        </div>
    );
}

export default App;
