const express = require("express");
const { uploadVideo, getVideos, streamVideo } = require("../controllers/media.controller");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const dotenv = require("dotenv");

dotenv.config();
const mediaRouter = express.Router();

// const mongoURI = process.env.URL || "mongodb://localhost:27017/mediahub";
const mongoURI = "mongodb://localhost:27017/mediahub";

// Multer Storage for GridFS
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve) => {
      const filename = `${Date.now()}-${file.originalname}`;
      resolve({ filename: filename, bucketName: "videos" });
    });
  },
});

const upload = multer({ storage });

// Routes
mediaRouter.post("/upload", upload.single("video"), uploadVideo);
mediaRouter.get("/videos", getVideos);
mediaRouter.get("/video/:filename", streamVideo);

module.exports = mediaRouter;
