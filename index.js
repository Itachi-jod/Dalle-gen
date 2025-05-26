const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.get('/generate', async (req, res) => {
  const prompt = req.query.prompt;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt query parameter is required.' });
  }

  try {
    const response = await axios.get(`https://dalle-gen.onrender.com/dalle?prompt=${encodeURIComponent(prompt)}`);
    if (response.data && response.data.url) {
      // Assuming API returns { url: 'image_link' }
      return res.json({ image: response.data.url });
    } else {
      return res.status(500).json({ error: 'Failed to get image URL from API.' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Failed to generate image. Try again later.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
