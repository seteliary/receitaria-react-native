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
        console.error("Error fetching recipes:", error);
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
      <ScrollView contentContainerStyle={styles.cardsContainer}>
        {loading ? (
          <Text>Loading...</Text>
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
    padding: 10,
    backgroundColor: "#ffb703", // Cor de fundo das páginas
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    marginBottom: 10,
    backgroundColor: "#fff", // Fundo branco para a barra de pesquisa
    borderRadius: 5,
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
    gap: 12,
  },
});

export default SearchResultsScreen;
