const express = require("express");
const cors = require("cors");

require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = process.env.PORT || 5000;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
});

app.use(cors());
app.use(express.json());
app.use(express.static("../front-end"));

app.get("/", (req, res) => {
    res.send("Server is running");
});

app.post("/ask", async (req, res) => {
    console.log("ask rout called");
    try {
        const input = req.body.input;
        const result = await model.generateContent(input);
        const output = result.response.text();

        res.json({
            output: output
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Something went wrong"
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
