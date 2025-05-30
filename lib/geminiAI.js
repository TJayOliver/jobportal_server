import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_AI,
});

export const generateDescription = async (category, post) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `Generate a short description of the following ${category} in 20 words:${post}`,
  });
  return response.text;
};

export const generatePost = async (category, post) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `Generate and rewrite a full description of the following ${category} information. 
    Requirements:
    - Beautify with emojis and bullet
    - Minimum word count should be 250
    - Use proper HTML tags
    - Ensure adequate spacing between sections (add <br> tags or margin styles where needed)
    - Maintain good readability with proper paragraph spacing
    - EXCLUDE: <!DOCTYPE html>, <head>, <body>, <title> tags
    - DO NOT wrap the content in html code blocks
    - DO NOT start with a main heading
    - DO NOT add any key improvements or explanations
    - Add spacing between list items and sections for better visual separation
    Content to rewrite: ${post}`,
  });
  let result = response.text;
  result = result.replace(/^```html|```$/g, "").trim();
  return result;
};

export const generateScholarshipLink = async (post) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `Copy only the scholarship link/email in this post. 
    Requirement:
    - If there is no link but there are several email address. COPY only one
    - If there are several website link. COPY the major one
     content:${post}`,
  });
  return response.text;
};

export const generateScholarshipHeading = async (post) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `Generate a single scholarship name. Do not bold any text. If theres a line break, do not use /n:${post}`,
  });
  return response.text;
};
