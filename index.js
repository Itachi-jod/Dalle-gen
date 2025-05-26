require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const API_TOKEN = process.env.API_TOKEN;

app.post('/generate', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2',
      { inputs: prompt },
      {
        headers: { Authorization: `Bearer ${API_TOKEN}` },
        responseType: 'arraybuffer'
      }
    );

    const base64 = Buffer.from(response.data).toString('base64');
    res.json({ image: `data:image/png;base64,${base64}` });
  } catch (err) {
    res.status(500).json({ error: 'Image generation failed', details: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`DALL·E API running on port ${PORT}`));
