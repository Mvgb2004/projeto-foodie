import { useLocalSearchParams } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MainContainer from "../components/MainContainer";
import { useCart } from "../context/AppContext";
import { Dish } from "../service/get-dishes";

export function DishDetailScreen() {
  const { addToCart } = useCart();
  const params = useLocalSearchParams();
  const dish: Dish = JSON.parse(params.dish as string);

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
        <Image
          source={require("../../assets/images/talher.png")}
          style={styles.image}
        />
        <Text style={styles.name}>{dish.name}</Text>
        <Text style={styles.description}>{dish.description}</Text>
        <Text style={styles.price}>R$ {dish.price.toFixed(2)}</Text>
        <TouchableOpacity style={styles.button} onPress={() => addToCart(dish)}>
          <Text style={styles.buttonText}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>
      </View>
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  price: {
  fontSize: 18,
  fontWeight: "600",
  marginBottom: 16,
  color: "#333",
},
  image: { width: "100%", height: 200, borderRadius: 12, marginBottom: 16 },
  name: { fontSize: 24, fontWeight: "bold", marginBottom: 8 },
  description: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 16,
  },
  button: { backgroundColor: "#ff0000", padding: 16, borderRadius: 8 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
