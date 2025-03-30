const Media = require("../model/media.model");
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
require("dotenv").config();

const mongoURI = process.env.URL;


let gfs;
let conn; 

try {
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  conn = mongoose.connection; 

  conn.once("open", () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("videos");
  });
} catch (error) {
  console.error("MongoDB connection error:", error);
}

// 📌 Upload Video
const uploadVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { originalname, size } = req.file;
    const { title, description, tags, userId } = req.body;

    const media = new Media({ 
      title: title || originalname,
      description: description || "No description",
      tags: tags ? tags.split(",") : [],
      fileSize: size,
      filename: req.file.filename,
      userId,
    });

    await media.save(); 
    res.json({ message: "Video uploaded successfully", media }); 
  } catch (error) {
    res.status(500).json({ error: "Video upload failed", details: error.message });
  }
};


const getVideos = async (req, res) => {
  try {
    const { userId, search, page = 1, limit = 5 } = req.query;

    const query = { userId };
    if (search) {
      query.$or = [{ title: { $regex: search, $options: "i" } }, { tags: { $regex: search, $options: "i" } }];
    }

    const media = await Media.find(query) // changed Video to Media
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json(media); // changed videos to media
  } catch (error) {
    res.status(500).json({ error: "Error fetching videos", details: error.message });
  }
};


const streamVideo = async (req, res) => {
  try {
    if (!gfs) {
      return res.status(500).json({ error: "GridFS not initialized" });
    }

    const file = await gfs.files.findOne({ filename: req.params.filename });
    if (!file) return res.status(404).json({ error: "File not found" });

    const readStream = gfs.createReadStream(file.filename);
    readStream.pipe(res);
  } catch (error) {
    res.status(500).json({ error: "Error streaming video", details: error.message });
  }
};

module.exports = { uploadVideo, getVideos, streamVideo };