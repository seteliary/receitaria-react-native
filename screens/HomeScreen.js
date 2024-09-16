import React, { useState } from "react";
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
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

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
