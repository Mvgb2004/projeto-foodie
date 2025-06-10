import { useRouter } from "expo-router";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MainContainer from "../components/MainContainer";

const featuredDishes = [
  {
    id: 1,
    name: "Pizza Margherita",
    image: require("../../assets/images/logo.png"),
  },
  {
    id: 2,
    name: "Sushi Especial",
    image: require("../../assets/images/logo.png"),
  },
  {
    id: 3,
    name: "Hambúrguer Artesanal",
    image: require("../../assets/images/logo.png"),
  },
];
export const HomeScreen: React.FC = () => {
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
        <TextInput style={styles.input} placeholder="O que vamos pedir hoje?" />
        <View style={styles.filterRow}>
          <TouchableOpacity style={styles.filter}>
            <Text>Pizza</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filter}>
            <Text>Sushi</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filter}>
            <Text>Burgers</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Destaques</Text>
        <FlatList
          data={featuredDishes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                router.push({ pathname: "DishDetail", params: item })
              }
              style={styles.dishCard}
            >
              <Image source={item.image} style={styles.dishImage} />
              <Text style={styles.dishName}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
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
  filter: { backgroundColor: "#eee", padding: 8, borderRadius: 8 },
  dishCard: { marginRight: 12, alignItems: "center", flexDirection: "row" },
  dishImage: { width: 100, height: 100, borderRadius: 8, marginBottom: 8 },
  dishName: { fontSize: 16, fontWeight: "500" },
});
