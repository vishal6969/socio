const express = require('express');
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const conversationRoute = require("./routes/conversation");
const messageRoute = require("./routes/message");
const multer = require("multer");
const path = require("path");

dotenv.config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, ()=>{
    console.log("mongoDb working");
})

app.use("/images", express.static(path.join(__dirname, "public/images")));

//middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images/");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
        return res.status(200).json("File uploded successfully");
    } catch (error) {
        console.error(error);
    }
});

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);
app.use("/api/conversation", conversationRoute);
app.use("/api/message", messageRoute);

app.listen("8800", () => {
    console.log("server working");
})