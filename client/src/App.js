import { useState } from "react";
import "./App.css";
import Canvas from "./components/Canvas";
import Upload from "./components/Upload";

function App() {
    const [objectURL, setObjectURL] = useState("");

    const getFilePath = path => {
        setObjectURL(path);
    };

    return (
        <div className="App">
            <h1>Image editor</h1>
            <div className="wrapper">
                <Upload getFilePath={getFilePath} />
                <Canvas newImagePath={objectURL} />
            </div>
        </div>
    );
}

export default App;
