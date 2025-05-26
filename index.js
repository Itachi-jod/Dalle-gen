const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const API_TOKEN = process.env.API_TOKEN;

app.get('/', (req, res) => {
  res.send('Welcome to DALL·E Image Generator API!');
});

app.post('/generate', async (req, res) => {
  const prompt = req.body.prompt;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/prompthero/openjourney',
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`
        },
        responseType: 'arraybuffer'
      }
    );

    const imageBuffer = Buffer.from(response.data, 'binary');
    res.set('Content-Type', 'image/png');
    res.send(imageBuffer);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to generate image' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`DALL·E API is running on port ${PORT}`);
});
