import { useState } from "react";
import axios from "axios";
import Navbar from "../Component/Navbar";

export const Upload = () => {
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!video) return alert("Please select a video!");

    const formData = new FormData();
    formData.append("video", video);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("userId", "123456"); // Replace with dynamic userId

    try {
      setLoading(true);
      await axios.post("http://localhost:8080/upload", formData);
      alert("Video uploaded successfully!");
      setVideo(null);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error(error);
      alert("Failed to upload video.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Upload Video</h2>

          <form onSubmit={handleUpload} className="space-y-4">
            {/* Video Upload Input */}
            <input
              type="file"
              accept="video/*"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setVideo(e.target.files[0])}
            />

            {/* Title Input */}
            <input
              type="text"
              placeholder="Video Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Description Input */}
            <textarea
              placeholder="Video Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
