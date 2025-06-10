import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MainContainer from "../components/MainContainer";
import { useCart } from "../context/AppContext";

export function CartScreen() {
  const { cartItems, removeFromCart } = useCart();

  console.log("Cart Items:", cartItems);

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
        <Text style={styles.title}>Carrinho</Text>
        <FlatList
          data={cartItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemRow}>
              <Text style={styles.itemText}>{item.name}</Text>
              <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                <Text style={styles.removeText}>Remover</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  itemText: { fontSize: 16 },
  removeText: { color: "#ff0000", fontWeight: "bold" },
});
