import { Stack, useRouter } from "expo-router";
import { CartProvider } from "../src/context/AppContext";
import AuthProvider from "@/src/context/AuthContext";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { StatusBar } from "react-native";
import useAuth from "@/src/hooks/use-auth";
import { useEffect } from "react";

export default function RootLayout() {
  return (
    <AuthProvider>
      <CartProvider>
        <QueryClientProvider client={new QueryClient()}>
          <StatusBar
            barStyle="dark-content"
            translucent
            backgroundColor="transparent"
          />
          <AuthHandler />
        </QueryClientProvider>
      </CartProvider>
    </AuthProvider>
  );
}

function AuthHandler() {
  const { isLogged } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLogged) {
      router.replace("/(main)/Home");
    }
  }, [isLogged, router]);

  return <Stack screenOptions={{ headerShown: false }} />;
}
