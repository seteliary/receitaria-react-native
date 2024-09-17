import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import SearchResultsScreen from "./screens/SearchResultsScreen";
import RecipeDetailScreen from "./screens/RecipeDetailScreen";
import FavoriteRecipesScreen from "./screens/FavoriteRecipesScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Image } from "react-native";

// Logo da AppBar
const logo =
  "https://i.postimg.cc/rF3xyPGc/Black-And-White-Aesthetic-Minimalist-Modern-Simple-Typography-Coconut-Cosmetics-Logo-removebg-previe.png";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <Ionicons
                name="heart"
                size={24}
                color="white"
                style={{ marginRight: 15 }}
                onPress={() => navigation.navigate("Favorites")}
              />
            ),
            headerTitle: () => (
              <Image
                source={{ uri: logo }}
                style={{ width: 150, height: "100%", resizeMode: "contain" }}
              />
            ),
            headerStyle: {
              backgroundColor: "#fb7d00", // Cor de fundo da AppBar
            },
            headerTintColor: "#fff", // Cor do texto e ícones da AppBar
          })}
        />
        <Stack.Screen
          name="SearchResults"
          component={SearchResultsScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <Ionicons
                name="heart"
                size={24}
                color="white"
                style={{ marginRight: 15 }}
                onPress={() => navigation.navigate("Favorites")}
              />
            ),
            headerTitle: () => (
              <Image
                source={{ uri: logo }}
                style={{ width: 150, height: "100%", resizeMode: "contain" }}
              />
            ),
            headerStyle: {
              backgroundColor: "#fb7d00", // Cor de fundo da AppBar
            },
            headerTintColor: "#fff", // Cor do texto e ícones da AppBar
          })}
        />
        <Stack.Screen
          name="RecipeDetail"
          component={RecipeDetailScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <Ionicons
                name="heart"
                size={24}
                color="white"
                style={{ marginRight: 15 }}
                onPress={() => navigation.navigate("Favorites")}
              />
            ),
            headerTitle: () => (
              <Image
                source={{ uri: logo }}
                style={{ width: 150, height: "100%", resizeMode: "contain" }}
              />
            ),
            headerStyle: {
              backgroundColor: "#fb7d00", // Cor de fundo da AppBar
            },
            headerTintColor: "#fff", // Cor do texto e ícones da AppBar
          })}
        />
        <Stack.Screen
          name="Favorites"
          component={FavoriteRecipesScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <Ionicons
                name="heart"
                size={24}
                color="white"
                style={{ marginRight: 15 }}
                onPress={() => navigation.navigate("Favorites")}
              />
            ),
            headerTitle: () => (
              <Image
                source={{ uri: logo }}
                style={{ width: 150, height: "100%", resizeMode: "contain" }}
              />
            ),
            headerStyle: {
              backgroundColor: "#fb7d00", // Cor de fundo da AppBar
            },
            headerTintColor: "#fff", // Cor do texto e ícones da AppBar
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
