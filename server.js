const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Check if key is loaded on startup
console.log("Checking Key:", process.env.GEMINI_API_KEY ? "Key is Loaded ✅" : "Key is Missing ❌");

app.post('/chat', async (req, res) => {
    try {
        console.log("User sent:", req.body.message); // See user's message in terminal

        // Using the 2026 stable model: gemini-2.5-flash
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        
        const result = await model.generateContent(req.body.message);
        const response = await result.response;
        const text = response.text();

        console.log("Mitraa responded successfully! ✨");
        res.json({ text: text });

    } catch (error) {
        console.error("DEBUG ERROR:", error.message);
        res.status(500).json({ text: "Error: " + error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});