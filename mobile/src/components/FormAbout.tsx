import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import useAuth from "../hooks/use-auth";
import { User } from "../types/user";

const FormAbout = () => {
  const { user } = useAuth();

  const [form, setForm] = useState<Partial<User>>({
    name: "",
    email: "",
    address_complement: "",
    address: "",
    city: "",
    state: "",
    postal_code: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        address_complement: user.address_complement || "",
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
        postal_code: user.postal_code || "",
      });
    }
  }, [user]);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.sectionTitle}>Dados Cadastrais</Text>

      <Input
        value={form.name!}
        onChangeText={(v) => handleChange("name", v)}
        label="Nome"
      />
      <Input
        value={form.email!}
        onChangeText={(v) => handleChange("email", v)}
        label="E-mail"
        keyboardType="email-address"
      />

      <View style={styles.divider} />

      <Text style={styles.sectionTitle}>Dados de Endereço</Text>

      <Input
        value={form.postal_code!}
        onChangeText={(v) => handleChange("cep", v)}
        label="CEP"
      />
      <Input
        value={form.address!}
        onChangeText={(v) => handleChange("address", v)}
        label="Endereço"
      />
      <Input
        value={form.city!}
        onChangeText={(v) => handleChange("city", v)}
        label="Cidade"
      />
      <Input
        value={form.state!}
        onChangeText={(v) => handleChange("state", v)}
        label="Estado"
      />
      <Input
        value={form.address_complement!}
        onChangeText={(v) => handleChange("complement", v)}
        label="Complemento"
      />
    </ScrollView>
  );
};

export default FormAbout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 20,
    color: "#374151",
    marginBottom: 24,
    marginTop: 8,
    fontWeight: "600",
  },
  divider: {
    width: "100%",
    marginVertical: 40,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderStyle: "dotted",
  },
});
