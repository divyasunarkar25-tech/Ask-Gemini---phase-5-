const axios = require("axios");

const askGemini = async ( req, res, next) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: question,
              },
            ],
          },
        ],
      }
    );


    // console.log(response.json())
    const answer =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response generated";

    res.status(200).json({
      success: true,
      answer: answer,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  askGemini,
};