const express = require('express');
const { createClient } = require('@vercel/blob');
const multer = require('multer');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const blobClient = createClient({
  token: process.env.BLOB_READ_WRITE_TOKEN,
});

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const blob = await blobClient.upload(req.file.originalname, req.file.buffer);
    res.status(201).send({ filename: blob.url });
  } catch (err) {
    console.error("Error uploading video:", err);
    res.status(500).send("Upload failed");
  }
});

router.get("/", async (req, res) => {
  try {
    const { blobs } = await blobClient.list();
    const filenames = blobs.map(blob => blob.url);
    res.status(200).send(filenames);
  } catch (err) {
    console.error("Error getting video list:", err);
    res.status(500).send("Error getting video list");
  }
});

router.get("/:filename", async (req, res) => {
  try {
    const filename = req.params.filename;
    const blob = await blobClient.get(filename);
    if (!blob) {
      return res.status(404).send("File not found");
    }
    res.redirect(blob.url);
  } catch (err) {
    console.error("Error streaming video:", err);
    res.status(500).send("Error streaming video");
  }
});

router.delete("/:filename", async (req, res) => {
  try {
    const filename = req.params.filename;
    await blobClient.delete(filename);
    res.status(204).send(`File deleted: ${filename}`);
  } catch (err) {
    console.error("Error deleting file:", err);
    res.status(500).send("Error deleting file");
  }
});

module.exports = router;