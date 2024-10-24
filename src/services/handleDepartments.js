import axios from "axios";
import { Alert } from "react-native";
import Constants from "expo-constants";

const { API_URL } = Constants.expoConfig.extra;

export const handleGetlistDepartments = async (page) => {
  try {
    console.log(`Fetching departments for page: ${page}`);

    // Gọi API bằng axios
    const response = await axios.get(
      `${API_URL}/api/departments/getList/?page=${page}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      console.log("Departments data:", response.data);

      return { success: true, data: response.data };
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error("Lỗi:", error.message);

    // Hiển thị thông báo lỗi
    Alert.alert("Lỗi", "Có lỗi xảy ra. Vui lòng thử lại sau.");

    return { success: false, message: error.message || "Có lỗi xảy ra." };
  }
};
