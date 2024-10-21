// services/authService.js
import axios from "axios";
import { Alert } from "react-native";
import Constants from "expo-constants";

const { API_URL } = Constants.expoConfig.extra;
export const signUpService = async (
  username,
  password,
  first_name,
  last_name,
  birthday,
  email
) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/patient/account/create`,
      { username, password, first_name, last_name, birthday, email },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 30000,
      }
    );

    if (response.status === 201) {
      return { success: true, message: "Đăng kí tài khoản thành công" };
    }
  } catch (error) {
    if (error.response) {
      console.error("Đăng kí tài khoản không thành công:", error.response.data);
      Alert.alert(
        "Lỗi",
        "Đăng kí tài khoản không thành công: " + error.response.data.message
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
    return { success: false, message: "Đăng kí tài khoản không thành công:" };
  }
};
