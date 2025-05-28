require('dotenv').config();
const express = require('express');
const { Dalle } = require('dalle-node');
const app = express();

app.use(express.json());

const dalle = new Dalle({
  apiKey: process.env.DALLE_API_KEY
});

app.post('/generate', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Prompt required!' });

  try {
    const image = await dalle.generate(prompt);
    res.json({ image });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Image generation failed.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`⚡ Server running on port ${PORT}`));
