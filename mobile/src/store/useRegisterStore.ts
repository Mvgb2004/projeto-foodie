import { create } from "zustand";

type RegisterData = {
  name: string;
  email: string;
  password: string;
  cep: string;
  address: string;
  addressComplement: string; 
  neighborhood: string;
  city: string;
  state: string;
};

type RegisterStore = {
  data: Partial<RegisterData>;
  update: (fields: Partial<RegisterData>) => void;
  reset: () => void;
};

export const useRegisterForm = create<RegisterStore>((set) => ({
  data: {},
  update: (fields) => set((state) => ({ data: { ...state.data, ...fields } })),
  reset: () => set({ data: {} }),
}));
