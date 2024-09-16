import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

const RecipeCard = ({ recipe, onPress }) => {
  const { label, image } = recipe;

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 250,
    height: 185,
    margin: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "75%",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
  },
});

export default RecipeCard;
