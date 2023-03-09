import React from "react";
import type { RootState } from "./../../store";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "./counterSlice";
import { Button, View, Text } from "react-native";

export function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <View>
      <Button title="Increment value" onPress={() => dispatch(increment())} />
      <Text>The current value is: {count}</Text>
      <Button title="Decrement value" onPress={() => dispatch(decrement())} />
    </View>
  );
}
