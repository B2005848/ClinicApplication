import axios from "axios";
import { Alert } from "react-native";
import Constants from "expo-constants";

const { API_URL } = Constants.expoConfig.extra;

// Hàm lấy ca làm việc của bác sĩ
export const getDoctorShifts = async (departmentId, specialtyId, doctorId) => {
  try {
    console.log(`Fetching shifts for doctor: ${doctorId}`);

    // Gọi API bằng axios
    const response = await axios.get(
      `${API_URL}/api/handle/staff/getDoctorShifts/${departmentId}/${specialtyId}/${doctorId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      console.log("Fetch result:", response.data);
      return { success: true, data: response.data.shifts };
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error("Lỗi:", error.message);

    // Hiển thị thông báo lỗi
    Alert.alert(
      "Lỗi",
      "Có lỗi xảy ra khi lấy ca làm việc. Vui lòng thử lại sau."
    );

    return { success: false, message: error.message || "Có lỗi xảy ra." };
  }
};
