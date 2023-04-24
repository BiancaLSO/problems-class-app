import { useEffect, useState } from "react";
import { Button, TextInput, View, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { UserEntity } from "../UserEntity";
import { login, updateToken } from "../userSlice";
import * as SecureStore from "expo-secure-store";

export function Login() {
  const token: string | null | undefined = useSelector(
    (state: RootState) => state.users.userToken
  );
  const error: string | null | undefined = useSelector(
    (state: RootState) => state.users.error
  );
  const dispatch = useDispatch<AppDispatch>();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const asyncFunc = async () => {
      const token = await SecureStore.getItemAsync("token");
      dispatch(updateToken(token));

      console.log("token is ", token);
    };
    asyncFunc();
  }, []);

  const handleLogin = () => {
    dispatch(login(new UserEntity(username, password)));
    clearForm();
  };

  const clearForm = () => {
    setUsername("");
    setPassword("");
  };

  return (
    <View>
      <View>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
        <Button title="Login" onPress={handleLogin} />
        {token ? <Text>{token}</Text> : <Text>No token available yet</Text>}
        {error ? <Text>{error}</Text> : <Text>No error available yet</Text>}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 200,
  },
});
