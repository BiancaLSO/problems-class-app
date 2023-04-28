import { useEffect, useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Button,
  Text,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { ProblemEntity } from "../ProblemEntity";
import {
  createProblem,
  deleteProblem,
  fetchAllProblems,
} from "../problemSlice";
import { Picture } from "../picture";
import { useGetIssues, usePostIssues } from "../issues-hooks";
import { useQueryClient } from "@tanstack/react-query";
import { ProblemItem } from "./ProblemItem";

export function Problem() {
  const problems: ProblemEntity[] = useSelector(
    (state: RootState) => state.problems.entities
  );
  const dispatch = useDispatch<AppDispatch>();

  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [camera, setCamera] = useState(false);
  const [photoToDisplay, setPhotoToDisplay] = useState("");

  const { isLoading, error, data } = useGetIssues();
  const queryClient = useQueryClient();
  const { mutate: createProblem } = usePostIssues();

  // const handleSubmit = (event: any) => {
  //   event.preventDefault();
  //   console.log(`subject: ${subject}, description: ${description}`);
  //   dispatch(
  //     createProblem(new ProblemEntity(subject, description, photoToDisplay))
  //   );
  //   clearForm();
  // };

  const handleAddProblem = () => {
    const problemEntity: ProblemEntity = new ProblemEntity(
      subject,
      description,
      photoToDisplay
    );
    createProblem(problemEntity, {
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: ["problems"] }),
    });
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
        {camera ? (
          <Picture
            setCamera={setCamera}
            setPhotoToDisplay={setPhotoToDisplay}
            style={styles.image}
          ></Picture>
        ) : (
          <>
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
            <Button title="Open camera" onPress={() => setCamera(true)} />
            <Button
              title="Create problem"
              // onPress={handleSubmit}
            />
          </>
        )}
      </View>

      {/* {problems.map((problem) => (
        <View key={problem?.id}>
          <Text>
            {problem.subject} - {problem?.description}
          </Text>
          <Button title="Delete problem" onPress={handleDelete(problem?.id)} />
        </View>
      ))} */}

      <FlatList
        data={data}
        renderItem={({ item }) => (
          <ProblemItem done={item.done} text={item.text} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
});
