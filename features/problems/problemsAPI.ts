import axios from "axios";
import { Platform } from "react-native";
import { ProblemEntity } from "./ProblemEntity";

export class ProblemsAPI {
  //static baseURL: string = Platform.OS === "android" ? "10.0.2.2" : "10.0.2.2";
  static myIp: string = "192.168.1.9";

  static async create(problem: ProblemEntity) {
    try {
      console.log("Sending data ", problem);

      const result = await axios.post(
        "http://" + this.myIp + ":3000/problems",
        { data: problem, headers: { "Content-Type": "multipart/form-data" } }
      );
      return result.data;
    } catch (error) {
      console.log("error", error);
    }
  }

  static async fetchAll() {
    try {
      const result = await axios.get("http://" + this.myIp + ":3000/problems");
      return result.data;
    } catch (error) {
      console.log("error", error);
    }
  }

  static async deleteProblem(id: number | undefined) {
    try {
      const result = await axios.delete(
        "http://" + this.myIp + ":3000/problems/" + id
      );
      return result.data;
    } catch (error) {
      console.log("error", error);
    }
  }
}
