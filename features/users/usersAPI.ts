import axios from "axios";
import { Platform } from "react-native";
import { UserEntity } from "./UserEntity";

export class UsersAPI {
  static baseURL: string = Platform.OS === "android" ? "10.0.2.2" : "10.0.2.2";

  static async signup(user: UserEntity) {
    try {
      const result = await axios.post(
        "http://" + this.baseURL + ":3000/auth/signup",
        user
      );
      return result.data;
    } catch (error) {
      console.log("error", error);
    }
  }
}
