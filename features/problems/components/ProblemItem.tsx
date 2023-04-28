import { View, Text } from "react-native";

export const ProblemItem = (props: any) => {
  return (
    <View>
      <Text>
        {props.done.toString()} - {props.text}
      </Text>
    </View>
  );
};
