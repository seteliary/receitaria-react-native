import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Modal,
  CheckBox,
  TouchableOpacity,
} from "react-native";
import { fetchRecipes } from "../api";
import RecipeCard from "../components/RecipeCard";
import Ionicons from "react-native-vector-icons/Ionicons";

const SearchResultsScreen = ({ route, navigation }) => {
  const { query, healthFilters, cuisineTypeFilters } = route.params;
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(query);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentHealthFilters, setCurrentHealthFilters] = useState(
    healthFilters.reduce((acc, filter) => ({ ...acc, [filter]: true }), {})
  );
  const [currentCuisineTypeFilters, setCurrentCuisineTypeFilters] = useState(
    cuisineTypeFilters.reduce((acc, filter) => ({ ...acc, [filter]: true }), {})
  );

  const healthFilterOptions = [
    "vegan",
    "vegetarian",
    "dairy-free",
    "DASH",
    "gluten-free",
    "paleo",
    "peanut-free",
    "soy-free",
  ];

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

  useEffect(() => {
    const searchRecipes = async () => {
      setLoading(true);
      try {
        const healthFiltersList = Object.keys(currentHealthFilters).filter(
          (filter) => currentHealthFilters[filter]
        );
        const cuisineTypeFiltersList = Object.keys(
          currentCuisineTypeFilters
        ).filter((filter) => currentCuisineTypeFilters[filter]);
        const data = await fetchRecipes(
          searchQuery,
          healthFiltersList,
          cuisineTypeFiltersList
        );
        setRecipes(data.hits);
      } catch (error) {
        console.error("Erro:", error);
      } finally {
        setLoading(false);
      }
    };

    searchRecipes();
  }, [searchQuery, currentHealthFilters, currentCuisineTypeFilters]);

  const handleSearch = () => {
    setSearchQuery(searchQuery);
  };

  const openFilterModal = () => {
    setModalVisible(true);
  };

  const closeFilterModal = () => {
    setModalVisible(false);
  };

  const toggleHealthFilter = (filter) => {
    setCurrentHealthFilters((prevState) => ({
      ...prevState,
      [filter]: !prevState[filter],
    }));
  };

  const toggleCuisineTypeFilter = (filter) => {
    setCurrentCuisineTypeFilters((prevState) => ({
      ...prevState,
      [filter]: !prevState[filter],
    }));
  };

  // Generate text for applied filters
  const appliedFilters = [
    ...Object.keys(currentHealthFilters).filter(
      (filter) => currentHealthFilters[filter]
    ),
    ...Object.keys(currentCuisineTypeFilters).filter(
      (filter) => currentCuisineTypeFilters[filter]
    ),
  ]
    .map(
      (filter) =>
        healthFilterLabels[filter] || cuisineTypeLabels[filter] || filter
    )
    .join(", ");

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
        <Ionicons
          name="filter"
          size={20}
          color="gray"
          style={styles.filterIcon}
          onPress={openFilterModal}
        />
      </View>

      <Text style={styles.title}>Resultados da Pesquisa</Text>
      <Text style={styles.appliedFiltersText}>
        Filtro(s) aplicado(s): {appliedFilters || "Nenhum"}
      </Text>

      {loading ? (
        <Text>Carregando...</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.cardsContainer}>
          {recipes.length > 0 ? (
            recipes.map((item) => (
              <RecipeCard
                key={item.recipe.uri}
                recipe={item.recipe}
                onPress={() =>
                  navigation.navigate("RecipeDetail", { recipe: item.recipe })
                }
              />
            ))
          ) : (
            <Text>Nenhum resultado encontrado.</Text>
          )}
        </ScrollView>
      )}

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filtros de busca</Text>

            <ScrollView style={styles.modalScrollView}>
              <Text style={styles.filterLabel}>Restrições:</Text>
              {healthFilterOptions.map((filter) => (
                <View key={filter} style={styles.checkboxContainer}>
                  <CheckBox
                    value={!!currentHealthFilters[filter]}
                    onValueChange={() => toggleHealthFilter(filter)}
                  />
                  <Text style={styles.filterText}>
                    {healthFilterLabels[filter] || filter.replace("-", " ")}
                  </Text>
                </View>
              ))}

              <Text style={styles.filterLabel}>Culinária:</Text>
              {cuisineTypeOptions.map((type) => (
                <View key={type} style={styles.checkboxContainer}>
                  <CheckBox
                    value={!!currentCuisineTypeFilters[type]}
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
  filterIcon: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
  },
  appliedFiltersText: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 24,
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
    maxHeight: "70%",
    width: "60%",
  },
  modalScrollView: {
    // maxHeight: "70%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 20,
  },
  filterLabel: {
    fontSize: 16,
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
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

export default SearchResultsScreen;
