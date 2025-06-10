import { useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MainContainer from "../components/MainContainer";

const dishes = [
  {
    id: "1",
    name: "Pizza Margherita",
    image: require("../../assets/images/logo.png"),
  },
  {
    id: "2",
    name: "Sushi Especial",
    image: require("../../assets/images/logo.png"),
  },
  {
    id: "3",
    name: "Hambúrguer Artesanal",
    image: require("../../assets/images/logo.png"),
  },
];
export function MenuScreen() {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const router = useRouter();

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
        <Text style={styles.title}>Todos os Pratos</Text>
        <FlatList
          data={dishes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                router.push({ pathname: "DishDetail", params: item })
              }
              style={styles.dishCard}
            >
              <Image source={item.image} style={styles.dishImage} />
              <View style={styles.dishRow}>
                <Text style={styles.dishName}>{item.name}</Text>
                <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
                  <Text
                    style={{
                      color: favorites.includes(item.id) ? "#ff0000" : "#ccc",
                    }}
                  >
                    ❤️
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </MainContainer>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  dishCard: { marginBottom: 16 },
  dishImage: { width: "100%", height: 150, borderRadius: 8, marginBottom: 8 },
  dishRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dishName: { fontSize: 16, fontWeight: "500" },
});
