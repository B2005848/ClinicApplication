// services/authService.js
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";
import { isTokenValid } from "../stores/auth-token";

export const loginService = async (phone, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/patient/account/login`,
      { username: phone, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000,
      }
    );

    if (response.status === 200) {
      const token = response.data.token;
      if (token && isTokenValid(token)) {
        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("username", phone);
        await AsyncStorage.setItem("password", password);
        return { success: true, token };
      }
    }
    return { success: false, message: "Token không hợp lệ. Vui lòng thử lại." };
  } catch (error) {
    if (error.response) {
      return { success: false, message: error.response.data.message };
    } else {
      return {
        success: false,
        message: "Có lỗi xảy ra. Vui lòng thử lại sau.",
      };
    }
  }
};

export const logoutService = async () => {
  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("username");
  await AsyncStorage.removeItem("password");
};
