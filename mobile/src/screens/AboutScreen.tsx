import { Bell } from "lucide-react-native";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import MainContainer from "../components/MainContainer";
import useAuth from "../hooks/use-auth";
import FormAbout from "../components/FormAbout";


const AboutScreen = () => {
  const { user } = useAuth();
  const userName = user?.name;

  return (
    <MainContainer>
      <View style={styles.header}>
        <Text style={styles.greeting}>Olá {userName}, tudo bem?</Text>
        <TouchableOpacity>
          <Bell size={28} color="#FF0000" />
        </TouchableOpacity>
      </View>
            <View style={styles.spacer} />
      <FormAbout />
    </MainContainer>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 12,
    width: "100%",
  },
  greeting: {
    fontWeight: "600",
    fontSize: 16,
    color: "#666",
  },
  spacer: {
    width: "100%",
    marginVertical: 12,
  },
});
