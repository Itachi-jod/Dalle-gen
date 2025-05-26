require('dotenv').config();
const fetch = require('node-fetch');

const API_TOKEN = process.env.API_TOKEN;

if (!API_TOKEN) {
  console.error('API_TOKEN not found in .env file!');
  process.exit(1);
}

async function generateImage(prompt) {
  try {
    const response = await fetch(`https://dalle-gen.onrender.com/dalle?prompt=${encodeURIComponent(prompt)}`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`
      }
    });

    const data = await response.json();

    if (data.url) {
      console.log('Image URL:', data.url);
    } else {
      console.error('Failed to generate image:', data);
    }
  } catch (error) {
    console.error('Error calling API:', error);
  }
}

// Test prompt
generateImage('a futuristic city at sunset');
