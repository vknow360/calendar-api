const express = require("express");
const fs = require("fs");
const axios = require("axios");

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

const Calendar = require("../models/calendar.model");

router.get("/", async (req, res) => {
  const { course, session } = req.query;
  if (!course || !session) {
    return res.status(400).json({ error: "Course and session are required" });
  }

  try {
    const record = await Calendar.findOne({ course });
    if (!record) {
      return res
        .status(404)
        .json({ error: "No academic calendar found for this course" });
    }

    const url = record.sessions.get(session);
    if (!url) {
      return res
        .status(404)
        .json({ error: "No calendar found for this session" });
    }

    res.status(200).json([{ link: url }]);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const fileName = req.file.originalname;

    const base64 = req.file.buffer.toString("base64");

    const response = await axios.post("https://script.google.com/macros/s/AKfycbycoMpeGVr14LHh1yZc92BXSZk8kuRhpF4Mv0mi3whOqyRAg_ZXP5mAa7kQfmO1EDX5jw/exec", null, {
      params: {
        name: fileName,
        data: base64,
      },
    });


    res.json(response.data);
  } catch (error) {
    console.error("Upload error:", error.message);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

module.exports = router;
