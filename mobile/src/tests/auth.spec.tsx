import AsyncStorage from '@react-native-async-storage/async-storage';

describe('Auth - armazenamento de sessão', () => {
  it('salva user e accessToken no AsyncStorage', async () => {
    const fakeUser = { id: 1, name: "Gabriel", email: "test@test.com" };
    const fakeToken = "fake_token_123";

    await AsyncStorage.multiSet([
      ["user", JSON.stringify(fakeUser)],
      ["accessToken", fakeToken],
    ]);

    const storedUser = await AsyncStorage.getItem("user");
    const storedToken = await AsyncStorage.getItem("accessToken");

    expect(JSON.parse(storedUser!)).toEqual(fakeUser);
    expect(storedToken).toBe(fakeToken);
  });
});
