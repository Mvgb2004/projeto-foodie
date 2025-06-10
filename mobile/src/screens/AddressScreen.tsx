import { useRouter } from "expo-router";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MainContainer from "../components/MainContainer";

export function AddressScreen() {
  const router = useRouter();
  return (
    <MainContainer>
      <Image 
        source={require("../../assets/images/logo.png")}
        style={{
          width: 250,
          height: 250,
          marginBottom: 20,
          alignSelf: "center",
        }}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Endereço</Text>
        <TextInput
          style={styles.input}
          placeholder="CEP"
          keyboardType="numeric"
        />
        <TextInput style={styles.input} placeholder="Endereço" />
        <TextInput style={styles.input} placeholder="Complemento" />
        <TextInput style={styles.input} placeholder="Cidade" />
        <TextInput style={styles.input} placeholder="UF" />
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("(main)")}
        >
          <Text style={styles.buttonText}>Finalizar Cadastro</Text>
        </TouchableOpacity>
      </View>
    </MainContainer>
  );
}

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
  button: {
    backgroundColor: "#ff0000",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
