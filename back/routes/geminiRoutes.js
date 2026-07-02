const express = require("express");

const router = express.Router();

const { askGemini } = require("../controller/geminiController.js");

router.post("/ask", askGemini);

module.exports = router;