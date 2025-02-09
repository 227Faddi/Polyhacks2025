import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateContent(apiKey, modelName, prompt) {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: modelName });

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error generating content:", error.message);
    return "Error generating content.";
  }
}

export async function fetchPlanetData(planetName) {
  const requestUrl = `https://api.le-systeme-solaire.net/rest/bodies/${planetName}`;
  try {
    const response = await fetch(requestUrl);
    if (response.ok) {
      const data = await response.json();
      return { status: "success", data };
    } else {
      return {
        status: "error",
        message: "Failed to fetch data: " + response.statusText,
      };
    }
  } catch (err) {
    return { status: "error", message: "An error occurred: " + err.message };
  }
}
