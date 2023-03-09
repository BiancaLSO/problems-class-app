import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProblemEntity } from "./ProblemEntity";
import { ProblemsAPI } from "./problemsAPI";

// First, create the thunk
export const fetchAllProblems = createAsyncThunk(
  "problems/fetchAllProblems", // Unique name for the thunk
  async (thunkAPI) => {
    const response = ProblemsAPI.fetchAll();
    return response;
  }
);

export const createProblem = createAsyncThunk(
  "problems/createProblem",
  async (problem: ProblemEntity, thunkAPI) => {
    const response = ProblemsAPI.create(problem);
    return response;
  }
);

export const deleteProblem = createAsyncThunk(
  "problems/deleteProblem",
  async (id: number | undefined, thunkAPI) => {
    const response = ProblemsAPI.deleteProblem(id);
    return response;
  }
);

interface ProblemsState {
  entities: ProblemEntity[];
}

const initialState = {
  entities: [],
} as ProblemsState;

// Then, handle actions in your reducers:
const problemsSlice = createSlice({
  name: "problems",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllProblems.fulfilled, (state, action) => {
      state.entities = action.payload;
    });

    builder.addCase(createProblem.fulfilled, (state, action) => {
      state.entities.push(action.payload);
    });

    builder.addCase(deleteProblem.fulfilled, (state, action) => {
      const problemId = action.payload.id;
      state.entities = state.entities.filter(
        (problem) => problem.id !== problemId
      );
    });
  },
});

export default problemsSlice.reducer;
