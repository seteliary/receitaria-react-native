import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native";
import { fetchRecipes } from "../api";
import RecipeCard from "../components/RecipeCard";
import Ionicons from "react-native-vector-icons/Ionicons";

const HomeScreen = ({ navigation }) => {
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const loadFeaturedRecipes = async () => {
      try {
        const randomQuery = "random";
        const data = await fetchRecipes(randomQuery);
        const randomRecipes = data.hits
          .sort(() => 0.5 - Math.random())
          .slice(0, 5);
        setFeaturedRecipes(randomRecipes);
      } catch (error) {
        console.error("Erro:", error);
      } finally {
        setLoadingFeatured(false);
      }
    };
    loadFeaturedRecipes();
  }, []);

  const handleSearch = () => {
    navigation.navigate("SearchResults", { query });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Pesquisar receitas"
          value={query}
          onChangeText={setQuery}
          style={styles.searchInput}
        />
        <Ionicons
          name="search"
          size={20}
          color="gray"
          style={styles.searchIcon}
          onPress={handleSearch}
        />
      </View>
      <Text style={styles.title}>Receitas em destaque</Text>
      <ScrollView contentContainerStyle={styles.cardsContainer}>
        {loadingFeatured ? (
          <Text>Carregando...</Text>
        ) : (
          featuredRecipes.map((item) => (
            <RecipeCard
              key={item.recipe.uri}
              recipe={item.recipe}
              onPress={() =>
                navigation.navigate("RecipeDetail", { recipe: item.recipe })
              }
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#ffb703", // Cor de fundo das páginas
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 999,
    paddingHorizontal: 8,
  },
  searchInput: {
    flex: 1,
    padding: 12,
  },
  searchIcon: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    marginBottom: 24,
    color: "#fff",
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 24,
  },
});

export default HomeScreen;
