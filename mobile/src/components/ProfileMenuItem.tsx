import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

type Props = {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
  isLast: boolean;
};

const ProfileMenuItem: React.FC<Props> = ({ icon, label, onPress, isLast }) => {
  return (
    <TouchableOpacity
      style={[styles.container, !isLast && styles.withBorder]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconWrapper}>{icon}</View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default ProfileMenuItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  withBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  iconWrapper: {
    marginRight: 12,
  },
  label: {
    fontSize: 18, 
    color: "#374151", 
  },
});
