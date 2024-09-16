import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";

const RecipeDetailScreen = ({ route, navigation }) => {
  const { recipe } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const favorites = await AsyncStorage.getItem("favorites");
        const favoriteRecipes = favorites ? JSON.parse(favorites) : [];
        setIsFavorite(favoriteRecipes.some((fav) => fav.uri === recipe.uri));
      } catch (error) {
        console.error(error);
      }
    };
    checkFavorite();
  }, [recipe]);

  const toggleFavorite = async () => {
    try {
      const favorites = await AsyncStorage.getItem("favorites");
      const favoriteRecipes = favorites ? JSON.parse(favorites) : [];

      if (isFavorite) {
        const updatedFavorites = favoriteRecipes.filter(
          (fav) => fav.uri !== recipe.uri
        );
        await AsyncStorage.setItem(
          "favorites",
          JSON.stringify(updatedFavorites)
        );
        setIsFavorite(false);
      } else {
        favoriteRecipes.push(recipe);
        await AsyncStorage.setItem(
          "favorites",
          JSON.stringify(favoriteRecipes)
        );
        setIsFavorite(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!recipe) {
    return (
      <View style={styles.container}>
        <Text>Receita não encontrada :&#40;</Text>
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
      <View style={styles.favoritesButtonContainer}>
        <Button
          title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          onPress={toggleFavorite}
          color="#fb7d00"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffb703",
  },
  recipeHeader: {
    flexDirection: "row",
    marginBottom: 24,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 16,
  },
  recipeDetails: {
    marginLeft: 16,
    justifyContent: "center",
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  info: {
    fontSize: 16,
    marginBottom: 4,
    color: "#666",
  },
  ingredientsContainer: {
    marginTop: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  ingredient: {
    fontSize: 16,
    marginBottom: 4,
    color: "#333",
  },
  favoritesButtonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
});

export default RecipeDetailScreen;
