import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import { Counter } from "./features/counter/Counter";
import { Problem } from "./features/problems/components/Problem";
import { Login } from "./features/users/components/Login";
import { SignUp } from "./features/users/components/SignUp";
import { store } from "./store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  //   return (
  //     <Provider store={store}>
  //       <View style={styles.container}>
  //         {/* <Counter /> */}
  //         <Problem />
  //         {/* <SignUp />
  //         <Login /> */}
  //       </View>
  //     </Provider>
  //   );
  // }

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <View style={styles.container}>
          <Problem></Problem>
        </View>
      </Provider>
    </QueryClientProvider>
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
