import { useRouter } from "expo-router";
import { useState } from "react";
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

export function MenuScreen() {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const router = useRouter();

  const { useDishesQuery } = useDishes();

  const { data: dishes, isLoading } = useDishesQuery();

  const [searchTerm, setSearchTerm] = useState("");
  const filteredDishes =
    dishes?.filter((dish) =>
      dish.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

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
        <Text style={styles.title}>Todos os Pratos</Text>
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
                <View style={styles.dishContent}>
                  <View style={styles.dishRow}>
                    <Text style={styles.dishName}>{item.name}</Text>
                    <TouchableOpacity
                      onPress={() => toggleFavorite(item.id.toString())}
                    >
                      <Text
                        style={{
                          color: favorites.includes(item.id.toString())
                            ? "#ff0000"
                            : "#ccc",
                        }}
                      >
                        ❤️
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.dishDescription}>{item.description}</Text>
                  <Text style={styles.dishPrice}>
                    R$ {item.price.toFixed(2)}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </MainContainer>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  dishCard: { marginBottom: 16 },
  dishImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  dishContent: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
  },
  dishRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  dishName: { fontSize: 16, fontWeight: "500" },
  dishDescription: { fontSize: 14, color: "#555", marginBottom: 4 },
  dishPrice: { fontSize: 14, fontWeight: "bold", color: "#333" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  emptyMessage: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 32,
    color: "#999",
  },
});
