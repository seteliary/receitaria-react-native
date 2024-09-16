import axios from "axios";

const API_ID = "7ea60a98";
const API_KEY = "cf920889610d20821348439716228cf1";

const BASE_URL = "https://api.edamam.com";

export const fetchRecipes = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        q: query,
        app_id: API_ID,
        app_key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};
