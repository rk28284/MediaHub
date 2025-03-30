import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import Navbar from "../Component/Navbar";
import { useState, useEffect } from "react";

export const MediaPlayer = () => {
  const { filename } = useParams();
  const videoURL = `https://mediahub-backend-cekl.onrender.com/${filename}`;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkVideo = async () => {
      try {
        const response = await fetch(videoURL);
        if (response.ok) {
          setLoading(false);
        } else {
          console.error("Video not found");
        }
      } catch (error) {
        console.error("Error loading video:", error);
      }
    };
    checkVideo();
  }, [videoURL]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
            🎬 Video Player
          </h2>


   
            <div className="aspect-w-16 aspect-h-9 w-full">
              <ReactPlayer url={videoURL} controls width="100%" height="100%" />
            </div>
        
        </div>
      </div>
    </>
  );
};
