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

export function RegisterScreen() {
  const router = useRouter()
  return (
    <MainContainer>
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={{
            width: 250,
            height: 250,
            marginBottom: 20,
            alignSelf: "center",
          }}
        />
        <Text style={styles.title}>Criar Conta</Text>
        <TextInput style={styles.input} placeholder="Nome completo" />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
        />
        <TextInput style={styles.input} placeholder="Senha" secureTextEntry />
        <TextInput
          style={styles.input}
          placeholder="Confirme a senha"
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("Address")}
        >
          <Text style={styles.buttonText}>Avançar</Text>
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
