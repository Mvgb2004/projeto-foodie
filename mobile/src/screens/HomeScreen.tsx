import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MainContainer from "../components/MainContainer";
import useDishes from "../hooks/use-dishes";
import { useState } from "react";

export const HomeScreen: React.FC = () => {
  const router = useRouter();
  const { useDishesQuery, formatCategory } = useDishes();
  const { data: featuredDishes, isLoading } = useDishesQuery();

  const highlightedDishes =
    featuredDishes?.filter((dish) => dish.is_highlighted === true) || [];

  const categories =
    featuredDishes?.reduce((acc, dish) => {
      if (!acc.includes(dish.category)) {
        acc.push(dish.category);
      }
      return acc;
    }, [] as string[]) || [];

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string | null>(null);

  const filteredDishes = highlightedDishes.filter((dish) => {
    const matchesSearch = dish.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory
      ? dish.category === filterCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <MainContainer>
      <Image
        source={require("../../assets/images/logo.png")}
        style={{
          width: 100,
          height: 100,
          alignSelf: "flex-start",
          position: "absolute",
          top: 20,
          left: 20,
          zIndex: 1,
        }}
      />
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="O que vamos pedir hoje?"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />

        <FlatList
          data={categories}
          horizontal
          keyExtractor={(item) => item}
          contentContainerStyle={styles.filterRow}
          renderItem={({ item: category }) => {
            const isActive = filterCategory === category;
            return (
              <TouchableOpacity
                style={[
                  styles.filter,
                  { backgroundColor: isActive ? "#FF6B47" : "#eee" },
                ]}
                onPress={() => setFilterCategory(isActive ? null : category)}
              >
                <Text style={{ color: isActive ? "#fff" : "#000" }}>
                  {formatCategory(category)}
                </Text>
              </TouchableOpacity>
            );
          }}
          showsHorizontalScrollIndicator={false}
        />

        <Text style={styles.title}>Destaques</Text>

        {isLoading ? (
          <ActivityIndicator />
        ) : filteredDishes.length === 0 ? (
          <Text style={styles.emptyMessage}>Nenhum prato encontrado.</Text>
        ) : (
          <FlatList
            data={filteredDishes}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/DishDetail",
                    params: { dish: JSON.stringify(item) },
                  })
                }
                style={styles.dishCard}
              >
                <Image
                  source={require("../../assets/images/talher.png")}
                  style={styles.dishImage}
                />
                <Text style={styles.dishName}>{item.name}</Text>
                <Text style={styles.dishPrice}>R$ {item.price.toFixed(2)}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  filterRow: { flexDirection: "row", gap: 8, marginBottom: 16 },
  filter: {
    padding: 8,
    borderRadius: 8,
    height: 40,
  },
  dishCard: {
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
  },
  dishImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  dishName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    textAlign: "center",
  },
  dishPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
    textAlign: "center",
  },
  emptyMessage: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 32,
    color: "#999",
  },
});
