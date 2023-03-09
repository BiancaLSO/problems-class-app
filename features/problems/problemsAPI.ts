import axios from "axios";
import { Platform } from "react-native";
import { ProblemEntity } from "./ProblemEntity";

export class ProblemsAPI {
  static baseURL: string = Platform.OS === "android" ? "10.0.2.2" : "10.0.2.2";

  static async create(problem: ProblemEntity) {
    try {
      const result = await axios.post(
        "http://" + this.baseURL + ":3000/problems",
        problem
      );
      return result.data;
    } catch (error) {
      console.log("error", error);
    }
  }

  static async fetchAll() {
    try {
      const result = await axios.get(
        "http://" + this.baseURL + ":3000/problems"
      );
      return result.data;
    } catch (error) {
      console.log("error", error);
    }
  }

  static async deleteProblem(id: number | undefined) {
    try {
      const result = await axios.delete(
        "http://" + this.baseURL + ":3000/problems/" + id
      );
      return result.data;
    } catch (error) {
      console.log("error", error);
    }
  }
}
