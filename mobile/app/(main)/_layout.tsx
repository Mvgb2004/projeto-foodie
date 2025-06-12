import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StatusBar } from "react-native";

export default function MainLayout() {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#FF0000",
          tabBarStyle: {
            backgroundColor: "#fff",
            paddingTop: 8,
            paddingBottom: 14,
            height: 80,
            borderTopWidth: 0.5,
            borderTopColor: "#e0e0e0",
            elevation: 10,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
            marginBottom: 4,
          },
          tabBarItemStyle: {
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <Tabs.Screen
          name="Home"
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={32} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Menu"
          options={{
            tabBarLabel: "Menu",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="restaurant" size={32} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Cart"
          options={{
            tabBarLabel: "Carrinho",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="cart" size={32} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="DishDetail"
          options={{
            href: null
          }}
        />
        <Tabs.Screen
          name="NewAddress"
          options={{
            href: null
          }}
        />
        <Tabs.Screen
          name="About"
          options={{
            href: null
          }}
        />
        <Tabs.Screen
          name="Profile"
          options={{
            tabBarLabel: "Perfil",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={32} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
