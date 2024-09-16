import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import RecipeDetailScreen from "./screens/RecipeDetailScreen";
import FavoriteRecipesScreen from "./screens/FavoriteRecipesScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
        <Stack.Screen name="Favorites" component={FavoriteRecipesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
