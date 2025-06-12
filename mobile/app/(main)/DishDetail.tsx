import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator } from "react-native";
import { DishDetailScreen } from "../../src/screens/DishDetailScreen";

const DishDetail = () => {
  const { dish } = useLocalSearchParams<{ dish: string }>();

  if (!dish) {
    return <ActivityIndicator color="#FF0000" />;
  }

  return <DishDetailScreen />;
};

export default DishDetail;
