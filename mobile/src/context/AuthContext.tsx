import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, type ReactNode, useEffect, useState } from "react";
import { User } from "../types/user";


interface AuthContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLogged, setIsLogged] = useState<boolean>(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("accessToken");
      setIsLogged(!!token);
    };

    checkToken();
  }, []);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const loadStorageData = async () => {
      const storagedUser = await AsyncStorage.getItem("user");
      const storagedToken = await AsyncStorage.getItem("accessToken");

      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser));
        setToken(storagedToken);
      }
    };

    loadStorageData();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, isLogged, setIsLogged, setToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
