import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native";
import { fetchRecipes } from "../api";
import RecipeCard from "../components/RecipeCard";
import Ionicons from "react-native-vector-icons/Ionicons";

const SearchResultsScreen = ({ route, navigation }) => {
  const { query } = route.params;
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    const searchRecipes = async () => {
      setLoading(true);
      try {
        const data = await fetchRecipes(searchQuery);
        setRecipes(data.hits);
      } catch (error) {
        console.error("Erro:", error);
      } finally {
        setLoading(false);
      }
    };

    searchRecipes();
  }, [searchQuery]);

  const handleSearch = () => {
    navigation.navigate("SearchResults", { query: searchQuery });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Pesquisar receitas"
          value={searchQuery}
          onChangeText={setSearchQuery}
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
      <Text style={styles.title}>Resultados da busca</Text>
      <ScrollView contentContainerStyle={styles.cardsContainer}>
        {loading ? (
          <Text>Carregando...</Text>
        ) : (
          recipes.map((item) => (
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
    backgroundColor: "#ffb703",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 24,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    backgroundColor: "#fff",
    borderRadius: 999,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    padding: 10,
  },
  searchIcon: {
    padding: 10,
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 24,
  },
});

export default SearchResultsScreen;
