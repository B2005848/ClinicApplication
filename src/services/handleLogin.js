// services/authService.js
import axios from "axios";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";
import { useAuthStore } from "../stores/authLogin";

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
      const {
        accessToken,
        refreshToken,
        accessTokenExpiry,
        refreshTokenExpiry,
      } = response.data;

      // save into store hookstate
      const store = useAuthStore();

      store.login(
        phone,
        accessToken,
        accessTokenExpiry,
        refreshToken,
        refreshTokenExpiry
      );
      return { success: true, message: "Đăng nhập thành công" };
    }
  } catch (error) {
    if (error.response) {
      console.error("Đăng nhập không thành công:", error.response.data);
      Alert.alert(
        "Lỗi",
        "Đăng nhập không thành công: " + error.response.data.message
      );
    } else if (error.request) {
      console.error("Không nhận được phản hồi từ server:", error.request);
      Alert.alert(
        "Lỗi",
        "Không thể kết nối đến server. Vui lòng kiểm tra lại kết nối mạng của bạn."
      );
    } else {
      console.error("Lỗi:", error.message);
      Alert.alert("Lỗi", "Có lỗi xảy ra. Vui lòng thử lại sau.");
    }
  }
};

export const logoutService = async () => {
  const store = useAuthStore();
  store.logout();
  console.log("Đăng xuất thành công");
  return { success: true };
};
