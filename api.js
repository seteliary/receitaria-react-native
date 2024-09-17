import axios from "axios";

const API_ID = "7ea60a98";
const API_KEY = "cf920889610d20821348439716228cf1";

const BASE_URL = "https://api.edamam.com";

export const fetchRecipes = async (
  query,
  healthFilters = [],
  cuisineTypeFilters = []
) => {
  try {
    const healthParams = healthFilters.join(",");
    const cuisineTypeParams = cuisineTypeFilters.join(",");

    const params = {
      q: query,
      app_id: API_ID,
      app_key: API_KEY,
    };

    if (healthParams) {
      params.health = healthParams;
    }
    if (cuisineTypeParams) {
      params.cuisineType = cuisineTypeParams;
    }

    const response = await axios.get(`${BASE_URL}/search`, { params });
    return response.data;
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
};
