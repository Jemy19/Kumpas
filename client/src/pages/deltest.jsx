import React, { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true

function App() {  
  const [videoUrl, setVideoUrl] = useState("");
  const [videoList, setVideoList] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState("");

  const handleDeleteVideo = async (filename) => {
    try {
      await axios.delete(`http://localhost:8000/delvideo/${filename}`);
      setVideoList(videoList.filter((video) => video !== filename));
      setSelectedVideo("");
      setVideoUrl("");
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };
  return (
    <div className="App">
      <label>delete Video:</label>
      <ul>
  {videoList.map((video, index) => (
    <li key={index}>
      {video}
      <button
        onClick={(e) => {
          handleDeleteVideo(video);
        }}
      >
        Delete
      </button>
    </li>
  ))}
</ul>
    </div>
  );
}

export default App;