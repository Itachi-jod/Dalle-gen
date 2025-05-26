require('dotenv').config();
const fetch = require('node-fetch');

const API_TOKEN = process.env.API_TOKEN;

module.exports = {
  name: "dalle",
  description: "Generate AI images from a prompt",
  async execute(messenger, message, args) {
    const prompt = args.join(" ");
    if (!prompt) return messenger.sendMessage("❌ Please provide a prompt for the image.");

    try {
      const res = await fetch(`https://dalle-gen.onrender.com/dalle?prompt=${encodeURIComponent(prompt)}`, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`
        }
      });
      const data = await res.json();

      if (data.url) {
        await messenger.sendMessage(`🖼️ Here is your image for: "${prompt}"`);
        await messenger.sendMessage({ attachment: { type: "image", payload: { url: data.url } } });
      } else {
        await messenger.sendMessage("❌ Failed to generate image. Try again later.");
      }
    } catch (err) {
      await messenger.sendMessage("❌ Error generating image. Please try again.");
      console.error("DALL·E API error:", err);
    }
  }
};
