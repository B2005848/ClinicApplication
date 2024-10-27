import axios from "axios";
import { Alert } from "react-native";
import Constants from "expo-constants";

const { API_URL } = Constants.expoConfig.extra;

export const checkAvailableTime = async (appointmentDetails) => {
  try {
    // Ghi log để kiểm tra dữ liệu
    console.log("Appointment Details:", appointmentDetails);

    // Xây dựng URL với tham số truy vấn
    const response = await axios.get(
      `${API_URL}/api/appointment/check-existing-time`,
      {
        params: {
          doctor_id: appointmentDetails.doctor_id,
          department_id: appointmentDetails.department_id,
          service_id: appointmentDetails.service_id,
          appointment_date: appointmentDetails.appointment_date,
          start_time: appointmentDetails.start_time,
          shift_id: appointmentDetails.shift_id,
        },
      }
    );

    if (response.data.status === true) {
      return { success: true, data: response.data.message }; // Trả về true nếu khung giờ còn trống
    } else {
      Alert.alert(
        "Thông báo",
        "Khung giờ này đã có người đặt. Vui lòng chọn lại buổi và khung giờ khác"
      );
      return { success: false }; // Trả về false nếu khung giờ đã có người đặt
    }
  } catch (error) {
    console.error("Lỗi khi kiểm tra khung giờ:", error);
    Alert.alert(
      "Lỗi",
      "Có lỗi xảy ra khi kiểm tra khung giờ. Vui lòng thử lại."
    );
    return false; // Trả về false nếu có lỗi xảy ra
  }
};
