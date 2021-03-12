import { useState } from "react";
import "./css/App.css";
import Canvas from "./components/Canvas";
import Upload from "./components/Upload";

function App() {
    const [objectURL, setObjectURL] = useState("");

    const getFilePath = path => {
        setObjectURL(path);
    };

    return (
        <div className="App">
            <div className="wrapper">
                <h2>Image editor</h2>
                <Upload getFilePath={getFilePath} />
                <Canvas newImagePath={objectURL} />
            </div>
        </div>
    );
}

export default App;
