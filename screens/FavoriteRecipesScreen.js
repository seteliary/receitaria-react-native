import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FavoriteRecipesScreen = ({ navigation }) => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favorites = await AsyncStorage.getItem("favorites");
        const favoriteRecipes = favorites ? JSON.parse(favorites) : [];
        setFavoriteRecipes(favoriteRecipes);
      } catch (error) {
        console.error(error);
      }
    };
    loadFavorites();
  }, []);

  return (
    <View>
      <Text>Receitas Favoritas</Text>
      <FlatList
        data={favoriteRecipes}
        keyExtractor={(item) => item.uri}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("RecipeDetail", { recipe: item })
            }
          >
            <Text>{item.label}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default FavoriteRecipesScreen;
