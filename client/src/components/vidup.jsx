import React, { useState, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';

const VidUp = forwardRef((props, ref) => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  useImperativeHandle(ref, () => ({
    uploadVideo: async () => {
      if (!file) return '';
      try {
        const response = await axios.get('https://kumpas.onrender.com/videos');
        const filenames = response.data;
        if (filenames.includes(file.name)) {
          alert(`A file with the name ${file.name} already exists. Please rename the file and try again.`);
          return '';
        }
      } catch (error) {
        console.error("Error checking file existence:", error);
      }
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post("https://kumpas.onrender.com/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percentCompleted);
          }
        });

        const { filename } = response.data;
        return `https://kumpas.onrender.com/videos/${filename}`;
      } catch (error) {
        console.error("Error uploading video:", error);
        throw error;
      }
    }
  }));

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {uploadProgress > 0 && <div>Upload Progress: {uploadProgress}%</div>}
    </div>
  );
});

export default VidUp;
