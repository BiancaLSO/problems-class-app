import { useState } from "react";
import { Button, TextInput, View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { UserEntity } from "../UserEntity";
import { signUp } from "../userSlice";

export function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  const handleSignup = () => {
    dispatch(signUp(new UserEntity(username, password)));
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
        <Button title="Sign Up" onPress={handleSignup} />
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
