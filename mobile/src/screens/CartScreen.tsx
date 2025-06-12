import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from "react-native";
import MainContainer from "../components/MainContainer";
import { useCart } from "../context/AppContext";
import useAuth from "../hooks/use-auth";

type GroupedItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export function CartScreen() {
  const { cartItems, removeFromCart } = useCart();

  const groupedItems = cartItems.reduce(
    (acc: Record<number, GroupedItem>, item) => {
      if (!acc[item.id]) {
        acc[item.id] = { ...item, quantity: 1 };
      } else {
        acc[item.id].quantity += 1;
      }
      return acc;
    },
    {}
  );

  const itemsArray = Object.values(groupedItems);

  const total = itemsArray.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const { user } = useAuth();

  const handleCheckout = () => {
    const itensFormatados = itemsArray
      .map(
        (item) =>
          `${item.quantity}x ${item.name} — R$ ${(item.price * item.quantity).toFixed(2)}`
      )
      .join("\n");

    const endereco = `
    📍 Endereço de Entrega:
    ${user?.address}, 
    ${user?.neighborhood} - ${user?.city}/${user?.state}
    CEP: ${user?.postal_code}
    Complemento: ${user?.address_complement || "N/A"}
    `;

    const message = `🛒 Pedido:\n${itensFormatados}\n\n${endereco}\n💰 Total: R$ ${total.toFixed(2)}`;

    const phone = "5521980450846"; 
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    Linking.openURL(url)
  };

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
          data={itemsArray}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemRow}>
              <Text style={styles.itemText}>
                {item.quantity}x {item.name} — R${" "}
                {(item.price * item.quantity).toFixed(2)}
              </Text>
              <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                <Text style={styles.removeText}>Remover</Text>
              </TouchableOpacity>
            </View>
          )}
        />

        <View style={styles.footer}>
          <Text style={styles.totalText}>Total: R$ {total.toFixed(2)}</Text>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={handleCheckout}
          >
            <Text style={styles.checkoutText}>Finalizar Compra</Text>
          </TouchableOpacity>
        </View>
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
    alignItems: "center",
  },
  itemText: { fontSize: 16 },
  removeText: { color: "#ff0000", fontWeight: "bold" },
  footer: {
    marginTop: 24,
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingTop: 16,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "right",
  },
  checkoutButton: {
    backgroundColor: "#ff0000",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  checkoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
