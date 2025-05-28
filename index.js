import { generateImage } from "./dalle.js";
import fs from "fs";
import axios from "axios";

const prompt = "a futuristic city under the stars, digital art";

// Generate and download image
(async () => {
  const imageUrl = await generateImage(prompt);

  if (!imageUrl) {
    console.log("❌ Failed to generate image.");
    return;
  }

  const filePath = `./${Date.now()}.jpg`;
  const image = await axios.get(imageUrl, { responseType: 'stream' });
  const writer = fs.createWriteStream(filePath);

  image.data.pipe(writer);
  writer.on("finish", () => console.log(`✅ Image saved as ${filePath}`));
})();
