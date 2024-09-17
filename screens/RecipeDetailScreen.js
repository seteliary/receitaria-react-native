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

  const openRecipeUrl = () => {
    if (recipe.url) {
      Linking.openURL(recipe.url);
    } else {
      console.error("URL não disponível");
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
              Cozinha: {recipe.cuisineType.join(", ")}
            </Text>
          )}
          {recipe.calories && (
            <Text style={styles.info}>
              Calorias: {Math.round(recipe.calories)}
            </Text>
          )}
          {recipe.ingredientLines && (
            <Text style={styles.info}>
              Ingredientes: {recipe.ingredientLines.length}
            </Text>
          )}
        </View>
      </View>
      <View style={styles.ingredientsContainer}>
        <Text style={styles.subtitle}>Ingredientes:</Text>
        {recipe.ingredientLines.map((ingredient, index) => (
          <Text key={index} style={styles.ingredient}>
            {ingredient}
          </Text>
        ))}
      </View>

      <View style={styles.favoritesButtonContainer}>
        <TouchableOpacity
          onPress={toggleFavorite}
          style={[
            styles.favoriteButton,
            isFavorite ? styles.favoriteButtonActive : {},
          ]}
        >
          <Text style={styles.buttonText}>
            {isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Botão para ver o modo de preparo */}
      <View style={styles.viewRecipeButtonContainer}>
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
  favoritesButtonContainer: {
    marginTop: 24,
  },
  favoriteButton: {
    backgroundColor: "#fb7d00",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 999,
  },
  favoriteButtonActive: {
    backgroundColor: "#e74c3c",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  viewRecipeButtonContainer: {
    marginTop: 16,
  },
  viewRecipeButton: {
    backgroundColor: "#fb7d00",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 999,
  },
});

export default RecipeDetailScreen;
