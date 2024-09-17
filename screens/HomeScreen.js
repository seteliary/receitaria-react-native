import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
  CheckBox,
} from "react-native";
import { fetchRecipes } from "../api";
import RecipeCard from "../components/RecipeCard";
import Ionicons from "react-native-vector-icons/Ionicons";

const HomeScreen = ({ navigation }) => {
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [query, setQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [healthFilters, setHealthFilters] = useState({
    vegan: false,
    vegetarian: false,
    "dairy-free": false,
    DASH: false,
    "gluten-free": false,
    paleo: false,
    "peanut-free": false,
    "soy-free": false,
  });

  const healthFilterLabels = {
    vegan: "Vegano",
    vegetarian: "Vegetariano",
    "dairy-free": "Sem derivados de leite",
    DASH: "Dieta DASH",
    "gluten-free": "Sem glúten",
    paleo: "Dieta Paleo",
    "peanut-free": "Sem amendoim",
    "soy-free": "Sem soja",
  };

  const cuisineTypeOptions = [
    "American",
    "Asian",
    "Caribbean",
    "Chinese",
    "French",
    "Indian",
    "Italian",
    "Japanese",
    "Kosher",
    "Mediterranean",
    "Mexican",
    "Nordic",
    "South American",
  ];

  const cuisineTypeLabels = {
    American: "Americana",
    Asian: "Asiática",
    Caribbean: "Caribenha",
    Chinese: "Chinesa",
    French: "Francesa",
    Indian: "Indiana",
    Italian: "Italiana",
    Japanese: "Japonesa",
    Kosher: "Kosher",
    Mediterranean: "Mediterrânea",
    Mexican: "Mexicana",
    Nordic: "Nórdica",
    "South American": "Sul-americana",
  };

  const [cuisineTypeFilters, setCuisineTypeFilters] = useState(
    cuisineTypeOptions.reduce(
      (filters, type) => ({ ...filters, [type]: false }),
      {}
    )
  );

  useEffect(() => {
    const loadFeaturedRecipes = async () => {
      setLoadingFeatured(true);
      try {
        const data = await fetchRecipes("random");
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

  const toggleHealthFilter = (filter) => {
    setHealthFilters({ ...healthFilters, [filter]: !healthFilters[filter] });
  };

  const toggleCuisineTypeFilter = (filter) => {
    setCuisineTypeFilters({
      ...cuisineTypeFilters,
      [filter]: !cuisineTypeFilters[filter],
    });
  };

  const openFilterModal = () => {
    setModalVisible(true);
  };

  const closeFilterModal = () => {
    setModalVisible(false);
  };

  const handleSearch = () => {
    navigation.navigate("SearchResults", {
      query,
      healthFilters: Object.keys(healthFilters).filter(
        (key) => healthFilters[key]
      ),
      cuisineTypeFilters: Object.keys(cuisineTypeFilters).filter(
        (key) => cuisineTypeFilters[key]
      ),
    });
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
        <Ionicons
          name="filter"
          size={20}
          color="gray"
          style={styles.filterIcon}
          onPress={openFilterModal}
        />
      </View>

      <View style={styles.header}>
        <Ionicons
          name="star"
          size={24}
          color="white"
          onPress={() => navigation.navigate("Favorites")}
          style={styles.favoritesButton}
        />
        <Text style={styles.title}>Receitas em destaque</Text>
      </View>

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

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalContentHeader}>
              <Text style={styles.modalTitle}>Filtros de busca</Text>
              <Ionicons
                name="close-circle-outline"
                size={32}
                color="#333"
                onPress={closeFilterModal}
                style={styles.closeIcon}
              />
            </View>
            <ScrollView>
              <Text style={styles.filterLabel}>Restrições:</Text>
              {Object.keys(healthFilters).map((filter) => (
                <View key={filter} style={styles.checkboxContainer}>
                  <CheckBox
                    value={healthFilters[filter]}
                    onValueChange={() => toggleHealthFilter(filter)}
                  />
                  <Text style={styles.filterText}>
                    {healthFilterLabels[filter] || filter}
                  </Text>
                </View>
              ))}

              <Text style={styles.filterLabel}>Culinária:</Text>
              {cuisineTypeOptions.map((type) => (
                <View key={type} style={styles.checkboxContainer}>
                  <CheckBox
                    value={cuisineTypeFilters[type]}
                    onValueChange={() => toggleCuisineTypeFilter(type)}
                  />
                  <Text style={styles.filterText}>
                    {cuisineTypeLabels[type] || type}
                  </Text>
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity
              onPress={closeFilterModal}
              style={styles.applyButton}
            >
              <Text style={styles.applyButtonText}>Aplicar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#ffb703",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 999,
    paddingHorizontal: 8,
  },
  searchInput: {
    flex: 1,
    padding: 12,
    color: "#b0b0b0",
    fontSize: 16,
  },
  searchIcon: {
    padding: 10,
  },
  filterIcon: {
    padding: 10,
  },
  favoritesButton: {
    padding: 10,
    paddingLeft: 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 24,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 16,
    maxHeight: "80%",
    width: "80%",
  },
  modalContentHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 20,
    color: "#333",
  },
  closeIcon: {
    padding: 20,
  },
  filterLabel: {
    fontSize: 18,
    marginBottom: 12,
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: "#ffb703",
    color: "#fff",
    fontWeight: "bold",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  filterText: {
    fontSize: 16,
    marginLeft: 8,
  },
  applyButton: {
    backgroundColor: "#ffb703",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 999,
    alignItems: "center",
    margin: 20,
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default HomeScreen;
