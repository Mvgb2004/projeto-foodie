import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator } from "react-native";
import { DishDetailScreen } from "../../src/screens/DishDetailScreen";

const DishDetail = () => {
  const { id, image, name } = useLocalSearchParams<{
    id: string;
    image: string;
    name: string;
  }>();

  if (!id || !image || !name) {
    return <ActivityIndicator color={"FF0000"}/>
  }

  return (
    <DishDetailScreen
      route={{
        params: {
          dish: {
            id: Number(id),
            image,
            name,
          },
        },
      }}
    />
  );
};

export default DishDetail;
