import { useState } from "react";
import "./App.css";
import File from "./components/File";
import Canvas from "./components/Canvas";
import Upload from "./components/Upload";
// import Duotone from "./components/Duotone";

function App() {
    const [objectURL, setObjectURL] = useState("");

    const getFilePath = path => {
        setObjectURL(path);
    };

    // const fileUpload = e => {
    //     const [file] = e.target.files;
    //     const fileSize = file.size / 1024 / 1024;
    //     if (!file.type.match("image.*")) {
    //         alert("Only image file can be uploaded");
    //         return;
    //     }
    //     if (fileSize > 1.8) {
    //         alert("File size exceeds 1.8 mb");
    //         return;
    //     }
    //     const src = URL.createObjectURL(file);
    //     console.log(src);
    //     setObjectURL(src);

    //     URL.revokeObjectURL(objectURL);
    // };

    return (
        <div className="App">
            <h1>Image editor</h1>
            <Upload getFilePath={getFilePath} />
            {/* <File fileUpload={fileUpload} /> */}
            <Canvas newImagePath={objectURL} />
        </div>
    );
}

export default App;
