import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import { Counter } from "./features/counter/Counter";
import { Problem } from "./features/problems/components/Problem";
import { SignUp } from "./features/users/components/SignUp";
import { store } from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        {/* <Counter /> */}
        <Problem />
        <SignUp />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
