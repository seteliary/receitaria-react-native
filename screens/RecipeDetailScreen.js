import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RecipeDetailScreen = ({ route }) => {
  const { recipe } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const favorites = await AsyncStorage.getItem("favorites");
        const favoriteRecipes = favorites ? JSON.parse(favorites) : [];
        setIsFavorite(favoriteRecipes.some((fav) => fav.uri === recipe.uri));
      } catch (error) {
        console.error("Failed to check favorites:", error);
      }
    };
    checkFavorite();
  }, [recipe]);

  const toggleFavorite = async () => {
    try {
      const favorites = await AsyncStorage.getItem("favorites");
      const favoriteRecipes = favorites ? JSON.parse(favorites) : [];

      const updatedFavorites = isFavorite
        ? favoriteRecipes.filter((fav) => fav.uri !== recipe.uri)
        : [...favoriteRecipes, recipe];

      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    }
  };

  const openRecipeUrl = () => {
    if (recipe.url) {
      Linking.openURL(recipe.url);
    } else {
      console.error("Recipe URL not available");
    }
  };

  if (!recipe) {
    return (
      <View style={styles.container}>
        <Text>Recipe not found :&#40;</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.recipeHeader}>
        <Image source={{ uri: recipe.image }} style={styles.image} />
        <View style={styles.recipeDetails}>
          <Text style={styles.title}>{recipe.label}</Text>
          {recipe.cuisineType && (
            <Text style={styles.info}>
              Cuisine: {recipe.cuisineType.join(", ")}
            </Text>
          )}
          {recipe.calories && (
            <Text style={styles.info}>
              Calories: {Math.round(recipe.calories)}
            </Text>
          )}
          {recipe.ingredientLines && (
            <Text style={styles.info}>
              Ingredients: {recipe.ingredientLines.length}
            </Text>
          )}
        </View>
      </View>

      <View style={styles.ingredientsContainer}>
        <Text style={styles.subtitle}>Ingredients:</Text>
        {recipe.ingredientLines.map((ingredient, index) => (
          <Text key={index} style={styles.ingredient}>
            {ingredient}
          </Text>
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={toggleFavorite}
          style={[
            styles.favoriteButton,
            isFavorite && styles.favoriteButtonActive,
          ]}
        >
          <Text style={styles.buttonText}>
            {isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={openRecipeUrl}
          style={styles.viewRecipeButton}
        >
          <Text style={styles.buttonText}>Ver modo de preparo</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#ffb703",
  },
  recipeHeader: {
    flexDirection: "row",
    marginBottom: 24,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 16,
  },
  recipeDetails: {
    marginLeft: 32,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#3a3b3c",
  },
  info: {
    fontSize: 16,
    marginBottom: 4,
    color: "#333",
  },
  ingredientsContainer: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#3a3b3c",
  },
  ingredient: {
    fontSize: 16,
    marginBottom: 4,
    color: "#333",
  },
  buttonContainer: {
    marginTop: 24,
  },
  favoriteButton: {
    backgroundColor: "#00A6A6",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 999,
  },
  favoriteButtonActive: {
    backgroundColor: "#941C2F",
  },
  viewRecipeButton: {
    backgroundColor: "#296EB4",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 999,
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default RecipeDetailScreen;
