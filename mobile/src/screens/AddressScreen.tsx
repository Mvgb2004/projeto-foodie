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
import { useState } from "react";
import { useRegisterForm } from "../store/useRegisterStore";
import useAuth from "../hooks/use-auth";

export function AddressScreen() {
  const router = useRouter();
  const { data, update, reset } = useRegisterForm();

  const [cep, setCep] = useState("");
  const [address, setAddress] = useState("");
  const [complement, setComplement] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const { handleRegisterUser } = useAuth();

  const handleFinish = async () => {
    const userData = {
      name: data.name || "",
      email: data.email || "",
      password: data.password || "",
      cep,
      address,
      addressComplement: complement,
      city,
      state,
      neighborhood: "", 
    };

    await handleRegisterUser.mutateAsync(userData, {
      onSuccess: () => {
        alert("Usuário cadastrado com sucesso!");
        reset();
        router.push("/");
      },
    });
  };

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
          value={cep}
          onChangeText={setCep}
        />
        <TextInput
          style={styles.input}
          placeholder="Endereço"
          value={address}
          onChangeText={setAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="Complemento"
          value={complement}
          onChangeText={setComplement}
        />
        <TextInput
          style={styles.input}
          placeholder="Cidade"
          value={city}
          onChangeText={setCity}
        />
        <TextInput
          style={styles.input}
          placeholder="UF"
          value={state}
          onChangeText={setState}
        />
        <TouchableOpacity style={styles.button} onPress={handleFinish}>
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
