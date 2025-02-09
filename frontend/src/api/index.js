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
};

export async function fetchPlanetData(planetName) {
    const requestUrl = `https://api.le-systeme-solaire.net/rest/bodies/${planetName}`;
    try {
      const response = await fetch(requestUrl);
      if (response.ok) {
        const data = await response.json();
        return { status: "success", data };
      } else {
        return { status: "error", message: "Failed to fetch data: " + response.statusText };
      }
    } catch (err) {
      return { status: "error", message: "An error occurred: " + err.message };
    }
  };

  export async function fetchSearchNasa(query) {
    const requestUrl = `https://images-api.nasa.gov/search?q=${query}`;
    try {
      const response = await fetch(requestUrl);
      if (response.ok) {
        const data = await response.json();
        return { status: "success", data };
      } else {
        return { status: "error", message: "Failed to fetch data: " + response.statusText };
      }
    } catch (err) {
      return { status: "error", message: "An error occurred: " + err.message };
    }
  };

  export async function fetchImageOfTheDay() {
    const requestUrl = `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY`;
    try {
      const response = await fetch(requestUrl);
      if (response.ok) {
        const data = await response.json();
        return { status: "success", data };
      } else {
        return { status: "error", message: "Failed to fetch data: " + response.statusText };
      }
    } catch (err) {
      return { status: "error", message: "An error occurred: " + err.message };
    }
  };
  

export function calculate_planetary_parameters(
    distance_from_the_sun, 
    mass, 
    temperature, 
    pressure, 
    water_presence, 
    magnetic_field_strength, 
    axial_tilt, 
    rotation_speed, 
    geological_activity, 
    radiation_levels
) {
    // Validate input ranges
    if (distance_from_the_sun < 0.3 || distance_from_the_sun > 30) {
        throw new Error("Distance from Sun must be between 0.3 and 30 AU.");
    }
    if (mass < 0.1 || mass > 300) {
        throw new Error("Planetary Mass must be between 0.1 and 300 Earth masses.");
    }
    if (temperature < 50 || temperature > 900) {
        throw new Error("Surface Temperature must be between 50 and 900 K.");
    }
    if (pressure < Math.pow(10, -5) || pressure > 100) {
        throw new Error("Atmospheric Pressure must be between 10^-5 and 100 bars.");
    }
    if (water_presence !== 0 && water_presence !== 1) {
        throw new Error("Water Presence must be either 0 (No) or 1 (Yes).");
    }
    if (magnetic_field_strength < 0 || magnetic_field_strength > 15) {
        throw new Error("Magnetic Field Strength must be between 0 and 15 G.");
    }
    if (axial_tilt < 0 || axial_tilt > 98) {
        throw new Error("Axial Tilt must be between 0 and 98 degrees.");
    }
    if (rotation_speed < 1 || rotation_speed > 5832) {
        throw new Error("Rotation Speed must be between 1 and 5832 hours.");
    }
    if (geological_activity < 0 || geological_activity > 1) {
        throw new Error("Geological Activity must be between 0 and 1.");
    }
    if (radiation_levels < 0.01 || radiation_levels > 1000) {
        throw new Error("Radiation Levels must be between 0.01 and 1000 Sv.");
    }

// Reference Earth values
const T_E = 288, P_E = 1, W_E = 1, B_E = 0.5, G_E = 1, X_E = 0.01;

// Habitability factors
const f_T = Math.min(1, Math.max(0, Math.exp(-Math.abs(temperature - T_E) / T_E))); // Temperature factor
const f_P = Math.exp(-((Math.log(pressure) - Math.log(P_E))*2)); // Atmospheric factor
const f_W = water_presence; // Water presence
const f_B = magnetic_field_strength / abs(magnetic_field_strength - B_E); // Magnetic field protection
const f_G = geological_activity; // Geological activity
const f_X = 1 / (1 + (radiation_levels /X_E)); // Radiation survival factor

// Compute probability of life (scale 0-100)
const P_L = 100 f_T * f_P * f_W * f_B * f_G * f_X;

return {
    "Habitability Probability (0-100)": Math.round(P_L * 100) / 100
};
}
