import React, { useState } from 'react';
import axios from 'axios';

const VidUp = () => {
  const [file, setFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:8000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        }
      });

      const { filename } = response.data;
      
      const uploadedVideoUrl = `http://localhost:8000/videos/${filename}`;
      setVideoUrl(uploadedVideoUrl);
      onUpload(uploadedVideoUrl); 
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {uploadProgress > 0 && <div>Upload Progress: {uploadProgress}%</div>}
      {videoUrl && <p>Video URL: {videoUrl}</p>}
    </div>
  );
};

export default VidUp;