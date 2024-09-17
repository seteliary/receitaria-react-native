import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RecipeCard from "../components/RecipeCard";
import Ionicons from "react-native-vector-icons/Ionicons";

const FavoriteRecipesScreen = ({ navigation }) => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favorites = await AsyncStorage.getItem("favorites");
        if (favorites) {
          const favoriteRecipes = JSON.parse(favorites);

          const filteredRecipes = favoriteRecipes.filter(
            (recipe) => recipe && recipe.uri && recipe.label && recipe.image
          );

          setFavoriteRecipes(filteredRecipes);
        }
      } catch (error) {
        console.error("Erro:", error);
      }
    };

    loadFavorites();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="heart"
          size={24}
          color="white"
          onPress={() => navigation.navigate("Favorites")}
          style={styles.favoritesButton}
        />
        <Text style={styles.title}>Minhas receitas favoritas</Text>
      </View>

      {/* Verifica se não há receitas favoritas */}
      {favoriteRecipes.length === 0 ? (
        <Text style={styles.emptyMessageText}>
          Você ainda não possui receitas favoritas! :&#40;
        </Text>
      ) : (
        <ScrollView contentContainerStyle={styles.cardsContainer}>
          {favoriteRecipes.map((item) => (
            <RecipeCard
              key={item.uri}
              recipe={item}
              onPress={() =>
                navigation.navigate("RecipeDetail", { recipe: item })
              }
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: "#ffb703",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  favoritesButton: {
    padding: 10,
    paddingLeft: 0,
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 24,
  },
  emptyMessageText: {
    fontSize: 20,
    color: "#333",
  },
});

export default FavoriteRecipesScreen;
