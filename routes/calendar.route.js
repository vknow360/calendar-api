const express = require("express");
const axios = require("axios");
const multer = require("multer");
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
    const course = req.body.course;
    const session = req.body.session;
    console.log("Course:", course);
    console.log("Session:", session);
    const fileName = req.file.originalname;

    const base64 = req.file.buffer.toString("base64");
    const response = await axios.post(
      "https://script.google.com/macros/s/AKfycbyVPuL1D31vqp0zPfjhBzEo0JyWy_EOujk3Pf-YWTJpt2bliFH8C0yEdiJvJ-2AwIMtCw/exec",
      {
        name: fileName,
        data: base64,
      }
    );

    if (response.data.status !== "success") {
      return res.status(500).json({
        status: "error",
        message: "Failed to upload academic calendar",
      });
    }
    const fileUrl = response.data.previewUrl;
    const existingRecord = await Calendar.findOne({ course: course });
    if (existingRecord) {
      existingRecord.sessions.set(session, fileUrl);
      await existingRecord.save();
    } else {
      const newRecord = new Calendar({
        course: course,
        sessions: new Map([[session, fileUrl]]),
      });
      await newRecord.save();
    }
    res.status(200).json({
      status: "success",
      message: "Academic calendar uploaded successfully",
      link: fileUrl,
    });
  } catch (error) {
    console.error("Upload error:", error.message);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

module.exports = router;
