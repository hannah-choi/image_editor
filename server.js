const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(express.static(path.join(__dirname, "client", "build")));
app.use(cors());

//Storage Engine
const storage = multer.diskStorage({
    destination: "./client/public/uploads/",
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
        imageCheck(file, cb);
    },
}).single("image");

//image check
function imageCheck(file, cb) {
    const filetypes = /gif|jpg|jpeg|png/;
    //extension check
    const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    //mime check
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(null, false);
        return cb("Only images are allowed");
    }
}

app.post("/upload", (req, res) => {
    upload(req, res, err => {
        if (req.files === null) {
            return res.status(400).json({ msg: "No file uploaded" });
        }
        if (err) {
            return res.status(500).json({ msg: err });
        } else {
            res.json({
                fileName: req.file.filename,
                filePath: `/uploads/${req.file.filename}`,
            });
        }
    });
});

const port = 5000;

app.listen(5000, () => console.log(`server started on port ${port}`));
