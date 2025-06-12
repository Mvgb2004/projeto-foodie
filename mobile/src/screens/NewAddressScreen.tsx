import * as Location from "expo-location";
import { Linking, Platform } from "react-native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import MainContainer from "../components/MainContainer";
import useAuth from "../hooks/use-auth";

export default function NewAddressScreen() {
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [address, setAddress] = useState<Location.LocationGeocodedAddress | null>(null);
  const [complement, setComplement] = useState("");
  const [number, setNumber] = useState("");

  const { setUser } = useAuth();

  const fetchLocation = async () => {
    setLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permissão negada",
          "Você precisa autorizar a localização para usar essa função.",
          [
            {
              text: "Abrir Configurações",
              onPress: () => {
                if (Platform.OS === "ios") {
                  Linking.openURL("app-settings:");
                } else {
                  Location.requestForegroundPermissionsAsync().then(fetchLocation);
                }
              },
            },
            { text: "Cancelar", style: "cancel" },
          ]
        );
        setLoading(false);
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);

      const [addr] = await Location.reverseGeocodeAsync({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });

      setAddress(addr || null);
    } catch (err) {
      Alert.alert("Erro ao buscar localização", "Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  const handleSave = () => {
    if (!address) return;

    const finalAddress = {
      street: address.street,
      neighborhood: address.district,
      city: address.city,
      state: address.region,
      postal_code: address.postalCode,
      complement,
      number,
      latitude: location?.coords.latitude,
      longitude: location?.coords.longitude,
    };

    setUser((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        address: finalAddress.street ?? "",
        address_complement: complement,
        city: finalAddress.city ?? "",
        state: finalAddress.state ?? "",
        postal_code: finalAddress.postal_code ?? "",
      };
    });

    Alert.alert("Endereço salvo!", "Endereço de entrega cadastrado com sucesso.");
  };

  if (loading) {
    return (
      <MainContainer>
        <ActivityIndicator size="large" color="#FF0000" style={{ marginTop: 100 }} />
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Novo Endereço de Entrega</Text>

        <TouchableOpacity style={styles.reloadButton} onPress={fetchLocation}>
          <Text style={styles.reloadButtonText}>🔄 Atualizar Localização</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Rua</Text>
        <TextInput style={styles.input} value={address?.street || ""} editable={false} />

        <Text style={styles.label}>Bairro</Text>
        <TextInput style={styles.input} value={address?.district || ""} editable={false} />

        <Text style={styles.label}>Cidade</Text>
        <TextInput style={styles.input} value={address?.city || ""} editable={false} />

        <Text style={styles.label}>Estado</Text>
        <TextInput style={styles.input} value={address?.region || ""} editable={false} />

        <Text style={styles.label}>CEP</Text>
        <TextInput style={styles.input} value={address?.postalCode || ""} editable={false} />

        <Text style={styles.label}>Complemento</Text>
        <TextInput
          style={styles.input}
          value={complement}
          onChangeText={setComplement}
          placeholder="Apto, bloco, etc."
        />

        <Text style={styles.label}>Número</Text>
        <TextInput
          style={styles.input}
          value={number}
          onChangeText={setNumber}
          placeholder="Número da residência"
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Salvar Endereço</Text>
        </TouchableOpacity>
      </ScrollView>
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 100,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 9999,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  button: {
    marginTop: 24,
    backgroundColor: "#FF0000",
    padding: 16,
    borderRadius: 9999,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  reloadButton: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 9999,
    alignItems: "center",
    marginBottom: 20,
  },
  reloadButtonText: {
    color: "#333",
    fontWeight: "bold",
  },
});
