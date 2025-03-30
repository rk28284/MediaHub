const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  tags: { type: [String], default: [] },
  filePath: { type: String, required: true },
  fileSize: { type: Number, min: 0 },
  uploadedAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  fullname: { type: String},
});

const mediaModel = mongoose.model("Media", mediaSchema);

module.exports = { mediaModel }

