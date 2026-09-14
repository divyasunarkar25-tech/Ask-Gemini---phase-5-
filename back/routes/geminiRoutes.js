const express = require("express");
const router = express.Router();
const { askGemini } = require("../controllers/geminiController.js"); // ya jo bhi aapka controller ho

// Dedicated GET Route (Health Check / API Status)
router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Gemini API service is healthy and active!"
  });
});

// Aapka existing POST Route
router.post("/ask", askGemini);

module.exports = router;