import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { Alert } from "react-native";
import { AuthContext } from "../context/AuthContext";
import login, { LoginRequest } from "../service/login";
import { CreateUserRequest } from "../types/user";
import createUser from "../service/create-user";

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  const { user, isLogged, setIsLogged, setUser } = context;
  const router = useRouter();
  const [isRegisteringUser, setIsRegisteringUser] = useState(false);
  const [isCreatingSession, setIsCreatingSession] = useState(false);

  const handleRegisterUser = useMutation({
    mutationFn: async (data: CreateUserRequest) => {
      setIsRegisteringUser(true);
      const response = await createUser(data);
      return response;
    },
    onSuccess: () => {},
    onError: (error: any) => {
      Alert.alert(
        "Erro ao cadastrar usuário",
        error?.response?.data?.message ||
          "Ocorreu um erro ao cadastrar o usuário. Tente novamente mais tarde."
      );
       console.log("Erro completo:", JSON.stringify(error, null, 2));
  console.error("Stack:", error?.stack);
    },
    onSettled: () => {
      setIsRegisteringUser(false);
    },
  });

  const handleLogin = useMutation({
    mutationFn: async (data: LoginRequest) => {
      setIsCreatingSession(true);
      const response = await login(data);
      return response;
    },
    onSuccess: async (data: any) => {
      const { accessToken, user } = data;

      setUser(user);
      setIsLogged(true);

      await AsyncStorage.multiSet([
        ["user", JSON.stringify(user)],
        ["accessToken", accessToken],
      ]);

      router.push("/(main)/Home");
    },
    onError: (error: any) => {
      Alert.alert(
        "Erro ao fazer login",
        error?.response?.data?.message ||
          "Ocorreu um erro ao fazer login. Verifique suas credenciais e tente novamente."
      );
    },
    onSettled: () => {
      setIsCreatingSession(false);
    },
  });

  return {
    handleRegisterUser,
    isRegisteringUser,
    router,
    handleLogin,
    isCreatingSession,
    user,
    isLogged,
    setIsLogged,
    setUser,
  };
};

export default useAuth;
