import React, { useState, useEffect } from "react";
import { View, Text, Image, Button, ScrollView } from "react-native";
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

  if (!recipe) {
    return (
      <View>
        <Text>Receita não encontrada!</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Text>{recipe.label}</Text>
      <Image
        source={{ uri: recipe.image }}
        style={{ width: "100%", height: 200 }}
      />
      <Text>Ingredientes:</Text>
      {recipe.ingredientLines.map((ingredient, index) => (
        <Text key={index}>{ingredient}</Text>
      ))}
      <Button
        title={isFavorite ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
        onPress={toggleFavorite}
      />
    </ScrollView>
  );
};

export default RecipeDetailScreen;
