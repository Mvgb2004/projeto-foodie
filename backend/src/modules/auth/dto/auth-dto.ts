export type CreateUserDto = {
  name: string;
  email: string;
  password: string;
  cep: string;
  addressComplement: string;
  address: string;
  neighborhood: string;
  city: string;
  state: string;

}

export type CreateSessionDto = {
  email: string;
  password: string;
};
