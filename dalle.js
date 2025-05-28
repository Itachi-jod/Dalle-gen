import { Dalle } from "dalle-node";
import dotenv from "dotenv";
dotenv.config();

const dalle = new Dalle(process.env.DALLE_API_KEY);

export async function generateImage(promptText) {
  try {
    const image = await dalle.generate(promptText);
    return image;
  } catch (err) {
    console.error("Failed to generate image:", err);
    return null;
  }
}
