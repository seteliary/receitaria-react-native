import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Button,
  TextInput,
} from "react-native";
import { fetchRecipes } from "../api";

const HomeScreen = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingFeatured, setLoadingFeatured] = useState(true);

  useEffect(() => {
    const loadFeaturedRecipes = async () => {
      try {
        const randomQuery = "random"; // Use um termo de pesquisa genérico para obter receitas aleatórias
        const data = await fetchRecipes(randomQuery);
        // Escolha aleatoriamente 5 receitas
        const randomRecipes = data.hits
          .sort(() => 0.5 - Math.random())
          .slice(0, 5);
        setFeaturedRecipes(randomRecipes);
      } catch (error) {
        console.error("Error fetching featured recipes:", error);
      } finally {
        setLoadingFeatured(false);
      }
    };
    loadFeaturedRecipes();
  }, []);

  const searchRecipes = async () => {
    setLoading(true);
    try {
      const data = await fetchRecipes(query);
      setRecipes(data.hits);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Search for recipes..."
        value={query}
        onChangeText={setQuery}
        style={{ padding: 10, borderColor: "gray", borderWidth: 1 }}
      />
      <Button title="Search" onPress={searchRecipes} />
      <Button
        title="Ver Favoritos"
        onPress={() => navigation.navigate("Favorites")}
      />

      <Text style={{ fontSize: 18, fontWeight: "bold", marginVertical: 10 }}>
        Receitas em destaque
      </Text>
      {loadingFeatured ? (
        <Text>Loading featured recipes...</Text>
      ) : (
        <FlatList
          data={featuredRecipes}
          keyExtractor={(item) => item.recipe.uri}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("RecipeDetail", { recipe: item.recipe })
              }
            >
              <Text>{item.recipe.label}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      {loading && <Text>Loading...</Text>}
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.recipe.uri}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("RecipeDetail", { recipe: item.recipe })
            }
          >
            <Text>{item.recipe.label}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HomeScreen;
