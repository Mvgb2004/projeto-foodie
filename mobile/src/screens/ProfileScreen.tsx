import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Info, LogOut, User, MapPin } from "lucide-react-native";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import MainContainer from "../components/MainContainer";
import ProfileMenuItem from "../components/ProfileMenuItem";
import useAuth from "../hooks/use-auth";

const ProfileScreen = () => {
  const router = useRouter();
  const { setIsLogged, setUser, user } = useAuth();

  const MENU_ITEMS = [
    {
      label: "Sobre Mim",
      icon: Info,
      onPress: () => {
        router.push("/(main)/About");
      },
    },
    {
      label: "Alterar Endereço de Entrega",
      icon: MapPin,
      onPress: () => {
        router.push("/(main)/NewAddress");
      },
    },
    {
      label: "Deslogar",
      icon: LogOut,
      onPress: async () => {
          await AsyncStorage.multiRemove(["user", "accessToken"]).then(() => {
          setIsLogged(false);
          setUser(null);
          router.push("/");
        });
      },
    },
  ];


  const userName = user?.name || "";
  const userEmail = user?.email || "";

  return (
    <MainContainer>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <User size={48} color="#ff0000" />
        </View>
        <Text style={styles.userName}>{userName}</Text>
        <Text style={styles.userEmail}>{userEmail}</Text>
      </View>

      <View style={styles.menuContainer}>
        <View style={styles.menuBox}>
          {MENU_ITEMS.map((item, idx) => (
            <ProfileMenuItem
              key={item.label}
              icon={<item.icon size={20} color="#ff0000" />}
              label={item.label}
              onPress={item.onPress}
              isLast={idx === MENU_ITEMS.length - 1}
            />
          ))}
        </View>
      </View>
    </MainContainer>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#ff0000",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    padding: 24,
    alignItems: "center",
    width: "100%",
    marginBottom: 24,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    elevation: 3, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  userName: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
  },
  userEmail: {
    color: "#ffffff",
    fontSize: 16,
    opacity: 0.9,
    marginBottom: 16,
  },
  menuContainer: {
    width: "100%",
    paddingHorizontal: 16,
  },
  menuBox: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    elevation: 2,
  },
  deleteAccountButton: {
    marginTop: 32,
    marginBottom: 24,
    alignItems: "center",
    padding: 16,
  },
  deleteRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  deleteText: {
    color: "#EF4444",
    fontWeight: "600",
    fontSize: 16,
  },
});
