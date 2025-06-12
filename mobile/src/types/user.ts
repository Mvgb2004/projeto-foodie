export interface User {
  id: number;
  email: string;
  name: string;
  password_hash: string;
  address: string;
  address_complement: string;
  neighborhood: string;
  city: string;
  state: string;
  postal_code: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateUserRequest = {
  name: string;
  email: string;
  password: string;
  cep: string;
  address: string;
  addressComplement: string;
  city: string;
  state: string;
};