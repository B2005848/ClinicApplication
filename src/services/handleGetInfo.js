// services/authService.js
import axios from "axios";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

const { API_URL } = Constants.expoConfig.extra;
export const getDataInfo = async (phone) => {
  try {
    console.log(`Fetching data for phone: ${phone}`);

    const response = await axios.get(
      `${API_URL}/api/handle/patient/getinfo/${phone}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      console.log([response.data]);
      await AsyncStorage.setItem(
        "userInfo",
        JSON.stringify(response.data.dataInfo)
      );
      return { success: true, data: response.data.dataInfo };
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error("Lỗi:", error.message);

    Alert.alert("Lỗi", "Có lỗi xảy ra. Vui lòng thử lại sau.");

    return { success: false, message: error.message || "Có lỗi xảy ra." };
  }
};
