import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
app.use(cors()); // Frontend se requests allow karne ke liye
app.use(express.json({ limit: '10mb' }));

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post('/api/generate-notes', async (req, res) => {
  try {
    const { pdfText, noteType } = req.body;

    if (!pdfText) {
      return res.status(400).json({ error: "PDF text is required" });
    }

    const prompt = `You are a study assistant. Generate ${noteType || 'short_notes'} in pure HTML format (no markdown backticks, no \`\`\`html).
    Requirements:
    - Main title in <h2>
    - Important points in <p> and <b>
    - Formulas or key definitions in <div class='formula-box'>

    Text:
    ${pdfText.substring(0, 4000)}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    let cleanHtml = response.text.replace(/```html|```/g, '').trim();
    res.json({ result: cleanHtml });

  } catch (error) {
    console.error("Backend Error:", error);
    res.status(500).json({ error: "Failed to generate notes" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
