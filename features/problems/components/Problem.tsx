import { useEffect, useState } from "react";
import { TextInput, View, StyleSheet, Button, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { ProblemEntity } from "../ProblemEntity";
import {
  createProblem,
  deleteProblem,
  fetchAllProblems,
} from "../problemSlice";

export function Problem() {
  const problems: ProblemEntity[] = useSelector(
    (state: RootState) => state.problems.entities
  );
  const dispatch = useDispatch<AppDispatch>();

  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    dispatch(createProblem(new ProblemEntity(subject, description)));
    clearForm();
  };

  const handleDelete = (id: number | undefined) => (event: any) => {
    event.preventDefault();
    dispatch(deleteProblem(id)).then(() => {
      dispatch(fetchAllProblems());
    });
  };

  const clearForm = () => {
    setSubject("");
    setDescription("");
  };

  useEffect(() => {
    console.log("hi");
    dispatch(fetchAllProblems());
  }, []);

  return (
    <View>
      <View>
        <TextInput
          style={styles.input}
          value={subject}
          onChangeText={setSubject}
        />
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
        />
        <Button title="Create problem" onPress={handleSubmit} />
      </View>

      {problems.map((problem) => (
        <View key={problem?.id}>
          <Text>
            {problem.subject} - {problem?.description}
          </Text>
          <Button title="Delete problem" onPress={handleDelete(problem?.id)} />
        </View>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
