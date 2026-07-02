const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const geminiRoutes = require("./routes/geminiRoutes.js");
const errorMiddleware = require("./middleware/errorMiddleware.js");

dotenv.config();
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.static(path.join(__dirname, "../front")));


app.get("/", ( req, res) => {
  res.sendFile(
    path.join(__dirname, "../front/index.html")
  );
}
);
app.use("/api/gemini", geminiRoutes);
app.use(errorMiddleware);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}
);